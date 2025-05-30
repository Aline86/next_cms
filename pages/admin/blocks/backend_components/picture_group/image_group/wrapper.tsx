import s from "./style/style.module.css";
import remove from "./../../../../../assets/remove.png";
import PictureGroup from "../../../../../../models/PictureGroup";
import PictureGroupData from "../../../../../../models/PictureGroupData";
import DropdownData from "../dropdown/Dropdown";
import Image from "next/image";
import DragAndDrop from "../../../../../../lib/dragzone";
import InputTypes from "../../../../../../lib/InputTypes";
import ComponentTypes from "../../../../../../lib/types";

interface CardDatas {
  bloc: PictureGroup;
  page_id: number;
  data: PictureGroupData;
  index: number;
  updateComponent: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: string | number | undefined,
    bloc?: ComponentTypes
  ) => Promise<void>;
  show_remove: boolean;
}

function CardData({
  bloc,
  page_id,
  data,
  index,
  updateComponent,
  show_remove,
}: CardDatas) {
  return data !== undefined && bloc !== undefined ? (
    <div>
      <div className="flex flex-row items-center justify-end gap-[15px] relative z-[9] cursor-pointer border-0">
        {show_remove ? (
          <Image
            src={remove}
            width="35"
            height="35"
            alt="suppression box"
            onClick={(e) => {
              updateComponent(e, "remove", undefined, index, bloc);
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
          updateComponent={updateComponent}
          bloc={bloc}
        />
        <div className={s.flex_row}>
          <h3>Couleur du texte</h3>
          <input
            type="color"
            className={s.color}
            value={data.text_color}
            onChange={(e) => {
              updateComponent(e, "text_color", undefined, index, bloc);
            }}
          />
          <h3>Couleur de fond</h3>
          <input
            type="color"
            className={s.color}
            value={data.background_color}
            onChange={(e) => {
              updateComponent(e, "background_color", undefined, index, bloc);
            }}
          />
          <h3>Ajouter un bouton</h3>
          <input
            type="checkbox"
            checked={data.is_data_button}
            onChange={(e) => {
              updateComponent(e, "is_data_button", undefined, index, bloc);
            }}
          />
        </div>
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
            await updateComponent(event, field, input, index, bloc);
          }}
          subfield={undefined}
        />{" "}
        <textarea
          id="message"
          value={data.text}
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
