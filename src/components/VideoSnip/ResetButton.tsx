/* eslint-disable @typescript-eslint/no-misused-promises */
import * as React from "react";
import DeleteSvg from "../icons/DeleteSvg";

export interface ResetButtonProps {
  handleReset: () => void; //Promise<void>;
  isFFmpegWorking: boolean;
}

export default function ResetButton({
  handleReset,
  isFFmpegWorking,
}: ResetButtonProps) {
  return (
    <button
      onClick={() => handleReset()}
      className="text-white-800 mt-4 inline-flex items-center rounded bg-[#b91c1c] px-4 py-2 font-bold hover:bg-gray-400"
      disabled={isFFmpegWorking}
      style={{ cursor: isFFmpegWorking ? "wait" : "default" }}
    >
      <DeleteSvg />
      <span className="font-bold">Reset</span>
    </button>
  );
}
