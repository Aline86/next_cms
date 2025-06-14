/* eslint-disable react-hooks/exhaustive-deps */

import Button from "../../models/Button";
import CarouselData from "../../models/CarouselData";
import PictureGroupData from "../../models/PictureGroupData";
import useBlocStore from "../../store/blocsStore";
import ComponentTypes from "../types";
import Page from "../../models/Page";
import PageID from "./dropdown_types/PageID";

interface DropdownInfo {
  bloc: ComponentTypes;
  data: Button | PictureGroupData | CarouselData;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
  to_render_type: PageID;
  page_id: number;
  index?: number;
}

import React, { useEffect, useState } from "react";

function RenderPageID({
  bloc,
  to_render_type,
  setToggle,
  toggle,
  page_id,
  data,
  index,
}: DropdownInfo) {
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const [pages, setPages] = useState<Page[] | undefined>(undefined);
  const getPages = async () => {
    const pages_list = await to_render_type.get_pages(page_id);

    if (pages_list !== undefined) {
      console.log("pages_list", pages_list);
      setPages(pages_list);
    }
  };
  useEffect(() => {
    getPages();
  }, [page_id, bloc]);
  useEffect(() => {}, [pages]);
  return (
    pages !== undefined && (
      <select
        className="h-[35px] bg-white border border-gray-300 m-[5px]"
        onChange={(e) => {
          updateComponent(e, "href_url", undefined, index, bloc);

          setToggle(!toggle);
        }}
        defaultValue={bloc !== undefined ? data.href_url : ""}
      >
        {" "}
        <option key={0} value={"Choisir une page de redirection"}></option>
        {pages.map((value, index) => {
          return (
            <option key={index} value={value.id}>
              {value.title}
            </option>
          );
        })}
      </select>
    )
  );
}

export default RenderPageID;
