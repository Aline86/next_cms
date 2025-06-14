"use client";
import Carousel from "../../../../../../models/Carousel";
import CardData from "./wrapper";
import useBlocStore from "../../../../../../store/blocsStore";
import { useEffect } from "react";
import ButtonSaveAll from "../../../../../../lib/buttonSaveAll";

interface CardDatas {
  bloc: Carousel;
  toggle: boolean;
}

const CarouselOption3 = ({ bloc, toggle }: CardDatas) => {
  const updateComponent = useBlocStore((state) => state.updateBloc);

  useEffect(() => {}, [toggle]);
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="">
          <div className="">
            <h2>Bloc numéro : {bloc.bloc_number}</h2>
          </div>
          <h3 className="underline mt-8">Défilé d&apos;images miniatures</h3>
        </div>
      </div>

      <div
        onClick={(e) => {
          e.preventDefault();
          updateComponent(e, "ajout", undefined, undefined, bloc);
        }}
      ></div>
      <div className="flex flex-wrap gap-2">
        {bloc !== undefined &&
          bloc.carousel_data !== undefined &&
          bloc.carousel_data.map((_, index: number) => {
            return (
              <div
                //cards
                className="border border-gray-300 p-4"
                key={index}
              >
                <CardData bloc={bloc} gap={bloc.gap} index={index} />
              </div>
            );
          })}
      </div>
      <div className="flex justify-end">
        <ButtonSaveAll bloc={bloc} toggle={toggle} />
      </div>
    </div>
  );
};
export default CarouselOption3;
