import Link from "next/link";

export default function Home() {
  return (
    <main style={{ textAlign: 'center', padding: '4rem 0' }}>
      <h1>Seamless Task Collaboration</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
        A unified platform for administrators to assign tasks and users to manage their workflow in real-time.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        <div className="glass-card">
          <h2 style={{ color: 'var(--primary)' }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Create tasks, assign them to team members, and track real-time progress.
          </p>
          <Link href="/admin" className="btn-primary" style={{ display: 'block' }}>
            Go to Admin Dashboard
          </Link>
        </div>

        <div className="glass-card">
          <h2 style={{ color: 'var(--secondary)' }}>User Portal</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            View your assigned tasks, update progress, and mark as completed.
          </p>
          <Link href="/user" className="btn-primary" style={{ display: 'block', background: 'linear-gradient(135deg, var(--secondary), #be185d)' }}>
            Go to My Workspace
          </Link>
        </div>
      </div>
    </main>
  );
}
