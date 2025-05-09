import { useEffect } from "react";
import remove from "./../../../wrapper/assets/remove.png";
import PictureGroup from "../../../../../../models/PictureGroup";
import PictureGroupData from "../../../../../../models/PictureGroupData";
import Image from "next/image";
import DragAndDrop from "../../../../../../lib/dragzone";
import InputTypes from "../../../../../../lib/InputTypes";
import ComponentTypes from "../../../../../../lib/types";

interface GridData {
  bloc: PictureGroup;
  data: PictureGroupData;

  index: number;
  updatePictureGroupData: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: string | number | undefined,
    bloc?: ComponentTypes
  ) => Promise<void>;
  show_remove: boolean;
}

function Grid({
  bloc,

  data,
  index,
  updatePictureGroupData,
  show_remove,
}: GridData) {
  useEffect(() => {}, [bloc]);
  return bloc !== undefined ? (
    <div>
      {show_remove ? (
        <div
          className="flex justify-end "
          onClick={(e) => {
            updatePictureGroupData(e, "remove", undefined, index, bloc);
          }}
        >
          <Image
            className="absolute cursor-pointer"
            src={remove}
            width={30}
            height={30}
            alt="suppression box"
          />
        </div>
      ) : (
        ""
      )}

      {bloc !== undefined && (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700">
          <p className="font-normal text-gray-700 dark:text-gray-800">
            N° {Number(index) + 1}
          </p>
          <DragAndDrop
            field="image_url"
            key={index}
            index={index}
            bloc={bloc}
            data_img={data.image_url}
            update={async (
              event: InputTypes,
              field: string | undefined,
              input: string | undefined,
              index?: string | number | undefined,
              bloc?: ComponentTypes
            ): Promise<void> => {
              await updatePictureGroupData(event, field, input, index, bloc);
            }}
            subfield={undefined}
          />
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}

export default Grid;
