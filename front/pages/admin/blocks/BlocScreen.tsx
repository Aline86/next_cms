import ScreenHome from "../../../models/Screen";
import CssScreenPosition from "./backend_components/screen/css_bloc_position/CssScreenPosition";
import ScreenInput from "./backend_components/screen/screen_template/screen_input";
import ScreenVizualisation from "./front_end_components/screen/screen";
import BlockContainer from "./wrapper/BlockContainer";
import InputTypes from "../../../lib/InputTypes";
import ComponentTypes from "../../../lib/types";

interface BlocData {
  bloc: ScreenHome;
  setDragBegin: React.Dispatch<React.SetStateAction<number>>;
  updateDragBloc: (index: number) => Promise<void>;
  handleDragOver: React.Dispatch<React.DragEvent<HTMLDivElement>>;
  updateComponent: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: string | number | undefined,
    bloc?: ComponentTypes
  ) => Promise<void>;

  removeBloc: (bloc: ComponentTypes) => Promise<void>;
  saveBloc: (bloc: ScreenHome) => Promise<void>;
  saveBlocAll: React.Dispatch<React.SetStateAction<void>>;
  drag: boolean;
  toggle: boolean;
  index: number;
  refresh: boolean;
  isOpen: boolean;

  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function BlocScreen({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  updateComponent,
  saveBlocAll,
  drag,

  toggle,
  index,
  isOpen,
}: BlocData) {
  return bloc !== undefined ? (
    <BlockContainer
      bloc={bloc}
      setDragBegin={() => setDragBegin(index)}
      updateDragBloc={updateDragBloc}
      handleDragOver={handleDragOver}
      removeBloc={removeBloc}
      index={index}
      drag={drag}
      isOpen={isOpen}
      component_visualization={
        <ScreenVizualisation
          bloc={bloc}
          isResponsive={false}
          toggle={toggle}
          full={false}
        />
      }
      css_position={
        <CssScreenPosition
          props={
            <ScreenInput
              updateComponent={async (
                event: InputTypes,
                field: string | undefined,
                input: string | undefined,
                index?: string | number | undefined,
                bloc?: ComponentTypes
              ): Promise<void> => {
                await updateComponent(event, field, input, index, bloc);
              }}
              toggle={toggle}
              input_bloc={bloc}
            />
          }
          bloc={bloc}
          draggable={drag}
          saveBlocAll={saveBlocAll}
        />
      }
    />
  ) : (
    <></>
  );
}
export default BlocScreen;
