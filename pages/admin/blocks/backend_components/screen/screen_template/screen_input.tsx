import { useEffect } from "react";
import s from "./style.module.css";
import ScreenHome from "../../../../../../models/Screen";
import DragAndDrop from "../../../../../../lib/dragzone";
import { Input, Textarea } from "@headlessui/react";
import useBlocStore from "../../../../../../store/blocsStore";

function ScreenInput({
  input_bloc,

  toggle,
}: {
  input_bloc: ScreenHome;

  toggle: boolean;
}) {
  useEffect(() => {}, [toggle]);

  const updateComponent = useBlocStore((state) => state.updateBloc);
  return input_bloc !== undefined ? (
    <div className={s.bloc} key={input_bloc.bloc_number}>
      <div className={s.titre} style={{ display: `block`, marginTop: "15px" }}>
        <div className="mt-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
          <DragAndDrop
            field={"image_url"}
            key={1}
            index={undefined}
            bloc={input_bloc}
            data_img={
              input_bloc?.image_url !== undefined ? input_bloc.image_url : ""
            }
            subfield={undefined}
            toggle={toggle}
          />
        </div>
      </div>
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
      <div className="flex flex-col mb-8 mt-8">
        <label className="block mb-4 text-xl font-medium text-gray-1000 dark:text-gray">
          Texte du bloc (optionnel) :
        </label>
        <Textarea
          id="message"
          value={input_bloc.text}
          onChange={(e) => {
            updateComponent(e, "text", undefined, undefined, input_bloc);
          }}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></Textarea>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ScreenInput;
