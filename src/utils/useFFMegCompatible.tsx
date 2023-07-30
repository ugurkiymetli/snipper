/* eslint-disable react-hooks/exhaustive-deps */
import { createFFmpeg, type FFmpeg } from "@ffmpeg/ffmpeg";
import { useEffect, useState } from "react";
import { FFmpeg_URL } from "./utils";

export default function useFFMegCompatible() {
  const [isCompatible, setIsCompatible] = useState(false);

  const ffmpeg: FFmpeg = createFFmpeg({
    log: true,
    corePath: FFmpeg_URL,
  });

  useEffect(() => {
    void (async function () {
      try {
        await ffmpeg.load().then(() => setIsCompatible(true));
      } catch (error) {
        setIsCompatible(false);
      }
    })();
  }, []);
  return { isCompatible };
}
