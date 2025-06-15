import { useEffect, useState } from "react";
import Header from "./../../../../../../models/Header";
import LinkNetworksAndOthersHeader from "./../../../../../../models/LinkNetworksAndOthersHeader";

import DragAndDrop from "./../../../../../../lib/dragzone";
import { Label } from "@radix-ui/react-label";
import { Button, Input } from "@headlessui/react";
import useBlocStore from "./../../../../../../store/blocsStore";

interface HeaderInfo {
  bloc: Header;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}
function Links({ bloc, toggle, setToggle, index }: HeaderInfo) {
  const updateComponent = useBlocStore((state) => state.updateBloc);

  const removeItem = useBlocStore((state) => state.removeItem);
  const value = bloc.link_networks_an_others_header[
    index
  ] as LinkNetworksAndOthersHeader;
  const [dataValue, setDataValue] = useState(
    value as LinkNetworksAndOthersHeader
  );
  useEffect(() => {}, [bloc]);
  return bloc !== undefined ? (
    <div
      className="block max-w-sm m-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 "
      key={index}
    >
      <div className="">
        <h3 className="underline mb-4">Image logo lien :</h3>

        <DragAndDrop
          field={"image_url"}
          index={index}
          key={index}
          bloc={bloc}
          data_img={
            String(value.image_url) !== undefined ? String(value.image_url) : ""
          }
          subfield={"image_url"}
        />
      </div>
      <div className="grid gap-2">
        <Label>Nom :</Label>
        <Input
          className="mt-4 mb-4 bg-slate-100 w-full"
          onChange={(e) => {
            updateComponent(e, "name", undefined, index, bloc);
            const updatedData = { ...dataValue, name: e.target.value };
            setDataValue(updatedData as LinkNetworksAndOthersHeader);
          }}
          defaultValue={String(value.name)}
        />
      </div>

      <div className="grid gap-2">
        <Label>Lien :</Label>
        <Input
          className="mt-4 mb-4 bg-slate-100 w-full"
          defaultValue={String(value.background_url)}
          onChange={(e) => {
            updateComponent(e, "background_url", undefined, index);
            const updatedData = {
              ...dataValue,
              background_url: e.target.value,
            };
            setDataValue(updatedData as LinkNetworksAndOthersHeader);
          }}
        />
      </div>

      <div className="grid gap-2 mt-4  bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
        <Button
          onClick={() => {
            removeItem(bloc, bloc.bloc_number);
            setToggle(!toggle);
          }}
        >
          Supprimer le réseau
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Links;
