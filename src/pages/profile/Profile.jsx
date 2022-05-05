import React from 'react';
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile(props) {

  return (
    <>
      <Topbar onClickTopbarImg={props.onClickTopbarImg} />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="https://get.wallhere.com/photo/sky-nature-wilderness-cloud-dawn-mountain-morning-highland-reflection-national-park-afterglow-tree-atmosphere-horizon-mount-scenery-evening-leaf-red-sky-at-morning-sunlight-landscape-sunrise-sunset-hill-dusk-meadow-lake-meteorological-phenomenon-mountain-range-forest-computer-wallpaper-grass-autumn-896926.jpg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="https://sun9-62.userapi.com/s/v1/if2/32TFFh8jr3uwVTpJsyzN2uMFTsUQyZhFx5Uhif46J3lva0tqWXpbyDkarGnuJE-XpEhGzhL5lxkBjYwYKckPU3wj.jpg?size=810x1080&quality=96&type=album"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">Kostya Krot</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed 
              onClickShare={props.onClickShare} 
              posts={props.posts}
              onClickDelBut={props.onClickDelBut}
              onClickLike={props.onClickLike}
            />
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}
