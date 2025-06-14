"use client";
import { useEffect } from "react";
import PictureGroup from "../../../../../models/PictureGroup";
import picturegroupTypes from "../../../../../lib/config/pictureGroupTypes";
import { Button } from "@headlessui/react";
import useBlocStore from "../../../../../store/blocsStore";
import ButtonSaveAll from "../../../../../lib/buttonSaveAll";

interface CardDatas {
  bloc: PictureGroup;
  page_id: number;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  isResponsive: boolean;
  refresh: boolean;
}

function PictureGroupConfiguration({
  bloc,
  page_id,
  toggle,
  setToggle,
  setRefresh,
  refresh,
}: CardDatas) {
  console.log("grid", bloc);
  const picture_group_type = Boolean(bloc.is_grid) ? "grid" : "picture_group";
  const addItem = useBlocStore((state) => state.addItem);

  const CardType =
    picturegroupTypes[picture_group_type as keyof typeof picturegroupTypes]
      .backend;
  useEffect(() => {}, [toggle, refresh]);
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <div className="">
          <div className="">
            <h2>Bloc numéro : {bloc.bloc_number}</h2>
          </div>
          <h3 className="underline mt-8">Grille d&apos;images</h3>
        </div>
        <div className="flex justify-start mb-8 mt-8">
          <Button
            className="bg-slate-800 text-slate-50 cursor-pointer w-[200px] text-xl h-[50px] rounded "
            onClick={() => {
              addItem(bloc);
              setRefresh(!refresh);
            }}
          >
            Ajouter un élément +
          </Button>
        </div>
      </div>

      <div className="flex flex-row gap-4 overflow-auto">
        {bloc !== undefined && bloc !== undefined && (
          // Only render if CardData is a function (React component)
          <>
            <div className="border border-gray-300 p-4">
              <CardType
                bloc={bloc}
                page_id={page_id}
                toggle={toggle}
                setToggle={setToggle}
                refresh={refresh}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-end">
        <ButtonSaveAll bloc={bloc} toggle={toggle} />
      </div>
    </div>
  );
}
export default PictureGroupConfiguration;
