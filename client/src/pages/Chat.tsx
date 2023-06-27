import React, { useState, useRef, useEffect } from "react";
import Message from "../components/Message";
import { IdTokenResult } from "firebase/auth";
import sendIcon from "../assets/send_icon.svg";
import Header from "../components/Header";

const Chat = () => {
  const [formValue, setFromValue] = useState("");
  const [messages, setMessages] = useState<{ text: string; id: string }[]>([]);
  const [msgNum, setMsgNum] = useState(0);
  // const context = useAuth();
  const [idtoken, setidToken] = useState<IdTokenResult>();
  useEffect(() => {
    // context?.currentUser?.getIdTokenResult(true).then((idToken) => {
    //   setidToken(idToken);
    // });
  }, []);
  const scollToRef = useRef<null | HTMLDivElement>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formValue) {
      const sent = {
        text: formValue,
        id: msgNum % 2 === 0 ? "sent" : "received",
      };
      const newMessages = [...messages, sent];
      setMessages(newMessages);
      setMsgNum(msgNum + 1);
      //send to backend
      setFromValue("");
    }
  };

  useEffect(() => {
    if (scollToRef.current) {
      scollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="flex flex-col min-h-screen h-full justify-between">
      <Header />
      <div className="flex flex-col w-1/2 self-center place-self-center m-4 mb-auto">
        {messages &&
          messages.map((msg, index) => (
            <Message text={msg.text} key={index} msgType={msg.id} />
          ))}
      </div>
      <form
        onSubmit={sendMessage}
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
    </div>
    /* <div ref={scollToRef}></div> */
  );
};

export default Chat;
