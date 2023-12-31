import React, { useState, useRef, useEffect } from "react";
import Message from "../components/Message";
import sendIcon from "../assets/send_icon.svg";
import { useAuth } from "../components/AuthProvider";
import { MessageProps } from "../components/Message";
import useWebSocket from "react-use-websocket";

const Chat = () => {
  const [formValue, setFromValue] = useState("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const { token } = useAuth();
  const [initialized, setInitialized] = useState(false);
  const scollToRef = useRef<null | HTMLDivElement>(null);
  const { lastMessage } = useWebSocket("ws://"+ window.location.host + "/api/v1/ws", {protocols: token? token : ""});

  const postMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formValue) {
      //send to backend

      var headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        content: formValue,
      });

      var requestOptions: RequestInit = {
        method: "POST",
        headers: headers,
        body: raw,
        redirect: "follow",
      };
      fetch("/api/v1/chat", requestOptions).catch((error) =>
        console.log("error", error)
      );
      setFromValue("");
    }
  };

  const getMessages = async () => {
    var header = new Headers();
    header.append("Authorization", "Bearer " + token);

    var requestOptions: RequestInit = {
      method: "GET",
      headers: header,
    };
    fetch("/api/v1/chat", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        var receivedMessages: MessageProps[] = res.data.map((msg: any) => {
          const { id, content, votes, username } = msg;
          return { id, content, votes, username };
        });
        var newMessages = [...messages];
        newMessages = newMessages.concat(receivedMessages);
        setMessages(newMessages);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (scollToRef.current) {
      scollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (!initialized) {
      getMessages();
      setInitialized(true);
    }
    if (lastMessage !== null) {
      const newMessage: MessageProps = JSON.parse(lastMessage.data);
      setMessages(messages.concat(newMessage));
    }
  }, [setMessages, lastMessage]);

  return (
    <div className="flex flex-col flex-grow justify-between">
      <div className="flex flex-col w-1/2 self-center place-self-center m-4 mb-auto">
        {messages &&
          messages.map((msg, index) => <Message {...msg} key={index} />)}
      </div>
      <form
        onSubmit={postMessage}
        className="flex flex-row place-content-center mb-4"
      >
        <div className="flex flex-row rounded-3xl bg-gray-600 p-3">
          <input
            placeholder=""
            className="focus:outline-none bg-inherit"
            value={formValue}
            onChange={(e) => setFromValue(e.target.value)}
          />
          <button type="submit">
            <img src={sendIcon} className="w-8" />
          </button>
        </div>
      </form>
      <div ref={scollToRef}></div>
    </div>
  );
};

export default Chat;
