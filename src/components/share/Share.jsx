import "./share.css";
import React, {useState} from 'react';
import {PermMedia,Room} from "@material-ui/icons"

export default function Share(props) {

  const[photoFlag, onClickPhotoFlag] = useState(false);
  const[sharePhotoLink, changeSharePhotoLink] = useState('');
  const[photoButton, onClickPhotoButton] = useState(false);
  const[shareText, changeShareText] = useState('');
  const[locationFlag, onClickLocationFlag] = useState(false);
  const[locationText, changeLocationText] = useState('');
  const[locationButtonOk, onClickLocationButtonOk] = useState(false);

  const NewOnClickShare = () => {
    props.onClickShare(shareText, sharePhotoLink, locationText);
    changeShareText('');
    changeSharePhotoLink('');
    changeLocationText('');
    onClickPhotoFlag(false);
    onClickLocationFlag(false);
    onClickPhotoButton(false);
    onClickLocationButtonOk(false);
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img 
            className="shareProfileImg" 
            src="https://sun9-62.userapi.com/s/v1/if2/32TFFh8jr3uwVTpJsyzN2uMFTsUQyZhFx5Uhif46J3lva0tqWXpbyDkarGnuJE-XpEhGzhL5lxkBjYwYKckPU3wj.jpg?size=810x1080&quality=96&type=album" 
            alt="" 
          />
          <input
            placeholder="What's in your mind Kostya?"
            className="shareInput"
            value={shareText} 
            onChange={e => changeShareText(e.currentTarget.value)} 
          />
        </div>
        <hr className="shareHr"/>
        {photoFlag && !photoButton && 
        <>
          <input 
            value={sharePhotoLink} 
            onChange={e => changeSharePhotoLink(e.currentTarget.value)} 
            placeholder="Введите ссылку картинки..." 
            className="sharePhotoLink" 
          />
          <span>
            <button onClick={() => onClickPhotoButton(true)}  className="shareButton shareButtonOk">Ok</button>
          </span>
        </>
        }
        {photoButton &&
          <img className="shareNewImg" src={sharePhotoLink} alt="" />
        }
        {locationFlag && !locationButtonOk &&
          <>
            <input
              placeholder="Your location..."
              className="shareLocation"
              value={locationText} 
              onChange={e => changeLocationText(e.currentTarget.value)} 
            />
            <span>
              <button onClick={() => onClickLocationButtonOk(true)}  className="shareButton shareButtonOk">Ok</button>
            </span>
          </>
        }
        {locationButtonOk && 
          <div className="shareOption">
            <Room htmlColor="green" className="shareIcon"/>
            <span className="shareOptionText">{locationText}</span>
          </div>
        }
        <div className="shareBottom">
            <div className="shareOptions newShareOptions">
                <div onClick={() => onClickPhotoFlag(true)} className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                </div>
                <div onClick={() => onClickLocationFlag(true)} className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
            </div>
            <button onClick={NewOnClickShare}  className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}
