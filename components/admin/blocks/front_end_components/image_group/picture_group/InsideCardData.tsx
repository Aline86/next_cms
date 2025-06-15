import Image from "next/image";
import PictureGroupData from "./../../../../../../models/PictureGroupData";

function rotateToMouse(e: React.MouseEvent<HTMLElement>): void {
  const card = e.currentTarget as HTMLElement;
  const bounds = card.getBoundingClientRect();

  const mouseX: number = e.clientX;
  const mouseY: number = e.clientY;
  const leftX: number = mouseX - bounds.x;
  const topY: number = mouseY - bounds.y;
  const center = {
    x: leftX - bounds.width / 2,
    y: topY - bounds.height / 2,
  };
  const distance: number = Math.sqrt(center.x ** 2 + center.y ** 2);

  card.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${Math.log(distance) * 4}deg
      )
  `;
}

interface CardDatas {
  data: PictureGroupData | Record<string, unknown> | undefined;

  full: boolean;
}

function InsideCardData({
  data,

  full,
}: CardDatas) {
  const hw = full ? "h-106 w-72" : "h-full w-36";

  const left_out = "shadow-sm rounded-xl duration-500 hover:scale-105";

  const size = full
    ? hw + " object-cover rounded-t-xl bg-white shadow-sm z-90 " + left_out
    : hw +
      " w-36 object-cover rounded-t-xl bg-white shadow-sm  z-90 " +
      left_out;
  const img =
    data !== undefined
      ? process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
        "/api/uploadfile/" +
        data.image_url
      : "";
  const text_color =
    data !== undefined && data.image_url !== ""
      ? full
        ? "text-gray-100 text-xl "
        : "text-gray-100 text-sm "
      : " text-gray-500";
  const text_size = full
    ? "w-full text-fit text-2xl " + text_color
    : data !== undefined && data.text !== "" && !data.is_data_button
    ? "absolute text-fit bottom-8 text-sm " + text_color
    : "absolute text-fit text-sm " + text_color;
  const text_height =
    full && data !== undefined && data.text !== ""
      ? "relative top-6 w-full h-full flex z-100 flex-col justify-spacing "
      : "relative p-1 top-3 w-full h-full z-100 flex flex-col ";
  const button_height = full
    ? "absolute bottom-15 left-7 h-[50px] leading-[50px]"
    : "absolute h-[35px] absolute left-3.5 bottom-8 ";
  const flex_position =
    data !== undefined && data.text !== "" && !data.is_data_button && full
      ? " flex-col justify-end mb-12 ml-4 mr-4"
      : data !== undefined && data.text !== "" && data.is_data_button && !full
      ? ""
      : !full
      ? ""
      : "ml-4 mr-4";
  const background_picture = `h-full relative shadow-sm  rounded-xl`;
  return data !== undefined ? (
    <div
      onMouseMove={(e) => rotateToMouse(e)}
      onMouseLeave={(e) => {
        const card = e.currentTarget as HTMLElement;
        card.style.transform = `scale3d(1, 1, 1)`;
      }}
      className={"bg_img_group " + background_picture + " card"}
      style={{ backgroundColor: String(data.background_color) }}
    >
      {data.image_url != "" ? (
        <Image src={`${img}`} alt="Image" className={size} fill={true} />
      ) : (
        ""
      )}

      <div className={text_height}>
        {data.text != "" && (
          <div className={"flex w-[90%] h-full " + flex_position}>
            <p
              style={{
                color: String(data.text_color),
                wordBreak: "break-word",
              }}
              className={text_size}
            >
              {String(data.text)}
            </p>
          </div>
        )}
        {Boolean(data.is_data_button) === true && (
          <div
            style={{
              border: "1px solid " + String(data.text_color),
              color: String(data.text_color),
              backgroundColor: "#00000030",
              wordBreak: "break-word",
            }}
            className={`buttons border border-white border-solid border-1 block w-[80%]  text-center text-gray-100 rounded ${button_height}`}
          >
            Voir
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default InsideCardData;
