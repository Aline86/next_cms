"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InsideCardDataShow from "./InsideCardDataShow";
import CarouselData from "../../../../../models/CarouselData";
import CarouselModel from "../../../../../models/Carousel";
import { useEffect, useState } from "react";
interface CustomCarouselInfo {
  input_bloc: CarouselModel | Record<string, unknown>;
  full: boolean;
  isResponsive?: boolean;
  toggle: boolean;
}
function CarouselVisualization({
  input_bloc,
  full,
  isResponsive,
  toggle,
}: CustomCarouselInfo) {
  const [result, setResult] = useState<MediaQueryList>();
  const [, setResize] = useState(0);
  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 1000px)") as MediaQueryList);
  }, [input_bloc]);
  function updateSize() {
    setResize(window?.innerWidth);
  }
  useEffect(() => {
    window?.addEventListener("resize", updateSize);
  }, [result?.matches]);
  useEffect(() => {
    window?.addEventListener("resize", updateSize);
  }, [input_bloc, toggle]);
  return input_bloc !== undefined ? (
    <div
      className={
        full
          ? isResponsive
            ? "w-sm m-auto"
            : result?.matches
            ? "w-[80vw] "
            : "w-[80vw] flex align-center justify-center m-auto"
          : "w-[35vw] flex align-center justify-center m-auto"
      }
    >
      <Carousel
        opts={{
          align: "start",
        }}
        className={
          full
            ? isResponsive
              ? "w-sm m-auto"
              : result?.matches
              ? "w-[80vw]"
              : "w-full"
            : "w-[43vw]"
        }
      >
        <CarouselContent>
          {Array.isArray((input_bloc as CarouselModel).carousel_data) &&
            (
              (input_bloc as CarouselModel).carousel_data as (
                | CarouselData
                | Record<string, unknown>
              )[]
            ).map(
              (
                value: CarouselData | Record<string, unknown>,
                index: React.Key | null | undefined
              ) => (
                <CarouselItem
                  key={index}
                  className={
                    isResponsive || result?.matches
                      ? "w-sm"
                      : "md:basis-1/2 lg:basis-1/4"
                  }
                >
                  <div className="p-1">
                    <InsideCardDataShow value={value} full={full} />
                  </div>
                </CarouselItem>
              )
            )}
        </CarouselContent>
        {!isResponsive && !result?.matches && (
          <>
            {" "}
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  ) : (
    <div></div>
  );
}

export default CarouselVisualization;
