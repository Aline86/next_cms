import s from "./style/style.module.css";

import CardData from "./wrapper";
import PictureGroup from "../../../../../../models/PictureGroup";
import PictureGroupData from "../../../../../../models/PictureGroupData";
import InputTypes from "../../../../../../lib/InputTypes";
import ComponentTypes from "../../../../../../lib/types";

interface ImageGroupData {
  page_id: number;
  updateComponent: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: string | number | undefined,
    bloc?: ComponentTypes
  ) => Promise<void>;
  bloc: PictureGroup;
}

function ImageGroup({ updateComponent, bloc, page_id }: ImageGroupData) {
  const show_remove =
    bloc !== undefined && bloc.picture_group_data !== undefined
      ? bloc.picture_group_data !== undefined
        ? bloc.picture_group_data.length > 2
          ? true
          : false
        : undefined
      : undefined;
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
                      updateComponent={async (
                        event: InputTypes,
                        field: string | undefined,
                        input: string | undefined,
                        index?: string | number | undefined,
                        bloc?: ComponentTypes
                      ): Promise<void> => {
                        await updateComponent(event, field, input, index, bloc);
                      }}
                      show_remove={show_remove}
                      page_id={page_id}
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
