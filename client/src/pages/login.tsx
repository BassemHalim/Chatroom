import React from "react";
import ChatIcon from "../assets/chat_icon.svg";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const authcontext = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setEmailValid(true);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
    setPasswordValid(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (email.trim() === "" || !emailRegex.test(email)) {
      setEmailValid(false);
    } else if (password.trim() === "") {
      setPasswordValid(false);
    } else {
      // Form submission logic when both email and password are valid
      authcontext.login(email, password);
    }
  };
  if (authcontext.isAuthenticated) {
    return <Navigate to="/chat" />;
  }
  return (
    <div className="flex place-content-center mt-10">
      <form onSubmit={handleSubmit}>
        <div className="place-content-center bg-slate-300 flex flex-col rounded-3xl items-center w-80 p-2">
          <img src={ChatIcon} className="w-40 " />
          <label
            className="block text-gray-700 text-sm font-bold m-2 self-start"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          {!emailValid && (
            <p className="text-red-500 text-xs italic">
              Please enter a valid email address
            </p>
          )}
          <label
            className="block text-gray-700 text-sm font-bold m-2 self-start"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          {!passwordValid && (
            <p className="text-red-500 text-xs italic">
              Please enter a valid password
            </p>
          )}
          <button
            className="p-2 px-4 m-2 bg-blue-500 text-white font-semibold rounded-3xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;"
            type="submit"
          >
            Sign In
          </button>
          <div>
            Don't have and account?{" "}
            <Link to="/signup" className="font-medium">
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
