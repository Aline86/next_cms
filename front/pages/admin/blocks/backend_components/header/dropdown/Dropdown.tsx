import { useEffect, useState } from "react";

import Header from "../../../../../../models/Header";

import DragAndDrop from "../../../../../../lib/dragzone";
import InputTypes from "../../../../../../lib/InputTypes";

interface DropdownInfo {
  input_bloc: Header | undefined;
  updateHeader: (
    e: InputTypes,
    field: string | undefined,
    input?: string | undefined,
    index?: string | number | undefined,
    bloc?: Header
  ) => Promise<void>;
}

function DropdownData({ input_bloc, updateHeader }: DropdownInfo) {
  const [picture, isPicture] = useState<number>(
    input_bloc?.background_color === "#00000000"
      ? 2
      : input_bloc?.image_url != ""
      ? 1
      : 0
  );
  useEffect(() => {}, []);
  useEffect(() => {}, [picture]);

  return input_bloc !== undefined ? (
    <div className="block w-full flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm  dark:bg-gray-800 dark:border-gray-700 ">
      <select
        onChange={(e) => {
          isPicture(Number(e.target.value));
          if (Number(e.target.value) === 2) {
            updateHeader(
              "#00000000",
              "background_color",
              undefined,
              undefined,
              input_bloc
            );
            updateHeader("", "image_url", undefined, undefined, input_bloc);
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
                    bloc={input_bloc}
                    data_img={
                      input_bloc !== undefined && input_bloc.image_url !== ""
                        ? input_bloc.image_url
                        : ""
                    }
                    subfield={undefined}
                    update={async (
                      event: InputTypes,
                      field: string | undefined,
                      input: string | undefined,
                      index?: string | number | undefined
                    ): Promise<void> => {
                      await updateHeader(
                        event,
                        field ?? "",
                        input,
                        typeof index === "number" ? index : undefined,
                        input_bloc
                      );
                    }}
                  />
                </div>
              </div>
            ) : picture === 0 ? (
              <div className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                <h3>Couleur de fond du bandeau :</h3>
                <input
                  type="color"
                  className="flex mt-4 md:mt-6 cursor-pointer"
                  value={input_bloc?.background_color}
                  onChange={(e) => {
                    updateHeader(
                      e,
                      "background_color",
                      undefined,
                      undefined,
                      input_bloc
                    );
                    // Ensure background_color is defined or reset image_url if needed
                    if (
                      input_bloc?.background_color === "" &&
                      input_bloc?.image_url !== ""
                    ) {
                      input_bloc.image_url = "";
                    }
                    if (input_bloc?.image_url !== undefined) {
                      input_bloc.image_url = "";
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
