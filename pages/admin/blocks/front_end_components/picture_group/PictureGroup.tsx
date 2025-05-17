"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import PictureGroupContainer from "./PictureGroupContainer";
import PictureGroup from "../../../../../models/PictureGroup";
import PictureGroupData from "../../../../../models/PictureGroupData";

interface CustomCarouselInfo {
  input_bloc: PictureGroup | Record<string, unknown> | undefined;
  toggle: boolean;

  full: boolean;
  isResponsive: boolean;
}
function PictureGroupVizualisation({
  input_bloc,
  toggle,

  full,
  isResponsive,
}: CustomCarouselInfo) {
  const [dataValue] = useState<
    PictureGroupData[] | Record<string, unknown>[] | undefined
  >(
    input_bloc !== undefined
      ? (input_bloc.picture_group_data as
          | PictureGroupData[]
          | Record<string, unknown>[]
          | undefined)
      : undefined
  );
  const [result, setResult] = useState<MediaQueryList>();
  const [result_2, setResult2] = useState<MediaQueryList>();
  const [col, set_col] = useState<{ "--columns": number }>();

  function updateSize() {
    if (input_bloc === undefined) return;
    const col_data = {
      "--columns": isResponsive
        ? 1
        : result_2?.matches && Number(input_bloc.width) > 2 && !result?.matches
        ? 2
        : result?.matches && Number(input_bloc.width) > 1
        ? 1
        : Number(input_bloc.width),
    };
    set_col(col_data);
  }
  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 700px)") as MediaQueryList);
    setResult2(window?.matchMedia("(max-width: 1200px)") as MediaQueryList);
  }, []);
  useEffect(() => {
    window?.addEventListener("resize", updateSize);
    if (input_bloc !== undefined) {
      set_col({
        "--columns": isResponsive
          ? 1
          : result_2?.matches &&
            Number(input_bloc.width) > 2 &&
            !result?.matches
          ? 2
          : result?.matches && Number(input_bloc.width) > 1
          ? 1
          : Number(input_bloc.width),
      });
    }
    updateSize();
  }, [result?.matches, result_2?.matches]);

  useEffect(() => {
    window?.addEventListener("resize", updateSize);
    if (input_bloc !== undefined) {
      set_col({
        "--columns": isResponsive
          ? 1
          : result_2?.matches &&
            Number(input_bloc.width) > 2 &&
            !result?.matches
          ? 2
          : result?.matches && Number(input_bloc.width) > 1
          ? 1
          : Number(input_bloc.width),
      });
    }
  }, [input_bloc?.width, isResponsive]);

  useEffect(() => {}, [col]);
  return input_bloc !== undefined ? (
    <div className=" mt-16 mb-16">
      {input_bloc.title !== "" && (
        <h2 className="text-center mb-8 text-3xl">
          {String(input_bloc.title)}
        </h2>
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
