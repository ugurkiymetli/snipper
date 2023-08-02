import * as React from "react";
import DownloadSvg from "../icons/DownloadSvg";
import VideoPlayer from "../VideoPlayer";

export interface SnippedVideosProps {
  snippedSegments: File[];
}

export default function SnippedVideos({ snippedSegments }: SnippedVideosProps) {
  return (
    <div>
      <h2 className="mt-4 font-bold">
        Snipped {snippedSegments.length} videos{" "}
      </h2>
      {/* TODO add nicer download links */}
      {snippedSegments.map((segment, index) => (
        <React.Fragment key={index}>
          <div className="m-2">
            <VideoPlayer src={segment} />
            <button>
              <a
                href={URL.createObjectURL(segment)}
                download={`segment-${index + 1}.mp4`}
              >
                <DownloadSvg />
              </a>
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
