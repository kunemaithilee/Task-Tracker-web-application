export const exportToCSV = (tasks) => {
  if (!tasks.length) return;

  const headers = ['Title', 'Description', 'Status', 'Priority', 'Due Date', 'Created At', 'Updated At'];

  const rows = tasks.map((t) => [
    `"${t.title.replace(/"/g, '""')}"`,
    `"${t.description.replace(/"/g, '""')}"`,
    t.status,
    t.priority,
    new Date(t.dueDate).toLocaleDateString('en-US'),
    new Date(t.createdAt).toLocaleDateString('en-US'),
    new Date(t.updatedAt).toLocaleDateString('en-US'),
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tasks-export-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
