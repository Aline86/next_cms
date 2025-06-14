import { useEffect, useState } from "react";

import useBlocStore from "../../store/blocsStore";
import ComponentTypes from "../types";
import DropZone from "../../models/DropZone";
import { MoonLoader } from "react-spinners";
import { Input } from "@headlessui/react";
import Button from "../../models/Button";
import PictureGroupData from "../../models/PictureGroupData";
import CarouselData from "../../models/CarouselData";

interface DropdownElementParams {
  bloc: ComponentTypes;
  data: Button | PictureGroupData | CarouselData;

  index?: number;
  page_id?: number;
}

function RenderFile({ bloc, data, index }: DropdownElementParams) {
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const upload_service = new DropZone();
    const res = await upload_service.update(file);
    if (res !== undefined) {
      setIsLoading(false);
      updateComponent(
        res,
        "href_url",
        undefined,
        index,
        bloc as ComponentTypes | undefined
      );
    }
  };
  useEffect(() => {}, [data?.href_url]);
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
