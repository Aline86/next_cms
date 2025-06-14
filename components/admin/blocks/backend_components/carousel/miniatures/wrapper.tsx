import remove from "./../../../../../assets/remove.png";
import Carousel from "../../../../../../models/Carousel";
import Image from "next/image";
import DragAndDrop from "../../../../../../lib/dragzone";
import useBlocStore from "../../../../../../store/blocsStore";

interface CardDatas {
  gap: number;
  index: number;
  bloc: Carousel;
}

function CardData({ gap, index, bloc }: CardDatas) {
  const removeItem = useBlocStore((state) => state.removeItem);
  const image =
    bloc !== undefined && bloc.carousel_data !== undefined
      ? bloc.carousel_data[index].image_url !== ""
        ? bloc.carousel_data[index].image_url
        : undefined
      : undefined;
  const show_remove =
    bloc !== undefined &&
    bloc.carousel_data !== undefined &&
    bloc.carousel_data.length > 4
      ? true
      : false;
  return (
    <div
      style={{
        width: "300px",
        minWidth: "300px",
        height: `fit-content`,
        marginRight: `${gap}px`,
      }}
    >
      <div className="flex justify-end">
        {show_remove ? (
          <Image
            width={30}
            height={30}
            src={remove}
            alt="suppression box"
            onClick={() => {
              removeItem(bloc, index);
            }}
          />
        ) : (
          <div
            style={{
              color: "transparent",
              border: "none",
              height: "15px",
              width: "15px",
            }}
          ></div>
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
          <DragAndDrop
            field={"image_url"}
            key={1}
            index={index}
            bloc={bloc}
            data_img={
              image !== undefined && image !== null && typeof image === "string"
                ? image
                : ""
            }
            subfield={""}
            toggle={false}
          />
        </div>
      </div>
    </div>
  );
}

export default CardData;
