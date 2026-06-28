import { createContext, useState, useCallback } from 'react';
import * as taskService from '../services/taskService';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sort, setSort] = useState('newest');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      if (sort) params.sort = sort;

      const response = await taskService.getTasks(params);
      setTasks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter, sort]);

  const addTask = async (taskData) => {
    const response = await taskService.createTask(taskData);
    setTasks((prev) => [response.data, ...prev]);
    return response;
  };

  const editTask = async (id, taskData) => {
    const response = await taskService.updateTask(id, taskData);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? response.data : task))
    );
    return response;
  };

  const removeTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
