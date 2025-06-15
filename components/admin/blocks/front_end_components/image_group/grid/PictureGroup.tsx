"use client";
import { useEffect, useState } from "react";

import PictureGroupContainer from "./PictureGroupContainer";
import PictureGroupData from "./../../../../../../models/PictureGroupData";
import PictureGroup from "./../../../../../../models/PictureGroup";

interface CustomCarouselInfo {
  bloc: Record<string, unknown> | PictureGroup;
  toggle: boolean;
  refresh: boolean;
  isResponsive: boolean;
  page_id?: number;
}
function GridVizualisation({
  bloc,
  toggle,
  refresh,
  isResponsive,
}: CustomCarouselInfo) {
  const [dataValue, setData] = useState<PictureGroupData[]>();

  useEffect(() => {
    setData(bloc.picture_group_data as PictureGroupData[]);
  }, [toggle, refresh, bloc, bloc.width]);
  useEffect(() => {}, [dataValue]);
  return (
    <div className="relative ">
      {bloc !== undefined &&
        bloc.title !== undefined &&
        bloc.type === "picture_group" && (
          <h2 className="text-center mb-16 mt-24 text-3xl">
            {String(bloc.title)}
          </h2>
        )}
      {dataValue !== undefined && (
        <PictureGroupContainer
          data={dataValue}
          toggle={toggle}
          isResponsive={isResponsive}
          width={
            ["1", "2", "3", "4"].includes(Number(bloc.width).toString())
              ? (Number(bloc.width).toString() as "1" | "2" | "3" | "4")
              : "1"
          }
        />
      )}
    </div>
  );
}

export default GridVizualisation;
