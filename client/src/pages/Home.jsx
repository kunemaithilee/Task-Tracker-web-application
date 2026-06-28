import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiSearch, FiDownload, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useTasks } from '../hooks/useTasks';
import Navbar from '../components/Navbar';
import StatsCards from '../components/StatsCards';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import { PRIORITY_COLORS, STATUS_COLORS } from '../utils/constants';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import DueDateBanner from '../components/ui/DueDateBanner';
import { exportToCSV } from '../utils/exportTasks';
import * as taskService from '../services/taskService';

const SkeletonCard = () => (
  <div className="animate-fadeIn rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <div className="mb-3 flex items-start justify-between">
      <div className="flex-1">
        <div className="mb-2 h-5 w-3/4 animate-skeleton rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-1/3 animate-skeleton rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="flex gap-1">
        <div className="h-8 w-8 animate-skeleton rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-8 w-8 animate-skeleton rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
    <div className="mb-4 space-y-2">
      <div className="h-3 w-full animate-skeleton rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-3 w-2/3 animate-skeleton rounded bg-gray-200 dark:bg-gray-700" />
    </div>
    <div className="flex gap-1.5">
      <div className="h-6 w-16 animate-skeleton rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="h-6 w-20 animate-skeleton rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="h-6 w-14 animate-skeleton rounded-full bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

const SkeletonListRow = () => (
  <div className="animate-fadeIn flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
    <div className="flex-1 space-y-2">
      <div className="h-4 w-1/3 animate-skeleton rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-3 w-2/3 animate-skeleton rounded bg-gray-200 dark:bg-gray-700" />
    </div>
    <div className="h-6 w-16 animate-skeleton rounded-full bg-gray-200 dark:bg-gray-700" />
    <div className="h-6 w-20 animate-skeleton rounded-full bg-gray-200 dark:bg-gray-700" />
  </div>
);

const ListTaskRow = ({ task, onEdit, onDelete }) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const pColor = PRIORITY_COLORS[task.priority] || '';
  const sColor = STATUS_COLORS[task.status] || '';

  return (
    <div className="group animate-fadeIn flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-gray-900 dark:text-white">{task.title}</p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
        </div>
        <span className={`hidden shrink-0 rounded-full px-2.5 py-1 text-xs font-medium sm:inline-block ${pColor}`}>
          {task.priority}
        </span>
        <span className={`hidden shrink-0 rounded-full px-2.5 py-1 text-xs font-medium md:inline-block ${sColor}`}>
          {task.status}
        </span>
        <span className="hidden shrink-0 text-xs text-gray-400 lg:inline-block">
          Due {formatDate(task.dueDate)}
        </span>
      </div>
      <div className="flex shrink-0 gap-0.5">
        <button onClick={() => onEdit(task)} className="rounded-lg p-2 text-gray-400 transition-all hover:bg-blue-50 hover:text-blue-600 active:scale-90 dark:hover:bg-blue-900/30" title="Edit">
          <FiEdit2 size={14} />
        </button>
        <button onClick={() => onDelete(task)} className="rounded-lg p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500 active:scale-90 dark:hover:bg-red-900/30" title="Delete">
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const {
    tasks,
    loading,
    error,
    search,
    statusFilter,
    priorityFilter,
    sort,
    setSearch,
    setStatusFilter,
    setPriorityFilter,
    setSort,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const undoRef = useRef(null);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);
  useEffect(() => { if (error) toast.error(error); }, [error]);

  const handleAddTask = async (formData) => {
    try {
      await addTask(formData);
      toast.success('Task created successfully');
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleEditTask = async (formData) => {
    try {
      await editTask(editingTask._id, formData);
      toast.success('Task updated successfully');
      setEditingTask(null);
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async () => {
    const deletedTask = { ...deleteConfirm };
    try {
      await removeTask(deleteConfirm._id);
      setDeleteConfirm(null);
      if (undoRef.current) clearTimeout(undoRef.current);
      toast(
        ({ closeToast }) => (
          <div className="flex items-center gap-3">
            <span className="text-sm">Task deleted</span>
            <button
              onClick={async () => {
                try {
                  await taskService.createTask({
                    title: deletedTask.title,
                    description: deletedTask.description,
                    status: deletedTask.status,
                    priority: deletedTask.priority,
                    dueDate: deletedTask.dueDate,
                  });
                  fetchTasks();
                  toast.success('Task restored');
                } catch {
                  toast.error('Failed to restore');
                }
                closeToast();
              }}
              className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-white/30"
            >
              Undo
            </button>
          </div>
        ),
        { type: 'info', autoClose: 5000, style: { background: '#4f46e5', color: '#fff' } }
      );
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const openAddModal = () => { setEditingTask(null); setIsModalOpen(true); };
  const openEditModal = (task) => { setEditingTask(task); setIsModalOpen(true); };
  const handleFormSubmit = (formData) => {
    if (editingTask) handleEditTask(formData);
    else handleAddTask(formData);
  };

  const hasActiveFilters = search || statusFilter || priorityFilter || sort !== 'newest';
  const hasTasks = tasks.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <StatsCards tasks={tasks} />

        {hasTasks && (
          <div className="mt-5">
            <DueDateBanner tasks={tasks} />
          </div>
        )}

        <div className="mt-6 space-y-4 sm:mt-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="min-w-0 flex-1">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <div className="flex shrink-0 gap-2">
              {hasTasks && (
                <Button variant="outline" size="md" icon={FiDownload} onClick={() => exportToCSV(tasks)} className="hidden sm:flex">
                  Export
                </Button>
              )}
              <Button size="md" icon={FiPlus} onClick={openAddModal}>
                Add Task
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <FilterBar
              tasks={tasks}
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              sort={sort}
              onStatusChange={setStatusFilter}
              onPriorityChange={setPriorityFilter}
              onSortChange={setSort}
            />
            {hasActiveFilters && (
              <button
                onClick={() => { setSearch(''); setStatusFilter(''); setPriorityFilter(''); setSort('newest'); }}
                className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            viewMode === 'grid' ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => <SkeletonListRow key={i} />)}
              </div>
            )
          ) : error ? (
            <ErrorState message={error} onRetry={fetchTasks} />
          ) : !hasTasks ? (
            search || statusFilter || priorityFilter ? (
              <EmptyState
                icon={FiSearch}
                title="No matching tasks"
                description="Try adjusting your search or filters"
              />
            ) : (
              <EmptyState
                icon={FiSearch}
                title="No tasks yet"
                description="Get started by creating your first task"
                actionLabel="Create Your First Task"
                onAction={openAddModal}
              />
            )
          ) : viewMode === 'grid' ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task, i) => (
                <div key={task._id} className={i < 4 ? `stagger-${i + 1}` : ''}>
                  <TaskCard task={task} onEdit={openEditModal} onDelete={setDeleteConfirm} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <ListTaskRow key={task._id} task={task} onEdit={openEditModal} onDelete={setDeleteConfirm} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        <TaskForm
          initialData={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={() => { setIsModalOpen(false); setEditingTask(null); }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Task"
        message={
          <>
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{deleteConfirm?.title}</span>
            ? This action cannot be undone.
          </>
        }
        onConfirm={handleDeleteTask}
      />
    </div>
  );
};

export default Home;
