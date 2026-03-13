"use client";

import { useState, useEffect } from "react";
import { subscribeToUserTasks, updateTaskStatus, Task } from "@/lib/tasks";

export default function UserPortal() {
  const [userId, setUserId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = subscribeToUserTasks(currentUser, (fetchedTasks) => {
        setTasks(fetchedTasks);
      });
      return () => unsubscribe();
    } else {
      setTasks([]);
    }
  }, [currentUser]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.trim()) {
      setCurrentUser(userId.trim());
    }
  };

  const handleStatusUpdate = async (taskId: string, newStatus: Task['status']) => {
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error("Failed to update status");
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

  if (!isClient) return null;

  if (!currentUser) {
    return (
      <main style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
        <div className="glass-card">
          <h1>Welcome</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Enter your User ID to view your tasks</p>
          <form onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="e.g. JohnDoe" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              Access My Portal
            </button>
          </form>
          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Tip: Use the same ID assigned by the Admin.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1>My Tasks</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Workspace for <strong style={{color: 'var(--primary)'}}>{currentUser}</strong></p>
        </div>
        <button onClick={() => setCurrentUser("")} className="btn-secondary">
          Switch User
        </button>
      </header>

      {tasks.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <h2 style={{ color: 'var(--text-secondary)' }}>No tasks assigned yet.</h2>
          <p>Check back later or contact your administrator.</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task.id} className="glass-card task-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className={`badge ${getStatusClass(task.status)}`}>{task.status}</span>
                {task.status !== "Completed" && (
                  <button 
                    onClick={() => handleStatusUpdate(task.id!, "Completed")}
                    className="btn-secondary"
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', borderColor: 'var(--success)', color: 'var(--success)' }}
                  >
                    Quick Complete
                  </button>
                )}
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{task.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{task.description}</p>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <label style={{ marginBottom: '0.5rem', display: 'block' }}>Update Status</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleStatusUpdate(task.id!, "Pending")}
                    className={`btn-secondary ${task.status === 'Pending' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', background: task.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : '' }}
                  >
                    Pending
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(task.id!, "In Progress")}
                    className={`btn-secondary ${task.status === 'In Progress' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', background: task.status === 'In Progress' ? 'rgba(59, 130, 246, 0.1)' : '' }}
                  >
                    In Progress
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(task.id!, "Completed")}
                    className={`btn-secondary ${task.status === 'Completed' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', background: task.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : '' }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
