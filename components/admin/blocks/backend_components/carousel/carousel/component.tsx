"use client";
import { useEffect } from "react";
import Carousel from "../../../../../../models/Carousel";

import CardData from "./wrapper";
import ButtonSaveAll from "../../../../../../lib/buttonSaveAll";

interface CardDatas {
  bloc: Carousel;
  page_id: number;
  toggle: boolean;
}

const CarouselOption1 = ({ bloc, page_id, toggle }: CardDatas) => {
  useEffect(() => {}, [toggle]);
  return (
    <>
      <div className="w-full">
        <div className="">
          <div className="">
            <h2>Bloc numéro : {bloc.bloc_number}</h2>
          </div>
          <h3 className="underline mt-8">Défilé d&apos;images simple</h3>
        </div>
      </div>

      <div className="flex flex-row gap-4 overflow-auto">
        {bloc !== undefined &&
          bloc.carousel_data !== undefined &&
          bloc.carousel_data.map((_, index: number) => {
            return (
              <div className="border border-gray-300 p-4" key={index}>
                <CardData
                  bloc={bloc}
                  index={index}
                  data={bloc.carousel_data[index]}
                  page_id={page_id}
                  toggle={toggle}
                />
              </div>
            );
          })}
      </div>
      <div className="flex justify-end">
        <ButtonSaveAll bloc={bloc} toggle={toggle} />
      </div>
    </>
  );
};
export default CarouselOption1;
