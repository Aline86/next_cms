import { useEffect } from "react";

import CardDataGrid from "./CardData";
import PictureGroupData from "../../../../../models/PictureGroupData";

interface CarouselData {
  data: PictureGroupData[] | undefined;
  toggle: boolean;
  isResponsive: boolean;
}

function OneTwoGrid({ data, toggle, isResponsive }: CarouselData) {
  useEffect(() => {}, [toggle]);
  const row = "grid grid-col gap-16 m-auto";
  return (
    <div className={row}>
      {data !== undefined &&
        data.length > 0 &&
        data.map((card, index) => {
          // If index is 0 or every 3rd after (0, 3, 6...) => Full-width card
          if (index % 3 === 0) {
            return (
              <CardDataGrid
                key={index}
                data={card}
                index={index}
                isResponsive={isResponsive}
              />
            );
          }

          // If index is 1 or 2 after full-width card => grouped together in one row
          if (index % 3 === 1) {
            // Check if there's a next card (to make the pair)
            return (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
              >
                <CardDataGrid
                  data={card}
                  index={index}
                  isResponsive={isResponsive}
                />
                {data[index + 1] && (
                  <CardDataGrid
                    data={data[index + 1]}
                    index={index + 1}
                    isResponsive={isResponsive}
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
