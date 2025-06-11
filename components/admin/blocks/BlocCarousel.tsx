import Carousel from "../../../models/Carousel";
import BlockContainer from "./wrapper/BlockContainer";
import MiniaturesVisualization from "./front_end_components/miniatures/Miniatures";
import CssCarouselPosition from "./backend_components/carousel/css_bloc_position/CssBlocPosition";
import CarouselOption3 from "./backend_components/carousel/miniatures/component";

import CarouselOption1 from "./backend_components/carousel/carousel/component";
import CarouselVisualization from "./front_end_components/carousel/Carousel";
import CarouselOption2 from "./backend_components/carousel/auto/component";
import CarouselAutoVisualization from "./front_end_components/auto/Carousel";
import { useEffect } from "react";

interface BlocData {
  bloc: Carousel;
  setDragBegin: React.Dispatch<React.SetStateAction<number>>;
  updateDragBloc: (index: number) => Promise<void>;
  handleDragOver: React.Dispatch<React.DragEvent<HTMLDivElement>>;
  openModal: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  drag: boolean;
  toggle: boolean;
  page_id: number;
  index: number;
}

function BlocCarousel({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  setRefresh,
  refresh,
  drag,
  toggle,
  index,
  openModal,
  page_id,
}: BlocData) {
  useEffect(() => {}, [toggle]);
  return bloc !== undefined ? (
    <BlockContainer
      bloc={bloc}
      setDragBegin={() => setDragBegin(index)}
      updateDragBloc={updateDragBloc}
      handleDragOver={handleDragOver}
      drag={drag}
      index={index}
      component_visualization={
        bloc.carousel_type === "miniatures" ? (
          <MiniaturesVisualization
            input_bloc={bloc}
            toggle={toggle}
            refresh={false}
            full={false}
            isResponsive={false}
          />
        ) : bloc.carousel_type === "carousel" ? (
          <CarouselVisualization
            input_bloc={bloc}
            full={false}
            isResponsive={false}
            toggle={toggle}
          />
        ) : (
          <CarouselAutoVisualization
            slides={bloc}
            full={false}
            toggle={toggle}
          />
        )
      }
      css_position={
        <CssCarouselPosition
          props={
            bloc.carousel_type === "auto" ? (
              <CarouselOption2 bloc={bloc} page_id={page_id} toggle={toggle} />
            ) : bloc.carousel_type === "carousel" ? (
              <CarouselOption1 bloc={bloc} page_id={page_id} toggle={toggle} />
            ) : (
              bloc.carousel_type === "miniatures" && (
                <CarouselOption3 bloc={bloc} toggle={toggle} />
              )
            )
          }
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
export default BlocCarousel;
