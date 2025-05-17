"use client";
import { useEffect, useState } from "react";

import PictureGroupContainer from "./PictureGroupContainer";
import PictureGroupData from "../../../../../models/PictureGroupData";
import PictureGroup from "../../../../../models/PictureGroup";

interface CustomCarouselInfo {
  input_bloc: Record<string, unknown> | PictureGroup;
  toggle: boolean;
  refresh: boolean;
  isResponsive: boolean;
}
function GridVizualisation({
  input_bloc,
  toggle,
  refresh,
  isResponsive,
}: CustomCarouselInfo) {
  const [dataValue, setData] = useState<PictureGroupData[]>();

  useEffect(() => {
    setData(input_bloc.picture_group_data as PictureGroupData[]);
  }, [toggle, refresh, input_bloc, input_bloc.width]);
  useEffect(() => {}, [dataValue]);
  return (
    <div className="relative ">
      {input_bloc !== undefined &&
        input_bloc.title !== undefined &&
        input_bloc.type === "picture_group" && (
          <h2 className="text-center mb-16 mt-24 text-3xl">
            {String(input_bloc.title)}
          </h2>
        )}
      {dataValue !== undefined && (
        <PictureGroupContainer
          data={dataValue}
          toggle={toggle}
          isResponsive={isResponsive}
          width={
            ["1", "2", "3", "4"].includes(Number(input_bloc.width).toString())
              ? (Number(input_bloc.width).toString() as "1" | "2" | "3" | "4")
              : "1"
          }
        />
      )}
    </div>
  );
}

export default GridVizualisation;
