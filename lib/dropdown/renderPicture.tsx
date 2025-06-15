import ComponentTypes from "../types";

import DragAndDrop from "../dragzone";

interface DropdownElementParams {
  bloc: ComponentTypes;

  field: string;
  value: string | undefined;
  index?: number;
  page_id?: number;
}

function RenderPicture({ bloc, value }: DropdownElementParams) {
  return bloc !== undefined ? (
    <div className="mb-1text-xl font-medium text-gray-900 ">
      <h3 className="dark:text-white">Image de fond : </h3>

      <div className="mt-8 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
        <DragAndDrop
          field={"image_url"}
          key={1}
          index={undefined}
          bloc={bloc}
          data_img={value !== undefined && value !== "" ? value : ""}
          subfield={undefined}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default RenderPicture;
