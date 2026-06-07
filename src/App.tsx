import { FormEvent, KeyboardEvent, useEffect, useMemo, useState } from 'react'
import {
  Archive,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Circle,
  Clock3,
  Ellipsis,
  FileText,
  Flame,
  Inbox,
  ListTodo,
  Mail,
  MessageSquare,
  Navigation,
  Pencil,
  Plus,
  Search,
  Sun,
  Trash2,
  TriangleAlert,
  X,
  Zap,
} from 'lucide-react'

type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

type Filter = 'all' | 'active' | 'completed'

type TaskMeta = {
  due: string
  project: string
  status: 'Focus' | 'Blocked' | 'Queued' | 'Done'
  tone: 'focus' | 'blocked' | 'queued' | 'done'
}

const STORAGE_KEY = 'ai-codex.todo-items.v1'

const filters: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Focus' },
  { value: 'completed', label: 'Done' },
]

const initialTodos: Todo[] = [
  {
    id: 'sample-1',
    title: 'Confirm QA sign-off',
    completed: true,
    createdAt: 1,
  },
  {
    id: 'sample-2',
    title: 'Finalize launch checklist',
    completed: false,
    createdAt: 2,
  },
  {
    id: 'sample-3',
    title: 'Review supplier quote',
    completed: false,
    createdAt: 3,
  },
  {
    id: 'sample-4',
    title: 'Draft release notes',
    completed: false,
    createdAt: 4,
  },
  {
    id: 'sample-5',
    title: 'Submit travel receipt',
    completed: false,
    createdAt: 5,
  },
  {
    id: 'sample-6',
    title: 'Clear inbox triage',
    completed: true,
    createdAt: 6,
  },
]

const taskMetadata: TaskMeta[] = [
  { due: '10:30', project: 'Launch', status: 'Focus', tone: 'focus' },
  { due: '11:10', project: 'Ops', status: 'Blocked', tone: 'blocked' },
  { due: '13:00', project: 'Launch', status: 'Queued', tone: 'queued' },
  { due: '14:20', project: 'Home', status: 'Done', tone: 'done' },
  { due: '15:45', project: 'Study', status: 'Queued', tone: 'queued' },
  { due: '16:00', project: 'Inbox', status: 'Done', tone: 'done' },
]

const sidebarViews = [
  { label: 'Today', count: 18, icon: Sun, active: true },
  { label: 'Inbox', count: 5, icon: Inbox, active: false },
  { label: 'Upcoming', count: 31, icon: CalendarDays, active: false },
  { label: 'Waiting', count: 7, icon: Clock3, active: false },
  { label: 'Archived', count: 128, icon: Archive, active: false },
]

const projects = [
  { label: 'Launch', color: '#ff5c00' },
  { label: 'Home', color: '#111111' },
  { label: 'Study', color: '#ff8533' },
  { label: 'Personal', color: '#b45309' },
]

const activityItems = [
  ['09:42', 'Maya added checklist item'],
  ['09:28', 'Due time moved from 11:00'],
  ['08:57', 'Blocker linked to Launch project'],
]

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialTodos

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return initialTodos

    return parsed.filter(isTodo)
  } catch {
    return initialTodos
  }
}

function isTodo(value: unknown): value is Todo {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Partial<Todo>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.completed === 'boolean' &&
    typeof candidate.createdAt === 'number'
  )
}

function createTodo(title: string): Todo {
  return {
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    completed: false,
    createdAt: Date.now(),
  }
}

function getTaskMeta(todo: Todo, index: number): TaskMeta {
  if (todo.completed) {
    return { due: 'done', project: 'Closed', status: 'Done', tone: 'done' }
  }

  return taskMetadata[index % taskMetadata.length]
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const stats = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length
    const active = todos.length - completed
    const progress = todos.length === 0 ? 0 : Math.round((completed / todos.length) * 100)
    const blocked = todos.filter((todo, index) => !todo.completed && getTaskMeta(todo, index).tone === 'blocked').length

    return { active, blocked, completed, total: todos.length, progress }
  }, [todos])

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }, [filter, todos])

  const selectedTodo = visibleTodos.find((todo) => !todo.completed) ?? visibleTodos[0] ?? todos[0]

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = draft.trim()
    if (!title) return

    setTodos((current) => [createTodo(title), ...current])
    setDraft('')
  }

  function toggleTodo(id: string) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function deleteTodo(id: string) {
    setTodos((current) => current.filter((todo) => todo.id !== id))
    if (editingId === id) cancelEditing()
  }

  function startEditing(todo: Todo) {
    setEditingId(todo.id)
    setEditingTitle(todo.title)
  }

  function cancelEditing() {
    setEditingId(null)
    setEditingTitle('')
  }

  function saveEditing() {
    if (!editingId) return

    const title = editingTitle.trim()
    if (!title) {
      deleteTodo(editingId)
      return
    }

    setTodos((current) =>
      current.map((todo) => (todo.id === editingId ? { ...todo, title } : todo)),
    )
    cancelEditing()
  }

  function handleEditKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') saveEditing()
    if (event.key === 'Escape') cancelEditing()
  }

  return (
    <main className="today-page">
      <section className="announcement" aria-label="Live sync status">
        <span aria-hidden="true" />
        <p>SYNC LIVE · Focus queue refreshed 09:42 · 4 blockers flagged</p>
      </section>

      <nav className="primary-nav" aria-label="Primary navigation">
        <a className="brand-lockup" href="#top" aria-label="Orbit Tasks home">
          <span className="brand-mark">
            <ListTodo aria-hidden="true" size={20} />
          </span>
          <strong>Orbit Tasks</strong>
        </a>

        <div className="nav-links" aria-label="Sections">
          <a className="is-active" href="#top">Today</a>
          <a href="#inbox">Inbox</a>
          <a href="#projects">Projects</a>
          <a href="#calendar">Calendar</a>
          <a href="#reports">Reports</a>
        </div>

        <div className="nav-actions">
          <button className="icon-button" type="button" aria-label="Search">
            <Search aria-hidden="true" size={18} />
          </button>
          <button className="icon-button" type="button" aria-label="Notifications">
            <Bell aria-hidden="true" size={18} />
          </button>
          <button className="button-primary" type="button" onClick={() => document.getElementById('new-task')?.focus()}>
            <Plus aria-hidden="true" size={16} />
            New task
          </button>
        </div>
      </nav>

      <header className="today-hero" id="top">
        <p className="eyebrow">TODAY · SUNDAY PLAN</p>
        <h1>Today command center</h1>
        <p>
          A focused working surface for capturing tasks, clearing blockers, and
          sequencing the next few hours without leaving the list.
        </p>
      </header>

      <section className="task-console" aria-label="Today task console">
        <div className="console-topbar">
          <div>
            <p className="caption-label">WORKSPACE</p>
            <h2>Today · {String(stats.total).padStart(2, '0')} tasks</h2>
          </div>

          <div className="console-tabs" role="tablist" aria-label="Console views">
            <button className="is-selected" role="tab" aria-selected="true" type="button">Queue</button>
            <button role="tab" aria-selected="false" type="button">Timeline</button>
            <button role="tab" aria-selected="false" type="button">Notes</button>
          </div>

          <div className="saved-state">
            <span aria-hidden="true" />
            Saved 2 min ago
          </div>
        </div>

        <div className="console-body">
          <aside className="task-sidebar" aria-label="Task views">
            <p className="caption-label">VIEWS</p>
            <div className="sidebar-list">
              {sidebarViews.map((item) => {
                const Icon = item.icon
                return (
                  <button className={item.active ? 'is-active' : ''} key={item.label} type="button">
                    <span>
                      <Icon aria-hidden="true" size={16} />
                      {item.label}
                    </span>
                    <span className="mono">{item.count}</span>
                  </button>
                )
              })}
            </div>

            <p className="caption-label">PROJECTS</p>
            <div className="project-list" id="projects">
              {projects.map((project) => (
                <a href="#projects" key={project.label}>
                  <span style={{ backgroundColor: project.color }} />
                  {project.label}
                </a>
              ))}
            </div>
          </aside>

          <section className="queue-panel" aria-label="Task queue">
            <form className="quick-capture" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="new-task">New task</label>
              <span className="quick-capture__icon">
                <Plus aria-hidden="true" size={16} />
              </span>
              <input
                id="new-task"
                placeholder="Capture a task, date, or blocker"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
              <button className="sr-only" type="submit">Add task</button>
            </form>

            <div className="queue-filters" role="tablist" aria-label="Filter tasks">
              {filters.map((item) => (
                <button
                  aria-selected={filter === item.value}
                  className={filter === item.value ? 'is-selected' : ''}
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  role="tab"
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="queue-heading">
              <div>
                <h2>Priority queue</h2>
                <p>{stats.active} must-finish items before 16:00</p>
              </div>
              <button type="button" className="sort-control">
                Sort by impact
                <ChevronDown aria-hidden="true" size={14} />
              </button>
            </div>

            <div className="task-list">
              {visibleTodos.length === 0 ? (
                <div className="empty-state">
                  <Search aria-hidden="true" size={28} />
                  <h3>No tasks in this view</h3>
                  <p>Switch filters or capture a new task above.</p>
                </div>
              ) : (
                visibleTodos.map((todo, index) => {
                  const isEditing = editingId === todo.id
                  const meta = getTaskMeta(todo, index)

                  return (
                    <article
                      className={`task-row is-${meta.tone} ${todo.completed ? 'is-completed' : ''}`}
                      key={todo.id}
                    >
                      <button
                        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
                        className="task-check"
                        onClick={() => toggleTodo(todo.id)}
                        type="button"
                      >
                        {todo.completed ? (
                          <Check aria-hidden="true" size={14} />
                        ) : (
                          <Circle aria-hidden="true" size={14} />
                        )}
                      </button>

                      <div className="task-row__content">
                        {isEditing ? (
                          <input
                            aria-label="Edit task title"
                            className="task-edit"
                            autoFocus
                            value={editingTitle}
                            onBlur={saveEditing}
                            onChange={(event) => setEditingTitle(event.target.value)}
                            onKeyDown={handleEditKeyDown}
                          />
                        ) : (
                          <h3>{todo.title}</h3>
                        )}
                        <p>{meta.project} · Due {meta.due}</p>
                      </div>

                      <span className="task-status">{meta.status}</span>

                      <div className="task-actions">
                        {isEditing ? (
                          <button aria-label="Cancel editing" onClick={cancelEditing} type="button">
                            <X aria-hidden="true" size={17} />
                          </button>
                        ) : (
                          <button
                            aria-label="Edit task"
                            onClick={() => startEditing(todo)}
                            type="button"
                          >
                            <Pencil aria-hidden="true" size={17} />
                          </button>
                        )}
                        <button
                          aria-label="Delete task"
                          onClick={() => deleteTodo(todo.id)}
                          type="button"
                        >
                          <Trash2 aria-hidden="true" size={17} />
                        </button>
                      </div>
                    </article>
                  )
                })
              )}
            </div>
          </section>

          <aside className="detail-panel" aria-label="Selected task detail">
            <div className="detail-header">
              <div>
                <p className="caption-label">SELECTED TASK</p>
                <h2>{selectedTodo?.title ?? 'No task selected'}</h2>
              </div>
              <button className="icon-button is-white" type="button" aria-label="More task actions">
                <Ellipsis aria-hidden="true" size={17} />
              </button>
            </div>

            <div className="detail-pills">
              <span className="is-accent">FOCUS</span>
              <span>Due 10:30</span>
              <span>Owner Jamie</span>
            </div>

            <div className="detail-progress">
              <div>
                <span>Checklist progress</span>
                <strong className="mono">{stats.progress}%</strong>
              </div>
              <div className="progress-track" aria-hidden="true">
                <span style={{ width: `${stats.progress}%` }} />
              </div>
            </div>

            <div className="subtask-table">
              {['Confirm QA sign-off', 'Attach customer messaging', 'Schedule release room', 'Send blocker summary'].map((item, index) => (
                <div className={index < 2 ? 'is-done' : ''} key={item}>
                  <span>{index < 2 ? <Check aria-hidden="true" size={12} /> : null}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="detail-note">
              <p className="caption-label">Latest note</p>
              <p>
                QA flagged one analytics event name. Draft is ready; waiting on
                final naming before release room opens.
              </p>
            </div>

            <div className="activity-feed">
              <h3>Activity</h3>
              {activityItems.map(([time, event]) => (
                <p key={time}>
                  <span className="mono">{time}</span>
                  {event}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="automation-showcase" aria-label="Automation map">
        <div className="showcase-copy">
          <p className="eyebrow">AUTOMATION MAP</p>
          <h2>Tasks stay connected to the tools that create them.</h2>
          <p>
            Email, calendar, docs, and project updates land in one prioritized
            daily queue with source context intact.
          </p>
          <button className="button-primary" type="button">
            <Zap aria-hidden="true" size={15} />
            Review automations
          </button>
        </div>

        <div className="constellation" aria-label="Connected sources">
          <span className="connector connector-email" aria-hidden="true" />
          <span className="connector connector-calendar" aria-hidden="true" />
          <span className="connector connector-docs" aria-hidden="true" />
          <span className="connector connector-chat" aria-hidden="true" />
          <div className="source-node node-email"><Mail aria-hidden="true" size={16} /> Email</div>
          <div className="source-node node-calendar"><CalendarDays aria-hidden="true" size={16} /> Calendar</div>
          <div className="source-node node-docs"><FileText aria-hidden="true" size={16} /> Docs</div>
          <div className="source-node node-chat"><MessageSquare aria-hidden="true" size={16} /> Chat</div>
          <div className="orbit-node"><ListTodo aria-hidden="true" size={26} />Today</div>
          <div className="mini-stat">
            <span>Auto-prioritized</span>
            <strong className="mono">42 inputs / day</strong>
          </div>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Today metrics">
        <MetricCard icon={<Navigation aria-hidden="true" size={20} />} value={String(stats.total).padStart(2, '0')} label="Open tasks" />
        <MetricCard icon={<Flame aria-hidden="true" size={20} />} value={String(stats.active).padStart(2, '0')} label="Focus items" />
        <MetricCard icon={<TriangleAlert aria-hidden="true" size={20} />} value={String(stats.blocked).padStart(2, '0')} label="Blocked" />
        <MetricCard icon={<Zap aria-hidden="true" size={20} />} value="2.4h" label="Time saved" />
      </section>
    </main>
  )
}

function MetricCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: string
  label: string
}) {
  return (
    <article className="metric-card">
      <span>{icon}</span>
      <div>
        <strong className="mono">{value}</strong>
        <p>{label}</p>
      </div>
    </article>
  )
}
