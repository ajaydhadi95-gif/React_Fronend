import "./App.css";

function App() {
  return (
    <div className="login-page">
      <div className="overlay">

        <header className="header">
          <div className="logo">NETFLIX</div>
        </header>

        <main className="login-container">
          <div className="login-box">

            <h1>Sign In</h1>

            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email or mobile number"
                required
              />

              <input
                type="password"
                placeholder="Password"
                required
              />

              <button type="submit">Sign In</button>

              <div className="options">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>

                <span>Need help?</span>
              </div>
            </form>

            <p className="signup">
              New to Netflix? <strong>Sign up now.</strong>
            </p>

            <p className="recaptcha">
              This page is a Netflix-inspired demo UI for the DevOps project.
            </p>

          </div>
        </main>

      </div>
    </div>
  );
}

export default App;