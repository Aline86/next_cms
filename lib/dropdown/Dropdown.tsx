/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import s from "./style/styles.module.css";

import ExternalLink from "./dropdown_types/ExrternalLink";
import PageID from "./dropdown_types/PageID";
import Mailto from "./dropdown_types/Maito";

import RenderExternalLink from "./renderExternalLink";
import RenderFile from "./renderFile";
import PictureGroupData from "../../models/PictureGroupData";

import CarouselData from "../../models/CarouselData";
import RenderMailto from "./renderMailTo";
import RenderPageID from "./renderPageID";
import PictureGroup from "../../models/PictureGroup";
import Carousel from "../../models/Carousel";
import Button from "../../models/Button";
import FileLink from "./dropdown_types/File";

interface DropdownInfo {
  bloc: PictureGroup | Button | Carousel;
  data: Button | PictureGroupData | CarouselData;
  index?: number;
  page_id?: number;
}

function DropdownData({ bloc, data, page_id, index }: DropdownInfo) {
  const array_all_possible_types = {
    external_link: new ExternalLink(String(data.href_url)),
    file: new FileLink(String(data.href_url)),
    mailto: new Mailto(String(data.href_url)),
    pageID: new PageID(data.href_url),
  };

  const array_dropdown_types = {
    external_link: "Lien externe ",
    file: "Fichier (PDF)",
    mailto: "Lien mailto",
    pageID: "Page du site",
  };

  let to_render_type: string = "";

  Object.values(array_all_possible_types).forEach((dropdown_class) => {
    console.log(dropdown_class.check_type());
    if (dropdown_class.check_type()) {
      to_render_type = dropdown_class.get_type();
    }
  });

  Object.values(array_all_possible_types).forEach((dropdown_class) => {
    if (dropdown_class.check_type()) {
      to_render_type = dropdown_class.get_type();
    }
  });
  const [choice_type, set_choice_type] = useState<string>(to_render_type);
  const [toggle, setToggle] = useState<boolean>(false);

  const pageID_type = new PageID(data.href_url);
  const updateLink = (e: React.ChangeEvent<HTMLSelectElement>) => {
    data.href_url = "";
    setToggle(!toggle);
    set_choice_type(e.target.value);
  };
  useEffect(() => {}, [
    choice_type,
    toggle,
    pageID_type,
    page_id,
    to_render_type,
    toggle,
  ]);
  return (
    data &&
    bloc !== undefined && (
      <div className="flex flex-col items-center justify-center gap-[15px] w-[calc(100%-20px)] mx-auto border border-gray-300 box-border p-5 mt-8">
        <select
          className="h-[35px] bg-white border border-gray-300 m-[5px]"
          onChange={(e) => updateLink(e)}
          value={
            choice_type !== "" ? choice_type : "Choisir un type de redirection"
          }
        >
          {data.href_url === "" && (
            <option key={index}>Choisir une redirection</option>
          )}
          {Object.entries(array_dropdown_types).map(([type, label], index) => {
            return (
              <option key={index} value={type}>
                {label}
              </option>
            );
          })}
        </select>

        {choice_type === "external_link" ? (
          <RenderExternalLink
            key={1}
            bloc={bloc}
            setToggle={setToggle}
            toggle={toggle}
            data={data}
            index={index}
          />
        ) : choice_type === "file" ? (
          <RenderFile
            key={1}
            bloc={bloc}
            setToggle={setToggle}
            toggle={toggle}
            data={data}
            index={index}
          />
        ) : choice_type === "mailto" ? (
          <RenderMailto
            key={1}
            bloc={bloc}
            setToggle={setToggle}
            toggle={toggle}
            data={data}
            index={index}
          />
        ) : choice_type === "pageID" &&
          page_id !== undefined &&
          pageID_type !== undefined ? (
          <RenderPageID
            page_id={page_id}
            key={1}
            bloc={bloc}
            setToggle={setToggle}
            toggle={toggle}
            data={data}
            to_render_type={pageID_type as PageID}
            index={index}
          />
        ) : (
          <div key={1} className={s.hidden}></div>
        )}
      </div>
    )
  );
}
export default DropdownData;
