"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import MiniaturesContainer from "./MiniaturesContainer";
import Carousel from "../../../../../models/Carousel";
import CarouselData from "../../../../../models/CarouselData";
interface CustomCarouselInfo {
  input_bloc: Carousel;
  toggle: boolean;
  refresh: boolean;
  full: boolean;
  isResponsive: boolean;
}
function MiniaturesVisualization({
  input_bloc,
  toggle,
  refresh,
  full,
  isResponsive,
}: CustomCarouselInfo) {
  const [dataValue, setData] = useState<CarouselData[]>();
  const [dataToProcess, setDataToProcess] = useState<CarouselData[]>();
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
    if (input_bloc !== undefined) {
      setCardNumber(input_bloc.card_number);
    }
  }, [result?.matches]);

  const [cardValue, setCardValue] = useState(0);

  function updateCardEnd() {
    document.addEventListener("transitionend", function () {
      //  e.preventDefault();

      if (dataValue !== undefined && dataValue.length === cardNumber * 2) {
        const res = dataValue?.splice(cardValue, dataValue.length);

        const col = res?.concat(dataValue);

        setData(col);

        setIsClic(false);
      }
    });
  }

  function updateTransitionState(state: boolean) {
    setTransitionFinished(state);
  }

  function updateDataValue(cards: CarouselData[]) {
    setData(cards);
  }
  function updateType(input_bloc: Carousel) {
    const type = input_bloc.carousel_type;
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
    if (input_bloc !== undefined) {
      updateType(input_bloc);
      setDataToProcess(input_bloc.carousel_data);
    }
  }, [refresh]);
  useEffect(() => {
    const data = reorder_carousel();

    setData(data);
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
        input_bloc !== undefined &&
        cardWidth !== undefined &&
        dataValue.length === input_bloc.card_number * 2 && (
          <MiniaturesContainer
            width={input_bloc.width}
            height={input_bloc.height}
            gap={input_bloc.gap}
            updateCarousel_cards={updateDataValue}
            carousel_cards={dataValue}
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
}

export default MiniaturesVisualization;
