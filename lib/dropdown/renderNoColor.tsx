import { useEffect } from "react";
import useBlocStore from "../../store/blocsStore";

import ComponentTypes from "../types";

interface DropdownElementParams {
  bloc: ComponentTypes;

  field: string;
  value: string | undefined;
  index?: number;
  page_id?: number;
}

function RenderNoColor({ bloc }: DropdownElementParams) {
  const updateComponent = useBlocStore((state) => state.updateBloc);

  useEffect(() => {
    updateComponent("", "image_url", undefined, undefined, bloc);
    updateComponent("", "background_color", undefined, undefined, bloc);
  }, []);
  return (
    <input
      type="submit"
      value="Supprimer le fond"
      className="flex mt-4 cursor-pointer w-full"
      onClick={() => {
        updateComponent("", "background_color", undefined, undefined, bloc);
        updateComponent("", "image_url", undefined, undefined, bloc);
      }}
    />
  );
}
export default RenderNoColor;
