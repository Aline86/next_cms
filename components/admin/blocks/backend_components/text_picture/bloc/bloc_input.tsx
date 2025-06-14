"use client";
import { useEffect } from "react";
import s from "./style.module.css";
import TextPicture from "../../../../../../models/TextPicture";
import DragAndDrop from "../../../../../../lib/dragzone";
import Tiptap from "../../../RichText/Editor/TipTap";
import { Input } from "@headlessui/react";
import useBlocStore from "../../../../../../store/blocsStore";
import ButtonSaveAll from "../../../../../../lib/buttonSaveAll";

function BlocInput({
  bloc,
  toggle,
}: {
  bloc: TextPicture | undefined;
  toggle: boolean;
}) {
  const updateBloc = useBlocStore((state) => state.updateBloc);

  useEffect(() => {}, [bloc]);

  return bloc !== undefined ? (
    <div className={s.bloc} key={bloc?.bloc_number}>
      <div className="w-full">
        <div className="">
          <div className="">
            <h2>Bloc numéro : {bloc.bloc_number}</h2>
          </div>
          <h3 className="underline mt-8">Bloc éditeur de texte</h3>
        </div>
      </div>
      <div className="p-[10px] border border-[#ccc] mb-[10px]">
        <div className="mb-4">
          <h3 className="text-2xl mb-4">Titre du bloc : </h3>
          <Input
            className="mb-8 bg-slate-100 w-full"
            type="text"
            defaultValue={bloc?.title}
            onChange={(e) => {
              updateBloc(e, "title", "", undefined, bloc as TextPicture);
            }}
          />
        </div>
        <div>
          <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700 m-auto">
            <h3>Insérer une image</h3>

            <DragAndDrop
              field="image_url"
              key={1}
              index={undefined}
              bloc={bloc}
              data_img={bloc?.image_url !== undefined ? bloc.image_url : ""}
              subfield={undefined}
              toggle={false}
            />
          </div>
          <h3 className="mb-8 mt-8">Texte de la balise image :</h3>
          <Input
            type="text"
            className={"mb-8 bg-slate-100 w-full"}
            defaultValue={bloc?.alt_image}
            onChange={(e) => {
              updateBloc(e, "alt_image", "", undefined, bloc as TextPicture);
            }}
            style={{ display: `block` }}
          />
        </div>

        {bloc !== undefined && <Tiptap bloc={bloc} />}
      </div>
      <div className="flex justify-end">
        <ButtonSaveAll bloc={bloc} toggle={toggle} />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default BlocInput;
