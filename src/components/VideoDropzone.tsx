/* eslint-disable react-hooks/exhaustive-deps */
import { enqueueSnackbar } from "notistack";
import * as React from "react";
import { useState } from "react";
import Dropzone, { type FileRejection } from "react-dropzone";
import { formatBytes } from "~/utils/utils";
import UploadSvg from "./icons/UploadSvg";

export interface VideoDropzoneProps {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  ffmpegLoaded: boolean;
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export function VideoDropzone({
  setError,
  setVideoFile,
  ffmpegLoaded,
}: VideoDropzoneProps) {
  const handleVideoUpload = (file: File) => {
    // Implement the logic to handle the uploaded video file
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      const minimumDuration = 15000; // 15 seconds in milliseconds
      if (video.duration * 1000 < minimumDuration) {
        enqueueSnackbar("Video duration must be at least 15 seconds!", {
          variant: "error",
        });
      } else {
        enqueueSnackbar(
          `Upload success! Name: ${file.name}} -  Size ${formatBytes(
            file.size
          )}`,
          {
            variant: "success",
          }
        );
        setVideoFile(file);
      }
    };
  };
  const onDrop = React.useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setError("Invalid file format. Please upload a valid video file.");
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
              <UploadSvg />
            </span>
          </h3>
          <input {...getInputProps()} />
          <p>
            To split a video into 15-second segments, simply{" "}
            <strong>drag and drop</strong> a video file into this area, or{" "}
            <strong>click</strong> to select a video from your device.
          </p>
        </div>
      )}
    </Dropzone>
  );
}
function setVideoFile(file: File) {
  throw new Error("Function not implemented.");
}
