import s from "./style.module.css";

import PictureGroup from "../../../../../../models/PictureGroup";

import { useEffect } from "react";
import { Button, Input } from "@headlessui/react";
import useBlocStore from "../../../../../../store/blocsStore";

function CssPictureGroupPosition({
  props,
  toggle,
  bloc,
  draggable,
  setRefresh,
  refresh,
}: {
  props: React.ReactNode;
  toggle: boolean;
  refresh: boolean;
  bloc: PictureGroup;
  draggable: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const addItem = useBlocStore((state) => state.addItem);
  const saveBlocAll = useBlocStore((state) => state.saveBlocAll);

  useEffect(() => {}, [refresh, toggle]);
  return bloc !== undefined ? (
    <div className="w-full">
      <div className="flex justify-start">
        <Button
          className="bg-slate-800 text-slate-50 cursor-pointer w-[200px] text-xl h-[50px] rounded"
          onClick={() => {
            addItem(bloc);
            setRefresh(!refresh);
          }}
        >
          Ajouter un élément +
        </Button>
      </div>

      <div className="w-full">
        <div className={s.encart_bloc_name_title}>
          <div className={s.encart_bloc_name_title}>
            <h2>Bloc numéro : {bloc.bloc_number}</h2>
          </div>
          <h3
            style={{
              textDecoration: "underline",
              marginTop: "30px",
            }}
          >
            {bloc.is_grid ? "Grille d'images" : "Groupe d'images"}
          </h3>
        </div>
        <div className="flex flex-col justify-start">
          <div className="mt-8">Titre du bloc</div>
          <Input
            className="bg-slate-100 mt-8 "
            value={bloc.title}
            onChange={(e) => {
              updateComponent(e, "title", "", undefined, bloc as PictureGroup);
            }}
          />
        </div>
        <div className={s.bouton_container_bloc}>
          <div className="block mb-8">
            <label className="block mt-8 mb-4 text-xl font-medium text-gray-900 ">
              Nombre de colonnes :
            </label>
            <div className="flex justify-between">
              <div>A</div>
              <div>B</div>
              <div>C</div>
              <div>D</div>
            </div>
            <input
              id="default-range"
              min="1"
              max="4"
              value={bloc.width ? bloc.width : 2} // safe access
              type="range"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer-not-big dark:bg-gray-700"
              onChange={(e) => {
                e.preventDefault();
                updateComponent(e, "width", undefined, undefined, bloc);
              }}
            />
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

export default CssPictureGroupPosition;
