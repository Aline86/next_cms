import Button from "./../models/Button";
import Carousel from "./../models/Carousel";
import Footer from "./../models/FooterData";
import Header from "./../models/Header";
import Page from "./../models/Page";
import PictureGroup from "./../models/PictureGroup";
import ScreenHome from "./../models/Screen";
import TextPicture from "./../models/TextPicture";
import Video from "./../models/Video";

type ComponentTypes =
  | Page
  | PictureGroup
  | TextPicture
  | ScreenHome
  | Header
  | Footer
  | Carousel
  | Video
  | Button;

export default ComponentTypes;
