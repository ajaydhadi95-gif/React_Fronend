import { useState } from "react";
import "./App.css";

const UNITS_PER_KW = 120; // approx. units generated per KW per month
const sizeToKw = { "1KW": 1, "3KW": 3, "5KW": 5, "10KW+": 10 };

function App() {
  const initial = { fullName: "", phone: "", city: "", systemSize: "3KW", roofArea: "" };
  const [formData, setFormData] = useState(initial);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solar Booking Details:", formData);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData(initial);
    setSubmitted(false);
  };

  const units = sizeToKw[formData.systemSize] * UNITS_PER_KW;

  return (
    <div className="page">
      {/* Background layers */}
      <div className="stars s1" />
      <div className="stars s2" />
      <span className="shoot sh1" />
      <span className="shoot sh2" />
      <span className="shoot sh3" />

      {/* Top-right live sun */}
      <div className="rsun">
        <div className="rsun-rays" />
        <div className="rsun-glow" />
        <div className="rsun-core" />
      </div>

      {/* Center sun + planets */}
      <div className="system">
        <div className="sun" />
        <div className="orbit o1"><div className="planet mercury" /></div>
        <div className="orbit o2"><div className="planet venus" /></div>
        <div className="orbit o3"><div className="planet earth" /></div>
        <div className="orbit o4"><div className="planet mars" /></div>
        <div className="orbit o5"><div className="planet jupiter" /></div>
        <div className="orbit o6"><div className="planet saturn" /></div>
      </div>

      {/* Card */}
      <div className="card">
        <header className="header">
          <div className="logo">☀️</div>
          <h1>Solar Rooftop Booking</h1>
          <p>Book solar panels for your home today</p>
          <div className="badges">
            <span>⚡ Lower Electricity Bills</span>
            <span>🌱 Eco Friendly</span>
            <span>🛡️ 25 Years Warranty</span>
          </div>
        </header>

        {submitted ? (
          <div className="success">
            <div className="tick">✓</div>
            <h2>Booking Successful!</h2>
            <p>Thank you, <strong>{formData.fullName}</strong>!</p>
            <p>Our team will contact you soon at <strong>{formData.phone}</strong>.</p>
            <div className="summary">
              <div><span>System Size</span><strong>{formData.systemSize}</strong></div>
              <div><span>City</span><strong>{formData.city}</strong></div>
              <div><span>Est. Generation</span><strong>~{units} units/month</strong></div>
              {formData.roofArea && (
                <div><span>Roof Area</span><strong>{formData.roofArea} sq.ft</strong></div>
              )}
            </div>
            <button className="btn" onClick={handleReset}>Make a New Booking</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <label>👤 Full Name</label>
              <input type="text" name="fullName" value={formData.fullName}
                onChange={handleChange} placeholder="Enter your name" required />
            </div>

            <div className="field">
              <label>📞 Phone Number</label>
              <input type="tel" name="phone" value={formData.phone}
                onChange={handleChange} placeholder="10-digit mobile number"
                pattern="[0-9]{10}" title="Enter a 10-digit mobile number" required />
            </div>

            <div className="field">
              <label>📍 City / Location</label>
              <input type="text" name="city" value={formData.city}
                onChange={handleChange} placeholder="Enter your city" required />
            </div>

            <div className="field">
              <label>🔋 Solar System Capacity</label>
              <select name="systemSize" value={formData.systemSize} onChange={handleChange}>
                <option value="1KW">1 KW (Small House / 1-2 BHK)</option>
                <option value="3KW">3 KW (Standard House / 2-3 BHK)</option>
                <option value="5KW">5 KW (Large House / Commercial)</option>
                <option value="10KW+">10 KW+ (Industrial / Big Complex)</option>
              </select>
            </div>

            <div className="estimate">
              ⚡ Estimated generation: <strong>~{units} units / month</strong>
            </div>

            <div className="field">
              <label>🏠 Roof Area (sq. ft.)</label>
              <input type="number" name="roofArea" value={formData.roofArea}
                onChange={handleChange} placeholder="e.g. 500" />
            </div>

            <button type="submit" className="btn">☀️ Book Solar Inspection</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;