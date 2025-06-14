import Container from "../lib/Container";

import InputTypes from "../lib/InputTypes";
import LinkNetworksAndOthersFooter from "./LinkNetworksAndOthersFooter";
import Address from "./AddressData";
import { ModelUpdateData } from "./ModelUpdateData";

export default class Footer extends Container {
  id: number;
  bloc_number: number;
  title: string;
  type: string;
  parameters: string;
  address: Address;
  links_network_an_others_footer: Array<LinkNetworksAndOthersFooter>;
  map_iframe_url: string;
  background_color: string;

  constructor(
    id: number = -1,
    bloc_number: number = 100000000,
    title: string = "",
    type: string = "footer",
    map_iframe_url: string = "",
    background_color: string = "#f9f9f9"
  ) {
    super(id, title, type);
    this.id = id;
    this.bloc_number = bloc_number;
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
        links_network_an_others_footer.image_url,
        links_network_an_others_footer.id,
        links_network_an_others_footer.bloc_number
      )
    );
  }

  public add_data() {
    this.links_network_an_others_footer.push(
      new LinkNetworksAndOthersFooter(
        "",
        "",
        "",
        "",
        -1,
        this.links_network_an_others_footer.length - 1
      )
    );
    this.save_bloc();
    return this;
  }

  public async remove_data(index: number) {
    if (index !== undefined) {
      this.set_parameters(
        "delete_child&id=" +
          this.links_network_an_others_footer[index].id +
          "&type=" +
          this.type +
          "&associated_table=links_network_an_others_footer"
      );
      await this.delete_bloc();

      this.links_network_an_others_footer.splice(index, 1);
      this.links_network_an_others_footer.map((_, index_) => {
        this.links_network_an_others_footer[index_].bloc_number = index_;
      });

      this.set_parameters(this.type + "&id=1&type=" + this.type);
      this.save_bloc();

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

  public get_bloc_number(): number {
    return this.bloc_number;
  }
  public set_bloc_number(value: number) {
    this.bloc_number = value;
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
    if (address_array !== undefined && Array.isArray(address_array)) {
      address_array.forEach((value) => {
        this.address = new Address(
          value.title,
          value.address,
          value.town,
          value.id
        );
      });
    }
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
    let value;
    if (
      typeof e === "object" &&
      e !== null &&
      "target" in e &&
      (e as { target?: unknown }).target !== undefined &&
      typeof (e as { target: HTMLInputElement }).target.value !== "undefined"
    ) {
      value = (e as { target: { value: string } }).target.value;
    } else if (e !== undefined && typeof e === "string") {
      value = e;
    }

    if (value !== undefined && input !== "address" && index !== undefined) {
      const command = new ModelUpdateData(
        this,
        index !== undefined
          ? ("links_network_an_others_footer" as keyof this)
          : (field as keyof this),
        index !== undefined ? Number(index) : undefined,
        value,
        field
      );
      const updated = command.execute();
      console.log("update, footer", updated);
      Object.assign(this, updated);

      return this;
    } else if (input === "address") {
      const command = new ModelUpdateData(
        this.address,
        field as keyof Address,
        undefined,
        value
      );
      const updated = command.execute();

      Object.assign(this.address, updated);

      return this;
    } else {
      const command = new ModelUpdateData(
        this,
        field as keyof this,
        undefined,
        value
      );
      const updated = command.execute();
      Object.assign(this, updated);
      return this;
    }
  }
  public get_name(): string {
    return "Pied de page du site";
  }
}
