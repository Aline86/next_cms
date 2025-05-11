import { Button } from "@headlessui/react";
import ScreenHome from "../../../../../../models/Screen";
import s from "./style.module.css";
import React from "react";
//    set_show_message={set_show_message}
function CssScreenPosition({
  props,
  bloc,
  draggable,
  saveBlocAll,
}: {
  props: React.ReactNode;
  bloc: ScreenHome;
  draggable: boolean;
  saveBlocAll: React.Dispatch<React.SetStateAction<void>>;
}) {
  return bloc !== undefined ? (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="bouton_container_bloc_css">
        <div className={s.encart_bloc_name_title}>
          <h2>Bloc numéro : {bloc.bloc_number}</h2>
        </div>
        <div className={s.bouton_container_parent}>
          <h3
            style={{
              textDecoration: "underline",
            }}
          >
            Bloc Image de couverture
          </h3>
          <div draggable={draggable}>{props}</div>

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
    </div>
  ) : (
    <></>
  );
}

export default CssScreenPosition;
