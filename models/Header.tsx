import Container from "../lib/Container";

import LinkNetworksAndOthersHeader from "./LinkNetworksAndOthersHeader";
import InputTypes from "../lib/InputTypes";
import { ModelUpdateData } from "./ModelUpdateData";

export default class Header extends Container {
  id: number;
  bloc_number: number;
  title: string;
  type: string;
  parameters: string;
  link_networks_an_others_header: Array<
    LinkNetworksAndOthersHeader | Record<string, unknown>
  >;
  logo_url: string;
  image_url: string;
  background_color: string;
  constructor(
    id: number = -1,
    bloc_number: number = -2,
    title: string = "",
    type: string = "header",
    logo_url: string = "",
    image_url: string = "",
    background_color: string = "#eeeeeee"
  ) {
    super(id, title, type);
    this.id = id;
    this.bloc_number = bloc_number;
    this.title = title;
    this.type = type;
    this.logo_url = logo_url;
    this.image_url = image_url;
    this.link_networks_an_others_header = [];
    this.parameters = this.type + "&id=1&type=" + this.type;
    this.background_color = background_color;
  }
  public set_link_networks_an_others_header(
    link_networks_an_others_header: Record<string, unknown>[]
  ) {
    this.link_networks_an_others_header = [];

    if (link_networks_an_others_header.length > 0)
      link_networks_an_others_header.forEach(
        (link_networks_an_others_header) => {
          this.add_link_networks_an_others_header(
            link_networks_an_others_header
          );
        }
      );
  }

  public async add_link_networks_an_others_header(
    link_networks_an_others_header: Record<string, unknown>
  ) {
    const data = new LinkNetworksAndOthersHeader(
      Number(this.link_networks_an_others_header.length),
      Number(link_networks_an_others_header.id) as number | undefined,
      link_networks_an_others_header.title as string | undefined,
      link_networks_an_others_header.background_url as string | undefined,

      link_networks_an_others_header.name as string | undefined,
      link_networks_an_others_header.image_url as string | undefined
    );

    const plainObj = await data.classToPlainObject();
    this.link_networks_an_others_header.push(
      plainObj as LinkNetworksAndOthersHeader
    );
  }
  public add_data() {
    this.link_networks_an_others_header.push(
      new LinkNetworksAndOthersHeader(
        Number(this.link_networks_an_others_header.length),
        -1
      )
    );
    return this;
  }
  public async remove_data(index: number) {
    this.set_parameters(
      "delete_child&id=" +
        this.link_networks_an_others_header[index].id +
        "&type=" +
        this.type +
        "&associated_table=link_networks_an_others_header"
    );
    await this.delete_bloc();

    this.link_networks_an_others_header.splice(index, 1);
    this.link_networks_an_others_header.map((_, index_) => {
      this.link_networks_an_others_header[index_].bloc_number = index_;
    });

    this.set_parameters(this.type + "&id=1&type=" + this.type);
    // this.save_bloc();
    return this;
  }

  _get_class_api_call_parameters(): string {
    return this.parameters;
  }

  public async update(
    e: InputTypes,
    field: string | undefined,
    _?: string | undefined,
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

    if (value !== undefined) {
      const command = new ModelUpdateData(
        this,
        index !== undefined
          ? ("link_networks_an_others_header" as keyof this)
          : (field as keyof this),
        Number(index) !== undefined ? Number(index) : undefined,
        value,
        field
      );

      const updated = command.execute();

      Object.assign(this, updated);

      return this;
    }
    return this;
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

  public get_link_networks_an_others_header(): Array<
    LinkNetworksAndOthersHeader | Record<string, unknown>
  > {
    return this.link_networks_an_others_header;
  }

  public get_logo_url(): string {
    return this.logo_url;
  }
  public set_logo_url(value: string) {
    this.logo_url = value;
  }

  public get_image_url(): string {
    return this.image_url;
  }
  public set_image_url(value: string) {
    this.image_url = value;
  }
  public get_background_color(): string {
    return this.background_color;
  }
  public set_background_color(value: string) {
    this.background_color = value;
  }

  public get_name(): string {
    return "En-tête du site";
  }
}
