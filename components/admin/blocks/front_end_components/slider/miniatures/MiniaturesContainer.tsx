"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "./Card";
import BigCard from "./BigCard";
import fleche from "./img/fleche.png";
import s from "./styles/style.module.css";
import CarouselData from "../../../../../models/CarouselData";
import Image from "next/image";

interface CarouselDataValue {
  carousel_cards: CarouselData[] | undefined | Record<string, unknown>;
  transitionFinished: boolean;
  cardWidth: number;
  updateCarousel_cards: (carousel_cards: CarouselData[]) => void;
  updateTransitionState: (state: boolean) => void;
  width: number;
  height: number;
  gap: number;
  full: boolean;
  setIsClic: React.Dispatch<React.SetStateAction<boolean>>;
  setCardValue: React.Dispatch<React.SetStateAction<number>>;
  updateCardEnd: () => void;
  clic: boolean;
  cardValue: number;
  isResponsive: boolean;
  cardNumber: number;
}

function MiniaturesContainer({
  carousel_cards,
  transitionFinished,
  cardWidth,

  updateTransitionState,
  updateCarousel_cards,

  gap,
  cardNumber,
  full,
  setIsClic,
  setCardValue,
  updateCardEnd,
  clic,

  isResponsive,
}: CarouselDataValue) {
  const [trigger, setTrigger] = useState(0);
  const [move, setMove] = useState(0);
  const [isLeft, setIsLeft] = useState(true);
  const [result, setResult] = useState<MediaQueryList>();
  const [card, setCard] = useState<CarouselData>();
  const width = cardNumber * 2 * cardWidth;
  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 700px)") as MediaQueryList);
  }, []);

  function updateCard(e: React.MouseEvent<HTMLDivElement>) {
    const currentCard =
      Number((e.target as HTMLElement).getAttribute("data-value")) - 1;

    if (Array.isArray(carousel_cards)) {
      setCard(carousel_cards[currentCard + 1]);
    }

    setCardValue(currentCard);

    setMove(cardNumber - currentCard * cardWidth - cardNumber);
    setIsLeft(false);
    updateTransitionState(true);

    setIsClic(true);
  }

  function updateTransitionLeft() {
    if (Array.isArray(carousel_cards) && carousel_cards.length > 0) {
      const popItem = carousel_cards.pop();
      if (popItem !== undefined) {
        carousel_cards.unshift(popItem);

        updateCarousel_cards(carousel_cards);
        updateTransitionState(true);
      }
    }
  }

  function updateTransitionRight() {
    if (Array.isArray(carousel_cards) && carousel_cards.length > 0) {
      const shiftItem = carousel_cards.shift();
      if (shiftItem !== undefined) {
        carousel_cards.push(shiftItem);
        updateCarousel_cards(carousel_cards);

        updateTransitionState(true);
      }
    }
  }

  function moveLeft() {
    if (
      Array.isArray(carousel_cards) &&
      carousel_cards !== undefined &&
      carousel_cards[1] !== undefined
    ) {
      setMove(-cardWidth);
      setIsClic(false);
      setIsLeft(true);
      setTrigger(trigger + 1);
      updateTransitionState(true);
      setCard(carousel_cards[2]);
    }
  }

  function moveRight() {
    if (
      Array.isArray(carousel_cards) &&
      carousel_cards !== undefined &&
      carousel_cards[1] !== undefined
    ) {
      setMove(cardWidth);
      setIsClic(false);
      setIsLeft(false);
      setTrigger(trigger + 1);
      updateTransitionState(true);
      setCard(carousel_cards[0]);
    }
  }

  useEffect(() => {
    if (Array.isArray(carousel_cards) && carousel_cards.length > 0) {
      setCard(carousel_cards[1]);
    }
  }, []);

  useEffect(() => {
    if (trigger > 0) {
      if (!isLeft) {
        updateTransitionLeft();
      } else {
        updateTransitionRight();
      }
    }
  }, [trigger]);

  return carousel_cards !== undefined ? (
    <div
      className={
        isResponsive
          ? "w-sm m-auto"
          : `m-auto  w-full max-w-[1200px] h-full mt-16 flex flex-col justify-end items-end`
      }
    >
      <div className="flex w-full m-auto mb-4">
        {card !== undefined && (
          <BigCard
            key={-1}
            index={1}
            value={card}
            updateCard={updateCard}
            moveLeft={moveLeft}
            moveRight={moveRight}
            full={full}
            isResponsive={isResponsive}
          />
        )}
      </div>

      <div
        className={`m-auto flex justify-content items-center w-full`}
        onTransitionEnd={() => {
          if (clic) {
            updateCardEnd();
          }
          updateTransitionState(false);
        }}
      >
        {transitionFinished ? (
          <span
            className={s.left}
            style={{
              marginRight: `30px`,
              pointerEvents: "none",
            }}
          >
            <Image src={fleche} alt="flèche de doite" width={30} height={30} />
          </span>
        ) : (
          <span
            className={s.left + " cursor-pointer"}
            onClick={() => moveRight()}
            style={{
              marginRight: `30px`,
            }}
          >
            <Image src={fleche} alt="flèche de doite" width={30} height={30} />
          </span>
        )}
        <div
          className="relative m-auto overflow-hidden items-center justify-center "
          style={{
            margin: `${gap}px auto`,

            width: `${
              result?.matches
                ? "95vw"
                : !full
                ? "43vw"
                : isResponsive
                ? "380px"
                : "80vw"
            }`,
          }}
        >
          <div
            className={s.card_container}
            style={{
              minWidth: `${width}px`,
              height: "170px",
            }}
          >
            <div
              className="m-auto absolute flex flex justify-center items-center h-[170px] gap-4"
              style={{
                marginLeft: `-${cardWidth}px`,
              }}
            >
              {carousel_cards !== undefined &&
                Array.isArray(carousel_cards) &&
                carousel_cards.map((value: CarouselData, index: number) => {
                  return (
                    <Card
                      key={index}
                      index={index}
                      value={value}
                      transitionFinished={transitionFinished}
                      trasnsType={"transform 0.4s ease-in"}
                      transX={move}
                      updateCard={updateCard}
                      toggle={false}
                      full={full}
                      isResponsive={isResponsive}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        {transitionFinished ? (
          <span
            className="rotate-180"
            style={{
              marginLeft: `30px`,
              pointerEvents: "none",
              color: "lightgray",
            }}
          >
            <Image src={fleche} alt="flèche de gauche" width={30} height={30} />
          </span>
        ) : (
          <span
            className="rotate-180 cursor-pointer"
            onClick={() => moveLeft()}
            style={{
              marginLeft: `30px`,
            }}
          >
            <Image src={fleche} alt="flèche de gauche" width={30} height={30} />
          </span>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default MiniaturesContainer;
