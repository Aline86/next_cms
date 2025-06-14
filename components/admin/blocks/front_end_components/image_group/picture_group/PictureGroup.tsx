"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import PictureGroupContainer from "./PictureGroupContainer";
import PictureGroup from "../../../../../../models/PictureGroup";
import PictureGroupData from "../../../../../../models/PictureGroupData";

interface CustomCarouselInfo {
  bloc: PictureGroup | Record<string, unknown> | undefined;
  toggle: boolean;

  full: boolean;
  isResponsive: boolean;
}
function PictureGroupVizualisation({
  bloc,
  toggle,

  full,
  isResponsive,
}: CustomCarouselInfo) {
  const [dataValue, setDataValue] = useState<
    PictureGroupData[] | Record<string, unknown>[] | undefined
  >(
    bloc !== undefined
      ? (bloc.picture_group_data as
          | PictureGroupData[]
          | Record<string, unknown>[])
      : undefined
  );
  console.log("bloc", bloc);
  const [result, setResult] = useState<MediaQueryList>();
  const [result_2, setResult2] = useState<MediaQueryList>();
  const [col, set_col] = useState<{ "--columns": number }>();

  function updateSize() {
    if (bloc === undefined) return;
    const col_data = {
      "--columns": isResponsive
        ? 1
        : result_2?.matches && Number(bloc.width) > 2 && !result?.matches
        ? 2
        : result?.matches && Number(bloc.width) > 1
        ? 1
        : Number(bloc.width),
    };
    set_col(col_data);
  }
  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 700px)") as MediaQueryList);
    setResult2(window?.matchMedia("(max-width: 1200px)") as MediaQueryList);
  }, []);
  useEffect(() => {
    window?.addEventListener("resize", updateSize);
    if (bloc !== undefined) {
      set_col({
        "--columns": isResponsive
          ? 1
          : result_2?.matches && Number(bloc.width) > 2 && !result?.matches
          ? 2
          : result?.matches && Number(bloc.width) > 1
          ? 1
          : Number(bloc.width),
      });
    }
    updateSize();
  }, [result?.matches, result_2?.matches]);

  useEffect(() => {
    window?.addEventListener("resize", updateSize);
    if (bloc !== undefined) {
      set_col({
        "--columns": isResponsive
          ? 1
          : result_2?.matches && Number(bloc.width) > 2 && !result?.matches
          ? 2
          : result?.matches && Number(bloc.width) > 1
          ? 1
          : Number(bloc.width),
      });
    }
  }, [bloc?.width, isResponsive]);

  useEffect(() => {}, [col, toggle]);

  useEffect(() => {
    setDataValue(
      bloc !== undefined && bloc.picture_group_data !== undefined
        ? (bloc.picture_group_data as
            | PictureGroupData[]
            | Record<string, unknown>[])
        : undefined
    );
  }, [toggle]);

  return bloc !== undefined ? (
    <div className=" mt-16 mb-16">
      {bloc.title !== "" && (
        <h2 className="text-center mb-8 text-3xl">{String(bloc.title)}</h2>
      )}
      {dataValue !== undefined && (
        <PictureGroupContainer
          data={dataValue}
          toggle={toggle}
          full={full}
          isResponsive={isResponsive}
          col={col}
        />
      )}
    </div>
  ) : (
    <></>
  );
}

export default PictureGroupVizualisation;
