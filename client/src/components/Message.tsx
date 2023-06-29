import { useAuth } from "./AuthProvider";
import Vote from "./Vote";

export interface MessageProps {
  id: number;
  content: string;
  votes: number;
  username: string;
}

const Message = (props: MessageProps) => {
  const { username } = useAuth();
  console.log(username)
  const text = props.content;
  const ownMsg = props.username === username;
  const msgProps = !ownMsg ? "bg-amber-400" : "bg-green-400 self-end";
  return (
    <div
      className={`${msgProps} w-fit max-w-md min-w-fit w-44 rounded-2xl p-2 m-1 flex flex-row `}
    >
      {!ownMsg && <Vote votes={props.votes} msgID={props.id} />}
      <div>
        <div className="font-bold "> {props.username} </div>
        <p className="max-w-sm break-words font-medium">{text} </p>
      </div>
      {ownMsg && <Vote votes={props.votes} msgID={props.id} />}
    </div>
  );
};

export default Message;
