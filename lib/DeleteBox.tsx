import remove from "./../components/assets/bouton-supprimer.png";
import { useEffect, useState } from "react";
import Image from "next/image";
import ComponentTypes from "./types";
import useBlocStore from "./../store/blocsStore";

interface CardDatas {
  bloc: ComponentTypes;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}

function DeleteConfirmation({ bloc }: CardDatas) {
  const removeBloc = useBlocStore((state) => state.removeBloc);
  const [open, setOpen] = useState(false);

  useEffect(() => {}, [open]);
  return (
    <>
      <div className="absolute  flex items-center justify-center rounded-4xl cursor-pointer-not-big flex">
        <button
          onClick={() => {
            setOpen(!open);
          }}
          id="deleteButton"
          data-modal-target="deleteModal"
          data-modal-toggle="deleteModal"
          type="button"
        >
          <Image src={remove} alt="suppression box" width={25} height={25} />
        </button>
      </div>
      {open && (
        <div
          id="deleteModal"
          className={
            "overflow-y-auto overflow-x-hidden fixed top-1 justify-center items-center w-full md:inset-0 h-modal md:h-full"
          }
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button
                onClick={() => {
                  setOpen(!open);
                }}
                type="button"
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="deleteModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">
                  Femeture de la boîte de dialogue
                </span>
              </button>
              <svg
                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Êtes-vous sûr de vouloir supprimer cet élément ?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => {
                    setOpen(!open);
                  }}
                  data-modal-toggle="deleteModal"
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Non, annulation !
                </button>
                <button
                  onClick={() => {
                    removeBloc(bloc.bloc_number);
                    setOpen(!open);
                    // setRefresh(!refresh);
                  }}
                  type="submit"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Oui, je le souhaite !
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default DeleteConfirmation;
