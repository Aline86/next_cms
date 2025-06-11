import s from "./style.module.css";

import Carousel from "../../../../../../models/Carousel";

import { Button } from "@headlessui/react";
import useBlocStore from "../../../../../../store/blocsStore";

function CssCarouselPosition({
  props,
  refresh,
  setRefresh,

  bloc,
  draggable,
}: {
  props: React.ReactNode;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  bloc: Carousel;
  draggable: boolean;
}) {
  const addItem = useBlocStore((state) => state.addItem);

  const saveBlocAll = useBlocStore((state) => state.saveBlocAll);
  return bloc !== undefined ? (
    <div className="w-full">
      <div className="flex justify-start">
        <Button
          className="bg-slate-800 text-slate-50 cursor-pointer w-[200px] text-xl h-[50px] rounded"
          onClick={(e) => {
            e.preventDefault();
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
          <h3 className="underline mt-8">
            Carousel Option 1 : défilé d&apos;images
          </h3>
        </div>

        <div draggable={draggable}>{props}</div>
      </div>
      <div className="bouton_container_carousel"></div>
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

export default CssCarouselPosition;
