import PictureGroup from "../../../models/PictureGroup";
import CssPictureGroupPosition from "./backend_components/picture_group/css_bloc_position/CssBlocPosition";
import ImageGroup from "./backend_components/picture_group/image_group/component";
import PictureGroupVizualisation from "./front_end_components/picture_group/PictureGroup";
import BlockContainer from "./wrapper/BlockContainer";
import InputTypes from "../../../lib/InputTypes";
import ComponentTypes from "../../../lib/types";

interface BlocData {
  bloc: PictureGroup;
  setDragBegin: React.Dispatch<React.SetStateAction<number>>;
  updateDragBloc: (index: number) => Promise<void>;
  handleDragOver: React.Dispatch<React.DragEvent<HTMLDivElement>>;
  updateComponent: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: string | number | undefined,
    bloc?: PictureGroup
  ) => Promise<void>;

  removeBloc: (bloc: ComponentTypes) => Promise<void>;
  saveBloc: (bloc: ComponentTypes) => Promise<void>;
  saveBlocAll: React.Dispatch<React.SetStateAction<void>>;
  drag: boolean;
  toggle: boolean;
  index: number;
  refresh: boolean;
  isOpen: boolean;
  page_id: number;
}

function BlocPictureGroup({
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
  page_id,
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
        <PictureGroupVizualisation
          input_bloc={bloc}
          toggle={toggle}
          full={false}
          isResponsive={false}
        />
      }
      css_position={
        <CssPictureGroupPosition
          props={
            <ImageGroup
              page_id={page_id}
              updateComponent={async (
                event: InputTypes,
                field: string | undefined,
                input: string | undefined,
                index?: string | number | undefined,
                bloc?: ComponentTypes
              ): Promise<void> => {
                if (bloc instanceof PictureGroup) {
                  await updateComponent(event, field, input, index, bloc);
                }
              }}
              bloc={bloc}
            />
          }
          updateComponent={async (
            event: InputTypes,
            field: string | undefined,
            input: string | undefined,
            index?: string | number | undefined,
            bloc?: PictureGroup
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
export default BlocPictureGroup;
