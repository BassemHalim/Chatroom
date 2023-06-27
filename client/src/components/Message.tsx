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
      className={`${msgProps} w-fit max-w-sm rounded-3xl p-3 m-1 break-words flex flex-row`}
    >{msgType == 'received' &&  <Vote />}
      <div>{text} </div>
      {msgType == 'sent' &&  <Vote />}
    </div>
  );
};

export default Message;
