import s from "./style.module.css";

import ButtonModel from "./../../../../../../models/Button";
import { Button } from "@headlessui/react";
import useBlocStore from "../../../../../../store/blocsStore";

function CssButtonPosition({
  props,
  setRefresh,
  bloc,
  draggable,
  refresh,
}: {
  props: React.ReactNode;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  bloc: ButtonModel;
  draggable: boolean;
  refresh: boolean;
}) {
  const saveBlocAll = useBlocStore((state) => state.saveBlocAll);

  return bloc !== undefined ? (
    <div className="w-full">
      <div className="w-full">
        <div className={s.encart_bloc_name_title}>
          <div className={s.encart_bloc_name_title}>
            <h2>Bloc numéro : {bloc.bloc_number}</h2>
          </div>
          <h3 className="underline mt-8">Bouton</h3>
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

export default CssButtonPosition;
