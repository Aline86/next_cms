import { useEffect } from "react";

import ComponentTypes from "../../../lib/types";

import useBlocStore from "../../../store/blocsStore";
import blocksToREnder from "../../../lib/config/blocsToRender";
import BlockContainer from "./wrapper/BlockContainer";

interface BlocData {
  setDragBegin: React.Dispatch<React.SetStateAction<number>>;
  dragBegin: number;
  drag: boolean;
  toggle: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  page_id: number;
  refresh: boolean;

  highlight: number | null | undefined;
}

function Blocs({
  setDragBegin,
  dragBegin,
  drag,
  toggle,
  refresh,
  setRefresh,
  setToggle,
  page_id,
}: BlocData) {
  // edit with new component type when you add a bloc
  const blocs = useBlocStore((state) => state.blocs);
  const setBlocs = useBlocStore((state) => state.setBlocs);
  const updateDragBloc = async (lastKey: number) => {
    const start = dragBegin;
    const end = lastKey;

    await moveElements(start, end);
  };
  const moveElements = async (start: number, end: number) => {
    if (blocs === undefined || blocs.length === 0) return;
    const newItems = [...blocs];
    const draggedItemValue = newItems[start];
    newItems.splice(start, 1);
    newItems.splice(end, 0, draggedItemValue);
    const new_bloc_array: Array<ComponentTypes> = [];
    newItems.map(async (bloc: ComponentTypes, index) => {
      if (
        "set_bloc_number" in bloc &&
        typeof bloc.set_bloc_number === "function"
      ) {
        bloc.set_bloc_number(index);
        const savedBloc = await bloc.save_bloc();
        if (savedBloc !== undefined && typeof savedBloc === "object") {
          new_bloc_array[index] = savedBloc;
        }
      }
    });

    // saving the new info in database
    Promise.all(new_bloc_array).then((data) => {
      const typedData = data as Array<ComponentTypes>;
      if (typedData !== undefined && Array.isArray(typedData)) {
        setBlocs(new_bloc_array);
        setRefresh(!refresh);
      }
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const adaptRoot = () => {
    const root = document.getElementById("root");
    if (root !== null) {
      root.style.paddingTop = "0px";
      root.style.paddingBottom = "0px";
    }
  };
  useEffect(() => {
    adaptRoot();
  }, []);

  useEffect(() => {}, [toggle]);
  useEffect(() => {
    setToggle(!toggle);
  }, [blocs]);
  return (
    <div className="w-full">
      {blocs !== undefined &&
        blocs.length > 0 &&
        blocs.map((bloc, index) => {
          type BlocType = keyof typeof blocksToREnder;
          const blocType = bloc.type as BlocType;

          return blocksToREnder !== undefined &&
            blocksToREnder[blocType] !== undefined ? (
            <BlockContainer
              key={index}
              bloc={bloc}
              setRefresh={setRefresh}
              refresh={refresh}
              drag={drag}
              index={index}
              isOpen={false}
              setDragBegin={setDragBegin}
              handleDragOver={handleDragOver}
              updateDragBloc={updateDragBloc}
              toggle={toggle}
              isResponsive={false}
              full={false}
              page_id={page_id}
              setToggle={setToggle}
            />
          ) : (
            <></>
          );
        })}
    </div>
  );
}

export default Blocs;
