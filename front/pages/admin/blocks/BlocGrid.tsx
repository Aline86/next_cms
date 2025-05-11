import BlockContainer from "./wrapper/BlockContainer";
import GridVizualisation from "./front_end_components/grid/PictureGroup";
import PictureGroup from "../../../models/PictureGroup";
import CssPictureGroupPosition from "./backend_components/picture_group/css_bloc_position/CssBlocPosition";
import GridGroup from "./backend_components/picture_group/grid/component";

import InputTypes from "../../../lib/InputTypes";
import ComponentTypes from "../../../lib/types";

interface BlocData {
  bloc: PictureGroup;
  setDragBegin: React.Dispatch<number>;
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
  saveBloc: (bloc: PictureGroup) => Promise<void>;
  saveBlocAll: React.Dispatch<React.SetStateAction<void>>;
  drag: boolean;
  toggle: boolean;
  index: number;
  refresh: boolean;
  isOpen: boolean;

  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function BlocGridGroup({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  removeBloc,
  updateComponent,
  saveBlocAll,
  drag,
  toggle,
  isOpen,
  index,
  refresh,
  setToggle,
}: BlocData) {
  return bloc !== undefined ? (
    <BlockContainer
      bloc={bloc}
      setDragBegin={setDragBegin}
      updateDragBloc={async () => {
        if (updateDragBloc) {
          await updateDragBloc(index);
        }
      }}
      handleDragOver={handleDragOver}
      removeBloc={removeBloc}
      index={index}
      drag={drag}
      isOpen={isOpen}
      component_visualization={
        <GridVizualisation
          input_bloc={bloc}
          toggle={toggle}
          refresh={refresh}
          isResponsive={false}
        />
      }
      css_position={
        <CssPictureGroupPosition
          props={
            <GridGroup
              updatePictureGroupData={async (
                event: InputTypes,
                field: string | undefined,
                input: string | undefined,
                index?: string | number | undefined,
                bloc?: ComponentTypes
              ): Promise<void> => {
                await updateComponent(event, field, input, index, bloc);
              }}
              bloc={bloc}
              toggle={toggle}
              setToggle={setToggle}
            />
          }
          updateComponent={async (
            event: InputTypes,
            field: string | undefined,
            input: string | undefined,
            index?: string | number | undefined,
            bloc?: ComponentTypes
          ): Promise<void> => {
            await updateComponent(event, field, input, index, bloc);
          }}
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
export default BlocGridGroup;
