import { useEffect, useState } from "react";
import Header from "../../../../../../models/Header";
import DragAndDrop from "../../../../../../lib/dragzone";
import useBlocStore from "../../../../../../store/blocsStore";

interface DropdownInfo {
  bloc: Header | undefined;
}

function DropdownData({ bloc }: DropdownInfo) {
  const [picture, isPicture] = useState<number>(
    bloc?.background_color === "#00000000" ? 2 : bloc?.image_url != "" ? 1 : 0
  );
  const updateComponent = useBlocStore((state) => state.updateBloc);

  useEffect(() => {}, [picture]);

  return bloc !== undefined ? (
    <div className="block w-full flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm  dark:bg-gray-800 dark:border-gray-700 ">
      <select
        onChange={(e) => {
          isPicture(Number(e.target.value));
          if (Number(e.target.value) === 2) {
            updateComponent(
              "#00000000",
              "background_color",
              undefined,
              undefined,
              bloc
            );
            updateComponent("", "image_url", undefined, undefined, bloc);
          }
        }}
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm  light:bg-gray-800 light:border-gray-700 "
        value={picture}
      >
        <option key={0} value={0}>
          Couleur unie
        </option>
        <option key={1} value={1}>
          Image
        </option>
        <option key={2} value={2}>
          Pas de couleur
        </option>
      </select>
      <div className=" mt-8 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <div className="flex flex-col items-center pb-10">
            {picture === 1 ? (
              <div className="mb-1text-xl font-medium text-gray-900 ">
                <h3 className="dark:text-white">Image de fond : </h3>

                <div className="mt-8 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
                  <DragAndDrop
                    field={"image_url"}
                    key={1}
                    index={undefined}
                    bloc={bloc}
                    data_img={
                      bloc !== undefined && bloc.image_url !== ""
                        ? bloc.image_url
                        : ""
                    }
                    subfield={undefined}
                    toggle={false}
                  />
                </div>
              </div>
            ) : picture === 0 ? (
              <div className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                <h3>Couleur de fond du bandeau :</h3>
                <input
                  type="color"
                  className="flex mt-4 md:mt-6 cursor-pointer"
                  value={bloc?.background_color}
                  onChange={(e) => {
                    updateComponent(
                      e,
                      "background_color",
                      undefined,
                      undefined,
                      bloc
                    );
                    // Ensure background_color is defined or reset image_url if needed
                    if (
                      bloc?.background_color === "" &&
                      bloc?.image_url !== ""
                    ) {
                      bloc.image_url = "";
                    }
                    if (bloc?.image_url !== undefined) {
                      bloc.image_url = "";
                    }
                  }}
                />
              </div>
            ) : (
              <div className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                <h3 style={{ textDecoration: "underline" }}>Pas de couleur</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default DropdownData;
