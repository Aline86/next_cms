import { useEffect } from "react";
import s from "./style.module.css";
import ScreenHome from "../../../../../../models/Screen";
import DragAndDrop from "../../../../../../lib/dragzone";
import InputTypes from "../../../../../../lib/InputTypes";
import { Input, Textarea } from "@headlessui/react";
import ComponentTypes from "../../../../../../lib/types";

function ScreenInput({
  input_bloc,
  updateComponent,
  toggle,
}: {
  input_bloc: ScreenHome;
  updateComponent: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: string | number | undefined,
    bloc?: ComponentTypes
  ) => Promise<void>;
  toggle: boolean;
}) {
  useEffect(() => {}, [toggle]);

  return input_bloc !== undefined ? (
    <div className={s.bloc} key={input_bloc.bloc_number}>
      <div className={s.titre} style={{ display: `block`, marginTop: "15px" }}>
        <div className="mt-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm light:bg-gray-800 light:border-gray-700 ">
          <DragAndDrop
            field={"screen_url"}
            key={1}
            index={undefined}
            bloc={input_bloc}
            data_img={
              input_bloc?.screen_url !== undefined ? input_bloc.screen_url : ""
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
            subfield={undefined}
          />
        </div>
      </div>
      <div className="mb-8 mt-8">
        <h3 className="mb-4">Titre du bloc (optionnel) : </h3>
        <Input
          className="bg-slate-100 w-full"
          type="text"
          defaultValue={input_bloc.title}
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
