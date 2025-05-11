import { useEffect } from "react";
import ShrinkParams from "./shrink_params";
import ComponentTypes from "../../../../lib/types";

interface BlocData {
  bloc: ComponentTypes;
  setDragBegin?: (index: number) => void;
  updateDragBloc?: (index: number) => Promise<void>;
  handleDragOver?: React.DragEventHandler<HTMLDivElement>;
  removeBloc?: (bloc: ComponentTypes) => Promise<void>;
  drag: boolean;
  index: number;
  component_visualization: React.ReactNode;
  css_position: React.ReactNode;
  isOpen: boolean;
}

function BlockContainer({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  drag,
  index,
  component_visualization,
  css_position,
  isOpen,
}: BlocData) {
  useEffect(() => {}, [isOpen]);

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
        removeBloc={removeBloc}
        component_visualization={component_visualization}
        css_position={css_position}
        isOpen={isOpen}
      />
    </div>
  ) : (
    <></>
  );
}

export default BlockContainer;
