import { useEffect } from "react";
import Carousel from "../../../../../../models/Carousel";

import CardData from "./wrapper";

interface CardDatas {
  bloc: Carousel;
  page_id: number;
  toggle: boolean;
}

function CarouselOption1({ bloc, page_id, toggle }: CardDatas) {
  const show_remove =
    bloc !== undefined &&
    bloc.carousel_data !== undefined &&
    bloc.carousel_data.length > 4
      ? true
      : false;
  useEffect(() => {}, [toggle]);
  return (
    <div className="flex flex-row gap-4 overflow-auto">
      {bloc !== undefined &&
        bloc.carousel_data !== undefined &&
        bloc.carousel_data.map((_, index: number) => {
          return (
            <div className="border border-gray-300 p-4" key={index}>
              <CardData
                bloc={bloc}
                index={index}
                show_remove={show_remove}
                data={bloc.carousel_data[index]}
                page_id={page_id}
                toggle={toggle}
              />
            </div>
          );
        })}
    </div>
  );
}
export default CarouselOption1;
