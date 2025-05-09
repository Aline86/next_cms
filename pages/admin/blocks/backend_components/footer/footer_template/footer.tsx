import { useEffect, useState } from "react";
import s from "./styles.module.css";
import remove from "./../../../../../assets/remove.png";
import Footer from "../../../../../../models/FooterData";
import Image from "next/image";
import DragAndDrop from "../../../../../../lib/dragzone";

import InputTypes from "../../../../../../lib/InputTypes";
import ComponentTypes from "../../../../../../lib/types";
import { Button, Input } from "@headlessui/react";

interface FooterInfo {
  input_bloc: Footer;
  updateComponent: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: string | number | undefined,
    bloc?: ComponentTypes
  ) => Promise<void>;
  saveBloc: (bloc: Footer) => Promise<void>;
}

function FooterInput({ input_bloc, updateComponent, saveBloc }: FooterInfo) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {}, [input_bloc]);
  return input_bloc !== undefined ? (
    <div className={s.container}>
      <div className={s.container_column}>
        <div className={s.top_container}>
          <div className={s.color}>
            <h3 style={{ textDecoration: "underline" }}>Couleur de fond :</h3>
            <Input
              type="color"
              className="mt-4 mb-4"
              value={input_bloc.background_color}
              onChange={(e) => {
                updateComponent(
                  e,
                  "footer",
                  "background_color",
                  undefined,
                  input_bloc
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
              value={input_bloc?.address.title}
              onChange={(e) => {
                updateComponent(e, "address", "title", undefined, input_bloc);
              }}
            />
          </div>

          <div className={s.title_bloc}>
            <h3>Adresse : </h3>
            <Input
              className="mt-4 mb-4 bg-slate-100 w-full"
              type="text"
              value={input_bloc?.address.address}
              onChange={(e) => {
                updateComponent(e, "address", "address", undefined, input_bloc);
              }}
            />
          </div>
          <div className={s.title_bloc}>
            <h3>Ville et code postal : </h3>
            <Input
              className="mt-4 mb-4 bg-slate-100 w-full"
              type="text"
              value={input_bloc?.address.town}
              onChange={(e) => {
                updateComponent(e, "address", "town", undefined, input_bloc);
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
                  input_bloc?.map_iframe_url !== "undefined"
                    ? input_bloc?.map_iframe_url
                    : ""
                }
                onChange={(e) => {
                  updateComponent(
                    e,
                    "footer",
                    "map_iframe_url",
                    undefined,
                    input_bloc
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
                updateComponent(e, "ajout", "", undefined, input_bloc);
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
        {input_bloc !== undefined &&
          input_bloc.links_network_an_others_footer.length > 0 &&
          input_bloc.links_network_an_others_footer.map((value, key) => {
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
                    onClick={(e) => {
                      updateComponent(
                        e,
                        "social_network",
                        "remove",
                        key,
                        input_bloc
                      );
                    }}
                  />
                </div>

                <div className="mt-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
                  <h3>Image logo lien :</h3>
                  <DragAndDrop
                    field={"social_network"}
                    key={1}
                    index={key}
                    bloc={input_bloc}
                    data_img={
                      input_bloc?.links_network_an_others_footer[key]
                        .logo_url !== undefined
                        ? input_bloc?.links_network_an_others_footer[key]
                            .logo_url
                        : ""
                    }
                    update={async (
                      event: InputTypes,
                      field: string | undefined,
                      input: string | undefined,
                      index?: string | number | undefined,
                      bloc?: ComponentTypes
                    ): Promise<void> => {
                      await updateComponent(event, field, input, index, bloc);
                    }}
                    subfield={"url_logo"}
                  />
                </div>
                <h3>Nom :</h3>
                <div className={s.name}>
                  <Input
                    className="mb-8 bg-slate-100 w-full"
                    type="text"
                    value={value.name}
                    onChange={(e) => {
                      updateComponent(
                        e,
                        "social_network",
                        "name",
                        key,
                        input_bloc
                      );
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
                        "social_network",
                        "background_url",
                        key,
                        input_bloc
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
                      updateComponent(
                        e,
                        "social_network",
                        "title",
                        key,
                        input_bloc
                      );
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
            saveBloc(input_bloc);
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
