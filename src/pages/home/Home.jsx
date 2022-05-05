import React from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"

export default function Home(props) {
  return (
    <>
      <Topbar onClickTopbarImg={props.onClickTopbarImg}/>
      <div className="homeContainer">
        <Sidebar />
        <Feed posts={props.posts}/>
        <Rightbar/>
      </div>
    </>
  );
}
