import { ChangeEvent } from "react";
import ComponentBloc from "../lib/Component";
import Container from "../lib/Container";

import LinkNetworksAndOthersHeader from "./LinkNetworksAndOthersHeader";
import InputTypes from "../lib/InputTypes";

export default class Header extends Container implements ComponentBloc {
  id: number;
  title: string;
  type: string;
  parameters: string;
  link_networks_an_others_header: Array<LinkNetworksAndOthersHeader>;
  logo_url: string;
  image_url: string;
  background_color: string;
  constructor(
    id: number = -1,
    title: string = "",
    type: string = "header",
    logo_url: string = "",
    image_url: string = "",
    background_color: string = "#eeeeeee"
  ) {
    super(id, title, type);
    this.id = id;
    this.title = title;
    this.type = type;
    this.logo_url = logo_url;
    this.image_url = image_url;
    this.link_networks_an_others_header = [];
    this.parameters = this.type + "&id=1&type=" + this.type;
    this.background_color = background_color;
  }
  public set_link_networks_an_others_header(
    link_networks_an_others_header: Array<LinkNetworksAndOthersHeader>
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

  public add_link_networks_an_others_header(
    link_networks_an_others_header: LinkNetworksAndOthersHeader = new LinkNetworksAndOthersHeader()
  ) {
    this.link_networks_an_others_header.push(
      new LinkNetworksAndOthersHeader(
        this.link_networks_an_others_header.length,
        link_networks_an_others_header.id,
        link_networks_an_others_header.title,
        link_networks_an_others_header.background_url,
        link_networks_an_others_header.name,
        link_networks_an_others_header.logo_url
      )
    );
  }

  public async remove_link(index: number) {
    this.set_parameters(
      "delete_child&id=" +
        this.link_networks_an_others_header[index].id +
        "&type=" +
        this.type +
        "&associated_table=link_networks_an_others_header"
    );
    await this.delete_bloc();
    // index !== undefined && this.link_networks_an_others_header.splice(index, 1);
    this.set_parameters(this.type + "&id=1&type=" + this.type);
  }

  _get_class_api_call_parameters(): string {
    return this.parameters;
  }

  public async update(
    e: InputTypes,
    field: string | undefined,
    input?: string | undefined,
    index?: string | number | undefined
  ) {
    switch (field) {
      case "title":
        if ((e as ChangeEvent<HTMLInputElement>).target) {
          this.set_title((e as ChangeEvent<HTMLInputElement>).target.value);
        }
        break;
      case "logo_url":
        if (typeof e === "string") {
          this.logo_url = e;
        }
        break;
      case "image_url":
        if (typeof e === "string") {
          this.image_url = e;
        }
        break;

      case "background_color":
        if (typeof e === "string") {
          this.set_background_color(e);
        } else if ((e as ChangeEvent<HTMLInputElement>).target) {
          this.set_background_color(
            (e as ChangeEvent<HTMLInputElement>).target.value
          );
        }
        break;
      case "delete_picture":
        if (typeof index === "number") {
          await this.remove_link(index);
        }
        break;
      case "remove":
        if (index !== undefined) {
          this.link_networks_an_others_header[index as number].logo_url = "";
        } else {
          switch (input) {
            case "image_url":
              this.image_url = "";
              break;

            case "logo_url":
              this.logo_url = "";

              break;

            default:
              return this;
          }
        }

        break;
      case "social_network":
        switch (input) {
          case "title":
            if (index !== undefined) {
              if (typeof index === "number") {
                this.link_networks_an_others_header[index].title = (
                  e as ChangeEvent<HTMLInputElement>
                ).target.value;
              }
            }

            break;
          case "background_url":
            if (index !== undefined) {
              if (typeof index === "number") {
                this.link_networks_an_others_header[index].background_url = (
                  e as ChangeEvent<HTMLInputElement>
                ).target.value;
              }
            }
            break;
          case "url_logo":
            if (
              index !== undefined &&
              typeof index === "number" &&
              typeof e === "string"
            ) {
              this.link_networks_an_others_header[index as number].logo_url = e;
            }

            break;

          case "name":
            if (index !== undefined) {
              if (typeof index === "number") {
                this.link_networks_an_others_header[index].name = (
                  e as ChangeEvent<HTMLInputElement>
                ).target.value;
              }
            }
            break;

          default:
            return this;
        }
        break;
      case "ajout":
        this.add_link_networks_an_others_header();
        break;

      default:
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

  public get_link_networks_an_others_header(): Array<LinkNetworksAndOthersHeader> {
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
}
