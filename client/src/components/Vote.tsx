import React, { useState } from "react";
import upvoteIcon from "../assets/upvote_icon.svg";
import downVoteIcon from "../assets/downvote_icon.svg";
import { useAuth } from "./AuthProvider";

interface VotePops {
  votes: number;
  msgID: number;
}

export default function Vote(props: VotePops) {
  // @TODO implement single vote/user
  const { token } = useAuth();
  const [vote, setVote] = useState(props.votes);

  const postVote = async (voteType: number) => {
    var header = new Headers();
    header.append("Authorization", "Bearer " + token);
    var body = JSON.stringify({
      MessageID: props.msgID,
      VoteType: voteType,
    });
    var requestOptions: RequestInit = {
      method: "POST",
      headers: header,
      body: body,
    };

    fetch("http://localhost:8080/api/chat/vote", requestOptions).catch(
      (error) => console.log(error)
    );
  };
  const upvote = () => {
    setVote(vote + 1);
    postVote(1);
  };
  const downvote = () => {
    setVote(vote - 1);
    postVote(-1);
  };
  
  return (
    <div className="flex flex-row mx-1.5">
      <button onClick={downvote}>
        <img src={downVoteIcon} className="w-5" />
      </button>
      <div className="self-center">{vote}</div>
      <button onClick={upvote}>
        <img src={upvoteIcon} className="w-5" />
      </button>
    </div>
  );
}
