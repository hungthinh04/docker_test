import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const getCorsOrigin = () => {
  const frontendUrl = process.env.FRONTEND_URL;

  if (!frontendUrl || frontendUrl === "*") {
    return "*";
  }

  // Normalize URL - remove trailing slash
  const normalizedUrl = frontendUrl.replace(/\/+$/, "");

  // Return array với cả 2 versions (có và không có trailing slash) để tránh CORS error
  return [normalizedUrl, `${normalizedUrl}/`];
};

const corsOptions = {
  origin: getCorsOrigin(),
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/api/hello", (req, res) => {
  const { message } = req.query;
  const responseMessage = message || "Hello from Node.js Backend!";

  res.json({
    message: responseMessage,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.post("/api/data", (req, res) => {
  const { message } = req.body;
  res.json({
    success: true,
    received: message,
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
