import Vote from "./Vote";

interface MessageProps {
  text: string;
  msgType: string;
}

const Message = (props: MessageProps) => {
  const text = props.text;
  const msgProps =
    props.msgType == "received" ? "bg-amber-400" : "bg-green-800 self-end";
  const msgType = props.msgType;
  return (

    <div
      className={`${msgProps} w-fit max-w-md rounded-3xl p-3 m-1 flex flex-row`}
    >{msgType == 'received' &&  <Vote />}
      <p className="max-w-sm break-words">{text} </p>
      {msgType == 'sent' &&  <Vote />}
    </div>
  );
};

export default Message;
