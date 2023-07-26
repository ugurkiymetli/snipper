import React from "react";
import VideoUpload from "./VideoUpload";

const Snipper = () => {
  return (
    <div>
      <span className=" mx-auto flex max-w-sm cursor-pointer flex-col rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
        <VideoUpload />
      </span>
    </div>
  );
};

export default Snipper;
