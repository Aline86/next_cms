/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";

import TextPicture from "../../../../../../models/TextPicture";

interface ImageParams {
  bloc: TextPicture;
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
        ? `h-[${bloc.css.width}%]`
        : `h-[${bloc.css.width}%]`
      : "";
  useEffect(() => {}, []);
  return (
    bloc !== undefined &&
    bloc.image.length > 0 && (
      <div className={bloc.bloc_column ? "mb-8 max-w-xl m-auto" : ""}>
        <img
          className={`${width} ${floatClass} rounded-xl`}
          style={{
            width: width,
            height: `auto`,
          }}
          src={"http://localhost/api/uploadfile/" + bloc.image}
          alt={bloc.alt_image}
        />
      </div>
    )
  );
}

export default Image;
