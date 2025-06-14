"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import MiniaturesContainer from "./MiniaturesContainer";
import Carousel from "../../../../../../models/Carousel";
import CarouselData from "../../../../../../models/CarouselData";
interface CustomCarouselInfo {
  bloc: Carousel | Record<string, unknown> | undefined;
  toggle: boolean;
  refresh: boolean;
  full: boolean;
  isResponsive: boolean;
}
const MiniaturesVisualization = ({
  bloc,
  toggle,
  refresh,
  full,
  isResponsive,
}: CustomCarouselInfo) => {
  const [dataValue, setData] = useState<
    CarouselData[] | Record<string, unknown>[]
  >();
  const [dataToProcess, setDataToProcess] = useState<
    CarouselData[] | Record<string, unknown>[]
  >();
  const [, setType] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<number>(0);
  const [, setResize] = useState(0);
  const [responsive] = useState("m-auto w-sm");
  const [transitionFinished, setTransitionFinished] = useState(false);
  const [cardWidth, setCardWidth] = useState<number>(0);

  const [clic, setIsClic] = useState(false);
  const [result, setResult] = useState<MediaQueryList>();

  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 800px)") as MediaQueryList);
    if (bloc !== undefined) {
      setCardNumber(Number(bloc.card_number));
    }
  }, [result?.matches]);

  const [cardValue, setCardValue] = useState(0);

  function updateCardEnd() {
    if (dataValue !== undefined && dataValue.length === cardNumber * 2) {
      const res = dataValue?.splice(cardValue, dataValue.length - 1);

      const col = res?.concat(dataValue);

      if (col && col.every((item) => "id" in item)) {
        setData(col as CarouselData[]);
        setIsClic(false);
      }
    }
  }

  function updateTransitionState(state: boolean) {
    setTransitionFinished(state);
  }

  function updateDataValue(cards: CarouselData[] | Record<string, unknown>[]) {
    setData(cards);
  }
  function updateType(bloc: Carousel) {
    const type = bloc.carousel_type;
    setType(type);
  }

  function reorder_carousel() {
    if (dataToProcess !== undefined) {
      let reordered_data_cards = [];

      const first = dataToProcess;

      reordered_data_cards = first.concat(dataToProcess);
      return reordered_data_cards;
    }
  }
  function updateSize() {
    setResize(window?.innerWidth);
  }
  useEffect(() => {
    window?.addEventListener("resize", updateSize);
  }, [result?.matches]);
  useEffect(() => {
    if (
      bloc !== undefined &&
      typeof bloc === "object" &&
      "carousel_type" in bloc
    ) {
      updateType(bloc as Carousel);
      setDataToProcess(
        (bloc as Carousel).carousel_data as
          | CarouselData[]
          | Record<string, unknown>[]
      );
    }
  }, [refresh]);
  useEffect(() => {
    const data = reorder_carousel();

    // Ensure data is either CarouselData[] or Record<string, unknown>[] or undefined
    if (
      Array.isArray(data) &&
      (data.every((item) => "id" in item) ||
        data.every((item) => !("id" in item)))
    ) {
      setData(data as CarouselData[] | Record<string, unknown>[]);
    } else {
      setData(undefined);
    }
    if (result !== undefined) {
      setCardWidth(165);
    }
  }, [dataToProcess, toggle]);
  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 800px)") as MediaQueryList);
  }, []);
  return (
    <div
      className={`${
        !full
          ? "fixed bottom-[0px] "
          : isResponsive
          ? responsive
          : "h-full max-h-[600px]"
      } m-auto mb-24`}
    >
      {dataValue !== undefined &&
        bloc !== undefined &&
        cardWidth !== undefined &&
        typeof bloc === "object" &&
        bloc !== null &&
        "card_number" in bloc &&
        typeof (bloc as Carousel).card_number === "number" &&
        dataValue.length === (bloc as Carousel).card_number * 2 && (
          <MiniaturesContainer
            width={(bloc as Carousel).width}
            height={(bloc as Carousel).height}
            gap={(bloc as Carousel).gap}
            updateCarousel_cards={updateDataValue}
            carousel_cards={
              Array.isArray(dataValue) &&
              dataValue.every((item) => "id" in item)
                ? (dataValue as CarouselData[])
                : undefined
            }
            transitionFinished={transitionFinished}
            updateTransitionState={updateTransitionState}
            cardWidth={cardWidth}
            setIsClic={setIsClic}
            setCardValue={setCardValue}
            updateCardEnd={updateCardEnd}
            full={full}
            clic={clic}
            cardValue={cardValue}
            isResponsive={isResponsive}
            cardNumber={cardNumber}
          />
        )}
    </div>
  );
};

export default MiniaturesVisualization;
