import { useEffect } from "react";
import Carousel from "../../../models/Carousel";
import BlockContainer from "./wrapper/BlockContainer";
import MiniaturesVisualization from "./front_end_components/miniatures/Miniatures";
import CssCarouselPosition from "./backend_components/carousel/css_bloc_position/CssBlocPosition";
import CarouselOption3 from "./backend_components/carousel/miniatures/component";
import InputTypes from "../../../lib/InputTypes";
import ComponentTypes from "../../../lib/types";

interface BlocData {
  bloc: Carousel;
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
  saveBloc: (bloc: Carousel) => Promise<void>;
  saveBlocAll: React.Dispatch<React.SetStateAction<void>>;
  drag: boolean;
  toggle: boolean;
  page_id: number;
  index: number;
  isOpen: boolean;
}

function BlocCarousel({
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
  useEffect(() => {}, []);
  return bloc !== undefined ? (
    <BlockContainer
      bloc={bloc}
      setDragBegin={() => setDragBegin(index)}
      updateDragBloc={updateDragBloc}
      handleDragOver={handleDragOver}
      removeBloc={removeBloc}
      drag={drag}
      index={index}
      isOpen={isOpen}
      component_visualization={
        /* bloc.carousel_type !== "miniatures" ? (
          <CarouselVisualization
            input_bloc={bloc}
            toggle={toggle}
            refresh={false}
            full={false}
            isResponsive={false}
          />
        ) : (*/
        <MiniaturesVisualization
          input_bloc={bloc}
          toggle={toggle}
          refresh={false}
          full={false}
          isResponsive={false}
        />
        /* )*/
      }
      css_position={
        <CssCarouselPosition
          props={
            /*  bloc.carousel_type === "auto" ? (
              <CarouselOption2 updateCarousel={updateCarousel} bloc={bloc} />
            ) : bloc.carousel_type === "carousel" ? (
              <CarouselOption1 updateCarousel={updateCarousel} bloc={bloc} />
            ) : (*/
            bloc.carousel_type === "miniatures" && (
              <CarouselOption3
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
              />
              //  )
            )
          }
          updateComponent={updateComponent}
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
export default BlocCarousel;
