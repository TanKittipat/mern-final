import { useAuthStore } from "../stores/auth.store";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-lg">
          NakhonPathom-Airport
        </a>
      </div>
      <div className="navbar-end">
        {authUser ? (
          <>
            <button onClick={() => logout()} className="btn">
              Logout
            </button>
          </>
        ) : (
          <div className="flex space-x-2">
            <a href="/signin" className="btn btn-ghost">
              Login
            </a>
            <a href="/signup" className="btn">
              Register
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
