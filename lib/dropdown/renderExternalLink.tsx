/* eslint-disable react-hooks/exhaustive-deps */

import { Input } from "@headlessui/react";
import Button from "../../models/Button";

import CarouselData from "../../models/CarouselData";

import PictureGroupData from "../../models/PictureGroupData";
import useBlocStore from "../../store/blocsStore";

import ComponentTypes from "../types";

import s from "./style/styles.module.css";
import { useEffect } from "react";

interface DropdownInfo {
  bloc: ComponentTypes;
  data: Button | PictureGroupData | CarouselData;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
  index?: number;
}

function RenderExternalLink({
  setToggle,
  toggle,
  bloc,
  data,
  index,
}: DropdownInfo) {
  const updateComponent = useBlocStore((state) => state.updateBloc);
  useEffect(() => {}, [data.href_url, toggle]);
  return (
    data !== undefined &&
    bloc !== undefined && (
      <div className={s.type}>
        <Input
          className="max-w-[250px]"
          defaultValue={data !== undefined ? data.href_url : ""}
          placeholder="Url de redirection"
          onChange={(e) => {
            updateComponent(e, "href_url", undefined, index, bloc);
            setToggle(!toggle);
          }}
        />
      </div>
    )
  );
}

export default RenderExternalLink;
