import "./Register.css";

function Register({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  registerPassword,
  setRegisterPassword,
  handleRegister,
  setPage,
}) {
  return (
    <div className="register-page">
      <div className="register-container">

        {/* ========================= */}
        {/* LOGO */}
        {/* ========================= */}
        <div className="register-logo">
          <img
            src="/money-icon.png"
            alt="FinTrack logo"
            className="register-logo-image"
          />

          <h1>FinTrack</h1>

          <p>Track your personal expenses</p>
        </div>

        {/* ========================= */}
        {/* REGISTER CARD */}
        {/* ========================= */}
        <div className="register-card">

          <h2>Create account</h2>

          <p className="register-subtitle">
            Start managing your finances today.
          </p>

          <form onSubmit={handleRegister}>

            {/* FIRST NAME */}
            <div className="register-field">
              <label>First name</label>

              <input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* LAST NAME */}
            <div className="register-field">
              <label>Last name</label>

              <input
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="register-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* PASSWORD */}
            <div className="register-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={registerPassword}
                onChange={(e) =>
                  setRegisterPassword(e.target.value)
                }
                required
              />
            </div>
            {/* CREATE ACCOUNT BUTTON */}
            <button
              type="submit"
              className="register-button"
            >
              Create account →
            </button>
          </form>
          {/* ========================= */}
          {/* LOGIN LINK */}
          {/* ========================= */}
          <div className="register-login">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setPage("login")}
            >
              Sign in
            </button>
          </div>
        </div>
        {/* ========================= */}
        {/* FOOTER */}
        {/* ========================= */}
        <p className="register-footer">
          Manage smarter. Spend better. ✦
        </p>
      </div>
    </div>
  );
}
export default Register;