import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/users/1";

function Icon({ children }) {
  return <span className="nav-icon" aria-hidden="true">{children}</span>;
}

export default function App() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Student Records");
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchStudent = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(API_URL);
      setStudent(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
      setActiveTab("Student Records");
    } catch (err) {
      setError("Unable to retrieve student information. Check your internet connection and try again.");
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  const city = student?.address?.city || "—";
  const initials = student?.name
    ? student.name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase()
    : "ST";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">SR</div>
          <div><strong>STUDENT<span>DESK</span></strong><small>API LAB CONSOLE</small></div>
        </div>

        <div className="nav-caption">WORKSPACE</div>
        <nav className="navigation" aria-label="Main navigation">
          {[
            ["Dashboard", "▦"],
            ["Student Records", "▤"],
            ["API Activity", "⌁"]
          ].map(([label, icon]) => (
            <button
              className={`nav-link ${activeTab === label ? "active" : ""}`}
              key={label}
              onClick={() => setActiveTab(label)}
            >
              <Icon>{icon}</Icon>{label}
              {label === "Student Records" && student && <span className="nav-count">1</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="connection-indicator"><span /> API endpoint configured</div>
          <div className="sidebar-note">REACT + AXIOS<br /><b>Practical Experiment</b></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> {activeTab}</div>
          <div className="topbar-right"><span className="environment-dot" /> Development environment <div className="avatar">ST</div></div>
        </header>

        <section className="page-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">STUDENT INFORMATION SYSTEM <span>•</span> EXPERIMENT 01</div>
              <h1>{activeTab === "Dashboard" ? "Dashboard overview" : activeTab === "API Activity" ? "API activity" : "Student records"}</h1>
              <p>Retrieve and inspect student information through an Axios GET request.</p>
            </div>
            <div className="date-chip">LIVE API CONNECTION <span className="live-dot" /></div>
          </div>

          {activeTab === "Dashboard" && (
            <div className="dashboard-grid">
              <div className="metric-card"><span className="metric-label">RECORDS LOADED</span><strong>{student ? "01" : "00"}</strong><small>Student profiles retrieved</small></div>
              <div className="metric-card"><span className="metric-label">REQUEST METHOD</span><strong className="metric-word">GET</strong><small>Axios HTTP request</small></div>
              <div className="metric-card"><span className="metric-label">CONNECTION</span><strong className="metric-word">{loading ? "WAIT" : error ? "ERROR" : student ? "OK" : "READY"}</strong><small>API request status</small></div>
            </div>
          )}

          <div className="content-grid">
            <section className="records-panel">
              <div className="panel-heading">
                <div><span className="section-kicker">DIRECTORY</span><h2>Student profile</h2></div>
                <span className="record-tag">RECORD / 001</span>
              </div>

              {!student && !loading && !error && (
                <div className="empty-state">
                  <div className="empty-illustration"><span>＋</span></div>
                  <h3>No student record loaded</h3>
                  <p>Send a GET request to the configured endpoint to retrieve the student profile.</p>
                  <button className="primary-button" onClick={fetchStudent}>View Details <span>↗</span></button>
                </div>
              )}

              {loading && (
                <div className="loading-state">
                  <div className="loader" />
                  <h3>Fetching student details</h3>
                  <p>Axios is waiting for a response from the API…</p>
                </div>
              )}

              {error && (
                <div className="error-state">
                  <div className="error-symbol">!</div><h3>Request failed</h3><p>{error}</p>
                  <button className="primary-button" onClick={fetchStudent}>Try again ↻</button>
                </div>
              )}

              {student && !loading && (
                <div className="profile-content">
                  <div className="profile-banner">
                    <div className="profile-avatar">{initials}</div>
                    <div className="profile-name"><span>STUDENT PROFILE</span><h3>{student.name}</h3><p>{student.username ? `@${student.username}` : "Registered student"}</p></div>
                    <span className="verified-pill">● Retrieved</span>
                  </div>
                  <div className="details-grid">
                    <div className="detail-field"><span>STUDENT ID</span><strong>#{student.id}</strong></div>
                    <div className="detail-field"><span>EMAIL ADDRESS</span><strong>{student.email}</strong></div>
                    <div className="detail-field"><span>CITY</span><strong>{city}</strong></div>
                    <div className="detail-field"><span>PHONE</span><strong>{student.phone}</strong></div>
                    <div className="detail-field wide"><span>WEBSITE</span><strong>{student.website}</strong></div>
                  </div>
                  <div className="profile-footer"><span>Data source: JSONPlaceholder sample API</span><button className="text-button" onClick={fetchStudent}>Refresh record ↻</button></div>
                </div>
              )}
            </section>

            <aside className="request-panel">
              <div className="panel-heading"><div><span className="section-kicker">REQUEST INSPECTOR</span><h2>API connection</h2></div><span className="http-badge">HTTP</span></div>
              <div className="request-method"><span>GET</span><p>Request method</p></div>
              <div className="endpoint-label">ENDPOINT URL</div>
              <div className="endpoint-box">{API_URL}</div>
              <div className="request-info"><span>Library</span><b>Axios</b></div>
              <div className="request-info"><span>Response format</span><b>JSON</b></div>
              <div className="request-info"><span>Last request</span><b>{lastUpdated || "Not sent yet"}</b></div>
              <div className={`status-box ${error ? "failed" : student ? "success" : ""}`}>
                <span className="status-light" />
                <div><b>{error ? "Request failed" : student ? "Response received" : loading ? "Request in progress" : "Waiting for request"}</b><small>{error ? "Check connection and retry" : student ? "Student data is available" : "Click View Details to begin"}</small></div>
              </div>
              <button className="secondary-button" onClick={fetchStudent} disabled={loading}>{loading ? "Sending request…" : student ? "Fetch again" : "View Details"} <span>→</span></button>
            </aside>
          </div>

          <div className="bottom-note"><span>ⓘ</span> This practical uses JSONPlaceholder sample data. It is a demonstration API, not an official college student database.</div>
          <footer><span>STUDENTDESK <b>•</b> REACT + AXIOS LAB</span><span>GET REQUEST · JSON RESPONSE</span></footer>
        </section>
      </main>
    </div>
  );
}
