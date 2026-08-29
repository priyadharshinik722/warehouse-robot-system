import express from "express";
import cors from "cors";
import robotRoutes from "./routes/robotRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/robots", robotRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Warehouse Robot System Backend is running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});