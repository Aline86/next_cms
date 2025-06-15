import Address from "./../models/AddressData";
import CarouselData from "./../models/CarouselData";
import LinkNetworksAndOthersHeader from "./../models/LinkNetworksAndOthersHeader";
import PictureGroupData from "./../models/PictureGroupData";

type SubModelTypes = Record<
  string,
  | PictureGroupData
  | CarouselData
  | Address
  | LinkNetworksAndOthersHeader
  | LinkNetworksAndOthersHeader
>;
export default SubModelTypes;
