import PictureGroup from "../../../models/PictureGroup";
import CssPictureGroupPosition from "./backend_components/picture_group/css_bloc_position/CssBlocPosition";
import ImageGroup from "./backend_components/picture_group/image_group/component";
import PictureGroupVizualisation from "./front_end_components/picture_group/PictureGroup";
import BlockContainer from "./wrapper/BlockContainer";

interface BlocData {
  bloc: PictureGroup;
  setDragBegin: React.Dispatch<React.SetStateAction<number>>;
  updateDragBloc: (index: number) => Promise<void>;
  handleDragOver: React.Dispatch<React.DragEvent<HTMLDivElement>>;
  openModal: boolean;
  drag: boolean;
  toggle: boolean;
  index: number;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  page_id: number;
}

function BlocPictureGroup({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  openModal,
  drag,
  toggle,
  index,
  refresh,
  setRefresh,
  setToggle,
  page_id,
}: BlocData) {
  return bloc !== undefined ? (
    <BlockContainer
      bloc={bloc}
      setDragBegin={() => setDragBegin(index)}
      updateDragBloc={updateDragBloc}
      handleDragOver={handleDragOver}
      index={index}
      drag={drag}
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
              bloc={bloc}
              toggle={toggle}
              setToggle={setToggle}
            />
          }
          bloc={bloc}
          draggable={drag}
          toggle={toggle}
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
export default BlocPictureGroup;
