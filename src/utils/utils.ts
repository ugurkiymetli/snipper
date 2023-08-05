export function formatBytes(a: number, b = 2) {
  if (!+a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
    ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][d]
  }`;
}

export const FFmpeg_URL =
  "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js";

export enum Lengths {
  Length15 = 15,
  Length30 = 30,
}

export function createVideo(file: File): HTMLVideoElement {
  const video = document.createElement("video");
  video.src = URL.createObjectURL(file);
  video.setAttribute("id", "snipper-video");
  return video;
}

export function timeFormatter(seconds: number): string {
  if (seconds < 0) return "";

  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const remainingSecondsAfterMinutes = remainingSeconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(
    Math.floor(remainingSecondsAfterMinutes)
  ).padStart(2, "0");

  if (hours > 0) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else if (minutes > 0) {
    return `00:${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `00:00:${formattedSeconds}`;
  }
}
