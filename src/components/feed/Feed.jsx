import React from 'react';
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";

export default function Feed(props) {

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share onClickShare={props.onClickShare}/>
        {props.posts ? props.posts.map((p, index) => (
          <Post 
            index={index} 
            key={p.id} 
            post={p} 
            onClickDelBut={props.onClickDelBut}
            onClickLike={props.onClickLike} 
          />
        )) : null}
      </div>
    </div>
  );
}
