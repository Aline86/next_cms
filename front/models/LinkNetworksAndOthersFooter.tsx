"use client";
export default class LinkNetworksAndOthersFooter {
  id: number;
  title: string;
  type: string;
  background_url: string;
  name: string;
  logo_url: string;
  constructor(
    title: string = "",
    background_url: string = "",
    name: string = "",
    logo_url: string = "",
    id: number = -1,
    type: string = "link_networks_an_others_footer"
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.background_url = background_url;
    this.name = name;
    this.logo_url = logo_url;
  }
}
