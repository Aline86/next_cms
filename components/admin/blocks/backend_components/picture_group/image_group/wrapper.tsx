import s from "./style/style.module.css";
import remove from "./../../../../../assets/remove.png";
import PictureGroup from "../../../../../../models/PictureGroup";
import PictureGroupData from "../../../../../../models/PictureGroupData";

import Image from "next/image";
import DragAndDrop from "../../../../../../lib/dragzone";
import { useEffect, useState } from "react";
import useBlocStore from "../../../../../../store/blocsStore";
import DropdownData from "../../../../../../lib/dropdown/Dropdown";

interface CardDatas {
  bloc: PictureGroup;
  page_id: number;
  data: PictureGroupData;
  index: number;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  show_remove: boolean;
  toggle: boolean;
}

function CardData({
  bloc,
  page_id,
  data,
  index,
  setToggle,
  show_remove,
  toggle,
}: CardDatas) {
  const removeItem = useBlocStore((state) => state.removeItem);
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const [checked, setChecked] = useState(data.is_data_button);
  useEffect(() => {}, [toggle, checked]);

  return data !== undefined && bloc !== undefined ? (
    <div>
      <div className="flex flex-row items-center justify-end gap-[15px] relative z-[9] cursor-pointer border-0">
        {show_remove ? (
          <Image
            src={remove}
            width="35"
            height="35"
            alt="suppression box"
            onClick={() => {
              removeItem(bloc, index);
              setToggle(!toggle);
            }}
          />
        ) : (
          ""
        )}
      </div>
      <div>
        <DropdownData page_id={page_id} data={data} index={index} bloc={bloc} />
        <div className={s.flex_row}>
          <h3>Couleur du texte</h3>
          <input
            type="color"
            className={s.color}
            defaultValue={data.text_color}
            onChange={(e) => {
              updateComponent(e, "text_color", undefined, index, bloc);
            }}
          />
          <h3>Couleur de fond</h3>
          <input
            type="color"
            className={s.color}
            defaultValue={data.background_color}
            onChange={(e) => {
              updateComponent(e, "background_color", undefined, index, bloc);
            }}
          />
          <h3>Ajouter un bouton</h3>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              updateComponent(
                e.target.checked,
                "is_data_button",
                undefined,
                index,
                bloc
              );
              setChecked(!checked);
            }}
          />
        </div>
        <DragAndDrop
          field="image_url"
          key={index}
          index={index}
          bloc={bloc}
          data_img={data.image_url}
          subfield={undefined}
          toggle={toggle}
        />{" "}
        <textarea
          id="message"
          defaultValue={data.text}
          placeholder="texte de la carte"
          onChange={(e) => {
            updateComponent(e, "text", undefined, index, bloc);
          }}
          className="mt-8 block  p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default CardData;
