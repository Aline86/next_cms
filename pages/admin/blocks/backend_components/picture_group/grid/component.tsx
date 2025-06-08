import PictureGroup from "../../../../../../models/PictureGroup";
import PictureGroupData from "../../../../../../models/PictureGroupData";
import Grid from "./wrapper";
import { useEffect } from "react";

interface ImageGroupData {
  toggle: boolean;

  bloc: PictureGroup;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function GridGroup({ toggle, setToggle, bloc }: ImageGroupData) {
  const show_remove = bloc?.picture_group_data?.length > 2 ? true : false;
  useEffect(() => {}, [toggle, bloc.picture_group_data]);
  return (
    <div className="columns-1 sm:columns-1 lg:columns-2 gap-4 space-y-3">
      {bloc !== undefined &&
        bloc.picture_group_data !== undefined &&
        bloc.picture_group_data.map(
          (value: PictureGroupData, index: number) => {
            return (
              <div key={index}>
                <Grid
                  setToggle={setToggle}
                  bloc={bloc}
                  bloc_data={value}
                  index={index}
                  show_remove={show_remove}
                  toggle={toggle}
                />
              </div>
            );
          }
        )}
    </div>
  );
}
export default GridGroup;
