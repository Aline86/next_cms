import { useEffect } from "react";
import BlockContainer from "./wrapper/BlockContainer";
import TextPicture from "../../../models/TextPicture";
import CssBlocPosition from "./backend_components/text_picture/css_bloc_position/CssBlocPosition";
import BlocInput from "./backend_components/text_picture/bloc/bloc_input";
import Bloc from "./front_end_components/text_picture/bloc";

import InputTypes from "../../../lib/InputTypes";
import ComponentTypes from "../../../lib/types";

interface BlocData {
  bloc: TextPicture;
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
  saveBloc: (bloc: TextPicture) => Promise<void>;
  saveBlocAll: React.Dispatch<React.SetStateAction<void>>;

  drag: boolean;
  toggle: boolean;
  page_id: number;
  index: number;
  isOpen: boolean;
}

function BlocTextPicture({
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
  useEffect(() => {}, [isOpen]);
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
        <Bloc
          bloc={bloc}
          num_bloc={index}
          toggle={toggle}
          full={false}
          index={index}
          isResponsive={false}
        />
      }
      css_position={
        <CssBlocPosition
          props={
            <BlocInput
              input_bloc={bloc}
              draggable={drag}
              updateBloc={async (
                event: InputTypes,
                field: string | undefined,
                input: string | undefined,
                index?: string | number | undefined,
                bloc?: ComponentTypes
              ): Promise<void> => {
                await updateComponent(event, field, input, index, bloc);
              }}
            />
          }
          updateBloc={async (
            event: InputTypes,
            field: string | undefined,
            input: string | undefined,
            index?: string | number | undefined,
            bloc?: TextPicture
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
export default BlocTextPicture;
