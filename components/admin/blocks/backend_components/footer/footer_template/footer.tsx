"use client";
import { useEffect, useState } from "react";
import s from "./styles.module.css";
import remove from "./../../../../../assets/remove.png";
import Footer from "../../../../../../models/FooterData";
import Image from "next/image";
import DragAndDrop from "../../../../../../lib/dragzone";
import { Button, Input } from "@headlessui/react";

import useBlocStore from "../../../../../../store/blocsStore";

interface FooterInfo {
  bloc: Footer;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}

function FooterInput({ bloc, setRefresh, refresh }: FooterInfo) {
  const [opened, setOpened] = useState(false);
  const updateComponent = useBlocStore((state) => state.updateBloc);
  const saveBlocAll = useBlocStore((state) => state.saveBlocAll);
  const addItem = useBlocStore((state) => state.addItem);
  const removeItem = useBlocStore((state) => state.removeItem);

  useEffect(() => {}, [bloc]);
  return bloc !== undefined ? (
    <div className={s.container}>
      <div className={s.container_column}>
        <div className="w-full">
          <div className="">
            <h3 className="underline mt-8">Pied de page</h3>
          </div>
        </div>
        <div className={s.top_container}>
          <div className={s.color}>
            <h3 style={{ textDecoration: "underline" }}>Couleur de fond :</h3>
            <Input
              type="color"
              className="mt-4 mb-4"
              value={bloc.background_color}
              onChange={(e) => {
                updateComponent(
                  e,
                  "background_color",
                  undefined,
                  undefined,
                  bloc
                );
              }}
            />
          </div>
          <h3 style={{ textDecoration: "underline" }}>Adresse du site : </h3>
          <div className={s.title_bloc}>
            <h3>Nom : </h3>
            <Input
              className="mt-4 mb-4 bg-slate-100 w-full"
              type="text"
              value={bloc?.address.title}
              onChange={(e) => {
                updateComponent(e, "title", "address", undefined, bloc);
              }}
            />
          </div>

          <div className={s.title_bloc}>
            <h3>Adresse : </h3>
            <Input
              className="mt-4 mb-4 bg-slate-100 w-full"
              type="text"
              value={bloc?.address.address}
              onChange={(e) => {
                updateComponent(e, "address", "address", undefined, bloc);
              }}
            />
          </div>
          <div className={s.title_bloc}>
            <h3>Ville et code postal : </h3>
            <Input
              className="mt-4 mb-4 bg-slate-100 w-full"
              type="text"
              value={bloc?.address.town}
              onChange={(e) => {
                updateComponent(e, "town", "address", undefined, bloc);
              }}
            />
          </div>
          <div className={s.map} onClick={() => setOpened(!opened)}>
            <div className={s.map_content}>
              <h3>Lien url de l&apos;iframe google pour la carte :</h3>
              <Input
                className="mt-4 mb-4 bg-slate-100 w-full"
                type="text"
                value={
                  bloc?.map_iframe_url !== "undefined"
                    ? bloc?.map_iframe_url
                    : ""
                }
                onChange={(e) => {
                  updateComponent(
                    e,
                    "map_iframe_url",
                    undefined,
                    undefined,
                    bloc
                  );
                }}
              />
            </div>
          </div>
          <div className={s.add_file}>
            <label
              className={s.addCard}
              onClick={(e) => {
                e.preventDefault();
                addItem(bloc);
                setRefresh(!refresh);
              }}
            >
              <Button className="w-[300px] h-[90px] mt-8 bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                Ajouter un lien réseau social +
              </Button>
            </label>
          </div>
        </div>
      </div>
      <div className={s.social_networks}>
        <h2>Liens (ex: réseaux sociaux) : </h2>
        {bloc !== undefined &&
          bloc.links_network_an_others_footer.length > 0 &&
          bloc.links_network_an_others_footer.map((value, key) => {
            return (
              <div
                key={key}
                className="relative mt-8 border border-1 text-gray-800 p-4 rounded-xl"
              >
                <div className="absolute right-4">
                  <Image
                    width={30}
                    height={30}
                    src={remove}
                    alt="suppression box"
                    onClick={() => {
                      removeItem(bloc, key);
                    }}
                  />
                </div>

                <div className="mt-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
                  <h3>Image logo lien :</h3>
                  <DragAndDrop
                    field={"image_url"}
                    key={1}
                    index={key}
                    bloc={bloc}
                    data_img={value.image_url}
                    subfield={""}
                    toggle={false}
                  />
                </div>
                <h3>Nom :</h3>
                <div className={s.name}>
                  <Input
                    className="mb-8 bg-slate-100 w-full"
                    type="text"
                    value={value.name}
                    onChange={(e) => {
                      updateComponent(e, "name", undefined, key, bloc);
                    }}
                  />
                </div>
                <h3>Lien :</h3>
                <div className={s.link_url}>
                  <Input
                    className="mb-8 bg-slate-100 w-full"
                    type="text"
                    value={value.background_url}
                    onChange={(e) => {
                      updateComponent(
                        e,
                        "background_url",
                        undefined,
                        key,
                        bloc
                      );
                    }}
                  />
                </div>
                <h3>Titre de la balise Lien :</h3>
                <div className={s.title}>
                  <input
                    type="text"
                    value={value.title}
                    onChange={(e) => {
                      updateComponent(e, "title", undefined, key, bloc);
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex justify-end mt-8 mb-8">
        <Button
          className="block leading-1 bg-slate-800 text-slate-50 cursor-pointer rounded min-w-[150px] h-[50px] mt-8"
          onClick={(e) => {
            e.preventDefault();
            saveBlocAll();
            //setRefresh(!refresh);
          }}
        >
          Enregistrer
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default FooterInput;
