import { useAuth } from "../components/AuthProvider";
import { Navigate } from "react-router-dom";
import ChatIcon from "../assets/chat_icon.svg";

export default function Index() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/chat" />;
  }
  return (
    <div className="flex flex-col place-content-center items-center mt-10">
      <img src={ChatIcon} className="w-48" />
      <div className="text-8xl font-extrabold"> Parler</div>
      <div className="text-4xl font-extrabold uppercase text-gray-600 m-6">
        {" "}
        Ready to make new connections?
      </div>
    </div>
  );
}
