/* eslint-disable react-hooks/exhaustive-deps */
import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";
import Dropzone, { type FileRejection } from "react-dropzone";
import { createVideo, formatBytes, timeFormatter } from "~/utils/utils";
import UploadSvg from "./icons/UploadSvg";

export interface VideoDropzoneProps {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  ffmpegLoaded: boolean;
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
  length: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
  setVideoDuration: React.Dispatch<React.SetStateAction<number>>;
}

export function VideoDropzone({
  setError,
  setVideoFile,
  ffmpegLoaded,
  length,
  setVideoDuration,
}: VideoDropzoneProps) {
  const minimumDuration = length * 1000; // 15 seconds in milliseconds
  const handleVideoUpload = (file: File) => {
    const video = createVideo(file);
    video.onloadedmetadata = () => {
      const { duration } = video;

      if (duration * 1000 < minimumDuration) {
        enqueueSnackbar("Video duration must be longer than 15 seconds!", {
          variant: "error",
        });
      } else {
        const msg = `Upload success! ${file.name} - ${formatBytes(
          file.size
        )} - ${timeFormatter(duration)} `;
        enqueueSnackbar(msg, { variant: "success" });
        setVideoFile(file);
        setVideoDuration(duration);
      }
    };
  };
  const onDrop = useCallback(
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
