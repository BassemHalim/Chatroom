import React from "react";
import ChatIcon from "../assets/chat_icon.svg";
import { useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { Navigate, redirect, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [mismatch, setMismatch] = useState<boolean>(false);
  const authcontext = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailValid(true);
  };
  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUsername(e.target.value);
  };
  const handlePassword1Change = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword1(e.target.value);
    setPasswordValid(true);
  };
  const handlePassword2Change = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword2(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    setMismatch(false);
    if (email.trim() === "" || !emailRegex.test(email)) {
      setEmailValid(false);
    } else if (password1 !== password2) {
      setMismatch(true);
    } else if (password1.trim() === "") {
      setPasswordValid(false);
    } else {
      // Form submission logic when both email and password are valid
      authcontext.signup(username, email, password1);
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
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="username"
            placeholder="Enter a Username"
            value={username}
            onChange={handleUsernameChange}
          />
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
            value={password1}
            onChange={handlePassword1Change}
          />
          {!passwordValid && (
            <p className="text-red-500 text-xs italic">
              Please enter a valid password
            </p>
          )}
          <label
            className="block text-gray-700 text-sm font-bold m-2 self-start"
            htmlFor="password"
          >
            Re-Enter Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password2}
            onChange={handlePassword2Change}
          />
          {mismatch && (
            <p className="text-red-500 text-xs italic">Passwords don't match</p>
          )}
          <button
            className="p-2 px-4 m-2 bg-blue-500 text-white font-semibold rounded-3xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
