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
      ? "http://localhost/api/uploadfile/" + value.image_url
      : undefined;
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
      <Image
        className="max-w-sm full_pic rounded overflow-hidden shadow-lg py-3"
        onClick={updateCard}
        src={image !== undefined ? `${image}` : ""}
        width={150}
        height={150}
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
      <Image
        className="max-w-sm full_pic rounded overflow-hidden shadow-lg cursor-pointer py-3"
        src={image !== undefined ? `${image}` : ""}
        width={150}
        height={150}
        alt={"Image"}
        onClick={updateCard}
        data-value={index}
      />
    );
  }
}

export default Card;
