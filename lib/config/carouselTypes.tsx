import CarouselOption2 from "../../components/admin/blocks/backend_components/carousel/auto/component";
import CarouselOption1 from "../../components/admin/blocks/backend_components/carousel/carousel/component";
import CarouselOption3 from "../../components/admin/blocks/backend_components/carousel/miniatures/component";
import CarouselAutoVisualization from "../../components/admin/blocks/front_end_components/slider/auto/Carousel";
import CarouselVisualization from "../../components/admin/blocks/front_end_components/slider/carousel/Carousel";
import MiniaturesVisualization from "../../components/admin/blocks/front_end_components/slider/miniatures/Miniatures";

const carouselTypes = {
  carousel: { frontend: CarouselVisualization, backend: CarouselOption1 },
  auto: { frontend: CarouselAutoVisualization, backend: CarouselOption2 },
  miniatures: { frontend: MiniaturesVisualization, backend: CarouselOption3 },
};

export default carouselTypes;
