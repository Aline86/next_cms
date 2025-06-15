/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import remove from "./../components/assets/remove.png";
import Image from "next/image";
import ComponentTypes from "./types";
import { MoonLoader } from "react-spinners";
import Header from "./../models/Header";

import DropZone from "./../models/DropZone";
import useBlocStore from "./../store/blocsStore";

export default function DragAndDrop({
  field,
  subfield,
  bloc,
  index,
  data_img,
}: {
  field: string;
  subfield: string | undefined;

  bloc: ComponentTypes | undefined;

  index: number | undefined;

  data_img: string;
}) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, set_file] = useState<string>();
  const dropzone = new DropZone();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const update = useBlocStore((state) => state.updateBloc);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      setIsLoading(true);
      const picture = await dropzone.update(e.target.files[0]);

      if (picture !== undefined && bloc !== undefined) {
        await update(picture, field, subfield, index, bloc);
        setIsLoading(false);
        set_file(
          process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
            "/api/uploadfile/" +
            picture
        );
      }
    }
  }

  async function handleDrop(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setIsLoading(true);
      const picture = await dropzone.update(e.dataTransfer.files[0]);
      if (picture !== undefined && bloc !== undefined) {
        await update(picture, field, subfield, index, bloc);
        setIsLoading(false);
        set_file(
          process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
            "/api/uploadfile/" +
            picture
        );
      }
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  async function removeFile(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    if (bloc instanceof Header) {
      if (index !== undefined) {
        await update(e, "remove", subfield, index, bloc);
      } else {
        await update(e, "remove", field, undefined, bloc);
        bloc.background_color = "";
      }
    }

    await update("", field, undefined, index, bloc);
    set_file("");
  }

  function openFileExplorer() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (inputRef.current) {
      inputRef.current.click();
    }
  }
  useEffect(() => {
    set_file(
      process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
        "/api/uploadfile/" +
        data_img
    );
  }, [data_img]);
  useEffect(() => {}, [file]);
  return (
    <div className="flex items-center justify-center">
      <form
        className={`${
          dragActive ? "bg-blue-400" : "bg-blue-100"
        }  p-4 rounded-lg text-center flex flex-col items-center justify-center`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        />

        <p>
          Glisser-déposer ou
          <span
            className="ml-2 font-bold text-blue-600 cursor-pointer-not-big"
            onClick={openFileExplorer}
          >
            <u>Sélectionner sur PC</u>
          </span>{" "}
          pour charger le fichier
        </p>

        <div className="flex items-center p-3">
          {isLoading ? (
            <MoonLoader />
          ) : (
            file !== "" &&
            data_img !== undefined &&
            file?.includes(data_img) && (
              <div key={1} className="gridspace-x-5">
                <span>{data_img}</span>
                <div
                  key={1}
                  className="mt-6 grid justify-end space-x-5 grid-flow-col"
                >
                  <img
                    src={file}
                    alt="drag and drop image"
                    width="200px"
                    height="auto"
                  />
                  <Image
                    className="relative top-0 cursor-pointer-not-big"
                    onClick={(e) => removeFile(e)}
                    src={remove}
                    width="25"
                    height="25"
                    alt={"supprimer l'image"}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </form>
    </div>
  );
}
