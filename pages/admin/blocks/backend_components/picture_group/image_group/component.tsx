import s from "./style/style.module.css";

import CardData from "./wrapper";
import PictureGroup from "../../../../../../models/PictureGroup";
import PictureGroupData from "../../../../../../models/PictureGroupData";

import { useEffect } from "react";

interface ImageGroupData {
  page_id: number;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  bloc: PictureGroup;
  toggle: boolean;
}

function ImageGroup({ bloc, page_id, toggle, setToggle }: ImageGroupData) {
  const show_remove =
    bloc !== undefined && bloc.picture_group_data !== undefined
      ? bloc.picture_group_data !== undefined
        ? bloc.picture_group_data.length > 2
          ? true
          : false
        : undefined
      : undefined;

  useEffect(() => {}, [toggle, bloc.picture_group_data]);
  return (
    show_remove !== undefined &&
    bloc !== undefined && (
      <div className={s.body}>
        <div
          className={s.cards}
          style={{
            minHeight: `${bloc.height}px`,
            width: `100%`,
            height: `fit-content`,
            display: "grid",
            gridTemplateColumns: `repeat(2, 1fr)`,
            gap: `${bloc.gap}px`,
            justifyContent: "space-around",
          }}
        >
          {bloc.picture_group_data !== undefined &&
            bloc.picture_group_data.map(
              (value: PictureGroupData, index: number) => {
                return (
                  <div
                    className={s.cards}
                    style={{ height: `fit-content` }}
                    key={index}
                  >
                    <CardData
                      bloc={bloc}
                      data={value}
                      index={index}
                      show_remove={show_remove}
                      page_id={page_id}
                      toggle={toggle}
                      setToggle={setToggle}
                    />
                  </div>
                );
              }
            )}
        </div>
      </div>
    )
  );
}
export default ImageGroup;
