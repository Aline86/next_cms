import { useEffect, useState } from "react";
import Button from "../../models/Button";

import CarouselData from "../../models/CarouselData";

import PictureGroupData from "../../models/PictureGroupData";
import useBlocStore from "../../store/blocsStore";

import ComponentTypes from "../types";

import DropZone from "../../models/DropZone";
import { MoonLoader } from "react-spinners";
import { Input } from "@headlessui/react";

interface DropdownInfo {
  bloc: ComponentTypes;
  data: Button | PictureGroupData | CarouselData;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
  index?: number;
}

function RenderFile({ setToggle, toggle, bloc, data, index }: DropdownInfo) {
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const upload_service = new DropZone();
    const res = await upload_service.update(file);
    if (res !== undefined) {
      setIsLoading(false);
      updateComponent(res, "href_url", undefined, index, bloc);
    }
  };
  useEffect(() => {}, [data.href_url, toggle]);
  return (
    data !== undefined &&
    bloc !== undefined && (
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
          <span>Actuellement sélectionné : {data.href_url}</span>
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
                  setToggle(!toggle);
                }}
              />
            </label>
          )}
        </label>
      </div>
    )
  );
}
export default RenderFile;
