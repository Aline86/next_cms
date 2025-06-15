"use client";
import s from "./style/style.module.css";

import CardData from "./wrapper";
import PictureGroup from "./../../../../../../models/PictureGroup";

import { useEffect } from "react";

interface ImageGroupData {
  page_id: number;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  bloc: PictureGroup;
  refresh: boolean;
  toggle: boolean;
}

function ImageGroup({
  bloc,
  page_id,

  setToggle,
  toggle,
}: ImageGroupData) {
  const show_remove =
    bloc !== undefined && bloc.picture_group_data !== undefined
      ? bloc.picture_group_data !== undefined
        ? bloc.picture_group_data.length > 2
          ? true
          : false
        : undefined
      : undefined;

  useEffect(() => {}, [bloc, toggle, page_id]);
  return (
    show_remove !== undefined &&
    bloc !== undefined && (
      <div className={s.body}>
        <div
          className={s.cards}
          style={{
            minHeight: `${bloc.height}px`,

            height: `fit-content`,
            display: "grid",
            gridTemplateColumns: `repeat(2, 1fr)`,
            gap: `${bloc.gap}px`,
            justifyContent: "space-around",
          }}
        >
          {bloc.picture_group_data !== undefined &&
            bloc.picture_group_data.map((_, index: number) => {
              return (
                <div
                  className={s.cards}
                  style={{ height: `fit-content` }}
                  key={index}
                >
                  <CardData
                    bloc={bloc}
                    index={index}
                    page_id={page_id}
                    setToggle={setToggle}
                    toggle={toggle}
                  />
                </div>
              );
            })}
        </div>
      </div>
    )
  );
}
export default ImageGroup;
