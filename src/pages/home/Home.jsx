import React from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"

export default function Home(props) {
  return (
    <>
      <Topbar onClickTopbarImg={props.onClickTopbarImg} currentPerson={props.currentPerson} />
      <div className="homeContainer">
        <Sidebar allUsers={props.allUsers} currentId={props.currentPerson.userId} />
        <Feed 
          onClickShare={props.onClickShare} 
          posts={props.currentPerson.posts} 
          onClickDelBut={props.onClickDelBut}
          onClickLike={props.onClickLike}
          profile={false}
        />
        <Rightbar
          onClickInputButton={props.onClickInputButton} 
          currentPerson={props.currentPerson}
          profile={false}
        />
      </div>
    </>
  );
}
