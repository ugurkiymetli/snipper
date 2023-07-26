/* eslint-disable @typescript-eslint/no-misused-promises */
import { fetchFile, type FFmpeg } from "@ffmpeg/ffmpeg";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

interface VideoSnipProps {
  ffmpeg: FFmpeg;
  videoFile: File;
}

export const VideoSnip: React.FC<VideoSnipProps> = ({ ffmpeg, videoFile }) => {
  const [snippedSegments, setSnippedSegments] = useState<File[]>([]);

  const snipVideo = async (videoFile: File) => {
    const name = videoFile.name;
    const outputName = name.replace(/\.[^/.]+$/, "");

    const videoData = await fetchFile(videoFile);
    console.log({ videoData });
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
        // File does not exist, break the loop
        break;
      }
    }
    // Cleanup temporary files
    ffmpeg.FS("unlink", name);
    return segments;
  };
  const handleSnip = async () => {
    // ... your snipping logic here ...

    // After snipping, update the snippedSegments state with the resulting segments
    const segments: File[] = await snipVideo(videoFile);
    setSnippedSegments(segments);
  };

  return (
    <>
      <button
        onClick={async () => handleSnip()}
        className="mt-4 inline-flex items-center rounded bg-white/20 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
        disabled={!ffmpeg.isLoaded}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="mr-2 h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"
          />
        </svg>
        <span className="font-bold">Snip</span>
      </button>
      {snippedSegments.length > 0 && (
        <div>
          <h2 className="mt-4 font-bold">
            Snipped {snippedSegments.length} videos{" "}
          </h2>
          {/* TODO add nicer download links */}
          {snippedSegments.map((segment, index) => (
            <>
              <div key={index} className="m-2">
                <VideoPlayer src={segment} />
                <button>
                  <a
                    href={URL.createObjectURL(segment)}
                    download={`segment-${index + 1}.mp4`}
                  >
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
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      ></path>
                    </svg>
                  </a>
                </button>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};
