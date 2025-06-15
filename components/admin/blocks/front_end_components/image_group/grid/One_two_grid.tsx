"use client";
import { useEffect } from "react";

import CardDataGrid from "./CardData";
import PictureGroupData from "./../../../../../../models/PictureGroupData";

interface CarouselData {
  data: PictureGroupData[] | undefined | Record<string, unknown>[];
  toggle: boolean;
  isResponsive: boolean;
}

function OneTwoGrid({ data, toggle, isResponsive }: CarouselData) {
  useEffect(() => {}, [toggle]);
  const row = "grid grid-col gap-16 m-auto";
  return (
    <div className={row}>
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((card, index) => {
          if (index % 3 === 0) {
            return (
              <CardDataGrid
                key={index}
                data={card}
                index={index}
                isResponsive={isResponsive}
                toggle={toggle}
              />
            );
          }

          if (index % 3 === 1) {
            return (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
              >
                <CardDataGrid
                  data={card}
                  index={index}
                  isResponsive={isResponsive}
                  toggle={toggle}
                />
                {data[index + 1] && (
                  <CardDataGrid
                    data={data[index + 1]}
                    index={index + 1}
                    isResponsive={isResponsive}
                    toggle={toggle}
                  />
                )}
              </div>
            );
          }

          // index % 3 === 2 cards are already handled in the pair above
        })}
    </div>
  );
}

export default OneTwoGrid;
