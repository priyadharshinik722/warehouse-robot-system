import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [robots, setRobots] = useState([]);
  const [description, setDescription] = useState("");
  const [robotName, setRobotName] = useState("");
  const [robotBattery, setRobotBattery] = useState(100);
  const [priority, setPriority] = useState("medium");

  const loadTasks = async () => {
    const response = await fetch("/api/api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const loadRobots = async () => {
    const response = await fetch("/api/api/robots");
    const data = await response.json();
    setRobots(data);
  };
  const addRobot = async () => {
  if (!robotName.trim()) return;

  await fetch("/api/api/robots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: robotName,
      battery: robotBattery,
    }),
  });

  setRobotName("");
  setRobotBattery(100);
  loadRobots();
};

  const addTask = async () => {
    if (!description.trim()) return;

    await fetch("/api/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  description,
  priority,
}),
    });

    setDescription("");
    setPriority("medium");
    loadTasks();
  };
const assignTask = async (taskId, robotId) => {
  await fetch(`/api/tasks/${taskId}/assign`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ robotId }),
  });

  loadTasks();
  loadRobots();
};
const scheduleTask = async (taskId, scheduledTime) => {
  await fetch(`/api/tasks/${taskId}/schedule`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ scheduledTime }),
  });

  loadTasks();
};
  useEffect(() => {
    loadTasks();
    loadRobots();
  }, []);

  return (
    <div
  style={{
    padding: "40px",
    fontFamily: "Arial",
    backgroundColor: "#e8eef7",
    minHeight: "100vh",
    color: "#1f2937",
  }}
>

      <h1
  style={{
    fontSize: "32px",
    marginBottom: "5px",
    color: "#111827",
  }}
>
  🤖 Warehouse Robot Management System
</h1>

      <p
  style={{
    color: "#4b5563",
    fontSize: "16px",
    marginTop: "0",
  }}
>
  Manage tasks, robots, scheduling and warehouse operations
</p>

      <hr />
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "15px",
    margin: "25px 0",
  }}
>
  <div
  style={{
    padding: "20px",
    background: "white",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  }}
>
    <h3>Total Tasks</h3>
    <h2 style={{ color: "#111827", fontWeight: "700" }}>
  {tasks.length}
</h2>
  </div>

  <div
  style={{
    padding: "20px",
    background: "white",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  }}
>
    <h3>Pending</h3>
    <h2 style={{ color: "#111827", fontWeight: "700" }}>
  {tasks.filter((task) => task.status === "pending").length}
</h2>
  </div>

  <div style={{ padding: "20px", background: "white", borderRadius: "10px", textAlign: "center" }}>
    <h3>Assigned</h3>
    <h2 style={{ color: "#111827", fontWeight: "700" }}>
  {tasks.filter((task) => task.status === "assigned").length}
</h2>
  </div>

  <div style={{ padding: "20px", background: "white", borderRadius: "10px", textAlign: "center" }}>
    <h3>Completed</h3>
    <h2 style={{ color: "#111827", fontWeight: "700" }}>
  {tasks.filter((task) => task.status === "completed").length}
</h2>
  </div>
  <div
  style={{
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    textAlign: "center",
  }}
>
  <h3>🤖 Total Robots</h3>
  <h2 style={{ color: "#111827", fontWeight: "700" }}>
  {robots.length}
</h2>
</div>
<div
  style={{
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    textAlign: "center",
  }}
>
  <h3>🟢 Available</h3>
  <h2 style={{ color: "#111827", fontWeight: "700" }}>
  {robots.filter((robot) => robot.status === "available").length}
</h2>
</div>
<div
  style={{
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    textAlign: "center",
  }}
>
  <h3>🔴 Busy</h3>
  <h2 style={{ color: "#111827", fontWeight: "700" }}>
  {robots.filter((robot) => robot.status === "busy").length}
</h2>
</div>

</div>

      <h2 style={{ color: "#111827", fontWeight: "700" }}>
  📋 Task Management
</h2>

      <input
  type="text"
  placeholder="Enter task description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  style={{
    padding: "10px",
    width: "300px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  }}
/>
      <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  id="taskPriority"
  style={{ marginLeft: "10px" }}
>
  <option value="high">🔴 High</option>
  <option value="medium">🟡 Medium</option>
  <option value="low">🟢 Low</option>
</select>

      <button
  onClick={addTask}
  style={{
    marginLeft: "10px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  ➕ Add Task
</button>
      <h3>📋 Tasks</h3>

{tasks.length === 0 ? (
  <p>No tasks available.</p>
) : (
  <div>
    {tasks.map((task) => {
      const assignedRobot = robots.find(
        (robot) => robot.id === task.robotId
      );

      return (
        <div
          key={task.id}
          style={{
            background: "#f8fbff",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        >
          <h3>{task.description}</h3>

          <p>
            <strong>Status:</strong> {task.status}
          </p>
          <p>
  <strong>Priority:</strong>{" "}
  {task.priority === "high"
    ? "🔴 High"
    : task.priority === "low"
    ? "🟢 Low"
    : "🟡 Medium"}
</p>

          <p>
            <strong>Robot:</strong>{" "}
            {assignedRobot ? assignedRobot.name : "Not assigned"}
          </p>

          <input
            type="datetime-local"
            onChange={(e) =>
              scheduleTask(task.id, e.target.value)
            }
          />

          <select
            onChange={(e) =>
              assignTask(task.id, Number(e.target.value))
            }
            defaultValue=""
            style={{ marginLeft: "10px" }}
          >
            <option value="" disabled>
              Assign Robot
            </option>

            {robots.map((robot) => (
  <option
    key={robot.id}
    value={robot.id}
    disabled={robot.status !== "available" || robot.battery < 20}
  >
    {robot.name} - {robot.status}
  </option>
))}
          </select>

          <button
            onClick={async () => {
              await fetch(
                `/api/tasks/${task.id}/complete`,
                {
                  method: "PUT",
                }
              );

              loadTasks();
              loadRobots();
            }}
            style={{
              marginLeft: "10px",
              padding: "8px 15px",
            }}
          >
            Complete
          </button>
        </div>
      );
    })}
  </div>
)}


      <hr />

      <h2 style={{ color: "#111827", fontWeight: "700" }}>
  🤖 Robot Management
</h2>
      <div
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  }}
>
  <h3>➕ Add New Robot</h3>

  <input
    type="text"
    placeholder="Robot name"
    value={robotName}
    onChange={(e) => setRobotName(e.target.value)}
  />

  <input
    type="number"
    placeholder="Battery"
    value={robotBattery}
    onChange={(e) => setRobotBattery(Number(e.target.value))}
    style={{ marginLeft: "10px", width: "100px" }}
  />

  <button
  onClick={addRobot}
  style={{
    marginLeft: "10px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  ➕ Add Robot
</button>
</div>
      <button onClick={loadRobots}>🔄 Refresh Robots</button>
  
      {robots.map((robot) => (
        <div
          key={robot.id}
          style={{
            background: "#f5f3ff",
            border: "1px solid gray",
            padding: "15px",
            margin: "10px 0",
            borderRadius: "8px",
          }}
        >
          <h3>{robot.name}</h3>
          <div style={{ margin: "10px 0" }}>
  <strong>Status:</strong>{" "}
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "15px",
      background:
        robot.status === "available"
          ? "#d1fae5"
          : robot.status === "busy"
          ? "#fee2e2"
          : "#fef3c7",
    }}
  >
    {robot.status}
  </span>
</div>

<div style={{ margin: "10px 0" }}>
  <strong>Battery:</strong> {robot.battery}%
{robot.battery < 20 && " 🔴 Low Battery"}
{robot.battery >= 20 && robot.battery < 50 && " 🟡 Medium Battery"}
{robot.battery >= 50 && " 🟢 Good Battery"}
  
  <div
    style={{
      width: "100%",
      height: "10px",
      background: "#e5e7eb",
      borderRadius: "5px",
      marginTop: "5px",
    }}
  >
    <div
      style={{
        width: `${robot.battery}%`,
        height: "100%",
        background: robot.battery < 20 ? "#ef4444" : "#22c55e",
        borderRadius: "5px",
      }}
    />
  </div>
</div>
        </div>
      ))}
    </div>
  );
}
export default App;