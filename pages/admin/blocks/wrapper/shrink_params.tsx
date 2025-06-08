import Shrink from "./shrink/shrink";
import DeleteConfirmation from "../../../../lib/DeleteBox";
import ComponentTypes from "../../../../lib/types";

interface BlocData {
  bloc: ComponentTypes;
  setDragBegin?: (index: number) => Promise<void>;
  updateDragBloc?: (index: number) => Promise<void>;
  handleDragOver?: React.DragEventHandler<HTMLDivElement>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  drag: boolean;
  index: number;
  css_position: React.ReactNode;

  component_visualization: React.ReactNode;
}

function ShrinkParams({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  setRefresh,
  refresh,
  drag,
  index,
  css_position,
  component_visualization,
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
        handleDrop(e);
      }}
      key={index}
    >
      <Shrink
        key={index}
        index={index}
        bloc={bloc}
        props={
          <div key={index} className="flex gap-8 mb-8">
            <div className="flex column-1 w-1/2 ml-8">{css_position}</div>
            {bloc.type !== "header" && bloc.type !== "footer" && (
              <div>
                <DeleteConfirmation
                  bloc={bloc}
                  setRefresh={setRefresh}
                  refresh={refresh}
                />
              </div>
            )}

            <div className="w-1/2 grid place-items-center">
              {component_visualization}
            </div>
          </div>
        }
        isOpen={false}
      />
    </div>
  ) : (
    <></>
  );
}
export default ShrinkParams;
