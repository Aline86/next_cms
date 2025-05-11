import PictureGroup from "../../../../../../models/PictureGroup";
import PictureGroupData from "../../../../../../models/PictureGroupData";
import Grid from "./wrapper";
import InputTypes from "../../../../../../lib/InputTypes";
import ComponentTypes from "../../../../../../lib/types";

interface ImageGroupData {
  toggle: boolean;
  updatePictureGroupData: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: string | number | undefined,
    bloc?: ComponentTypes
  ) => Promise<void>;
  bloc: PictureGroup;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function GridGroup({ updatePictureGroupData, bloc }: ImageGroupData) {
  const show_remove = bloc?.picture_group_data?.length > 2 ? true : false;

  return (
    <div className="columns-1 sm:columns-1 lg:columns-2 gap-4 space-y-3">
      {bloc !== undefined &&
        bloc.picture_group_data !== undefined &&
        bloc.picture_group_data?.map(
          (value: PictureGroupData, index: number) => {
            return (
              <div key={index}>
                <Grid
                  bloc={bloc}
                  data={value}
                  index={index}
                  updatePictureGroupData={async (
                    event: InputTypes,
                    field: string | undefined,
                    input: string | undefined,
                    index?: string | number | undefined,
                    bloc?: ComponentTypes
                  ): Promise<void> => {
                    await updatePictureGroupData(
                      event,
                      field,
                      input,
                      index,
                      bloc
                    );
                  }}
                  show_remove={show_remove}
                />
              </div>
            );
          }
        )}
    </div>
  );
}
export default GridGroup;
