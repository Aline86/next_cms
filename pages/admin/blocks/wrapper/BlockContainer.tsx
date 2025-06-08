import ShrinkParams from "./shrink_params";
import ComponentTypes from "../../../../lib/types";
import { SetStateAction, useState } from "react";

interface BlocData {
  bloc: ComponentTypes;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
  setDragBegin?: (index: number) => void;
  updateDragBloc?: (index: number) => Promise<void>;
  handleDragOver?: React.DragEventHandler<HTMLDivElement>;
  isOpen: boolean;
  drag: boolean;
  index: number;
  component_visualization: React.ReactNode;
  css_position: React.ReactNode;
}

function BlockContainer({
  bloc,
  setRefresh,
  refresh,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  isOpen,
  drag,
  index,
  component_visualization,
  css_position,
}: BlocData) {
  const [openModal, setOpenModal] = useState(isOpen);
  return bloc !== undefined ? (
    <div
      draggable={drag}
      onDragStart={() => setDragBegin !== undefined && setDragBegin(index)}
      onDragOver={handleDragOver}
      onDrop={(e) => {
        console.log(e);
        updateDragBloc?.(index);
      }}
      key={index}
      onClick={() => setOpenModal(!openModal)}
    >
      <ShrinkParams
        key={index}
        setDragBegin={
          setDragBegin
            ? async (index: number) => {
                setDragBegin(index);
              }
            : undefined
        }
        updateDragBloc={async (event: number): Promise<void> => {
          if (updateDragBloc) {
            await updateDragBloc(event);
          }
        }}
        drag={drag}
        index={index !== undefined ? index + 1 : index}
        bloc={bloc}
        handleDragOver={handleDragOver}
        component_visualization={component_visualization}
        css_position={css_position}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </div>
  ) : (
    <></>
  );
}

export default BlockContainer;
