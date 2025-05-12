"use client";
import { useSwipeable } from "react-swipeable";

import CarouselData from "../../../../../models/CarouselData";
import { useEffect, useState } from "react";

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
  useEffect(() => {}, [isResponsive]);
  return value !== undefined ? (
    <div
      className={
        isResponsive
          ? "m-auto w-sm  rounded overflow-hidden shadow-lg p-8"
          : "m-auto w-lg  rounded overflow-hidden shadow-lg p-8"
      }
      style={{ transition: "all 0.4s ease-in-out" }}
    >
      <div
        {...swipeHandlers}
        onClick={updateCard}
        className="w-full"
        data-value={index}
        style={{
          background: `url("${image}") no-repeat center / contain`,

          height: `${
            !result?.matches && full && !isResponsive ? `400px` : `250px`
          }`,
        }}
      ></div>
    </div>
  ) : (
    <></>
  );
}

export default BigCard;
