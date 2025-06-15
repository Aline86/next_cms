import { useEffect } from "react";
import remove from "./../../../wrapper/assets/remove.png";
import Image from "next/image";
import DragAndDrop from "./../../../../../../lib/dragzone";
import useBlocStore from "./../../../../../../store/blocsStore";
import PictureGroupData from "./../../../../../../models/PictureGroupData";
import PictureGroup from "./../../../../../../models/PictureGroup";

interface GridData {
  bloc_data: PictureGroupData;
  bloc: PictureGroup;
  index: number;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;

  toggle: boolean;
}

function Grid({ bloc_data, bloc, toggle, index, setToggle }: GridData) {
  const removeItem = useBlocStore((state) => state.removeItem);
  const show_remove = bloc?.picture_group_data?.length > 2 ? true : false;
  useEffect(() => {}, [toggle]);
  return bloc !== undefined ? (
    <div>
      {show_remove ? (
        <div
          className="flex justify-end "
          onClick={() => {
            removeItem(bloc, index);
            setToggle(!toggle);
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
            data_img={bloc_data.image_url}
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
