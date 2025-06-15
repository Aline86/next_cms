import { Input } from "@headlessui/react";
import useBlocStore from "./../../store/blocsStore";
import ComponentTypes from "./../types";
import s from "./style/styles.module.css";

interface DropdownElementParams {
  bloc: ComponentTypes;

  field: string;
  value: string | undefined;
  index?: number;
  page_id?: number;
}

function RenderExternalLink({
  bloc,

  index,
  field,
  value,
}: DropdownElementParams) {
  const updateComponent = useBlocStore((state) => state.updateBloc);

  return bloc !== undefined ? (
    <div className={s.type}>
      <Input
        className="max-w-[250px]"
        defaultValue={value}
        placeholder="Url de redirection"
        onChange={(e) => {
          updateComponent(
            e,
            field,
            undefined,
            index,
            bloc as ComponentTypes | undefined
          );
        }}
      />
    </div>
  ) : (
    <></>
  );
}

export default RenderExternalLink;
