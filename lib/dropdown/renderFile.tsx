import { useEffect, useState } from "react";

import useBlocStore from "./../../store/blocsStore";
import ComponentTypes from "./../types";
import DropZone from "./../../models/DropZone";
import { MoonLoader } from "react-spinners";
import { Input } from "@headlessui/react";

interface DropdownElementParams {
  bloc: ComponentTypes;

  field: string;
  value: string | undefined;
  index?: number;
  page_id?: number;
}

function RenderFile({
  bloc,

  index,
  value,
  field,
}: DropdownElementParams) {
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, set_file] = useState(value);
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const upload_service = new DropZone();
    const res = await upload_service.update(file);

    if (res !== undefined) {
      console.log("res", res);
      setIsLoading(false);
      updateComponent(
        res,
        field,
        undefined,
        index,
        bloc as ComponentTypes | undefined
      );
    }
    set_file(res);
  };
  useEffect(() => {}, [value, file]);
  return bloc !== undefined ? (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        width: "100%",
      }}
    >
      <label>
        <span>Charger un fichier</span>
        <br />
        <span>Actuellement sélectionné : {file !== undefined ? file : ""}</span>
        {isLoading ? (
          <MoonLoader />
        ) : (
          <label className="block w-fit cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Charger un fichier
            <Input
              type="file"
              className="hidden"
              onChange={(e) => {
                upload(e);
              }}
            />
          </label>
        )}
      </label>
    </div>
  ) : (
    <></>
  );
}
export default RenderFile;
