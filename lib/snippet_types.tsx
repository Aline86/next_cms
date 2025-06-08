import Button from "../models/Button";
import Carousel from "../models/Carousel";
import PictureGroup from "../models/PictureGroup";
import ScreenHome from "../models/Screen";
import TextPicture from "../models/TextPicture";
import Video from "../models/Video";

type SnippetTypes =
  | PictureGroup
  | TextPicture
  | ScreenHome
  | Carousel
  | Button
  | Video;
export default SnippetTypes;
