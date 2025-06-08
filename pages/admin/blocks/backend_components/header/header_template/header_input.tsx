import s from "./style.module.css";
import { useEffect } from "react";
import Header from "../../../../../../models/Header";
import LinkNetworksAndOthersHeader from "../../../../../../models/LinkNetworksAndOthersHeader";
import DropdownData from "../dropdown/Dropdown";
import DragAndDrop from "../../../../../../lib/dragzone";
import { Label } from "@radix-ui/react-label";
import { Button, Input } from "@headlessui/react";
import useBlocStore from "../../../../../../store/blocsStore";

interface HeaderInfo {
  input_bloc: Header;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
function HeaderInput({ input_bloc, toggle, setToggle }: HeaderInfo) {
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const saveBlocAll = useBlocStore((state) => state.saveBlocAll);
  const addItem = useBlocStore((state) => state.addItem);
  const removeItem = useBlocStore((state) => state.removeItem);

  useEffect(() => {}, [input_bloc]);
  return input_bloc !== undefined ? (
    <>
      <div className={s.container_column}>
        <div className={s.top_container}>
          <div className={s.title_bloc}>
            <div className="grid gap-2 mb-8">
              <Label>Titre du site :</Label>
              <Input
                className="mt-4 mb-4 bg-slate-100 w-full p-2"
                value={input_bloc !== undefined ? input_bloc.title : ""}
                onChange={(e) => {
                  updateComponent(e, "title", undefined, undefined, input_bloc);
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
                bloc={input_bloc}
                subfield={undefined}
                data_img={input_bloc.logo_url}
                toggle={toggle}
              />
            </div>
            <br />
          </div>
          <DropdownData input_bloc={input_bloc} />
          <div className={s.add_file}>
            <label
              className={s.addLink}
              onClick={(e) => {
                e.preventDefault();
                addItem(input_bloc);
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

          {input_bloc !== undefined &&
            input_bloc.link_networks_an_others_header.length > 0 &&
            input_bloc.link_networks_an_others_header.map(
              (
                value: LinkNetworksAndOthersHeader | Record<string, unknown>,
                key: number
              ) => {
                return (
                  <div
                    className="block max-w-sm m-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 "
                    key={key}
                  >
                    <div className="">
                      <h3 className="underline mb-4">Image logo lien :</h3>

                      <DragAndDrop
                        field={"image_url"}
                        key={key}
                        index={key}
                        bloc={input_bloc}
                        data_img={
                          String(value.image_url) !== undefined
                            ? String(value.image_url)
                            : ""
                        }
                        toggle={toggle}
                        subfield={"image_url"}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Nom :</Label>
                      <Input
                        className="mt-4 mb-4 bg-slate-100 w-full"
                        onChange={(e) => {
                          updateComponent(
                            e,
                            "name",
                            undefined,
                            key,
                            input_bloc
                          );
                        }}
                        value={String(value.name)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Lien :</Label>
                      <Input
                        className="mt-4 mb-4 bg-slate-100 w-full"
                        value={String(value.background_url)}
                        onChange={(e) => {
                          updateComponent(e, "background_url", undefined, key);
                        }}
                      />
                    </div>

                    <div className="grid gap-2 mt-4  bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                      <Button
                        onClick={() => {
                          removeItem(input_bloc, input_bloc.bloc_number);
                          setToggle(!toggle);
                        }}
                      >
                        Supprimer le réseau
                      </Button>
                    </div>
                  </div>
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
