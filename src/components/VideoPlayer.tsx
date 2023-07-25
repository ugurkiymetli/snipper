/* eslint-disable @typescript-eslint/ban-types */
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
  src: string | undefined;
  onPlayerChange?: () => {};
  onChange?: () => {};
  startTime?: number | undefined;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  startTime = undefined,
}) => {
  return (
    <div className={"video-player"}>
      <Player
        // ref={(player) => {
        //   setPlayer(player);
        // }}
        startTime={startTime}
      >
        <source src={src} />
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
