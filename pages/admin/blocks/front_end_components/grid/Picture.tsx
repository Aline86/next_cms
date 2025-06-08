"use client";

import Image from "next/image";
import fermer from "./../../../../assets/fermer.png";

import PictureGroupData from "../../../../../models/PictureGroupData";
import { useEffect, useState } from "react";

interface CardDatas {
  data: PictureGroupData | Record<string, unknown> | undefined;
  update_clicked_pic: (state: boolean) => void;
  isResponsive: boolean;
  clicked: boolean;
  toggle: boolean;
}

function Picture({
  data,
  clicked,
  update_clicked_pic,
  isResponsive,
  toggle,
}: CardDatas) {
  const [clicked_pic, set_clicked_pic] = useState(false);
  const [result, setResult] = useState<MediaQueryList>();
  const [, setResize] = useState(0);
  const image =
    data !== undefined && data?.image_url !== undefined
      ? process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
        "/api/uploadfile/" +
        data.image_url
      : "";

  function updateSize() {
    setResize(window?.innerWidth);
  }
  useEffect(() => {
    window?.addEventListener("resize", updateSize);
  }, [result?.matches]);

  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 800px)") as MediaQueryList);
  }, []);
  useEffect(() => {}, [clicked_pic, clicked, toggle]);

  return data !== undefined ? (
    <>
      <div
        style={
          result?.matches
            ? { transform: "scale(1.6)" }
            : { transform: "scale(1)" }
        }
        className={`transition-opacity duration-600 ease-in-out ${
          clicked_pic
            ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block rounded-xl z-110 opacity-100 m-auto z-90 opacity-100"
            : "opacity-0 relative w-[0px] h-[0px]"
        }`}
        onClick={() => {
          set_clicked_pic(isResponsive ? false : !clicked_pic);
          update_clicked_pic(false);
        }}
      >
        <Image
          width={1200} // Original width of the image
          height={800} // Original height
          className=" max-h-[90vh] block rounded-xl cursor-pointer-not-big w-full h-auto"
          src={image}
          alt={String(data.title)}
        />
      </div>
      <div
        className={`${
          clicked_pic
            ? "z-100 fixed opacity-100 inset-0 bg-white to-transparent justify-end p-4 text-white left-0 right-0 "
            : "cursor-pointer"
        }`}
      >
        <div
          className={
            clicked
              ? !result?.matches
                ? "fixed top-[90px] right-[100px] flex items-center justify-center w-10 h-10 border border-solid border-gray-500 rounded-4xl cursor-pointer-not-big"
                : "fixed top-[50px] right-[50px] flex items-center justify-center w-10 h-10 border border-solid border-gray-500 rounded-4xl cursor-pointer-not-big"
              : "hidden"
          }
          onClick={() => {
            set_clicked_pic(false);
            update_clicked_pic(false);
          }}
        >
          <Image src={fermer} alt="fermet la fenêtre" width="25" height="25" />
        </div>
      </div>

      <div
        className={`${
          clicked
            ? isResponsive
              ? "pointer-events-none"
              : "pointer-events-none hidden"
            : "cursor-pointer-not-big"
        } relative transition-transform duration-600 ease-in-out z-80`}
        onClick={() => {
          {
            set_clicked_pic(isResponsive ? false : !clicked_pic);
            update_clicked_pic(isResponsive ? false : !clicked_pic);
          }
        }}
      >
        <Image
          width={1200} // Original width of the image
          height={800}
          src={image}
          alt={String(data.title)}
          className={
            "relative w-[100%] h-auto block rounded cursor-pointer-not-big z-10  w-full h-auto" +
            clicked
              ? "pointer-events-none"
              : "cursor-pointer"
          }
        />
        <div
          className={
            "absolute inset-0 rounded bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 text-white"
          }
        ></div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Picture;
