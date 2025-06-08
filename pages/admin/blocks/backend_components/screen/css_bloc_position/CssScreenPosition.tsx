import { Button } from "@headlessui/react";
import ScreenHome from "../../../../../../models/Screen";

import React from "react";
import useBlocStore from "../../../../../../store/blocsStore";

function CssScreenPosition({
  props,
  bloc,
  draggable,
  refresh,
  setRefresh,
}: {
  props: React.ReactNode;
  bloc: ScreenHome;
  draggable: boolean;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const saveBlocAll = useBlocStore((state) => state.saveBlocAll);
  return bloc !== undefined ? (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="">
        <div className="">
          <h2>Bloc numéro : {bloc.bloc_number}</h2>
        </div>
        <div className="">
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
                setRefresh(!refresh);
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
