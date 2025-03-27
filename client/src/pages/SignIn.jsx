import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/auth.store";
import { Navigate } from "react-router";

const SignIn = () => {
  const { signIn, isSigningIn, authUser } = useAuthStore();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    signIn(user).then(() => <Navigate to={"/"} />);
  };

  useEffect(() => {
    if (authUser) {
      return <Navigate to={"/"} />;
    }
  }, []);
  return (
    <div className="hero bg-orange-200 min-h-[92.5vh]">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h3 className="card-title">Login to use System!</h3>
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
            <button
              disabled={isSigningIn}
              onClick={handleSubmit}
              className="btn btn-neutral mt-4"
            >
              Login
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
