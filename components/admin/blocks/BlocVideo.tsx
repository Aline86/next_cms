import BlockContainer from "./wrapper/BlockContainer";

import VideoVisualization from "./front_end_components/video/Video";
import VideoInput from "./backend_components/video/video_template/video_input";
import Video from "../../../models/Video";
import CssVideoPosition from "./backend_components/video/css_bloc_position/CssVideoPosition";

interface BlocData {
  bloc: Video;
  setDragBegin: React.Dispatch<React.SetStateAction<number>>;
  updateDragBloc: (index: number) => Promise<void>;
  handleDragOver: React.Dispatch<React.DragEvent<HTMLDivElement>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  openModal: boolean;
  drag: boolean;
  toggle: boolean;
  index: number;
}

function BlocVideo({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  setRefresh,
  drag,
  refresh,
  openModal,
  toggle,
  index,
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
        <VideoVisualization bloc={bloc} toggle={toggle} full={false} />
      }
      css_position={
        <CssVideoPosition
          props={<VideoInput toggle={toggle} input_bloc={bloc} />}
          bloc={bloc}
          draggable={drag}
          setRefresh={setRefresh}
          refresh={refresh}
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
export default BlocVideo;
