"use client";
import s from "./style.module.css";
import { useEffect } from "react";
import Header from "../../../../../../models/Header";
import LinkNetworksAndOthersHeader from "../../../../../../models/LinkNetworksAndOthersHeader";
import DropdownData from "../dropdown/Dropdown";
import DragAndDrop from "../../../../../../lib/dragzone";
import { Label } from "@radix-ui/react-label";
import { Button, Input } from "@headlessui/react";
import useBlocStore from "../../../../../../store/blocsStore";
import Links from "./links";

interface HeaderInfo {
  bloc: Header;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
function HeaderInput({ bloc, toggle, setToggle }: HeaderInfo) {
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const saveBlocAll = useBlocStore((state) => state.saveBlocAll);
  const addItem = useBlocStore((state) => state.addItem);

  useEffect(() => {}, [bloc]);
  return bloc !== undefined ? (
    <>
      <div className={s.container_column}>
        <div className="w-full">
          <div className="">
            <h3 className="underline mt-8">En-tête du site</h3>
          </div>
        </div>
        <div className={s.top_container}>
          <div className={s.title_bloc}>
            <div className="grid gap-2 mb-8">
              <Label>Titre du site :</Label>
              <Input
                className="mt-4 mb-4 bg-slate-100 w-full p-2"
                defaultValue={bloc !== undefined ? bloc.title : ""}
                onChange={(e) => {
                  updateComponent(e, "title", undefined, undefined, bloc);
                }}
              />
            </div>
          </div>
          <div className={s.title_bloc}>
            <Label>Logo du site :</Label>

            <div className="mt-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
              <DragAndDrop
                field={"logo_url"}
                key={1}
                index={undefined}
                bloc={bloc}
                subfield={undefined}
                data_img={bloc.logo_url}
                toggle={toggle}
              />
            </div>
            <br />
          </div>
          <DropdownData bloc={bloc} />
          <div className={s.add_file}>
            <label
              className={s.addLink}
              onClick={(e) => {
                e.preventDefault();
                addItem(bloc);
                setToggle(!toggle);
              }}
            >
              <Button className="w-[300px] h-[90px] mt-8 bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                Ajouter un lien réseau social +
              </Button>
            </label>
          </div>
        </div>
        <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm  light:bg-gray-800 light:border-gray-700 ">
          <h3 className="underline">Liens externes (ex: réseaux sociaux) : </h3>

          {bloc !== undefined &&
            bloc.link_networks_an_others_header.length > 0 &&
            bloc.link_networks_an_others_header.map(
              (
                value: LinkNetworksAndOthersHeader | Record<string, unknown>,
                key: number
              ) => {
                return (
                  <Links
                    key={key}
                    bloc={bloc}
                    toggle={toggle}
                    setToggle={setToggle}
                    index={key}
                  />
                );
              }
            )}
        </div>

        <div className="flex justify-end mt-8 mb-8">
          <Button
            className="block leading-1 bg-slate-800 text-slate-50 cursor-pointer rounded min-w-[150px] h-[50px] mt-8"
            onClick={(e) => {
              e.preventDefault();
              saveBlocAll();
            }}
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default HeaderInput;
