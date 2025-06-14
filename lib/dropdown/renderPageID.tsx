import useBlocStore from "../../store/blocsStore";
import ComponentTypes from "../types";
import Page from "../../models/Page";
import React, { useEffect, useState } from "react";
import array_all_possible_types from "./DropdownConfiguration";
import PageID from "./dropdown_types/PageID";
import Button from "../../models/Button";
import PictureGroupData from "../../models/PictureGroupData";
import CarouselData from "../../models/CarouselData";

interface DropdownElementParams {
  bloc: ComponentTypes;
  data: Button | PictureGroupData | CarouselData;

  index?: number;
  page_id?: number;
}
function RenderPageID({
  bloc,

  page_id,
  data,
  index,
}: DropdownElementParams) {
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const [pages, setPages] = useState<Page[] | undefined>(undefined);
  const getPages = async () => {
    const Model =
      array_all_possible_types[
        "pageID" as keyof typeof array_all_possible_types
      ].model;
    if ("href_url" in data) {
      const dropdown_class = new Model(data.href_url ?? "");
      if (dropdown_class instanceof PageID && page_id !== undefined) {
        const pages_list = await dropdown_class.get_pages(page_id);

        if (pages_list !== undefined) {
          setPages(pages_list);
        }
      }
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
        }}
        defaultValue={bloc !== undefined ? data?.href_url : ""}
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
