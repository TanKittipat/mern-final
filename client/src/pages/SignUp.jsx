import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/auth.store";
import { Navigate } from "react-router";

const SignUp = () => {
  const { signUp, isSigningUp, authUser } = useAuthStore();
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstNameEn: "",
    lastNameEn: "",
    firstNameTh: "",
    lastNameTh: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    signUp(user).then(() => <Navigate to={"/"} />);
  };

  useEffect(() => {
    if (authUser) {
      return <Navigate to={"/"} />;
    }
  }, []);
  return (
    <div className="hero bg-orange-300 min-h-[92.5vh]">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h3 className="card-title">Register a new User!</h3>
          <fieldset className="fieldset">
            <label className="fieldset-label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <label className="fieldset-label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <label className="fieldset-label">Firstname</label>
            <input
              type="text"
              className="input"
              placeholder="Firstname"
              name="firstNameEn"
              value={user.firstNameEn}
              onChange={handleChange}
            />
            <label className="fieldset-label">Lastname</label>
            <input
              type="text"
              className="input"
              placeholder="Lastname"
              name="lastNameEn"
              value={user.lastNameEn}
              onChange={handleChange}
            />
            <label className="fieldset-label">ชื่อจริง</label>
            <input
              type="text"
              className="input"
              placeholder="ชื่อจริง"
              name="firstNameTh"
              value={user.firstNameTh}
              onChange={handleChange}
            />
            <label className="fieldset-label">นามสกุล</label>
            <input
              type="text"
              className="input"
              placeholder="นามสกุล"
              name="lastNameTh"
              value={user.lastNameTh}
              onChange={handleChange}
            />
            <button
              disabled={isSigningUp}
              onClick={handleSubmit}
              className="btn btn-neutral mt-4"
            >
              Register
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
