import CarouselData from "../models/CarouselData";
import PictureGroupData from "../models/PictureGroupData";

type SubModelTypes = Record<string, PictureGroupData | CarouselData>;
export default SubModelTypes;
