import { useEffect } from "react";
import BlockContainer from "./wrapper/BlockContainer";
import TextPicture from "../../../models/TextPicture";
import CssBlocPosition from "./backend_components/text_picture/css_bloc_position/CssBlocPosition";
import BlocInput from "./backend_components/text_picture/bloc/bloc_input";
import Bloc from "./front_end_components/text_picture/bloc";

interface BlocData {
  bloc: TextPicture;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setDragBegin: React.Dispatch<React.SetStateAction<number>>;
  updateDragBloc: (index: number) => Promise<void>;
  handleDragOver: React.Dispatch<React.DragEvent<HTMLDivElement>>;
  openModal: boolean;
  drag: boolean;
  toggle: boolean;
  page_id: number;
  index: number;
  refresh: boolean;
}

function BlocTextPicture({
  bloc,
  setRefresh,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  openModal,
  drag,
  toggle,
  index,
  refresh,
}: BlocData) {
  useEffect(() => {}, []);
  return bloc !== undefined ? (
    <BlockContainer
      bloc={bloc}
      setDragBegin={() => setDragBegin(index)}
      updateDragBloc={updateDragBloc}
      handleDragOver={handleDragOver}
      index={index}
      drag={drag}
      component_visualization={
        <Bloc
          bloc={bloc}
          num_bloc={index}
          toggle={toggle}
          full={false}
          index={index}
          isResponsive={false}
          refresh={refresh}
        />
      }
      css_position={
        <CssBlocPosition
          props={<BlocInput input_bloc={bloc} draggable={drag} />}
          bloc={bloc}
          draggable={drag}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      }
      isOpen={openModal}
      setRefresh={setRefresh}
      refresh={refresh}
    />
  ) : (
    <></>
  );
}
export default BlocTextPicture;
