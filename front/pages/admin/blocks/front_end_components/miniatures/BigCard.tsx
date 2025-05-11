"use client";
import { useSwipeable } from "react-swipeable";

import CarouselData from "../../../../../models/CarouselData";
import { useEffect, useState } from "react";
import Image from "next/image";

interface CardData {
  value: CarouselData;

  updateCard: (event: React.MouseEvent<HTMLDivElement>) => void;
  index: number;
  moveLeft: () => void;
  moveRight: () => void;
  full: boolean;
  isResponsive: boolean;
}

function BigCard({
  value,

  updateCard,
  index,
  moveLeft,
  moveRight,
  full,
  isResponsive,
}: CardData) {
  const [result, setResult] = useState<MediaQueryList>();
  const [, setResize] = useState(0);

  const image =
    value !== undefined
      ? "http://localhost/api/uploadfile/" + value.image_url
      : "";

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => moveLeft(),
    onSwipedRight: () => moveRight(),
  });

  function updateSize() {
    setResize(window?.innerWidth);
  }
  useEffect(() => {
    window?.addEventListener("resize", updateSize);
  }, [result?.matches]);

  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 800px)") as MediaQueryList);
  }, []);
  useEffect(() => {}, [isResponsive, full]);
  return value !== undefined ? (
    <div
      className={
        isResponsive || result?.matches
          ? "max-h-[400px] w-full m-auto rounded-xl "
          : "max-h-[600px] w-full m-auto rounded-xl  max-w-[800px]"
      }
    >
      <Image
        {...swipeHandlers}
        onClick={(e) => {
          updateCard(e);
        }}
        style={{
          transition: "all 0.5s ease",
        }}
        className={
          isResponsive || result?.matches
            ? "h-200 max-h-[200px] w-auto mx-auto rounded-xl overflow-hidden"
            : "h-300 max-h-[400px] w-auto mx-auto rounded-xl overflow-hidden"
        }
        data-value={index}
        width={isResponsive || result?.matches ? 600 : 800} // or "1000" depending on your layout
        height={isResponsive || result?.matches ? 200 : 400}
        alt={"Image"}
        src={image !== undefined ? image : ""}
      />
    </div>
  ) : (
    <></>
  );
}

export default BigCard;
