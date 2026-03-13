"use client";

import { useState, useEffect } from "react";
import { createTask, subscribeToAllTasks, Task } from "@/lib/tasks";

export default function AdminPortal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToAllTasks((fetchedTasks) => {
      setTasks(fetchedTasks);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !assignedTo) {
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await createTask(title, description, assignedTo);
      setTitle("");
      setDescription("");
      setAssignedTo("");
      setMessage("Task created successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error creating task. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pending": return "badge-pending";
      case "In Progress": return "badge-progress";
      case "Completed": return "badge-completed";
      default: return "";
    }
  };

  return (
    <main>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Admin Control Center</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage and assign tasks to your team</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
        {/* Create Task Form */}
        <section>
          <div className="glass-card">
            <h2 style={{ marginBottom: '1.5rem' }}>Create New Task</h2>
            <form onSubmit={handleSubmit}>
              <label>Task Title</label>
              <input 
                type="text" 
                placeholder="e.g. Design Dashboard" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Description</label>
              <textarea 
                rows={4} 
                placeholder="Describe the task details..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label>Assign To (User ID/Name)</label>
              <input 
                type="text" 
                placeholder="e.g. JohnDoe" 
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />

              <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? "Creating..." : "Assign Task"}
              </button>
            </form>
            {message && <p style={{ marginTop: '1rem', color: message.includes('Error') ? 'var(--error)' : 'var(--success)', fontWeight: 600 }}>{message}</p>}
          </div>
        </section>

        {/* Task List */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>All Tasks</h2>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total: {tasks.length}</span>
          </div>

          <div className="task-grid" style={{ gridTemplateColumns: '1fr' }}>
            {tasks.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>No tasks created yet.</p>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="glass-card task-card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{task.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Assigned to: <strong style={{color: 'var(--text-primary)'}}>{task.assignedTo}</strong></p>
                    </div>
                    <span className={`badge ${getStatusClass(task.status)}`}>{task.status}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0' }}>{task.description}</p>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Last Updated: {task.updatedAt?.toDate().toLocaleString() || "Just now"}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
