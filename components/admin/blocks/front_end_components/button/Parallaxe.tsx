"use client";

import ButtonModel from "./../../../../../models/Button";

import Page from "./../../../../../models/Page";
import Link from "next/link";

import { useEffect } from "react";

interface CustomCarouselInfo {
  bloc: ButtonModel | Record<string, unknown>;
  full: boolean;
  isResponsive?: boolean;
  result: MediaQueryList | undefined;
  toggle: boolean;
  external: string | number;
  page: Page | undefined;
}
function Parallaxe({
  bloc,
  full,
  isResponsive,
  result,
  toggle,
  external,
  page,
}: CustomCarouselInfo) {
  useEffect(() => {
    console.log("Page changed:", page, external);
  }, [bloc, toggle, page, external]);
  return bloc !== undefined && external !== undefined ? (
    <div
      style={{
        position: "relative",
        marginBottom: "60px",
        backgroundImage: `url(${
          process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
          "/api/uploadfile/" +
          bloc.image_url
        })`,
        height: isResponsive || result?.matches ? "350px" : "30vh",
        backgroundAttachment: "fixed",
        width: full ? "100%" : "46vw",
        left: 0,
        right: 0,
        marginLeft: !full && !isResponsive ? "30px" : "0",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="relative block text-center top-1/3 text-white text-3xl">
        {typeof bloc.title === "string" ? bloc.title : ""}
      </div>
      <div
        className={
          "h-[40vh] flex flex-col align-center justify-center w-[60%] ml-[-10vw]"
        }
      >
        {external === "external_link" || external === "mailto" ? (
          <a
            key={String(bloc.id)}
            href={typeof bloc.href_url === "string" ? bloc.href_url : undefined}
            target="_blank"
            className={
              "absolute z-50 top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 block w-[270px] bg-[rgba(0,0,0,0.2)] h-[40px] border-1 border-gray-100 rounded-sm text-white"
            }
          >
            {"button_text" in bloc &&
              typeof bloc.button_text === "string" &&
              bloc.button_text.length > 0 && (
                <div className="relative z-60 text-center w-full text-gray-200  p-1  break-words">
                  {String(bloc.button_text)}
                </div>
              )}
          </a>
        ) : external === "pageID" && page !== undefined ? (
          <Link
            href={{ pathname: `/` + page.slug }}
            className={
              "absolute z-50 top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 block w-[270px] bg-[rgba(0,0,0,0.2)] h-[40px] border-1 border-gray-100 rounded-sm text-white"
            }
            key={String(bloc.id)}
          >
            {"button_text" in bloc &&
              typeof bloc.button_text === "string" &&
              bloc.button_text.length > 0 && (
                <div className="relative z-60 text-center w-full text-gray-200  p-1  break-words">
                  {String(bloc.button_text)}
                </div>
              )}
          </Link>
        ) : (
          <a
            key={String(bloc.id)}
            href={
              typeof bloc.href_url === "string"
                ? process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
                  "/api/uploadfile/" +
                  bloc.href_url
                : undefined
            }
            target="_blank"
            className={
              "absolute z-50 top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 block w-[270px] bg-[rgba(0,0,0,0.2)] h-[40px] border-1 border-gray-100 rounded-sm text-white"
            }
          >
            {"button_text" in bloc &&
              typeof bloc.button_text === "string" &&
              bloc.button_text.length > 0 && (
                <div className="relative z-60 text-center w-full text-gray-200  p-1  break-words">
                  {String(bloc.button_text)}
                </div>
              )}
          </a>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Parallaxe;
