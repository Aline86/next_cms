import GridGroup from "./../../components/admin/blocks/backend_components/picture_group/grid/component";
import ImageGroup from "./../../components/admin/blocks/backend_components/picture_group/image_group/component";
import GridVizualisation from "./../../components/admin/blocks/front_end_components/image_group/grid/PictureGroup";
import PictureGroupVizualisation from "./../../components/admin/blocks/front_end_components/image_group/picture_group/PictureGroup";

const picturegroupTypes = {
  picture_group: {
    backend: ImageGroup,
    frontend: PictureGroupVizualisation,
  },
  grid: { backend: GridGroup, frontend: GridVizualisation },
};

export default picturegroupTypes;
