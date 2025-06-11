"use client"; /* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";

import CardDataGrid from "./CardData";
import PictureGroupData from "../../../../../models/PictureGroupData";
import OneTwoGrid from "./One_two_grid";

interface CarouselData {
  data: PictureGroupData[] | Record<string, unknown>[] | undefined;
  toggle: boolean;
  isResponsive: boolean;
  width: "1" | "2" | "3" | "4";
}

function PictureGroupContainer({
  data,
  toggle,
  isResponsive,
  width,
}: CarouselData) {
  const [classNames, setClassName] = useState<string>();
  const columnsClassMap: Record<string, string> = {
    "1": "columns-1 max-w-xl m-auto",
    "2": "columns-1 sm:columns-2 gap-4 space-y-3",
    "3": "columns-1 sm:columns-3 gap-4 space-y-3",
    "4": "columns-1 sm:columns-4 gap-4 space-y-3",
  };

  const updateWidth = useCallback((width: "1" | "2" | "3" | "4") => {
    setClassName(columnsClassMap[width]);
  }, []);

  useEffect(() => {
    updateWidth(width);
  }, [width]);

  useEffect(() => {}, [classNames, toggle]);
  return width === "1" ? (
    <div className={classNames}>
      <OneTwoGrid data={data} toggle={toggle} isResponsive={isResponsive} />
    </div>
  ) : (
    <div className={classNames}>
      {data !== undefined &&
        data.map((card, index) => {
          // If index is 0 or every 3rd after (0, 3, 6...) => Full-width card

          return (
            <CardDataGrid
              key={index}
              data={card}
              index={index}
              isResponsive={isResponsive}
              toggle={toggle}
            />
          );
        })}
    </div>
  );
}

export default PictureGroupContainer;
