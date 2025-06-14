"use client";
import { Input } from "@headlessui/react";
import DragAndDrop from "../../../../../lib/dragzone";
import ButtonModel from "../../../../../models/Button";
import { useEffect, useState } from "react";
import useBlocStore from "../../../../../store/blocsStore";
import DropdownData from "../../../../../lib/dropdown/Dropdown";
import ButtonSaveAll from "../../../../../lib/buttonSaveAll";

interface CardDatas {
  bloc: ButtonModel;
  page_id: number;
  toggle: boolean;
}

function ButtonInput({ bloc, page_id, toggle }: CardDatas) {
  const array_all_possible_types = [
    "external_link",
    "file",
    "mailto",
    "pageID",
  ];

  const [is_parallaxe, setIsParallaxe] = useState(false);
  useEffect(() => {
    if (bloc !== undefined) {
      setIsParallaxe(bloc.is_parallaxe);
    }
  }, []);
  const updateComponent = useBlocStore((state) => state.updateBloc);

  useEffect(() => {}, [is_parallaxe]);
  return bloc !== undefined ? (
    <div className="w-full">
      <div className="w-full">
        <div className="">
          <div className="">
            <h2>Bloc numéro : {bloc.bloc_number}</h2>
          </div>
          <h3 className="underline mt-8">Bouton</h3>
        </div>
      </div>
      <div className="">
        <div className="mt-8 mb-8">
          <div className="border-1 border-gray-300 rounded-lg p-4 mb-4">
            <h3>Transformer en parallaxe avec bouton : </h3>
            <input
              className="w-[35px] h-[35px] m-8"
              type="checkbox"
              checked={is_parallaxe}
              onChange={() => {
                updateComponent(
                  !is_parallaxe,
                  "is_parallaxe",
                  undefined,
                  undefined,
                  bloc
                );
                setIsParallaxe(!is_parallaxe);
              }}
            />
          </div>

          {!is_parallaxe && (
            <>
              <h3>Couleur de l&apos;arrière plan :</h3>
              <Input
                type="color"
                className=""
                defaultValue={bloc.background_color}
                onChange={(e) => {
                  updateComponent(
                    e,
                    "background_color",
                    undefined,
                    undefined,
                    bloc
                  );
                }}
              />
            </>
          )}
          <Input
            className="bg-slate-100 w-full"
            type="text"
            defaultValue={bloc.title}
            onChange={(e) => {
              updateComponent(e, "title", undefined, undefined, bloc);
            }}
          />

          <div className="mt-8 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
            <div className="mt-8 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
              <DragAndDrop
                field={"image_url"}
                key={1}
                index={undefined}
                bloc={bloc}
                data_img={bloc.image_url !== undefined ? bloc.image_url : ""}
                subfield={""}
                toggle={false}
              />
            </div>
          </div>
          <DropdownData
            bloc={bloc}
            page_id={page_id}
            data={bloc}
            dropdown_elements={array_all_possible_types}
          />
          {!is_parallaxe && (
            <textarea
              id="message"
              defaultValue={bloc.text}
              placeholder="texte de la carte"
              maxLength={90}
              onChange={(e) => {
                updateComponent(e, "text", undefined, undefined, bloc);
              }}
              className="mt-8 block  p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          )}
          <h3>Texte du bouton :</h3>
          <Input
            className="bg-slate-100 w-full"
            defaultValue={bloc.button_text}
            maxLength={25}
            placeholder="texte de la carte"
            onChange={(e) => {
              updateComponent(e, "button_text", undefined, undefined, bloc);
            }}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <ButtonSaveAll bloc={bloc} toggle={toggle} />
      </div>
    </div>
  ) : (
    <></>
  );
}
export default ButtonInput;
