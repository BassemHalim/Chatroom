import React from "react";
import ChatIcon from '../assets/chat_icon.svg'

export default function Header() {
  return (
      <header className="flex flex-row bg-gray-600 p-2">
          <img src={ChatIcon} className="w-8 m-2" />
      <h1 className="font-bold self-center">Parler</h1>
    </header>
  );
}
