/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { createFFmpeg, type FFmpeg } from "@ffmpeg/ffmpeg";
import VideoPlayer from "./VideoPlayer";
import { FFmpeg_URL, Lengths, timeFormatter } from "~/utils/utils";
import { VideoSnip } from "./VideoSnip/VideoSnip";
import { VideoDropzone } from "./VideoDropzone";

const ffmpeg: FFmpeg = createFFmpeg({
  corePath: FFmpeg_URL,
});
const VideoUpload: React.FC = () => {
  useEffect(() => {
    void (async function () {
      await ffmpeg.load().then(() => setFFmpegLoaded(true));
    })();
  }, []);

  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [length, setLength] = useState<Lengths>(Lengths.Length15);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    if (videoFile) {
      if (
        videoDuration > Lengths.Length15 &&
        videoDuration < Lengths.Length30
      ) {
        setLength(Lengths.Length15);
      }
    }
  }, [videoFile, length]);

  if (error != null) {
    return (
      <>
        <p style={{ color: "red" }}>{error} 😔</p>
      </>
    );
  }

  return (
    <div>
      {videoFile ? (
        <>
          {videoDuration && <h3>Duration: {timeFormatter(videoDuration)} </h3>}
          <VideoPlayer src={videoFile} />
          <VideoSnip
            ffmpeg={ffmpeg}
            videoFile={videoFile}
            setVideoFile={setVideoFile}
            length={length}
            setLength={setLength}
            videoDuration={videoDuration}
          />
        </>
      ) : (
        <>
          {/* TODO add a nicer loading animation */}
          {ffmpegLoaded ? (
            <>
              <VideoDropzone
                setError={setError}
                setVideoFile={setVideoFile}
                ffmpegLoaded={ffmpegLoaded}
                length={length}
                setLength={setLength}
                setVideoDuration={setVideoDuration}
              />
            </>
          ) : (
            <h3 className="text-center text-2xl font-bold">Loading...</h3>
          )}
        </>
      )}
    </div>
  );
};

export default VideoUpload;
