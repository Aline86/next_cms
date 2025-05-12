/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import PictureGroupData from "../../../../../models/PictureGroupData";

interface CardDatas {
  data: PictureGroupData;

  full: boolean;
}

function InsideCardData({
  data,

  full,
}: CardDatas) {
  const hw = full ? "h-106 w-72" : "h-full w-36";

  const left_out = "shadow-md rounded-xl duration-500 hover:scale-105";

  const size = full
    ? hw + " object-cover rounded-t-xl bg-white shadow-md " + left_out
    : hw + " w-36 object-cover rounded-t-xl bg-white shadow-md " + left_out;
  const img =
    data !== undefined
      ? "http://localhost/api/uploadfile/" + data.image_url
      : "";
  const text_color =
    data !== undefined && data.image_url !== ""
      ? full
        ? "text-gray-100 text-xl"
        : "text-gray-100 text-sm"
      : " text-gray-500";
  const text_size = full
    ? "w-full  text-2xl " + text_color
    : data !== undefined && data.text !== "" && !data.is_data_button
    ? "absolute bottom-8 text-sm" + text_color
    : "absolute  text-sm" + text_color;
  const text_height =
    full && data !== undefined && data.text !== ""
      ? "absolute p-3 top-6 w-full h-full flex flex-col justify-spacing "
      : "absolute p-3 top-3 w-full h-full flex flex-col ";
  const button_height = full
    ? "absolute bottom-15 left-6 h-[50px] leading-[50px]"
    : "absolute h-[35px] absolute left-3 bottom-8";
  const flex_position =
    data !== undefined && data.text !== "" && !data.is_data_button && full
      ? " flex-col justify-end mb-12 ml-4 mr-4"
      : data !== undefined && data.text !== "" && data.is_data_button && !full
      ? ""
      : !full
      ? ""
      : "ml-4 mr-4";
  const background_picture = `h-full relative shadow-md  rounded-xl duration-500 hover:scale-105 border-[15px] border-white`;
  return data !== undefined ? (
    <div
      className={"bg_img_group " + background_picture}
      style={{ backgroundColor: data.background_color }}
    >
      {data.image_url != "" ? (
        <Image src={`${img}`} alt="Image" className={size} fill={true} />
      ) : (
        ""
      )}

      <div className={text_height}>
        <div className={"flex w-[90%] h-full " + flex_position}>
          <p
            style={{
              color: data.text_color,
            }}
            className={text_size}
          >
            {data.text}
          </p>
        </div>
        {data.is_data_button && (
          <div
            style={{
              border: "1px solid " + data.text_color,
              color: data.text_color,
            }}
            className={`buttons border border-white border-solid border-1 block w-[80%]  text-center text-gray-100 rounded ${button_height}`}
          >
            Voir
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default InsideCardData;
