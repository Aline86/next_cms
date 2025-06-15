import Mailto from "./dropdown_types/Maito";
import ExternalLink from "./dropdown_types/ExrternalLink";
import PageID from "./dropdown_types/PageID";
import FileLink from "./dropdown_types/File";
import RenderExternalLink from "./renderExternalLink";
import RenderFile from "./renderFile";
import RenderMailto from "./renderMailTo";
import RenderPageID from "./renderPageID";
import UnifiedColor from "./dropdown_types/UnifiedColor";
import RenderUnifiedColor from "./renderUnifiedColor";

import RenderPicture from "./renderPicture";
import RenderNoColor from "./renderNoColor";
import NoColor from "./dropdown_types/NoColor";
import Picture from "./dropdown_types/Picture";

const array_all_possible_types = {
  external_link: {
    model: ExternalLink,
    label_name: "Lien externe",
    component: RenderExternalLink,
  },
  file: { model: FileLink, label_name: "Fichier (PDF)", component: RenderFile },
  mailto: { model: Mailto, label_name: "Lien mailto", component: RenderMailto },
  pageID: {
    model: PageID,
    label_name: "Page du site",
    component: RenderPageID,
  },
  unified_color: {
    model: UnifiedColor,
    label_name: "Couleur unie",
    component: RenderUnifiedColor,
  },
  picture: {
    model: Picture,
    label_name: "Image de fond",
    component: RenderPicture,
  },
  no_color: { model: NoColor, label_name: "Vide", component: RenderNoColor },
};

export default array_all_possible_types;
