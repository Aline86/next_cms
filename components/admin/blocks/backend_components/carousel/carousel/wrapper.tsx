import remove from "./../../../../../assets/remove.png";

import Image from "next/image";
import DragAndDrop from "../../../../../../lib/dragzone";
import CarouselData from "../../../../../../models/CarouselData";
import Carousel from "../../../../../../models/Carousel";
import useBlocStore from "../../../../../../store/blocsStore";
import { useEffect } from "react";
import DropdownData from "../../../../../../lib/dropdown/Dropdown";

interface CardDatas {
  data: CarouselData | Record<string, unknown>;
  index: number;
  toggle: boolean;
  bloc: Carousel;
  show_remove: boolean;
  page_id: number;
}

function CardData({
  data,
  index,
  toggle,
  show_remove,
  bloc,
  page_id,
}: CardDatas) {
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const removeItem = useBlocStore((state) => state.removeItem);
  const image =
    data !== undefined
      ? data.image_url !== ""
        ? data.image_url
        : undefined
      : undefined;
  useEffect(() => {}, [toggle]);

  return data !== undefined ? (
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
            }}
          />
        ) : (
          ""
        )}
      </div>
      <DropdownData
        bloc={bloc}
        data={data as CarouselData}
        page_id={page_id}
        index={index}
      />
      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          width: "100%",
        }}
      ></div>

      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          width: "100%",
        }}
      >
        <div className="mt-8 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
          <div className="mt-8 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
            <DragAndDrop
              field={"image_url"}
              key={1}
              index={index}
              bloc={bloc}
              data_img={
                image !== undefined &&
                image !== null &&
                typeof image === "string"
                  ? image
                  : ""
              }
              subfield={""}
              toggle={false}
            />
          </div>
        </div>
      </div>

      <textarea
        id="message"
        defaultValue={typeof data.text === "string" ? data.text : ""}
        placeholder="texte de la carte"
        onChange={(e) => {
          updateComponent(e, "text", undefined, index, bloc);
        }}
        className="mt-8 block  p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></textarea>
    </div>
  ) : (
    <div></div>
  );
}

export default CardData;
