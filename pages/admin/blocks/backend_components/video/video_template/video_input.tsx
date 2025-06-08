import { useEffect } from "react";

import { Input, Textarea } from "@headlessui/react";
import Video from "../../../../../../models/Video";
import useBlocStore from "../../../../../../store/blocsStore";

function VideoInput({
  input_bloc,

  toggle,
}: {
  input_bloc: Video;

  toggle: boolean;
}) {
  const updateComponent = useBlocStore((state) => state.updateBloc);
  useEffect(() => {}, [toggle]);

  return input_bloc !== undefined ? (
    <div className="" key={input_bloc.bloc_number}>
      <div className="mb-8 mt-8">
        <h3 className="mb-4">Titre du bloc (optionnel) : </h3>
        <Input
          className="bg-slate-100 w-full"
          type="text"
          value={input_bloc.title}
          onChange={(e) => {
            updateComponent(e, "title", undefined, undefined, input_bloc);
          }}
        />
      </div>
      <div className="" style={{ display: `block`, marginTop: "15px" }}>
        <div className="mt-4 block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
          <Textarea
            id="video_url"
            value={input_bloc.image_url}
            onChange={(e) => {
              updateComponent(e, "image_url", undefined, undefined, input_bloc);
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
          value={input_bloc.text}
          onChange={(e) => {
            updateComponent(e, "text", undefined, undefined, input_bloc);
          }}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Phrase explicative ici..."
        ></Textarea>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default VideoInput;
