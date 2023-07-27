"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Dropzone, { type FileRejection } from "react-dropzone";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import VideoPlayer from "./VideoPlayer";
import { formatBytes } from "~/utils/utils";
import { VideoSnip } from "./VideoSnip";

const VideoUpload: React.FC = () => {
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
  });

  useEffect(() => {
    void (async function () {
      await ffmpeg.load().then(() => setFFmpegLoaded(true));
    })();
  }, []);

  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleVideoUpload = (file: File) => {
    // Implement the logic to handle the uploaded video file
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      const minimumDuration = 15000; // 15 seconds in milliseconds
      if (video.duration * 1000 < minimumDuration) {
        alert("Video duration must be at least 15 seconds.");
      } else {
        alert(
          `Upload success! Name: ${file.name} -  Size ${formatBytes(file.size)}`
        );
        setVideoFile(file);
      }
    };
  };
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        setError("Invalid file format. Please upload a valid video file.");
      } else if (acceptedFiles.length > 0 && acceptedFiles[0]) {
        setError(null);
        handleVideoUpload(acceptedFiles[0]);
      }
    },
    [handleVideoUpload]
  );
  return (
    <div>
      {videoFile ? (
        <>
          <VideoPlayer src={videoFile} />
          <VideoSnip ffmpeg={ffmpeg} videoFile={videoFile} />
        </>
      ) : (
        <>
          {/* TODO add a nicer loading animation */}
          {ffmpegLoaded ? (
            <>
              <Dropzone
                onDrop={onDrop}
                accept={{ "video/*": [".mp4", ".mov"] }}
                multiple={false}
                maxFiles={1}
                disabled={!ffmpegLoaded}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <h3 className="mb-2 text-2xl font-bold">
                      <span className="mr-2 inline-block align-middle ">
                        Upload Video
                      </span>
                      <span className="inline-block align-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>
                      </span>
                    </h3>
                    <input {...getInputProps()} />
                    <p>
                      To split a video into 15-second segments, simply{" "}
                      <strong>drag and drop</strong> a video file into this
                      area, or <strong>click</strong> to select a video from
                      your device.
                    </p>
                  </div>
                )}
              </Dropzone>
            </>
          ) : (
            <h3 className="text-center text-2xl font-bold">Loading...</h3>
          )}
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VideoUpload;
