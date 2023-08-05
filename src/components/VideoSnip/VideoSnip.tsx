/* eslint-disable @typescript-eslint/no-misused-promises */
import { fetchFile, type FFmpeg } from "@ffmpeg/ffmpeg";
import React, { useState } from "react";
import SnipButton from "./SnipButton";
import SnippedVideos from "./SnippedVideos";
import ResetButton from "./ResetButton";
import LengthToggle from "./LengthToggle";
import { timeFormatter } from "~/utils/utils";

const videoCodec = "libx264";
const soundCodec = "aac";
interface VideoSnipProps {
  ffmpeg: FFmpeg;
  videoFile: File;
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
  length: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
  videoDuration: number;
}
export const VideoSnip: React.FC<VideoSnipProps> = ({
  ffmpeg,
  videoFile,
  setVideoFile,
  length,
  setLength,
  videoDuration,
}) => {
  const [snippedSegments, setSnippedSegments] = useState<File[]>([]);
  const [isFFmpegWorking, setIsFFmpegWorking] = useState(false);

  const snipVideo = async (videoFile: File) => {
    if (length > videoDuration) return [];

    setIsFFmpegWorking(true);

    const name = videoFile.name;
    const outputName = name.replace(/\.[^/.]+$/, "");
    const videoData = await fetchFile(videoFile);
    ffmpeg.FS("writeFile", name, videoData);

    // Calculate the number of parts needed based on videoDuration and length
    const numParts = Math.ceil(videoDuration / length);

    // Prepare an array to store the segment file names
    const segmentFileNames = [];

    //TODO run ffmpeg parallel

    // Loop to create each segment using FFmpeg commands
    for (let i = 0; i < numParts; i++) {
      const startTime = i * length;
      const endTime = Math.min(startTime + length, videoDuration);
      const segmentFileName = `${outputName}-part${i + 1}.mp4`;
      const start = timeFormatter(startTime);
      const end = timeFormatter(endTime);

      // FFmpeg command to create the segment
      await ffmpeg.run(
        "-i",
        name,
        "-ss",
        start, // Convert start time to HH:MM:SS format
        "-to",
        end, // Convert end time to HH:MM:SS format
        "-c:v",
        videoCodec,
        "-c:a",
        soundCodec, // Use AAC audio codec
        "-strict",
        "experimental", // Required to use some codecs
        segmentFileName
      );
      segmentFileNames.push(segmentFileName);
    }

    // Fetch the split video segments and create File objects
    const segments: File[] = [];
    for (const fileName of segmentFileNames) {
      try {
        const data = ffmpeg.FS("readFile", fileName);
        const segmentBlob = new Blob([data.buffer], { type: "video/mp4" });
        const segmentFile = new File([segmentBlob], fileName, {
          type: "video/mp4",
        });
        segments.push(segmentFile);
      } catch (error) {
        console.log("Error reading segment file: ", fileName, error);
      }
    }

    // Cleanup temporary files
    ffmpeg.FS("unlink", name);
    segmentFileNames.forEach((fileName) => ffmpeg.FS("unlink", fileName));

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
      {isFFmpegWorking ? (
        <div className="mt-2 text-center">
          <h2>This might take a while. Snipping ...</h2>
        </div>
      ) : null}
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
        <div>
          <LengthToggle
            length={length}
            setLength={setLength}
            isFFmpegWorking={isFFmpegWorking}
            videoDuration={videoDuration}
          />
        </div>
      </div>
      {isFFmpegWorking && (
        <>
          <div
            role="status"
            className="my-4 flex h-56 max-w-sm animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-10 w-10 text-gray-200 dark:text-gray-600"
            >
              <path
                stroke-linecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </>
      )}
      {snippedSegments.length > 0 && (
        <SnippedVideos snippedSegments={snippedSegments} />
      )}
    </>
  );
};
