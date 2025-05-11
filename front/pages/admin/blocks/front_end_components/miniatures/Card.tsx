/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import CarouselData from "../../../../../models/CarouselData";
import Image from "next/image";

interface CardData {
  value: CarouselData;

  transitionFinished: boolean;
  trasnsType: string;
  transX: number;

  updateCard: (e: React.MouseEvent<HTMLDivElement>) => void;
  toggle: boolean;
  full: boolean;
  index: number;
  isResponsive: boolean;
}

function Card({
  value,

  transitionFinished,
  trasnsType,
  transX,

  updateCard,
  index,
}: CardData) {
  const [result, setResult] = useState<MediaQueryList>();
  const [, setResize] = useState(0);

  const image =
    value !== undefined
      ? "http //localhost/api/uploadfile/" + value.image_url
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
  if (transitionFinished) {
    return (
      <img
        className="max-w-sm full_pic overflow-hidden cursor-pointer "
        onClick={updateCard}
        src={image}
        width={"150px"}
        height={"150px"}
        alt={"Image"}
        style={{
          width: `150px`,
          height: `150px`,

          transition: `${trasnsType}`,

          transform: `translateX(${transX}px)`,
        }}
      />
    );
  } else if (image !== undefined) {
    return (
      <img
        style={{
          objectFit: "cover",
        }}
        className="max-w-sm full_pic rounded overflow-hidden cursor-pointer "
        src={image}
        width={"150px"}
        height={"150px"}
        alt={"Image"}
        onClick={updateCard}
        data-value={index}
      />
    );
  }
}

export default Card;
