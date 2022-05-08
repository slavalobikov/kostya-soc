import "./post.css";
import { MoreVert, SdCard } from "@material-ui/icons";
import { Users } from "../../dummyData";
import {Room} from "@material-ui/icons"
import React, { useState } from "react";
import StoreContext from '../../StoreContext';
import moment from 'moment';
import {NavLink} from 'react-router-dom';

export default function Post(props) {

  const [like,setLike] = useState(props.post.like)
  const [isLiked,setIsLiked] = useState(false)
  const[postTopFlag, changePostTopFlag] = useState(false);

  const likeHandler = (x) => {
    setLike(isLiked ? like-1 : like+1);
    setIsLiked(!isLiked);
    isLiked ? --x : ++x;
    return x; 
  }

  const onClickLikeNew = (e) => {
    const x = likeHandler(like);
    props.onClickLike(e, x);
  }

  const newOnClickDelBut = (e) => {
    props.onClickDelBut(e);
    changePostTopFlag(false);
  }

  return (
    <StoreContext.Consumer>
    {
      (SF) => (
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <NavLink className="usersLinks" to="/user">
                <img
                  onClick={() => SF.onClickUser(props.post.id)}
                  className="postProfileImg"
                  src={SF.allUsers[props.post.id] ? SF.allUsers[props.post.id].icon ? SF.allUsers[props.post.id].icon : '' : ''}
                  alt=""
                />
              </NavLink>
              <span className="postUsername">
              </span>
              <span className="postDate">{moment(props.post.date).fromNow()}</span>
            </div>
            {!props.timeline && !props.user && 
            <div className="postTopRight">
              {postTopFlag && 
                <button 
                onClick={(e) => newOnClickDelBut(e)} 
                className="delButtonPost"
                index={props.index}>
                  Delete
                </button>
              }
              <MoreVert 
                className="MoreVert" 
                onClick={() => changePostTopFlag(!postTopFlag)}
              />
            </div>
            }
          </div>
          <div className="postCenter">
            <span className="postText">{props.post?.desc}</span>
            <img className="postImg" src={props.post.photo} alt="" />
          </div>
          {props.post.location && 
            <div className="locationIcon">
              <Room htmlColor="green" className="shareIcon"/>
              <span className="shareOptionText">{props.post.location}</span>
            </div>
          }
          <div className="postBottom">
            <div className="postBottomLeft">
              <img 
                index={props.index} 
                className="likeIcon" 
                src="assets/like.png" 
                onClick={(e) => onClickLikeNew(e)} 
                alt="" 
              />
              <img 
                index={props.index} 
                className="likeIcon" 
                src="assets/heart.png" 
                onClick={(e) => onClickLikeNew(e)} 
                alt="" 
              />
              <span 
                  className="postLikeCounter">
                  {like} people like it
              </span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">{props.post.comment} comments</span>
            </div>
          </div>
        </div>
      </div>
      )
    }
    </StoreContext.Consumer>
  );
}
