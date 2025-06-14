"use client";
import { useEffect } from "react";

import { Input, Textarea } from "@headlessui/react";
import Video from "../../../../../../models/Video";
import useBlocStore from "../../../../../../store/blocsStore";
import ButtonSaveAll from "../../../../../../lib/buttonSaveAll";

function VideoInput({
  bloc,

  toggle,
}: {
  bloc: Video;

  toggle: boolean;
}) {
  const updateComponent = useBlocStore((state) => state.updateBloc);
  useEffect(() => {}, [toggle]);

  return bloc !== undefined ? (
    <div className="w-full" key={bloc.bloc_number}>
      <div className="w-full">
        <div className="">
          <div className="">
            <h2>Bloc numéro : {bloc.bloc_number}</h2>
          </div>
          <h3 className="underline mt-8">Bloc vidéo</h3>
        </div>
      </div>
      <div className="mb-8 mt-8">
        <h3 className="mb-4">Titre du bloc (optionnel) : </h3>
        <Input
          className="bg-slate-100 w-full"
          type="text"
          value={bloc.title}
          onChange={(e) => {
            updateComponent(e, "title", undefined, undefined, bloc);
          }}
        />
      </div>
      <div className="" style={{ display: `block`, marginTop: "15px" }}>
        <div className="mt-4 block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
          <Textarea
            id="video_url"
            value={bloc.image_url}
            onChange={(e) => {
              updateComponent(e, "image_url", undefined, undefined, bloc);
            }}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="PLacer ici Url de votre vidéo (Youtube, RCF, contacter l'administrateur pour permettre l'ajout d'autres sites d'hébergement de vidéo)... "
          ></Textarea>
        </div>
      </div>
      <div className="flex flex-col mb-8 mt-8">
        <label className="block mb-4 text-xl font-medium text-gray-1000 dark:text-gray">
          Texte de la vidéo (optionnel) :
        </label>
        <Textarea
          id="ideo_description"
          value={bloc.text}
          onChange={(e) => {
            updateComponent(e, "text", undefined, undefined, bloc);
          }}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Phrase explicative ici..."
        ></Textarea>
      </div>
      <div className="flex justify-end">
        <ButtonSaveAll bloc={bloc} toggle={toggle} />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default VideoInput;
