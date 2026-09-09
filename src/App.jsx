```jsx
import "./App.css";

function App() {
  return (
    <div className="login-page">
      <div className="overlay"></div>

      <header className="header">
        <div className="logo">NETFLIX</div>
      </header>

      <main className="login-container">
        <div className="login-box">
          <h1>Sign In</h1>

          <form>
            <input
              type="email"
              placeholder="Email or mobile number"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <button type="submit">Sign In</button>
          </form>

          <div className="help-row">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#">Need help?</a>
          </div>

          <p className="signup">
            New to Netflix? <span>Sign up now.</span>
          </p>

          <p className="captcha">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
```
