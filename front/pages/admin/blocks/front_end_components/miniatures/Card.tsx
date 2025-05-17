/* eslint-disable @next/next/no-img-element */
"use client";

import CarouselData from "../../../../../models/CarouselData";
import Image from "next/image";

interface CardData {
  value: CarouselData;
  transitionFinished: boolean;
  trasnsType: string;
  transX: number;
  updateCard: (e: React.MouseEvent<HTMLImageElement>) => void;
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
  const image =
    value?.image_url &&
    process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
      "/api/uploadfile/" +
      value.image_url;

  const style: React.CSSProperties = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    transform: transitionFinished
      ? `translateX(${transX}px)`
      : "translateX(0px)",
    transition: transitionFinished ? trasnsType : "none",
    cursor: "pointer",
  };

  return image ? (
    <Image
      className="rounded overflow-hidden"
      onClick={updateCard}
      data-value={index}
      src={image}
      width={150}
      height={150}
      alt="Image"
      style={style}
    />
  ) : (
    <img style={style} src="#" alt="" />
  );
}

export default Card;
