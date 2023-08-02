/* eslint-disable @typescript-eslint/no-misused-promises */
import * as React from "react";
import SnipSvg from "../icons/SnipSvg";

export interface SnipButtonProps {
  handleSnip: () => Promise<void>;
  isFFmpegWorking: boolean;
}

export default function SnipButton({
  handleSnip,
  isFFmpegWorking,
}: SnipButtonProps) {
  return (
    <button
      onClick={async () => handleSnip()}
      className="mt-4 inline-flex items-center rounded bg-black/60 px-4 py-2 font-bold text-white-800 hover:bg-gray-400"
      disabled={isFFmpegWorking}
      style={{ cursor: isFFmpegWorking ? "wait" : "default" }}
    >
      <SnipSvg />
      <span className="font-bold">Snip</span>
    </button>
  );
}
