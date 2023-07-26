/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Dropzone, { type FileRejection } from "react-dropzone";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import VideoPlayer from "./VideoPlayer";
import { formatBytes } from "~/utils/utils";

const ffmpeg = createFFmpeg({ log: true });

const VideoUpload: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  useEffect(() => {
    // loading ffmpeg on startup
    async () => {
      try {
        await ffmpeg.load().then(() => {
          console.log("FFmpeg loaded!");
        });
      } catch (err) {
        setError(`FFmpeg load failed! ${err as string}`);
      }
    };
  }, []);

  const handleVideoUpload = (file: File) => {
    // Implement the logic to handle the uploaded video file
    alert(
      `Upload success! Name: ${file.name} - Size ${formatBytes(file.size)}`
    );
    setVideoFile(file);
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

  console.log({ ffmpeg });

  return (
    <div>
      {videoFile ? (
        <>
          <VideoPlayer src={URL.createObjectURL(videoFile)} />
        </>
      ) : (
        <>
          <h3 className="text-2xl font-bold">Upload Video</h3>
          <Dropzone
            onDrop={onDrop}
            accept={{ "video/*": [".mp4", ".mov"] }}
            multiple={false}
            maxFiles={1}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                  Drag and drop a video file here, or <strong>click</strong> to
                  select a video.
                </p>
              </div>
            )}
          </Dropzone>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VideoUpload;
