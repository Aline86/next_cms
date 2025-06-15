import CardData from "./CardData";

import PictureGroupData from "./../../../../../../models/PictureGroupData";
import { useEffect } from "react";

interface CarouselData {
  data: PictureGroupData[] | undefined | Record<string, unknown>[];
  toggle: boolean;
  full: boolean;
  isResponsive: boolean;

  col: { "--columns": number } | undefined;
}

function PictureGroupContainer({
  data,
  toggle,
  full,
  isResponsive,

  col,
}: CarouselData) {
  useEffect(() => {}, [toggle, col]);
  const size = full
    ? isResponsive
      ? "  mb-8 mt-8 h-106 w-72 object-contain rounded-t-xl bg-white shadow-lg rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
      : " mb-8 mt-8 h-106 w-72 object-contain rounded-t-xl bg-white shadow-lg rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
    : " mb-8 mt-8 h-53 w-36 object-contain rounded-t-xl bg-white shadow-lg rounded-xl duration-500 hover:scale-105 hover:shadow-xl";

  return (
    <div
      className={`  grid grid-cols-dynamic justify-items-center justify-center ${
        isResponsive ? "w-sm gap-y-0" : "w-fit gap-y-20 m-auto"
      } gap-x-14 mt-10 mb-5`}
      style={col as React.CSSProperties}
    >
      {data !== undefined &&
        data.map((value, index) => {
          return (
            <div key={index} className={size}>
              <CardData
                key={index}
                data={value}
                toggle={toggle}
                full={full}
                isResponsive={isResponsive}
              />
            </div>
          );
        })}
    </div>
  );
}

export default PictureGroupContainer;
