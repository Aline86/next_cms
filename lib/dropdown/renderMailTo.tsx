/* eslint-disable react-hooks/exhaustive-deps */

import { Input } from "@headlessui/react";

import useBlocStore from "./../../store/blocsStore";
import ComponentTypes from "./../types";

interface DropdownElementParams {
  bloc: ComponentTypes;
  field: string;
  value: string | undefined;
  index?: number;
  page_id?: number;
}
function RenderMailto({
  bloc,

  index,
  field,
  value,
}: DropdownElementParams) {
  const updateComponent = useBlocStore((state) => state.updateBloc);

  return bloc !== undefined ? (
    <div className="w-full">
      <Input
        className="bg-slate-100 w-full"
        defaultValue={value}
        placeholder="Ajouter une adresse mail"
        onChange={(e) => {
          updateComponent(
            !e.target.value.startsWith("mailto:")
              ? "mailto:" + e.target.value
              : e.target.value,
            field,
            undefined,
            index,
            bloc
          );
        }}
      />
    </div>
  ) : (
    <></>
  );
}

export default RenderMailto;
