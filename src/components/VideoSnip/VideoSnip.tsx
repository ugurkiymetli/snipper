/* eslint-disable @typescript-eslint/no-misused-promises */
import { fetchFile, type FFmpeg } from "@ffmpeg/ffmpeg";
// import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import SnipButton from "./SnipButton";
import SnippedVideos from "./SnippedVideos";
import ResetButton from "./ResetButton";

interface VideoSnipProps {
  ffmpeg: FFmpeg;
  videoFile: File;
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
}
export const VideoSnip: React.FC<VideoSnipProps> = ({
  ffmpeg,
  videoFile,
  setVideoFile,
}) => {
  const [snippedSegments, setSnippedSegments] = useState<File[]>([]);
  const [isFFmpegWorking, setIsFFmpegWorking] = useState(false);

  const snipVideo = async (videoFile: File) => {
    setIsFFmpegWorking(true);
    const name = videoFile.name;
    const outputName = name.replace(/\.[^/.]+$/, "");

    const videoData = await fetchFile(videoFile);
    ffmpeg.FS("writeFile", name, videoData);

    const videoDuration = "15";
    // Load the video into ffmpeg
    await ffmpeg.run(
      "-i",
      name,
      "-map",
      "0", // Map all streams from the input
      "-f",
      "segment",
      "-segment_time",
      videoDuration,
      "-c:v",
      "copy", // Copy video codec without re-encoding
      "-c:a",
      "aac", // Use AAC audio codec
      "-strict",
      "experimental", // Required to use some codecs
      "-segment_format",
      "mp4", // Specify the format for the segments
      `${outputName}-%03d.mp4`
    );

    // Fetch the split video segments
    const segments: File[] = [];
    for (let i = 0; ; i++) {
      const fileName = `${outputName}-${i.toString().padStart(3, "0")}.mp4`;
      try {
        ffmpeg.FS("readFile", fileName);
        const data = ffmpeg.FS("readFile", fileName);
        const segmentBlob = new Blob([data.buffer], { type: "video/mp4" });
        const segmentFile = new File([segmentBlob], fileName, {
          type: "video/mp4",
        });
        segments.push(segmentFile);
      } catch (error) {
        // enqueueSnackbar("Snip error! ", { variant: "error" });
        console.log("Snip error! ", { variant: "error" });
        // File does not exist, break the loop
        break;
      }
    }
    // Cleanup temporary files
    ffmpeg.FS("unlink", name);
    setIsFFmpegWorking(false);

    return segments;
  };

  const handleSnip = async () => {
    const segments: File[] = await snipVideo(videoFile);
    if (segments.length > 1) setSnippedSegments(segments);
  };
  const handleReset = () => {
    setSnippedSegments([]);
    setVideoFile(null);
  };
  return (
    <>
      {isFFmpegWorking ? <h2>Working...</h2> : null}
      <div className="flex space-x-4">
        <div>
          <SnipButton
            handleSnip={handleSnip}
            isFFmpegWorking={isFFmpegWorking}
          />
        </div>
        <div>
          <ResetButton
            handleReset={handleReset}
            isFFmpegWorking={isFFmpegWorking}
          />
        </div>
      </div>
      {snippedSegments.length > 0 && (
        <SnippedVideos snippedSegments={snippedSegments} />
      )}
    </>
  );
};
