import React from "react";
import ChatIcon from "../assets/chat_icon.svg";
import SingoutIcon from "../assets/sign out_icon.svg";
import { useAuth } from "./AuthProvider";
export default function Header() {
  const {logout} = useAuth()
  return (
    <header className="flex flex-row bg-gray-600 p-2 justify-between">
      <div className="flex flex-row">
        <img src={ChatIcon} className="w-8 m-2" />
        <h1 className="font-bold self-center">Parler</h1>
      </div>
      <img src={SingoutIcon} className="w-8 m-2" onClick={logout}/>
    </header>
  );
}
