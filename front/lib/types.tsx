import Carousel from "../models/Carousel";
import Footer from "../models/FooterData";
import Header from "../models/Header";
import PictureGroup from "../models/PictureGroup";
import ScreenHome from "../models/Screen";
import TextPicture from "../models/TextPicture";

type ComponentTypes =
  | PictureGroup
  | TextPicture
  | ScreenHome
  | Header
  | Footer
  | Carousel;

export default ComponentTypes;
