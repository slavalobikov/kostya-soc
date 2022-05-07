import React from 'react';
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import StoreContext from "../../StoreContext";

export default function Feed(props) {

  return (
    <StoreContext.Consumer>
    {
      (SF) => (
      <div className="feed">
        <div className="feedWrapper">
          {props.profile && <Share onClickShare={SF.onClickShare}/>}
          {SF.currentPerson.posts ? SF.currentPerson.posts.map((p, index) => (
            <Post 
              index={index} 
              key={p.id} 
              post={p} 
              onClickDelBut={SF.onClickDelBut}
              onClickLike={SF.onClickLike} 
            />
          )) : null}
        </div>
      </div>
      )
    }
    </StoreContext.Consumer>
  );
}
