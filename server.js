require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root route: Zenqor Control Panel
app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zenqor Control Panel</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0b1020; --card: rgba(255, 255, 255, 0.08);
      --card-border: rgba(255, 255, 255, 0.12);
      --text: #f5f7fb; --muted: #9aa4bf; --primary: #6ea8fe; --accent: #7ef0c2;
      --shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
    }
    body {
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at top left, rgba(110, 168, 254, 0.22), transparent 30%),
        radial-gradient(circle at top right, rgba(126, 240, 194, 0.18), transparent 25%),
        linear-gradient(135deg, #0b1020 0%, #121a30 45%, #0b1020 100%);
      color: var(--text); min-height: 100vh; padding: 32px 18px;
    }
    .container { width: 100%; max-width: 1180px; margin: 0 auto; }
    .panel, .card, .terminal {
      background: var(--card); border: 1px solid var(--card-border);
      backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border-radius: 24px; box-shadow: var(--shadow);
    }
    .panel { padding: 28px; }
    .badge { display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 12px; border-radius: 999px;
      background: rgba(126, 240, 194, 0.12); border: 1px solid rgba(126, 240, 194, 0.22);
      color: var(--accent); font-size: 13px; font-weight: 600; margin-bottom: 16px;
    }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: currentColor; box-shadow: 0 0 12px currentColor; }
    h1 { font-size: clamp(30px, 4vw, 54px); line-height: 1.02; letter-spacing: -0.03em; margin-bottom: 14px; }
    .lead { color: var(--muted); font-size: 15px; line-height: 1.8; max-width: 720px; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
    .stat { padding: 18px; border-radius: 18px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); }
    .stat-label { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; }
    .stat-value { font-size: 24px; font-weight: 700; }
    @media (max-width: 960px) { .stats { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="panel">
      <div class="badge"><span class="dot"></span>LIVE BACKEND PANEL</div>
      <h1>ZENQOR CONTROL PANEL</h1>
      <p class="lead">Local dashboard untuk monitor API status, semak projects endpoint, dan test secure access tanpa ubah backend asal.</p>
      <div class="stats">
        <div class="stat"><div class="stat-label">Server</div><div class="stat-value">${PORT}</div></div>
        <div class="stat"><div class="stat-label">Environment</div><div class="stat-value">${process.env.NODE_ENV || "development"}</div></div>
        <div class="stat"><div class="stat-label">API Key</div><div class="stat-value">${process.env.API_KEY ? "Loaded" : "Missing"}</div></div>
      </div>
    </div>
  </div>
</body>
</html>`);
});

// API routes
app.use("/api", require("./routes/api"));

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
