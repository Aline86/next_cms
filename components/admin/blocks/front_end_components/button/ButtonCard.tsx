"use client";

import Image from "next/image";
import ButtonModel from "../../../../../models/Button";

import Page from "../../../../../models/Page";
import Link from "next/link";
import Button from "../../../../../models/Button";
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
function ButtonCard({
  bloc,
  full,
  isResponsive,
  result,
  toggle,
  external,
  page,
}: CustomCarouselInfo) {
  useEffect(() => {
    console.log("external", external);
  }, [bloc, toggle, external, page]);
  return bloc !== undefined && external !== undefined ? (
    <div
      className={
        full
          ? isResponsive
            ? "relative w-sm m-auto flex flex-col align-center justify-center m-auto mt-16 border-1 border-gray-300 p-4 rounded-sm"
            : result?.matches
            ? "relative h-[100vh] w-[80vw] flex flex-col align-center justify-center m-auto mt-24 border-1 border-gray-300 p-4 rounded-sm"
            : "relative min-h-[70vh]  w-[80vw] flex align-center justify-center m-auto mt-24 border-1 mb-8 border-gray-300 p-4 rounded-sm"
          : "w-[43vw] flex align-center justify-center m-auto border-1 border-gray-300 p-8 rounded-sm"
      }
    >
      <div
        className={
          result?.matches || isResponsive
            ? "relative flex flex-col align-center justify-center m-auto gap-5 h-[70vh] w-full"
            : "relative flex flex-row align-center justify-center m-auto gap-5 h-full w-[100%] "
        }
      >
        <div
          className={
            result?.matches || isResponsive
              ? "h-[100vh] flex flex-col align-center justify-center w-full rounded-sm pb-4"
              : "h-[40vh] min-h-[250px] flex flex-col align-center justify-center w-[40%] rounded-sm"
          }
          style={{ backgroundColor: (bloc as ButtonModel).background_color }}
        >
          {bloc.image_url !== "" && (
            <div
              className={
                result?.matches || isResponsive
                  ? "w-[90%] h-[40vh] relative top-[-20%] ml-[-10%] text-center rounded-sm"
                  : "w-2/3 h-[90%] relative left-[10%] top-[-15%] rounded-sm"
              }
            >
              <Image
                src={
                  process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
                  "/api/uploadfile/" +
                  bloc.image_url
                }
                alt={typeof bloc.title === "string" ? bloc.title : ""}
                fill={true}
                className="object-cover rounded-sm"
              />
            </div>
          )}
          <div
            className={
              result?.matches || isResponsive
                ? "relative left-4  w-[85%] h-fit  "
                : "absolute top-1/20 left-2/3 transform -translate-x-1/2 h-fit w-[40%] bottom-1/3"
            }
          >
            <h3 className={"text-3xl  break-words text-gray-600"}>
              {typeof bloc.title === "string" ? bloc.title : ""}
            </h3>
            <div
              className={
                result?.matches || isResponsive
                  ? "text-sm break-words mt-4 text-gray-500"
                  : "break-words mt-4 text-gray-500"
              }
            >
              {typeof bloc.text === "string" || typeof bloc.text === "number"
                ? bloc.text
                : null}
            </div>
          </div>
        </div>
        <div
          className={
            result?.matches || isResponsive
              ? "relative h-fit"
              : full
              ? "h-[40vh] flex flex-col align-center justify-center w-[60%] ml-[-20vw]"
              : "h-[40vh] flex flex-col align-center justify-center w-[60%] ml-[-10vw]"
          }
        >
          {external === "external_link" || external === "mailto" ? (
            <a
              key={String(bloc.id)}
              href={
                typeof bloc.href_url === "string" ? bloc.href_url : undefined
              }
              target="_blank"
              className={
                result?.matches || isResponsive
                  ? "relative top-1/2 m-auto block w-fit h-[40px] bg-gray-800 rounded-sm text-white"
                  : !full
                  ? "relative bottom-[-130px] left-2/3  block w-[270px]  h-[40px] bg-gray-700 rounded-sm text-white"
                  : "relative bottom-[-130px] left-2/3  block w-[270px]  h-[40px] bg-gray-700 rounded-sm text-white"
              }
            >
              {"button_text" in bloc &&
                typeof bloc.button_text === "string" &&
                bloc.button_text.length > 0 && (
                  <div className="relative text-center w-full text-gray-200  p-1  break-words">
                    {String(bloc.button_text)}
                  </div>
                )}
            </a>
          ) : external === "PageID" && page !== undefined ? (
            <Link
              href={{ pathname: `/` + page.slug }}
              className={
                result?.matches || isResponsive
                  ? "relative top-1/2 m-auto block w-fit  h-[40px] bg-gray-800 rounded-sm text-white"
                  : !full
                  ? "relative bottom-[-130px] left-2/3  block w-[270px]  h-[40px] bg-gray-700 rounded-sm text-white"
                  : "relative bottom-[-130px] left-2/3  block w-[270px]  h-[40px] bg-gray-700 rounded-sm text-white"
              }
              key={String(bloc.id)}
            >
              {typeof (bloc as Button).text === "string" &&
                (bloc as Button).text.length > 0 && (
                  <div className="relative  text-center w-full text-gray-200  p-1  break-words">
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
                result?.matches || isResponsive
                  ? "relative top-1/2 m-auto block w-fit  h-[40px] bg-gray-800 rounded-sm text-white"
                  : !full
                  ? "relative bottom-[-180px] left-1/3  block w-[270px]  h-[40px] bg-gray-700 rounded-sm text-white"
                  : "relative bottom-[-130px] left-2/3  block w-[270px]  h-[40px] bg-gray-700 rounded-sm text-white"
              }
            >
              {"button_text" in bloc &&
                typeof bloc.button_text === "string" &&
                bloc.button_text.length > 0 && (
                  <div className="relative text-center w-full text-gray-200  p-1  break-words">
                    {String(bloc.button_text)}
                  </div>
                )}
            </a>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ButtonCard;
