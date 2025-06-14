/* eslint-disable react-hooks/exhaustive-deps */
import { JSX, useEffect, useState } from "react";

import PictureGroupData from "../../models/PictureGroupData";

import CarouselData from "../../models/CarouselData";

import Button from "../../models/Button";
import array_all_possible_types from "./DropdownConfiguration";
import ComponentTypes from "../types";

interface DropdownInfo {
  bloc: ComponentTypes;
  data: Button | PictureGroupData | CarouselData;
  dropdown_elements: Array<string>;
  index?: number;
  page_id: number;
}

function DropdownData({
  bloc,
  data,
  page_id,
  index,
  dropdown_elements,
}: DropdownInfo) {
  type DropdownClassType = {
    get_type?: () => string;
  };
  let type = "";
  const [choice_type, set_choice_type] = useState<string>("");
  const [ClassToRender, set_class_to_render] = useState<
    JSX.Element | null | undefined
  >(undefined);
  if (data.href_url === undefined) {
    const Model =
      array_all_possible_types[
        data.href_url as keyof typeof array_all_possible_types
      ].model;
    // Use type assertion to satisfy TypeScript, but ensure at runtime the methods exist
    const instance = new Model(data.href_url) as unknown as DropdownClassType;

    if (typeof instance.get_type === "function") {
      type = instance.get_type();
    }
    const ToRender =
      array_all_possible_types[
        data.href_url as keyof typeof array_all_possible_types
      ].component;
    if (ToRender !== undefined && ToRender !== null) {
      set_class_to_render(
        <ToRender bloc={bloc} data={data} page_id={page_id} index={index} />
      );
      set_choice_type(type);
    }
  }

  const updateLink = (e: React.ChangeEvent<HTMLSelectElement>) => {
    data.href_url = "";

    const ToRender =
      array_all_possible_types[
        e.target.value as keyof typeof array_all_possible_types
      ].component;
    if (ToRender !== undefined && ToRender !== null) {
      set_class_to_render(
        <ToRender bloc={bloc} data={data} page_id={page_id} index={index} />
      );
      set_choice_type(e.target.value);
    }
  };
  useEffect(() => {}, [ClassToRender]);
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
          {dropdown_elements.map((type, index) => {
            const typedType = type as keyof typeof array_all_possible_types;

            return (
              <option key={index} value={type}>
                {array_all_possible_types[typedType].label_name}
              </option>
            );
          })}
        </select>

        {ClassToRender !== undefined && ClassToRender !== null && (
          <div key={index}>{ClassToRender}</div>
        )}
      </div>
    )
  );
}

export default DropdownData;
