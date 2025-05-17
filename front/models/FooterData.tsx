import Container from "../lib/Container";

import InputTypes from "../lib/InputTypes";
import LinkNetworksAndOthersFooter from "./LinkNetworksAndOthersFooter";
import Address from "./AddressData";

export default class Footer extends Container {
  id: number;
  title: string;
  type: string;
  parameters: string;
  address: Address;
  links_network_an_others_footer: Array<LinkNetworksAndOthersFooter>;
  map_iframe_url: string;
  background_color: string;

  constructor(
    id: number = -1,
    title: string = "",
    type: string = "footer",
    map_iframe_url: string = "",
    background_color: string = "#f9f9f9"
  ) {
    super(id, title, type);
    this.id = id;
    this.title = title;
    this.type = type;
    this.parameters = this.type + "&id=1&type=" + this.type;
    this.address = new Address();
    this.links_network_an_others_footer = [];
    this.map_iframe_url = map_iframe_url;
    this.background_color = background_color;
  }

  set_links_network_an_others_footer(
    links_network_an_others_footer: Array<LinkNetworksAndOthersFooter>
  ) {
    this.links_network_an_others_footer = [];
    links_network_an_others_footer.forEach((link_network_an_others_footer) => {
      this.links_network_an_others_footer.push(link_network_an_others_footer);
    });
  }

  add_links_network_an_others_footer(
    links_network_an_others_footer: LinkNetworksAndOthersFooter
  ) {
    this.links_network_an_others_footer.push(
      new LinkNetworksAndOthersFooter(
        links_network_an_others_footer.title,
        links_network_an_others_footer.background_url,
        links_network_an_others_footer.name,
        links_network_an_others_footer.logo_url
      )
    );
  }

  public async remove_link(index: number) {
    if (index !== undefined) {
      this.set_parameters(
        "delete_child&id=" +
          this.links_network_an_others_footer[index].id +
          "&type=" +
          this.type +
          "&associated_table=links_network_an_others_footer"
      );
      this.links_network_an_others_footer.splice(index, 1);
      await this.delete_bloc();
      this.set_parameters(this.type + "&id=1&type=" + this.type);

      return this;
    }
  }

  _get_class_api_call_parameters(): string {
    return this.parameters;
  }

  public get_id(): number {
    return this.id;
  }
  public set_id(value: number) {
    this.id = value;
  }

  public get_title(): string {
    return this.title;
  }
  public set_title(value: string) {
    this.title = value;
  }

  public get_type(): string {
    return this.type;
  }
  public set_type(value: string) {
    this.type = value;
  }

  public get_parameters(): string {
    return this.parameters;
  }
  public set_parameters(value: string) {
    this.parameters = value;
  }

  public get_address(): Address {
    return this.address;
  }
  public set_address(address_array: Address[]) {
    address_array.forEach((value) => {
      this.address = new Address(
        value.title,
        value.address,
        value.town,
        value.id
      );
    });
  }

  public get_links_network_an_others_footer(): Array<LinkNetworksAndOthersFooter> {
    return this.links_network_an_others_footer;
  }

  public get_map_iframe_url(): string {
    return this.map_iframe_url;
  }
  public set_map_iframe_url(value: string) {
    this.map_iframe_url = value;
  }

  public get_background_color(): string {
    return this.background_color;
  }
  public set_background_color(value: string) {
    this.background_color = value;
  }

  public async update(
    e: InputTypes,
    field: string | undefined,
    input?: string | undefined,
    index?: string | number | undefined
  ) {
    switch (field) {
      case "footer":
        switch (input) {
          case "map_iframe_url":
            if (
              typeof e !== "number" &&
              typeof e === "object" &&
              "target" in e &&
              e.target
            ) {
              if ("target" in e && e.target) {
                this.set_map_iframe_url((e.target as HTMLInputElement).value);
              }
            }
            break;
          case "background_color":
            if (
              typeof e !== "number" &&
              typeof e === "object" &&
              "target" in e &&
              e.target
            ) {
              if ("target" in e && e.target) {
                this.set_background_color((e.target as HTMLInputElement).value);
              }
            }

            break;
        }
        break;
      case "address":
        switch (input) {
          case "title":
            if (
              typeof e !== "number" &&
              typeof e === "object" &&
              "target" in e &&
              e.target
            ) {
              this.address.title = (e.target as HTMLInputElement).value;
            }
            break;
          case "address":
            if (
              typeof e !== "number" &&
              typeof e === "object" &&
              "target" in e &&
              e.target
            ) {
              this.address.address = (e.target as HTMLInputElement).value;
            }
            break;
          case "town":
            if (
              typeof e !== "number" &&
              typeof e === "object" &&
              "target" in e &&
              e.target
            ) {
              this.address.town = (e.target as HTMLInputElement).value;
            }
            break;
          default:
            return this;
        }
        break;
      case "social_network":
        switch (input) {
          case "title":
            if (index !== undefined && typeof index == "number") {
              if (
                typeof e !== "number" &&
                typeof e === "object" &&
                "target" in e &&
                e.target
              ) {
                this.links_network_an_others_footer[index].title = (
                  e as React.ChangeEvent<HTMLInputElement>
                ).target.value;
              }
            }
            break;
          case "background_url":
            if (index !== undefined && typeof index == "number") {
              if (
                typeof e !== "number" &&
                typeof e === "object" &&
                "target" in e &&
                e.target
              ) {
                this.links_network_an_others_footer[index].background_url = (
                  ("target" in e ? e.target : null) as HTMLInputElement
                ).value;
              }
            }
            break;
          case "name":
            if (index !== undefined && typeof index == "number") {
              if (
                typeof e !== "number" &&
                typeof e === "object" &&
                "target" in e &&
                e.target
              ) {
                this.links_network_an_others_footer[index].name = (
                  ("target" in e ? e.target : null) as HTMLInputElement
                ).value;
              }
            }
            break;
          case "url_logo":
            if (
              index !== undefined &&
              typeof index === "number" &&
              typeof e === "string"
            ) {
              this.links_network_an_others_footer[index as number].logo_url = e;
            }
            break;
          case "remove":
            if (index !== undefined && typeof index == "number") {
              this.remove_link(index);
            }
            break;
          case "delete_picture":
            if (index !== undefined && typeof index == "number") {
              this.links_network_an_others_footer[index].logo_url = "";
            }
            break;
          default:
            return this;
        }
        break;
      case "ajout":
        this.add_links_network_an_others_footer(
          new LinkNetworksAndOthersFooter()
        );

        break;
      default:
        return this;
    }
    return this;
  }
}
