import React from "react";
import "./../App.css";

function VideoList(props) {
  const videoItems = props.videos.map(video => {
    return (
      <li
        className="list-group-item"
        onClick={() => props.onVideoSelect(video)}
        key={video.etag}
      >
        <div className="video-list media">
          <div className="media-left">
            <img
              className="media-object"
              src={video.snippet.thumbnails.default.url}
              alt=""
            />
          </div>
          <div className="media-body">
            <div className="media-heading">{video.snippet.title}</div>
          </div>
        </div>
      </li>
    );
  });
  return <ul className="col-md-4 list-group">{videoItems}</ul>;
}

export default VideoList;
