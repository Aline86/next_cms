import remove from "./../../../../../assets/remove.png";

import Image from "next/image";
import DragAndDrop from "./../../../../../../lib/dragzone";

import CarouselData from "./../../../../../../models/CarouselData";
import Carousel from "./../../../../../../models/Carousel";
import useBlocStore from "./../../../../../../store/blocsStore";
import { useEffect, useState } from "react";

interface CardDatas {
  data: CarouselData | Record<string, unknown>;
  index: number;
  bloc: Carousel;

  page_id: number;
  toggle: boolean;
}

function CardData({ data, index, bloc, toggle }: CardDatas) {
  const show_remove =
    bloc !== undefined &&
    bloc.carousel_data !== undefined &&
    bloc.carousel_data.length > 4
      ? true
      : false;
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const removeItem = useBlocStore((state) => state.removeItem);
  const image =
    data !== undefined
      ? data.image_url !== ""
        ? data.image_url
        : undefined
      : undefined;
  const value = bloc.carousel_data[index] as CarouselData;
  const [dataValue, setDataValue] = useState(value as CarouselData);
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
            />
          </div>
        </div>
      </div>

      <textarea
        id="message"
        value={typeof data.text === "string" ? data.text : ""}
        placeholder="texte de la carte"
        onChange={(e) => {
          updateComponent(e, "text", undefined, index, bloc);
          const updatedData = { ...dataValue, text: e.target.value };
          setDataValue(updatedData as CarouselData);
        }}
        className="mt-8 block  p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></textarea>
    </div>
  ) : (
    <div></div>
  );
}

export default CardData;
