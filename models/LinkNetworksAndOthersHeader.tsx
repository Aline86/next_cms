export default class LinkNetworksAndOthersHeader {
  id: number;
  title: string;
  type: string;
  bloc_number: number;
  background_url: string;
  name: string;
  logo_url: string;

  constructor(
    bloc_number: number = -1,
    id: number = -1,
    title: string = "",
    background_url: string = "",
    name: string = "",
    logo_url: string = "",
    type: string = "link_networks_an_others_header"
  ) {
    this.bloc_number = bloc_number;
    this.id = id;
    this.title = title;
    this.type = type;
    this.background_url = background_url;
    this.name = name;
    this.logo_url = logo_url;
  }
}
