import ChatIcon from "../assets/chat_icon.svg";
import SingoutIcon from "../assets/sign out_icon.svg";
import { useAuth } from "./AuthProvider";
import { Link } from "react-router-dom";
export default function Header() {
  const { isAuthenticated, username, logout } = useAuth();
  return (
    <header className="flex flex-row bg-gray-600 p-2 justify-between">
      <Link to="/" className="flex flex-row">
        <img src={ChatIcon} className="w-8 m-2" />
        <h1 className="font-bold self-center">Parler</h1>
      </Link>
      {isAuthenticated && (
        <div className="flex flex-row items-center">
          <div className="font-bold"> {username} </div>
          <img src={SingoutIcon} className="w-8 m-2" onClick={logout} />
        </div>
      )}
      {!isAuthenticated && (
        <Link
          to="/login"
          className="m-2 font-bold text-lg bg-slate-300 p-2 rounded-xl"
        >
          Sign In
        </Link>
      )}
    </header>
  );
}
