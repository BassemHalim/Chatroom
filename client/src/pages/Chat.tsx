import React, { useState, useRef, useEffect } from "react";
import Message from "../components/Message";
// import { useAuth } from "../components/AuthProvider";
import { IdTokenResult } from "firebase/auth";

const Chat = () => {
  const [formValue, setFromValue] = useState("");
  const [messages, setMessages] = useState<{ text: string; id: string }[]>([]);
  const [msgNum, setMsgNum] = useState(0)
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
      const sent = { text: formValue, id: msgNum % 2 === 0 ? "sent" : "received" };
      const newMessages = [...messages, sent];
      setMessages(newMessages);
      setMsgNum(msgNum + 1)
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
    <div className="flex flex-col">
      <div className="flex flex-col w-1/2 self-center place-self-center m-4">
        {messages &&
          messages.map((msg, index) => (
            <Message text={msg.text} key={index} msgType={msg.id} />
          ))}
      </div>
      <form onSubmit={sendMessage} className="flex flex-row place-content-center">
        <input
          placeholder=""
          className="flex rounded-3xl m-2 p-3 w-2/5 focus:outline-none"
          value={formValue}
          onChange={(e) => setFromValue(e.target.value)}
        />
        <button className="flex rounded-3xl bg-gray-700 p-3 m-2" type="submit">
          send
        </button>
      </form>
      <div ref={scollToRef}></div>
    </div>
  );
};

export default Chat;
