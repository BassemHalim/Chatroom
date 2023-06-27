import React, { useState } from "react";
import upvoteIcon from "../assets/upvote_icon.svg";
import downVoteIcon from "../assets/downvote_icon.svg";
export default function Vote() {
    // @TODO implement single vote/user 
  const [vote, setVote] = useState(0);
  const upvote = () => {
    setVote(vote + 1);
  };
  const downvote = () => {
    setVote(vote - 1);
  };
  return (
    <div className="flex flex-row">
      <button onClick={downvote}>
        <img src={downVoteIcon} className="" />
      </button>
      <div>{vote}</div>
      <button onClick={upvote}>
        <img src={upvoteIcon} className="" />
      </button>
    </div>
  );
}
