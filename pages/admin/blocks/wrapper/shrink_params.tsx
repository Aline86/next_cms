import Shrink from "./shrink/shrink";
import DeleteConfirmation from "../../../../lib/DeleteBox";
import ComponentTypes from "../../../../lib/types";

interface BlocData {
  bloc: ComponentTypes;
  setDragBegin?: (index: number) => Promise<void>;
  updateDragBloc?: (index: number) => Promise<void>;
  handleDragOver?: React.DragEventHandler<HTMLDivElement>;
  removeBloc?: (bloc: ComponentTypes) => Promise<void>;
  drag: boolean;
  index: number;
  css_position: React.ReactNode;

  component_visualization: React.ReactNode;
  isOpen: boolean;
}

function ShrinkParams({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  drag,
  index,
  css_position,
  component_visualization,
  isOpen,
}: BlocData) {
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (updateDragBloc) {
      updateDragBloc(index);
    }
  };
  return bloc !== undefined ? (
    <div
      draggable={drag}
      onDragStart={() =>
        setDragBegin !== undefined ? setDragBegin(index) : ""
      }
      onDragOver={handleDragOver}
      onDrop={(e) => {
        console.log("index", index, handleDrop);
        handleDrop(e);
      }}
      key={index}
    >
      <Shrink
        key={index}
        index={index}
        bloc={bloc}
        isOpen={isOpen}
        props={
          <div key={index} className="flex gap-8 mb-8">
            <div className="flex column-1 w-1/2 ml-8">{css_position}</div>
            {removeBloc !== undefined && (
              <div>
                <DeleteConfirmation removeBloc={removeBloc} bloc={bloc} />
              </div>
            )}
            <div className="w-1/2 grid ">{component_visualization}</div>
          </div>
        }
      />
    </div>
  ) : (
    <></>
  );
}
export default ShrinkParams;
