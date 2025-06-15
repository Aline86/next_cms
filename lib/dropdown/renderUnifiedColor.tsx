import useBlocStore from "../../store/blocsStore";
import ComponentTypes from "../types";

interface DropdownElementParams {
  bloc: ComponentTypes;

  field: string;
  value: string | undefined;
  index?: number;
  page_id?: number;
}

function RenderUnifiedColor({ bloc, value }: DropdownElementParams) {
  const updateComponent = useBlocStore((state) => state.updateBloc);

  return bloc !== undefined ? (
    <div className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
      <h3>Couleur de fond du bandeau :</h3>
      <input
        type="color"
        className="flex mt-4 md:mt-6 cursor-pointer"
        defaultValue={value !== "" ? value : ""}
        onChange={(e) => {
          updateComponent(e, "background_color", undefined, undefined, bloc);
          updateComponent("", "image_url", undefined, undefined, bloc);
        }}
      />
    </div>
  ) : (
    <></>
  );
}

export default RenderUnifiedColor;
