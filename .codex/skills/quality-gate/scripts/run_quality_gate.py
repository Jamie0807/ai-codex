#!/usr/bin/env python3
"""Run existing Node project quality checks in a stable order."""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
from pathlib import Path
from typing import Any


CHECKS = [
    ("lint", ["lint", "eslint"]),
    ("typecheck", ["typecheck", "type-check", "check-types", "tsc"]),
    ("test", ["test", "unit", "test:unit", "vitest", "jest"]),
    ("build", ["build"]),
]

SKIP_SCRIPT_NAMES = {"dev", "start", "preview", "test:watch", "watch"}


def detect_package_manager(root: Path) -> str:
    if (root / "pnpm-lock.yaml").exists():
        return "pnpm"
    if (root / "yarn.lock").exists():
        return "yarn"
    if (root / "package-lock.json").exists() or (root / "npm-shrinkwrap.json").exists():
        return "npm"
    return "npm"


def load_package_json(root: Path) -> dict[str, Any]:
    package_json = root / "package.json"
    if not package_json.exists():
        raise SystemExit(f"No package.json found at {package_json}")
    try:
        return json.loads(package_json.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise SystemExit(f"Invalid package.json: {exc}") from exc


def command_for(package_manager: str, script: str) -> list[str]:
    if package_manager == "npm":
        return ["npm", "run", script]
    return [package_manager, "run", script]


def select_checks(scripts: dict[str, str]) -> list[tuple[str, str]]:
    selected: list[tuple[str, str]] = []
    used_scripts: set[str] = set()

    for check_name, candidates in CHECKS:
        for script_name in candidates:
            if script_name in SKIP_SCRIPT_NAMES:
                continue
            if script_name in scripts and script_name not in used_scripts:
                selected.append((check_name, script_name))
                used_scripts.add(script_name)
                break

    return selected


def run_command(command: list[str], cwd: Path) -> dict[str, Any]:
    started = time.monotonic()
    process = subprocess.run(
        command,
        cwd=str(cwd),
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=False,
    )
    elapsed = time.monotonic() - started

    return {
        "command": command,
        "returncode": process.returncode,
        "duration_seconds": round(elapsed, 2),
        "output": process.stdout,
    }


def tail_output(output: str, max_lines: int) -> str:
    lines = output.rstrip().splitlines()
    if len(lines) <= max_lines:
        return "\n".join(lines)
    omitted = len(lines) - max_lines
    return f"... omitted {omitted} earlier lines ...\n" + "\n".join(lines[-max_lines:])


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", default=".", help="Project root. Defaults to current directory.")
    parser.add_argument("--json", action="store_true", help="Print full JSON summary.")
    parser.add_argument("--continue-on-failure", action="store_true", help="Run later checks after failures.")
    parser.add_argument("--max-lines", type=int, default=80, help="Maximum output lines per command in text mode.")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    package = load_package_json(root)
    scripts = package.get("scripts", {})
    if not isinstance(scripts, dict):
        raise SystemExit("package.json scripts must be an object")

    package_manager = detect_package_manager(root)
    checks = select_checks({str(key): str(value) for key, value in scripts.items()})
    summary: dict[str, Any] = {
        "root": str(root),
        "package_manager": package_manager,
        "checks": [],
        "skipped": [],
    }

    if not checks:
        summary["skipped"].append("No lint/typecheck/test/build scripts found in package.json")

    exit_code = 0
    for check_name, script_name in checks:
        command = command_for(package_manager, script_name)
        result = run_command(command, root)
        result["check"] = check_name
        result["script"] = script_name
        summary["checks"].append(result)

        if result["returncode"] != 0:
            exit_code = result["returncode"]
            if not args.continue_on_failure:
                break

    if args.json:
        print(json.dumps(summary, indent=2, ensure_ascii=False))
        return exit_code

    print(f"Quality gate root: {summary['root']}")
    print(f"Package manager: {package_manager}")
    if summary["skipped"]:
        for skipped in summary["skipped"]:
            print(f"SKIP: {skipped}")

    for result in summary["checks"]:
        status = "PASS" if result["returncode"] == 0 else "FAIL"
        command_text = " ".join(result["command"])
        print("")
        print(f"{status}: {result['check']} ({command_text}) [{result['duration_seconds']}s]")
        output = tail_output(str(result["output"]), args.max_lines)
        if output:
            print(output)

    return exit_code


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        print("Interrupted", file=sys.stderr)
        raise SystemExit(130)
