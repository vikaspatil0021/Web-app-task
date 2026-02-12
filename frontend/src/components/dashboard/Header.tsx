import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";
import type { AuthContextType } from "../../types/auth.type";

const Header = ({ userName }: { userName: string }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext) as AuthContextType;

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);

    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Task Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome, {userName}</p>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
