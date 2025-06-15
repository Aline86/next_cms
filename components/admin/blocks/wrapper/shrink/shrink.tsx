import up from "./../assets/up.png";
import down from "./../assets/down.png";
import Image from "next/image";
import ComponentTypes from "./../../../../../lib/types";
import { useEffect, useState } from "react";
interface ShrinkData {
  index: number;
  bloc: ComponentTypes;
  props: React.ReactNode;
  isOpen: boolean;
}

function Shrink({ props, bloc, index, isOpen }: ShrinkData) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {}, [open]);
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
              {bloc.type !== "header" && bloc.type !== "footer"
                ? `${"Bloc n° " + Number(index - 1) + " : " + bloc.get_name()}`
                : bloc.get_name()}
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
