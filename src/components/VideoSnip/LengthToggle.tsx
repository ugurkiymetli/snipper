/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Lengths } from "~/utils/utils";

export interface LengthToggleProps {
  length: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
  isFFmpegWorking: boolean;
  videoDuration: number;
}

export default function LengthToggle({
  length,
  setLength,
  isFFmpegWorking,
  videoDuration,
}: LengthToggleProps) {
  const [checked, setChecked] = useState(false);

  function handleChange() {
    if (videoDuration > Lengths.Length15 && videoDuration < Lengths.Length30) {
      enqueueSnackbar("Video is not long enough!", { variant: "error" });
    } else setChecked(!checked);
  }

  useEffect(() => {
    checked ? setLength(30) : setLength(15);
  }, [checked, setLength]);

  return (
    <>
      <div className="mt-5 flex" title={`hele!`}>
        <label htmlFor="checkbox" className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </label>
        <label className="relative mr-5 inline-flex cursor-pointer items-center">
          <input
            id="checkbox"
            type="checkbox"
            className="peer sr-only"
            checked={checked}
            onChange={handleChange}
            disabled={isFFmpegWorking}
          />
          <div className="peer h-6 w-11 rounded-full bg-[#ff6b81]  after:absolute  after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#7bed9f] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300" />

          <span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">
            <span>{length.toString()}</span>
          </span>
        </label>
      </div>
    </>
  );
}
