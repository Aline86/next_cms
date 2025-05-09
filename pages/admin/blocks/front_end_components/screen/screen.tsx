"use client";
import Image from "next/image";
import ScreenHome from "../../../../../models/Screen";
import s from "./style.module.css";

import { useEffect, useState } from "react";

interface BlocParams {
  bloc: ScreenHome;

  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}

function ScreenVizualisation({
  bloc,

  isResponsive,
  full,
  toggle,
}: BlocParams) {
  const [result, setResult] = useState<MediaQueryList>();
  const [, setResize] = useState(0);
  function updateSize() {
    setResize(window?.innerWidth);
  }
  useEffect(() => {
    window?.addEventListener("resize", updateSize);
  }, [result?.matches]);

  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 800px)") as MediaQueryList);
  }, []);
  useEffect(() => {}, [bloc, isResponsive, toggle, bloc.screen_url]);
  return bloc !== undefined ? (
    <div
      className={
        full
          ? bloc.bloc_number === 1
            ? isResponsive
              ? "relative 600px mt-[-35px] h-[550px]"
              : "h-screen"
            : isResponsive
            ? "relative w-sm"
            : "relative h-screen"
          : "relative h-screen"
      }
    >
      {bloc.screen_url !== "" ? (
        <div
        //style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Image
            alt={bloc.title}
            style={{ objectFit: "cover" }}
            className={
              full
                ? isResponsive
                  ? "relative h-600px"
                  : s.screen_container
                : "relative top-0 h-screen"
            }
            src={
              process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
              "/api/uploadfile/" +
              bloc.screen_url
            }
            fill={true}
            sizes={!full ? "43vw" : "100vw"}
          />
          <div
            className={s.encart}
            style={{
              position: "absolute",
              zIndex: "2",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "end",
              height: full
                ? isResponsive
                  ? "600px"
                  : "calc(100vh - 150px)"
                : "calc(100vh - 50px)",
              paddingBottom: isResponsive ? "100px" : "0px",
            }}
          >
            <h2
              style={{
                display: "inline-block",
                textAlign: "left",
                margin: "0",
                color: "white",
                textTransform: "uppercase",
                fontSize:
                  isResponsive || result?.matches
                    ? "25px"
                    : full
                    ? "5em"
                    : "3em",
                opacity: 0.8,
                marginLeft: isResponsive || result?.matches ? "25px" : "5vw",
                marginRight: "30px",
                wordBreak: "break-word",
              }}
            >
              {bloc.title}
            </h2>
            <p
              style={{
                fontSize: isResponsive || result?.matches ? "15px" : "25px",

                color: "white",
                display: "inline-block",
                marginLeft: isResponsive || result?.matches ? "25px" : "5vw",
                marginRight: "30px",
                wordBreak: "break-word",
              }}
            >
              {bloc.text}
            </p>
          </div>

          <div className={full ? s.backdrop : ""}></div>
        </div>
      ) : (
        <div
          className={s.encart}
          style={{
            position: "relative",
            zIndex: "2",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "end",
            height: full
              ? isResponsive
                ? "600px"
                : "calc(100vh - 250px)"
              : "calc(100vh - 50px)",

            paddingBottom: isResponsive ? "100px" : "",
          }}
        >
          <h2
            style={{
              display: "inline-block",
              textAlign: "left",
              margin: "0",
              color: "black",
              textTransform: "uppercase",
              fontSize:
                isResponsive || result?.matches ? "25px" : full ? "5em" : "3em",
              opacity: 0.8,
              marginLeft: isResponsive || result?.matches ? "25px" : "5vw",
              marginRight: "30px",
              wordBreak: "break-word",
            }}
          >
            {bloc.title}
          </h2>
          <p
            style={{
              fontSize: isResponsive || result?.matches ? "15px" : "25px",
              color: "black",
              display: "inline-block",
              marginLeft: isResponsive || result?.matches ? "25px" : "5vw",
              marginRight: "30px",
              wordBreak: "break-word",
            }}
          >
            {bloc.text}
          </p>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}

export default ScreenVizualisation;
