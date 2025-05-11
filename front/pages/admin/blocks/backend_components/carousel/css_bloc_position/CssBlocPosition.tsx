import s from "./style.module.css";

import Carousel from "../../../../../../models/Carousel";
import InputTypes from "../../../../../../lib/InputTypes";
import { Button } from "@headlessui/react";

function CssCarouselPosition({
  props,
  updateComponent,

  bloc,
  draggable,

  saveBlocAll,
}: {
  props: React.ReactNode;
  updateComponent: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: string | number | undefined,
    bloc?: Carousel
  ) => Promise<void>;

  bloc: Carousel;
  draggable: boolean;

  saveBlocAll: React.Dispatch<React.SetStateAction<void>>;
}) {
  return bloc !== undefined ? (
    <div className="w-full">
      <div className="flex justify-start">
        <Button
          className="bg-slate-800 text-slate-50 cursor-pointer w-[200px] text-xl h-[50px] rounded"
          onClick={(e) => {
            e.preventDefault();
            updateComponent(
              e as React.MouseEvent<HTMLButtonElement>,
              "ajout",

              undefined,
              undefined,
              bloc
            );
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
          <h3 className="underline mt-8">Carousel Miniatures</h3>
        </div>
        {bloc.carousel_type !== "miniatures" && (
          <div className={s.bouton_container_bloc}>
            <div className="block mb-8">
              <label className="block mt-8 mb-4 text-xl font-medium text-gray-900 ">
                Nombre de colonnes :
              </label>
              <div className="flex justify-between">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
              </div>
              <input
                id="default-range"
                min="1"
                max="4"
                value={bloc?.width ? bloc?.width : 2} // safe access
                type="range"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer-not-big dark:bg-gray-700"
                onChange={(e) =>
                  updateComponent(e, "width", undefined, undefined, bloc)
                }
              />
            </div>
          </div>
        )}
        <div draggable={draggable}>{props}</div>
      </div>
      <div className="bouton_container_carousel"></div>
      <div className="flex justify-end">
        <Button
          className="block leading-1 bg-slate-800 text-slate-50 cursor-pointer rounded min-w-[150px] h-[50px] mt-8"
          onClick={(e) => {
            e.preventDefault();
            if (typeof saveBlocAll === "function") {
              saveBlocAll();
            }
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

export default CssCarouselPosition;
