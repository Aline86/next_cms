import CarouselConfiguration from "./../../components/admin/blocks/backend_components/carousel/CarouselConfiguration";
import CarouselFrontConfiguration from "./../../components/admin/blocks/front_end_components/slider/CarouselConfiguration";
import ButtonVisualization from "./../../components/admin/blocks/front_end_components/button/Button";
import PictureGroupConfiguration from "./../../components/admin/blocks/backend_components/picture_group/PictureGroupConfiguration";
import ButtonInput from "./../../components/admin/blocks/backend_components/button/component";
import VideoVisualization from "./../../components/admin/blocks/front_end_components/video/Video";
import ScreenVizualisation from "./../../components/admin/blocks/front_end_components/screen/screen";
import HeaderVizualization from "./../../components/admin/blocks/front_end_components/header/header";
import FooterVizualization from "./../../components/admin/blocks/front_end_components/footer/footer";
import ScreenInput from "./../../components/admin/blocks/backend_components/screen/screen_template/screen_input";
import HeaderInput from "./../../components/admin/blocks/backend_components/header/header_template/header_input";
import FooterInput from "./../../components/admin/blocks/backend_components/footer/footer_template/footer";
import VideoInput from "./../../components/admin/blocks/backend_components/video/video_template/video_input";
import Bloc from "./../../components/admin/blocks/front_end_components/text_picture/bloc";
import BlocInput from "./../../components/admin/blocks/backend_components/text_picture/bloc/bloc_input";
import PictureGroupFrontConfiguration from "./../../components/admin/blocks/front_end_components/image_group/PictureGroupFrontConfiguration";
import auto from "./../../components/assets/auto.png";
import cover from "./../../components/assets/cover.png";
import miniatures from "./../../components/assets/miniatures.png";
import text from "./../../components/assets/picture.png";
import curseur from "./../../components/assets/curseur.png";
import Carousel from "./../../models/Carousel";
import PictureGroup from "./../../models/PictureGroup";
import ScreenHome from "./../../models/Screen";
import Video from "./../../models/Video";
import Button from "./../../models/Button";
import TextPicture from "./../../models/TextPicture";
import GridGroup from "./../../components/admin/blocks/backend_components/picture_group/grid/component";
import ImageGroup from "./../../components/admin/blocks/backend_components/picture_group/image_group/component";
import GridVizualisation from "./../../components/admin/blocks/front_end_components/image_group/grid/PictureGroup";
import PictureGroupVizualisation from "./../../components/admin/blocks/front_end_components/image_group/picture_group/PictureGroup";
import CarouselOption1 from "./../../components/admin/blocks/backend_components/carousel/carousel/component";
import CarouselOption3 from "./../../components/admin/blocks/backend_components/carousel/miniatures/component";
import CarouselAutoVisualization from "./../../components/admin/blocks/front_end_components/slider/auto/Carousel";
import CarouselVisualization from "./../../components/admin/blocks/front_end_components/slider/carousel/Carousel";
import MiniaturesVisualization from "./../../components/admin/blocks/front_end_components/slider/miniatures/Miniatures";
import CarouselOption2 from "./../../components/admin/blocks/backend_components/carousel/auto/component";
import Header from "../../models/Header";
import Footer from "../../models/FooterData";

const blocksToRender = {
  carousel: {
    frontend: CarouselFrontConfiguration,
    backend: CarouselConfiguration,
    icon_picture: miniatures,
    model: Carousel,
    variants: {
      carousel: {
        frontend: CarouselVisualization,
        backend: CarouselOption1,
        icon_picture: miniatures,
        specialty: "carousel",
        name: "Slider simple",
      },
      auto: {
        frontend: CarouselAutoVisualization,
        backend: CarouselOption2,
        icon_picture: auto,
        specialty: "auto",
        name: "Slider automatique",
      },
      miniatures: {
        frontend: MiniaturesVisualization,
        backend: CarouselOption3,
        icon_picture: auto,
        specialty: "miniatures",
        name: "Slider avec miniatures",
      },
    },
  },
  picture_group: {
    frontend: PictureGroupFrontConfiguration,
    backend: PictureGroupConfiguration,
    icon_picture: cover,
    model: PictureGroup,
    name: "Images",
    variants: {
      picture_group: {
        backend: ImageGroup,
        frontend: PictureGroupVizualisation,
        icon_picture: cover,
        specialty: false,
        name: "Groupe d'images",
      },
      grid: {
        backend: GridGroup,
        frontend: GridVizualisation,
        icon_picture: cover,
        specialty: true,
        name: "Grille d'images",
      },
    },
  },
  screen: {
    frontend: ScreenVizualisation,
    backend: ScreenInput,
    icon_picture: cover,
    model: ScreenHome,
    name: "Ecran",
  },
  video: {
    frontend: VideoVisualization,
    backend: VideoInput,
    icon_picture: curseur,
    model: Video,
    name: "Vidéo",
  },
  button: {
    frontend: ButtonVisualization,
    backend: ButtonInput,
    icon_picture: cover,
    model: Button,
    name: "Bouton",
  },
  text_picture: {
    frontend: Bloc,
    backend: BlocInput,
    icon_picture: text,
    model: TextPicture,
    name: "Text Image",
  },
  header: {
    frontend: HeaderVizualization,
    backend: HeaderInput,
    icon_picture: undefined,
    model: Header,
  },
  footer: {
    frontend: FooterVizualization,
    backend: FooterInput,
    icon_picture: undefined,
    model: Footer,
  },
};

export default blocksToRender;
