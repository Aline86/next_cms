import Carousel from "../../../../../../models/Carousel";
import CardData from "./wrapper";
import useBlocStore from "../../../../../../store/blocsStore";
import { useEffect } from "react";

interface CardDatas {
  bloc: Carousel;
  toggle: boolean;
}

function CarouselOption3({ bloc, toggle }: CardDatas) {
  const show_remove =
    bloc !== undefined &&
    bloc.carousel_data !== undefined &&
    bloc.carousel_data.length > 4
      ? true
      : false;
  const updateComponent = useBlocStore((state) => state.updateBloc);
  useEffect(() => {}, [toggle]);
  return (
    <div className="w-full">
      <div
        onClick={(e) => {
          e.preventDefault();
          updateComponent(e, "ajout", undefined, undefined, bloc);
        }}
      >
        <div
          style={{ textTransform: "uppercase" }}
          className="flex flex-col align-center bg-slate-800 text-slate-50 cursor-pointer w-[245px] text-xl  rounded p-2 mb-4 mt-4"
        >
          Ajouter un élément +
        </div>
      </div>
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
                <CardData
                  bloc={bloc}
                  gap={bloc.gap}
                  index={index}
                  show_remove={show_remove}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default CarouselOption3;
