"use client";
import * as React from "react";
import VideoModel from "../../../../../models/Video";

interface CustomCarouselInfo {
  bloc: VideoModel | Record<string, unknown>;
  full: boolean;
  toggle: boolean;
}
function VideoVisualization({ bloc }: CustomCarouselInfo) {
  return bloc !== undefined ? (
    <div className="m-auto w-full max-w-[1000px]">
      <h2 className="text-gray-800 pt-8 pl-4 pr-4 text-4xl text-center mb-8">
        {String(bloc.title)}
      </h2>
      <div className=" bg-gray-900 p-8 rounded-lg shadow-lg max-w-full m-auto">
        <div className="border-4 border-gray-200 bg-gray-700 p-8">
          <div className="aspect-video">
            {bloc.image_url !== "" && (
              <iframe
                width="100%"
                height="100%"
                src={String(bloc.image_url)}
                allowFullScreen
                className="aspect-w-16 aspect-h-9 "
              />
            )}
          </div>
        </div>
      </div>
      <div className="text-gray-800 pt-8 pl-4 pr-4">{String(bloc.text)}</div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <p className="text-gray-500">Chargement...</p>
    </div>
  );
}

export default VideoVisualization;
