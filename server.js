require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zenqor Control Panel</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #0b1020;
      --card: rgba(255, 255, 255, 0.08);
      --card-border: rgba(255, 255, 255, 0.12);
      --text: #f5f7fb;
      --muted: #9aa4bf;
      --primary: #6ea8fe;
      --accent: #7ef0c2;
      --danger: #ff7b7b;
      --shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
    }

    body {
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at top left, rgba(110, 168, 254, 0.22), transparent 30%),
        radial-gradient(circle at top right, rgba(126, 240, 194, 0.18), transparent 25%),
        linear-gradient(135deg, #0b1020 0%, #121a30 45%, #0b1020 100%);
      color: var(--text);
      min-height: 100vh;
      padding: 32px 18px;
    }

    .container {
      width: 100%;
      max-width: 1180px;
      margin: 0 auto;
    }

    .hero {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .panel,
    .card,
    .terminal {
      background: var(--card);
      border: 1px solid var(--card-border);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-radius: 24px;
      box-shadow: var(--shadow);
    }

    .panel {
      padding: 28px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(126, 240, 194, 0.12);
      border: 1px solid rgba(126, 240, 194, 0.22);
      color: var(--accent);
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: currentColor;
      box-shadow: 0 0 12px currentColor;
    }

    h1 {
      font-size: clamp(30px, 4vw, 54px);
      line-height: 1.02;
      letter-spacing: -0.03em;
      margin-bottom: 14px;
    }

    .lead {
      color: var(--muted);
      font-size: 15px;
      line-height: 1.8;
      max-width: 720px;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 24px;
    }

    .stat {
      padding: 18px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .stat-label {
      color: var(--muted);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 10px;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
    }

    .side {
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 18px;
    }

    .side h2 {
      font-size: 18px;
      margin-bottom: 8px;
    }

    .side p {
      color: var(--muted);
      line-height: 1.7;
      font-size: 14px;
    }

    .endpoint-list {
      display: grid;
      gap: 12px;
    }

    .endpoint {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 14px;
    }

    .method {
      min-width: 58px;
      text-align: center;
      padding: 6px 10px;
      border-radius: 999px;
      background: rgba(110, 168, 254, 0.14);
      color: var(--primary);
      font-weight: 700;
      font-size: 12px;
    }

    .main-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 20px;
    }

    .card {
      padding: 22px;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 700;
    }

    .muted {
      color: var(--muted);
      font-size: 13px;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 18px;
    }

    button {
      border: 0;
      outline: 0;
      cursor: pointer;
      padding: 12px 16px;
      border-radius: 14px;
      font-weight: 700;
      font-size: 14px;
      transition: transform 0.18s ease, opacity 0.18s ease, box-shadow 0.18s ease;
    }

    button:hover {
      transform: translateY(-1px);
      opacity: 0.96;
    }

    .btn-primary {
      background: linear-gradient(135deg, #6ea8fe, #4e7fff);
      color: white;
      box-shadow: 0 14px 28px rgba(78, 127, 255, 0.28);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .btn-danger {
      background: rgba(255, 123, 123, 0.14);
      color: #ffd0d0;
      border: 1px solid rgba(255, 123, 123, 0.2);
    }

    .terminal {
      min-height: 380px;
      overflow: hidden;
    }

    .terminal-top {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.03);
    }

    .term-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .term-red { background: #ff6b6b; }
    .term-yellow { background: #ffd166; }
    .term-green { background: #06d6a0; }

    pre {
      margin: 0;
      padding: 18px;
      min-height: 325px;
      color: #d9e2ff;
      font-size: 13px;
      line-height: 1.7;
      overflow: auto;
      white-space: pre-wrap;
      word-break: break-word;
      font-family: "Fira Code", "JetBrains Mono", monospace;
    }

    .status-pill {
      padding: 7px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .ok {
      color: var(--accent);
      background: rgba(126, 240, 194, 0.12);
    }

    .warn {
      color: #ffd58f;
      background: rgba(255, 213, 143, 0.12);
    }

    .err {
      color: #ffc1c1;
      background: rgba(255, 123, 123, 0.14);
    }

    .project-list {
      display: grid;
      gap: 14px;
    }

    .project-item {
      padding: 16px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .project-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 8px;
    }

    .project-name {
      font-weight: 700;
      font-size: 15px;
    }

    .project-meta {
      color: var(--muted);
      font-size: 13px;
    }

    .footer-note {
      margin-top: 18px;
      color: var(--muted);
      font-size: 12px;
      text-align: center;
    }

    @media (max-width: 960px) {
      .hero,
      .main-grid {
        grid-template-columns: 1fr;
      }

      .stats {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      body {
        padding: 18px 12px;
      }

      .panel,
      .card,
      .side {
        border-radius: 20px;
      }

      h1 {
        font-size: 32px;
      }

      .actions {
        flex-direction: column;
      }

      button {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <section class="hero">
      <div class="panel">
        <div class="badge">
          <span class="dot"></span>
          LIVE BACKEND PANEL
        </div>
        <h1>ZENQOR<br />CONTROL PANEL</h1>
        <p class="lead">
          Local dashboard untuk monitor API status, semak projects endpoint,
          dan test secure access tanpa ubah backend asal.
        </p>

        <div class="stats">
          <div class="stat">
            <div class="stat-label">Server</div>
            <div class="stat-value" id="serverPort">:${PORT}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Environment</div>
            <div class="stat-value" id="envLabel">${process.env.NODE_ENV || "development"}</div>
          </div>
          <div class="stat">
            <div class="stat-label">API Key</div>
            <div class="stat-value" id="apiKeyState">${process.env.API_KEY ? "Loaded" : "Missing"}</div>
          </div>
        </div>
      </div>

      <div class="panel side">
        <div>
          <h2>Available Endpoints</h2>
          <p>UI baru ini guna endpoint sedia ada dan kekalkan struktur asal project.</p>
        </div>

        <div class="endpoint-list">
          <div class="endpoint">
            <span class="method">GET</span>
            <span>/api/status</span>
          </div>
          <div class="endpoint">
            <span class="method">GET</span>
            <span>/api/projects</span>
          </div>
          <div class="endpoint">
            <span class="method">GET</span>
            <span>/api/secure-data</span>
          </div>
        </div>
      </div>
    </section>

    <section class="main-grid">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">API Console</div>
            <div class="muted">Live fetch daripada localhost</div>
          </div>
          <div id="statusPill" class="status-pill warn">Idle</div>
        </div>

        <div class="actions">
          <button class="btn-primary" onclick="loadStatus()">Check Status</button>
          <button class="btn-secondary" onclick="loadProjects()">Load Projects</button>
          <button class="btn-danger" onclick="loadSecure()">Test Secure Data</button>
        </div>

        <div class="terminal">
          <div class="terminal-top">
            <span class="term-dot term-red"></span>
            <span class="term-dot term-yellow"></span>
            <span class="term-dot term-green"></span>
          </div>
          <pre id="output">Zenqor panel initialized.
Klik button untuk test endpoint.</pre>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Projects Snapshot</div>
            <div class="muted">Render data dari /api/projects</div>
          </div>
        </div>

        <div id="projectList" class="project-list">
          <div class="project-item">
            <div class="project-head">
              <div class="project-name">No data loaded</div>
              <div class="status-pill warn">Pending</div>
            </div>
            <div class="project-meta">Tekan "Load Projects" untuk papar maklumat.</div>
          </div>
        </div>
      </div>
    </section>

    <div class="footer-note">
      Zenqor API local dashboard • rebuilt UI without touching existing API routes
    </div>
  </div>

  <script>
    const output = document.getElementById("output");
    const statusPill = document.getElementById("statusPill");
    const projectList = document.getElementById("projectList");

    function setState(type, text) {
      statusPill.className = "status-pill " + type;
      statusPill.textContent = text;
    }

    function print(data) {
      output.textContent =
        typeof data === "string"
          ? data
          : JSON.stringify(data, null, 2);
    }

    async function request(url, options = {}) {
      setState("warn", "Loading");
      try {
        const res = await fetch(url, options);
        const text = await res.text();

        let parsed;
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = text;
        }

        if (!res.ok) {
          setState("err", "Error");
          print({
            status: res.status,
            response: parsed
          });
          return null;
        }

        setState("ok", "Success");
        print(parsed);
        return parsed;
      } catch (error) {
        setState("err", "Failed");
        print({
          error: error.message
        });
        return null;
      }
    }

    async function loadStatus() {
      const data = await request("/api/status");
      if (!data) return;
    }

    async function loadProjects() {
      const data = await request("/api/projects");
      if (!Array.isArray(data)) return;

      if (data.length === 0) {
        projectList.innerHTML = \`
          <div class="project-item">
            <div class="project-head">
              <div class="project-name">No project returned</div>
              <div class="status-pill warn">Empty</div>
            </div>
            <div class="project-meta">Endpoint berjaya dipanggil tapi tiada data.</div>
          </div>
        \`;
        return;
      }

      projectList.innerHTML = data.map((item) => \`
        <div class="project-item">
          <div class="project-head">
            <div class="project-name">\${item.name || "Unnamed Project"}</div>
            <div class="status-pill ok">\${item.status || "unknown"}</div>
          </div>
          <div class="project-meta">
            Type: \${item.type || "-"}
          </div>
        </div>
      \`).join("");
    }

    async function loadSecure() {
      const data = await request("/api/secure-data", {
        headers: {
          "x-api-key": "zenqor123"
        }
      });
      if (!data) return;
    }
  </script>
</body>
</html>`);
});

app.use("/api", require("./routes/api"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});      }

      .card {
        background: rgba(255,255,255,0.05);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 30px;
        width: 300px;
        text-align: center;
        box-shadow: 0 0 25px rgba(0,255,255,0.2);
      }

      .card h2 {
        margin-bottom: 20px;
        font-size: 18px;
        color: #aaa;
      }

      button {
        padding: 10px 25px;
        border: none;
        border-radius: 8px;
        background: linear-gradient(90deg, #00f7ff, #00c3ff);
        color: black;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
      }

      button:hover {
        transform: scale(1.05);
        box-shadow: 0 0 15px #00f7ff;
      }

      #result {
        margin-top: 20px;
        font-size: 13px;
        color: #00f7ff;
        word-break: break-all;
      }
    </style>
  </head>

  <body>
    <div class="header">ZENQOR CONTROL PANEL</div>

    <div class="container">
      <div class="card">
        <h2>API STATUS</h2>
        <button onclick="checkStatus()">CHECK</button>
        <div id="result"></div>
      </div>
    </div>

    <script>
      function checkStatus() {
        fetch('/api/status')
          .then(res => res.json())
          .then(data => {
            document.getElementById('result').innerText =
              JSON.stringify(data, null, 2);
          });
      }
    </script>
  </body>
  </html>
  `);
});

app.use("/api", require("./routes/api"));

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running...");
});
