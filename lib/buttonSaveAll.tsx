import { Button } from "@headlessui/react";
import { useEffect } from "react";
import ComponentTypes from "./types";
import useBlocStore from "../store/blocsStore";

interface CardDatas {
  bloc: ComponentTypes;
  toggle: boolean;
}

function ButtonSaveAll({ bloc, toggle }: CardDatas) {
  const saveBlocAll = useBlocStore((state) => state.saveBlocAll);

  useEffect(() => {}, [toggle]);
  return bloc !== undefined ? (
    <div className="">
      <div className="w-full">
        <div className="flex justify-end">
          <Button
            className="block leading-1 bg-slate-800 text-slate-50 cursor-pointer rounded min-w-[150px] h-[50px] mt-8"
            onClick={(e) => {
              e.preventDefault();

              saveBlocAll();
            }}
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
export default ButtonSaveAll;
