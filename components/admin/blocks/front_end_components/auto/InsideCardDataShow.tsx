"use client";

import Image from "next/image";

import CarouselData from "../../../../../models/CarouselData";

interface CardDatas {
  value: CarouselData | Record<string, unknown>;
  full: boolean;
}

function InsideCardDataShow({ value, full }: CardDatas) {
  const style = {
    width: "100%",
    height: "100%",

    cursor: "pointer",
  };
  const style_data = {
    display: "block",

    width: `${!full ? `43vw` : `100vw`}`,

    borderRadius: "5px",
    border:
      value !== undefined && value.image_url !== ""
        ? ""
        : "1px solid rgb(168, 166, 166)",
  };

  return value !== undefined ? (
    <div
      key={String(value.id)}
      className="relative block m-1 w-full h-full "
      style={style_data}
    >
      {value.image_url !== "" && (
        <Image
          className="rounded overflow-hidden object-cover"
          src={
            process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
            "/api/uploadfile/" +
            value.image_url
          }
          fill={true}
          alt="Image"
          style={style}
        />
      )}
      {"text" in value &&
        typeof value.text === "string" &&
        value.text.length > 0 && (
          <div
            className={
              value.image_url !== ""
                ? "relative h-full flex flex-col align-center justify-center text-center w-full text-gray-200   break-words text-xl"
                : "relative h-full flex flex-col align-center justify-center text-center w-full text-gray-700    break-words text-xl"
            }
          >
            {String(value.text)}
          </div>
        )}
    </div>
  ) : (
    <></>
  );
}

export default InsideCardDataShow;
