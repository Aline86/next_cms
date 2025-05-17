import Carousel from "../../../../../../models/Carousel";

import CardData from "./wrapper";
import InputTypes from "../../../../../../lib/InputTypes";
import ComponentTypes from "../../../../../../lib/types";

interface CardDatas {
  updateComponent: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: string | number | undefined,
    bloc?: ComponentTypes
  ) => Promise<void>;
  bloc: Carousel;
}

function CarouselOption3({ updateComponent, bloc }: CardDatas) {
  const show_remove =
    bloc !== undefined &&
    bloc.carousel_data !== undefined &&
    bloc.carousel_data.length > 4
      ? true
      : false;

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
                  updateComponent={async (
                    event: InputTypes,
                    field: string | undefined,
                    input: string | undefined,
                    index?: string | number | undefined,
                    bloc?: ComponentTypes
                  ): Promise<void> => {
                    await updateComponent(event, field, input, index, bloc);
                  }}
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
