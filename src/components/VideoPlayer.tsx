import {
  BigPlayButton,
  ControlBar,
  LoadingSpinner,
  Player,
  PlayToggle,
} from "video-react";
import "video-react/dist/video-react.css";
import React from "react";

interface VideoPlayerProps {
  src: File | undefined;
  startTime?: number | undefined;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  startTime = undefined,
}) => {
  return (
    <div className={"video-player"} >
      <label htmlFor="">{src?.name}</label>
      <Player startTime={startTime}>
        {src && <source src={URL.createObjectURL(src)} />}
        <BigPlayButton position="center" />
        <LoadingSpinner />
        <ControlBar autoHide={false} disableDefaultControls={true}>
          <PlayToggle />
        </ControlBar>
      </Player>
    </div>
  );
};

export default VideoPlayer;
