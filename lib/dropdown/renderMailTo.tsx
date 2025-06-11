/* eslint-disable react-hooks/exhaustive-deps */

import { Input } from "@headlessui/react";
import Button from "../../models/Button";
import CarouselData from "../../models/CarouselData";
import PictureGroupData from "../../models/PictureGroupData";
import useBlocStore from "../../store/blocsStore";
import ComponentTypes from "../types";
import { useEffect } from "react";

interface DropdownInfo {
  bloc: ComponentTypes;
  data: Button | PictureGroupData | CarouselData;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
  index?: number;
}

function RenderMailto({ bloc, data, setToggle, toggle, index }: DropdownInfo) {
  const updateComponent = useBlocStore((state) => state.updateBloc);

  useEffect(() => {
    console.log("RenderMailto component mounted", data.href_url);
  }, [data.href_url, toggle]);

  return (
    data &&
    bloc !== undefined && (
      <div className="w-full">
        <Input
          className="bg-slate-100 w-full"
          defaultValue={data !== undefined ? data.href_url : ""}
          placeholder="Ajouter une adresse mail"
          onChange={(e) => {
            updateComponent(
              !e.target.value.startsWith("mailto:")
                ? "mailto:" + e.target.value
                : e.target.value,
              "href_url",
              undefined,
              index,
              bloc
            );
            setToggle(!toggle);
          }}
        />
      </div>
    )
  );
}

export default RenderMailto;
