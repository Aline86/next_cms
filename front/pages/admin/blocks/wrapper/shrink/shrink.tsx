import { useState } from "react";
import up from "./../assets/up.png";
import down from "./../assets/down.png";
import Image from "next/image";
import ComponentTypes from "../../../../../lib/types";
import Carousel from "../../../../../models/Carousel";
import PictureGroup from "../../../../../models/PictureGroup";
interface ShrinkData {
  index: number;
  bloc: ComponentTypes;
  props: React.ReactNode;
  isOpen: boolean;
}

function Shrink({ props, bloc, index, isOpen }: ShrinkData) {
  const [open, setOpen] = useState(isOpen);
  return (
    <div className="w-full" key={index}>
      <div
        className="mb-8 flex justify-end items-center p-4 border border-gray-300 h-[70px] w-full"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {!open ? (
          <div className="flex justify-between items-center w-full">
            <div>
              {index > 0 && `${"Bloc n° " + index} : `}{" "}
              {bloc !== undefined &&
              bloc instanceof PictureGroup &&
              Boolean(bloc.is_grid)
                ? "Grille d'images"
                : bloc !== undefined && bloc.type === "picture_group"
                ? "Grille de cartes"
                : ""}
              {bloc !== undefined &&
                bloc.type === "header" &&
                "En-tête du site"}
              {bloc !== undefined &&
                bloc.type === "footer" &&
                "Pied de page du site"}
              {bloc !== undefined &&
                bloc.type === "text_picture" &&
                "Bloc texte image"}
              {bloc !== undefined &&
                bloc.type === "screen" &&
                "Image de couverture"}
              {bloc instanceof Carousel &&
                bloc.carousel_type === "miniatures" &&
                "Miniatures"}
            </div>
            <Image
              src={down}
              alt="fermer"
              className="w-[30px] mr-[30px] cursor-pointer"
              width={30}
              height={30}
            />
          </div>
        ) : (
          <Image
            src={up}
            alt="ouvrir"
            className="w-[30px] mr-[30px] cursor-pointer"
            width={30}
            height={30}
          />
        )}
      </div>
      {open && props}
    </div>
  );
}

export default Shrink;
