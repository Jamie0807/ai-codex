import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

const storageKey = 'ai-codex.todo-items.v1'

function getQueue() {
  return screen.getByRole('region', { name: 'Task queue' })
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds a new task', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('New task'), 'Prepare weekly review')
    await user.keyboard('{Enter}')

    expect(within(getQueue()).getByText('Prepare weekly review')).toBeInTheDocument()
  })

  it('toggles task completion', async () => {
    const user = userEvent.setup()
    render(<App />)

    const task = within(getQueue()).getByText('Finalize launch checklist').closest('article')
    expect(task).not.toBeNull()

    await user.click(within(task!).getByRole('button', { name: 'Mark as completed' }))

    expect(within(task!).getByText('Done')).toBeInTheDocument()
  })

  it('edits an existing task', async () => {
    const user = userEvent.setup()
    render(<App />)

    const task = within(getQueue()).getByText('Finalize launch checklist').closest('article')
    expect(task).not.toBeNull()

    await user.click(within(task!).getByRole('button', { name: 'Edit task' }))
    const input = within(task!).getByLabelText('Edit task title')
    await user.clear(input)
    await user.type(input, 'Finalize launch checklist and owner notes')
    await user.keyboard('{Enter}')

    expect(
      within(getQueue()).getByText('Finalize launch checklist and owner notes'),
    ).toBeInTheDocument()
  })

  it('deletes a task', async () => {
    const user = userEvent.setup()
    render(<App />)

    const task = within(getQueue()).getByText('Finalize launch checklist').closest('article')
    expect(task).not.toBeNull()

    await user.click(within(task!).getByRole('button', { name: 'Delete task' }))

    expect(within(getQueue()).queryByText('Finalize launch checklist')).not.toBeInTheDocument()
  })

  it('filters focus and done tasks', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('tab', { name: 'Done' }))
    expect(within(getQueue()).getByText('Confirm QA sign-off')).toBeInTheDocument()
    expect(within(getQueue()).queryByText('Finalize launch checklist')).not.toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'Focus' }))
    expect(within(getQueue()).queryByText('Confirm QA sign-off')).not.toBeInTheDocument()
    expect(within(getQueue()).getByText('Finalize launch checklist')).toBeInTheDocument()
  })

  it('restores tasks from localStorage', () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify([
        {
          id: 'stored-task',
          title: 'Restore task from local storage',
          completed: false,
          createdAt: 10,
        },
      ]),
    )

    render(<App />)

    expect(within(getQueue()).getByText('Restore task from local storage')).toBeInTheDocument()
  })
})
