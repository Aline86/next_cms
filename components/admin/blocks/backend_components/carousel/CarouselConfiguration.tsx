"use client";
import { useEffect } from "react";
import Carousel from "./../../../../../models/Carousel";
import carouselTypes from "./../../../../../lib/config/carouselTypes";
import { Button } from "@headlessui/react";
import useBlocStore from "./../../../../../store/blocsStore";

interface CardDatas {
  bloc: Carousel;
  page_id: number;
  toggle: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}

function CarouselConfiguration({
  bloc,
  page_id,
  toggle,
  setRefresh,
  refresh,
}: CardDatas) {
  const CardData =
    carouselTypes[bloc.carousel_type as keyof typeof carouselTypes].backend;
  const addItem = useBlocStore((state) => state.addItem);
  useEffect(() => {}, [toggle]);
  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <div className="flex justify-start mb-8 mt-8">
        <Button
          className="bg-slate-800 text-slate-50 cursor-pointer w-[200px] text-xl h-[50px] rounded "
          onClick={() => {
            addItem(bloc);
            setRefresh(!refresh);
          }}
        >
          Ajouter un élément +
        </Button>
      </div>
      {bloc !== undefined && (
        <CardData bloc={bloc} page_id={page_id} toggle={toggle} />
      )}
    </div>
  );
}
export default CarouselConfiguration;
