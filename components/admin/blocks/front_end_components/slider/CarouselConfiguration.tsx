"use client";
import { useEffect } from "react";
import Carousel from "./../../../../../models/Carousel";
import carouselTypes from "./../../../../../lib/config/carouselTypes";

interface CardDatas {
  bloc: Carousel;
  page_id: number;
  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
  refresh: boolean;
}

function CarouselFrontConfiguration({
  bloc,
  toggle,
  full,

  isResponsive,
  refresh,
}: CardDatas) {
  const CardData =
    carouselTypes[bloc.carousel_type as keyof typeof carouselTypes].frontend;
  useEffect(() => {}, [toggle]);
  return (
    bloc !== undefined && (
      // Provide default values for missing props if needed

      <CardData
        bloc={bloc}
        toggle={toggle}
        full={full}
        isResponsive={isResponsive}
        slides={bloc}
        refresh={refresh}
      />
    )
  );
}
export default CarouselFrontConfiguration;
