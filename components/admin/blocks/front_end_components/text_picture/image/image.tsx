/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect } from "react";

import TextPicture from "./../../../../../../models/TextPicture";

interface ImageParams {
  bloc: TextPicture | Record<string, unknown>;
}

function Image({ bloc }: ImageParams) {
  const floatClass =
    bloc !== undefined
      ? !bloc.bloc_column
        ? bloc.image_right
          ? "inline float-left"
          : "inline float-right"
        : ""
      : "";

  const width =
    bloc !== undefined
      ? bloc.bloc_column
        ? `h-[${(bloc.css as { width: number }).width}%]`
        : `h-[${(bloc.css as { width: number }).width}%]`
      : "";
  useEffect(() => {}, [bloc]);
  return (
    bloc !== undefined && (
      <div className={bloc.bloc_column ? "mb-8 max-w-xl m-auto" : ""}>
        <img
          className={`${width} ${floatClass} rounded-xl`}
          style={{
            width: width,
            height: `auto`,
          }}
          src={
            process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
            "/api/uploadfile/" +
            bloc.image_url
          }
          alt={String(bloc.alt_image)}
        />
      </div>
    )
  );
}

export default Image;
