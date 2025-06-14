/* eslint-disable react-hooks/exhaustive-deps */

import { Input } from "@headlessui/react";
import Button from "../../models/Button";
import PictureGroupData from "../../models/PictureGroupData";
import CarouselData from "../../models/CarouselData";
import useBlocStore from "../../store/blocsStore";
import ComponentTypes from "../types";
import { useEffect } from "react";

interface DropdownElementParams {
  bloc: ComponentTypes;
  data: Button | PictureGroupData | CarouselData;

  index?: number;
  page_id?: number;
}
function RenderMailto({ bloc, data, index }: DropdownElementParams) {
  const updateComponent = useBlocStore((state) => state.updateBloc);

  useEffect(() => {}, [data?.href_url]);

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
          }}
        />
      </div>
    )
  );
}

export default RenderMailto;
