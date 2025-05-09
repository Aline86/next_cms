import { useEffect } from "react";
import s from "./style.module.css";
import TextPicture from "../../../../../../models/TextPicture";
import DragAndDrop from "../../../../../../lib/dragzone";
import Tiptap from "../../../RichText/Editor/TipTap";

import InputTypes from "../../../../../../lib/InputTypes";
import { Input } from "@headlessui/react";
import ComponentTypes from "../../../../../../lib/types";

function BlocInput({
  input_bloc,
  updateBloc,
  draggable,
}: {
  input_bloc: TextPicture | undefined;
  draggable: boolean;
  updateBloc: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: undefined | string | number,
    component?: ComponentTypes
  ) => Promise<void>;
}) {
  useEffect(() => {}, [input_bloc]);

  return input_bloc !== undefined ? (
    <div className={s.bloc} key={input_bloc?.bloc_number}>
      <div
        className="p-[10px] border border-[#ccc] mb-[10px]"
        draggable={draggable}
      >
        <div className="mb-4">
          <h3 className="text-2xl mb-4">Titre du bloc : </h3>
          <Input
            className="mb-8 bg-slate-100 w-full"
            type="text"
            defaultValue={input_bloc?.title}
            onChange={(e) => {
              updateBloc(e, "title", "", undefined, input_bloc as TextPicture);
            }}
          />
        </div>
        <div>
          <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700 m-auto">
            <h3>Insérer une image</h3>

            <DragAndDrop
              field="image"
              key={1}
              index={undefined}
              bloc={input_bloc}
              data_img={input_bloc?.image !== undefined ? input_bloc.image : ""}
              update={async (
                event: InputTypes,
                field: string | undefined,
                input: string | undefined,
                index?: string | number | undefined,
                bloc?: ComponentTypes
              ): Promise<void> => {
                await updateBloc(event, field, input, index, bloc);
              }}
              subfield={undefined}
            />
          </div>
          <h3 className="mb-8 mt-8">Texte de la balise image :</h3>
          <Input
            type="text"
            className={"mb-8 bg-slate-100 w-full"}
            value={input_bloc?.alt_image}
            onChange={(e) => {
              updateBloc(
                e,
                "alt_image",
                "",
                undefined,
                input_bloc as TextPicture
              );
            }}
            style={{ display: `block` }}
          />
        </div>

        {input_bloc !== undefined && (
          <Tiptap
            bloc={input_bloc}
            updateBloc={(
              event: InputTypes,
              field: string | undefined,
              input: string | undefined,
              index?: undefined | string | number,
              component?: TextPicture
            ): void => {
              if (component !== undefined) {
                updateBloc(
                  event,
                  field,
                  input ? JSON.stringify(input) : "",
                  index,
                  component as TextPicture
                );
              }
            }}
          />
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default BlocInput;
