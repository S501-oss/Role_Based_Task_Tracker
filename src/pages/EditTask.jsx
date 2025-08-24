import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useData } from "../context/DataContext.jsx";

export default function EditTask() {
  const { id } = useParams();
  const { user } = useAuth();
  const { users, getTask, updateTask, deleteTask } = useData();
  const nav = useNavigate();

  const task = getTask(id);
  const canEdit = task && user.id === task.creatorId;

  const [form, setForm] = useState(() =>
    task
      ? {
          title: task.title,
          description: task.description,
          assigneeId: task.assigneeId,
          status: task.status,
        }
      : null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!task) return;
    if (!canEdit) nav("/unauthorized", { replace: true });
  }, [task, canEdit, nav]);

  if (!task)
    return (
      <div className="card">
        <h3>Task not found</h3>
      </div>
    );

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!form.title.trim()) throw new Error("Title is required");
      updateTask(id, form);
      nav("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const onDelete = () => {
    if (confirm("Delete this task? This cannot be undone.")) {
      deleteTask(id);
      nav("/dashboard");
    }
  };

  return (
    <form
      className="card"
      onSubmit={onSubmit}
      style={{ display: "grid", gap: 12, maxWidth: 700 }}
    >
      <h2>Edit Task</h2>
      {error && (
        <div
          className="card"
          style={{
            padding: 12,
            borderColor: "#ef4444",
            background: "rgba(239,68,68,0.1)",
          }}
        >
          {error}
        </div>
      )}
      <label className="field">
        <span>Title</span>
        <input name="title" value={form.title} onChange={onChange} />
      </label>
      <label className="field">
        <span>Description</span>
        <textarea
          name="description"
          rows="4"
          value={form.description}
          onChange={onChange}
        ></textarea>
      </label>
      <div className="field-row">
        <label className="field" style={{ flex: 1 }}>
          <span>Assignee</span>
          <select name="assigneeId" value={form.assigneeId} onChange={onChange}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </label>
        <label className="field" style={{ width: 200 }}>
          <span>Status</span>
          <select name="status" value={form.status} onChange={onChange}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </label>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {/* <button className="btn primary" type="submit">Update</button> */}
        <button className="btn danger" type="button" onClick={onDelete}>
          Delete
        </button>
        <button className="btn ghost" type="button" onClick={() => nav(-1)}>
          Cancel
        </button>
        <div style={{ flex: 1 }} />
        {/* <button className="btn danger" type="button" onClick={onDelete}>Delete</button> */}
        <button className="btn primary" type="submit">
          Update
        </button>
      </div>
    </form>
  );
}
