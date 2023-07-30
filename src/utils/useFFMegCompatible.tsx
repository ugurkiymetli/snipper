/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
import { createFFmpeg, type FFmpeg } from "@ffmpeg/ffmpeg";
import { useEffect, useState } from "react";
import { FFmpeg_URL } from "./utils";

export default function useFFMegCompatible() {
  const [isCompatible, setIsCompatible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const ffmpeg: FFmpeg = createFFmpeg({
      corePath: FFmpeg_URL,
    });
    const load = async () => {
      try {
        setIsLoading(true);
        await ffmpeg.load().then(() => setIsCompatible(true));
        setIsLoading(false);
      } catch (error) {
        setIsCompatible(false);
        setIsLoading(false);
      }
    };
    load();
  }, []);
  return { isCompatible, isLoading };
}
