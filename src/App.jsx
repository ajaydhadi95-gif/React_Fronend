import { useState, useMemo } from "react";
import "./App.css";

function StarField() {
  // Generate random stars using box-shadow trick (realistic scattered look)
  const stars = useMemo(() => {
    let shadow = [];
    for (let i = 0; i < 200; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadow.push(`${x}px ${y}px #fff`);
    }
    return shadow.join(",");
  }, []);

  return (
    <div className="starfield" style={{ boxShadow: stars }}></div>
  );
}

function SolarSystem() {
  const planets = [
    { name: "mercury", size: 5, orbit: 60, duration: 4 },
    { name: "venus", size: 8, orbit: 85, duration: 7 },
    { name: "earth", size: 9, orbit: 115, duration: 10, hasMoon: true },
    { name: "mars", size: 7, orbit: 145, duration: 15 },
    { name: "jupiter", size: 24, orbit: 195, duration: 25 },
    { name: "saturn", size: 20, orbit: 245, duration: 32, hasRing: true },
    { name: "uranus", size: 14, orbit: 285, duration: 40 },
    { name: "neptune", size: 14, orbit: 320, duration: 48 },
  ];

  return (
    <div className="solar-system">
      <div className="sun">
        <div className="sun-glow"></div>
      </div>
      {planets.map((p) => (
        <div
          key={p.name}
          className="orbit"
          style={{
            width: `${p.orbit * 2}px`,
            height: `${p.orbit * 2}px`,
            animationDuration: `${p.duration}s`,
          }}
        >
          <div
            className={`planet ${p.name}`}
            style={{ width: `${p.size}px`, height: `${p.size}px` }}
          >
            {p.hasRing && <div className="saturn-ring"></div>}
            {p.hasMoon && <div className="moon-orbit"><div className="moon"></div></div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [page, setPage] = useState("welcome");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Email aur password dono bharo!");
      return;
    }
    alert(`Welcome, ${form.email}! Login successful 🚀`);
  };

  return (
    <div className="app-container">
      {page === "welcome" && (
        <div className="space-page">
          <StarField />
          <SolarSystem />
          <div className="welcome-text">
            <h1 className="space-title">Welcome to Space</h1>
            <p className="space-subtitle">Explore the universe with us</p>
            <button className="glow-btn" onClick={() => setPage("login")}>
              Enter Mission Control
            </button>
          </div>
        </div>
      )}

      {page === "login" && (
        <div className="login-page">
          <StarField />
          <form className="login-box" onSubmit={handleLogin}>
            <h2>Astronaut Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
            />
            <button type="submit">Login</button>
            <p className="back-link" onClick={() => setPage("welcome")}>
              ← Back to Welcome
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;

const [mode, setMode] = useState("login");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleAuth = async (e) => {
  e.preventDefault();
  setError("");

  if (!form.email || !form.password) {
    setError("Email aur password dono bharo!");
    return;
  }

  setLoading(true);
  try {
    const endpoint = mode === "login" ? "login" : "signup";
    const res = await fetch(`http://localhost:8080/api/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.success) {
      if (mode === "signup") {
        alert("Signup ho gaya! Ab login karo.");
        setMode("login");
      } else {
        alert(`Welcome, ${form.email}! 🚀`);
      }
    } else {
      setError(data.message);
    }
  } catch (err) {
    setError("Backend se connect nahi ho paaya. Server chal raha hai?");
  } finally {
    setLoading(false);
  }
};

