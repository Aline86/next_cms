import s from "./style.module.css";

import TextPicture from "../../../../../../models/TextPicture";

import React from "react";

import { Button, Input } from "@headlessui/react";
import useBlocStore from "../../../../../../store/blocsStore";

function CssTextPicturePosition({
  props,
  setRefresh,
  refresh,
  bloc,
  draggable,
}: {
  props: React.ReactNode;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  bloc: TextPicture | undefined;
  draggable: boolean;
  refresh: boolean;
}) {
  const updateBloc = useBlocStore((state) => state.updateBloc);
  const saveBlocAll = useBlocStore((state) => state.saveBlocAll);
  return bloc !== undefined ? (
    <div className="w-full mb-8">
      <div className="mt-8">
        <h2>Bloc numéro : {bloc?.bloc_number}</h2>
      </div>
      <div className={s.bouton_container_parent}>
        <h3 className="mt-8 underline">Bloc texte Image : </h3>
        <div className="flex flex w-full">
          <div className="flex w-[100%] gap-8 mt-8 mb-8">
            <div className="flex flex-wrap gap-4 ">
              <div
                className="flex flex-col cursor-pointer"
                onClick={() => {
                  updateBloc(false, "image_right", undefined, undefined, bloc);
                  updateBloc(false, "bloc_column", undefined, undefined, bloc);
                }}
              >
                <div className="border border-gray-300 p-1 text-center w-[200px]">
                  titre
                </div>
                <div className="flex">
                  <div className=" border border-gray-300 p-1 text-center w-[100px] h-[50px]">
                    image
                  </div>
                  <div className="border border-gray-300 p-1 text-center w-[100px] h-[50px]">
                    texte
                  </div>
                </div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  updateBloc(true, "image_right", undefined, undefined, bloc);
                  updateBloc(false, "bloc_column", undefined, undefined, bloc);
                }}
              >
                <div className="border border-gray-300 p-1 text-center w-[200px]">
                  titre
                </div>
                <div className="flex">
                  <div className=" border border-gray-300 p-1 text-center w-[100px] h-[50px]">
                    texte
                  </div>
                  <div className="border border-gray-300 p-1 text-center w-[100px] h-[50px]">
                    image
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  updateBloc(true, "bloc_column", undefined, undefined, bloc);
                }}
              >
                <div className="border border-gray-300 p-1 text-center w-[200px]">
                  titre
                </div>
                <div className="border border-gray-300 p-1 text-center w-[200px]">
                  image
                </div>
                <div className="border border-gray-300 p-1 text-center w-[200px]">
                  texte
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-8 mb-8">
            <div className="flex gap-8">
              <h3>Couleur du bloc:</h3>
              <input
                type="color"
                value={bloc?.background_color}
                onChange={(e) => {
                  updateBloc(e, "color", "", "", bloc);
                }}
              />
            </div>
          </div>
        </div>
        <div className={s.bouton_container}>
          <div className={s.encart_bloc_name}>
            <div className={s.bouton_container_bloc}>
              <div className={s.bouton_position_2}>
                <div>
                  <h3>Largeur de l&apos;image</h3>
                  <Input
                    className="mb-8 mt-8"
                    type="number"
                    value={bloc?.css.width as string | number | undefined}
                    onChange={(e) =>
                      updateBloc(e, "css", "width", undefined, bloc)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div draggable={draggable}>{props}</div>
      </div>

      <div className="flex justify-end">
        <Button
          className="block leading-1 bg-slate-800 text-slate-50 cursor-pointer rounded min-w-[150px] h-[50px] mt-8"
          onClick={(e) => {
            e.preventDefault();
            saveBlocAll();
            setRefresh(!refresh);
          }}
        >
          Enregistrer
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default CssTextPicturePosition;
