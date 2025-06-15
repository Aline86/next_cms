/* eslint-disable react-hooks/exhaustive-deps */
import { JSX, useEffect, useState } from "react";

import ComponentTypes from "./../types";
import array_all_possible_types from "./renderDropdownConfiguration";
import useBlocStore from "../../store/blocsStore";

interface DropdownInfo {
  bloc: ComponentTypes;
  field: string;
  value: string;
  dropdown_elements: Array<string>;
  index?: number;
  page_id: number;
}

function DropdownData({
  bloc,
  field,
  value,
  page_id,
  index,
  dropdown_elements,
}: DropdownInfo) {
  const [choice_type, set_choice_type] = useState<string>("");
  const [ClassToRender, set_class_to_render] = useState<
    JSX.Element | null | undefined
  >(undefined);
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const updateLink = (e: React.ChangeEvent<HTMLSelectElement>) => {
    value = "";

    updateComponent("", field, undefined, index, bloc);
    const ToRender =
      array_all_possible_types[
        e.target.value as keyof typeof array_all_possible_types
      ].component;
    set_class_to_render(
      <ToRender
        bloc={bloc}
        page_id={page_id}
        index={index}
        field={field}
        value={value}
      />
    );
    set_choice_type(e.target.value);
  };
  useEffect(() => {}, [choice_type, ClassToRender]);
  useEffect(() => {
    dropdown_elements.forEach((element_type) => {
      const instance = new array_all_possible_types[
        element_type as keyof typeof array_all_possible_types
      ].model(value);

      if (instance.check_type()) {
        type blocksToRender = keyof typeof array_all_possible_types;
        const elementType = element_type as blocksToRender;
        const ToRender = array_all_possible_types[elementType].component;

        set_class_to_render(
          <ToRender
            bloc={bloc}
            page_id={page_id}
            index={index}
            field={field}
            value={value}
          />
        );
        set_choice_type(instance.get_type());
      }
    });
  }, []);

  return (
    bloc !== undefined && (
      <div className="flex flex-col items-center justify-center gap-[15px] w-[calc(100%-20px)] mx-auto border border-gray-300 box-border p-5 mt-8">
        <select
          className="h-[35px] bg-white border border-gray-300 m-[5px]"
          onChange={(e) => updateLink(e)}
          value={
            choice_type !== "" ? choice_type : "Choisir un type de redirection"
          }
        >
          {value === "" && <option key={index}>Choisir une redirection</option>}
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
