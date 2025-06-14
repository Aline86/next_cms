import s from "./style/style.module.css";
import remove from "./../../../../../assets/remove.png";
import PictureGroup from "../../../../../../models/PictureGroup";
import PictureGroupData from "../../../../../../models/PictureGroupData";

import Image from "next/image";
import DragAndDrop from "../../../../../../lib/dragzone";
import { useEffect, useState } from "react";
import useBlocStore from "../../../../../../store/blocsStore";
import DropdownData from "../../../../../../lib/dropdown/Dropdown";
import { Input, Textarea } from "@headlessui/react";

interface CardDatas {
  bloc: PictureGroup;
  page_id: number;

  index: number;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;

  toggle: boolean;
}

function CardData({
  bloc,
  page_id,

  index,
  setToggle,

  toggle,
}: CardDatas) {
  const removeItem = useBlocStore((state) => state.removeItem);
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const data = bloc.picture_group_data[index] as PictureGroupData;
  const [dataValue, setDataValue] = useState(data as PictureGroupData);
  const [checked, setChecked] = useState(data.is_data_button);
  const array_all_possible_types = ["external_link", "mailto", "pageID"];
  const show_remove =
    bloc !== undefined &&
    bloc.picture_group_data !== undefined &&
    bloc.picture_group_data.length > 4
      ? true
      : false;

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
              const updatedData = {};
              setDataValue(updatedData as PictureGroupData);
            }}
          />
        ) : (
          ""
        )}
      </div>
      <div>
        <DropdownData
          page_id={page_id}
          data={data}
          index={index}
          bloc={bloc}
          dropdown_elements={array_all_possible_types}
        />
        <div className={s.flex_row}>
          <h3>Couleur du texte</h3>
          <Input
            type="color"
            className={s.color}
            value={data.text_color}
            onChange={(e) => {
              updateComponent(e, "text_color", undefined, index, bloc);
            }}
          />
          <h3>Couleur du fond</h3>
          <Input
            type="color"
            className={s.color}
            value={data.background_color}
            onChange={(e) => {
              updateComponent(e, "background_color", undefined, index, bloc);
            }}
          />
          <h3>Ajouter un bouton</h3>
          <Input
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
        <Textarea
          id="message"
          value={data.text === dataValue.text ? dataValue.text : ""}
          placeholder="texte de la carte"
          onChange={(e) => {
            updateComponent(e, "text", undefined, index, bloc);
            const updatedData = { ...dataValue, text: e.target.value };
            setDataValue(updatedData as PictureGroupData);
          }}
          className="mt-8 block  p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></Textarea>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default CardData;
