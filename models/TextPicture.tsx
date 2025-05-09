import { JSONContent } from "@tiptap/react";
import Container from "../lib/Container";
import OptionsCss from "./OptionsCss";
import InputTypes from "../lib/InputTypes";
import ComponentBloc from "../lib/Component";

export default class TextPicture extends Container implements ComponentBloc {
  show_picture: boolean;
  show_text: boolean;
  bloc_column: boolean;
  image_right: boolean;
  text_button_more: boolean;
  text: JSONContent[];
  image: string;
  alt_image: string;
  bloc_number: number;
  css: OptionsCss;
  background_color: string;
  parameters: string;
  page_id: number;
  constructor(
    id: number = -1,
    bloc_number: number,
    page_id: number,

    show_picture: boolean = true,
    show_text: boolean = true,
    bloc_column: boolean = false,
    image_right: boolean = false,
    text_button_more: boolean = false,
    text: JSONContent[] = [],
    image: string = "",
    alt_image: string = "",

    title: string = "",
    type: string = "text_picture",
    background_color: string = "#ffffff",
    css: OptionsCss = new OptionsCss()
  ) {
    super(id, title, type);
    this.page_id = page_id;
    this.show_picture = show_picture;
    this.show_text = show_text;
    this.bloc_column = bloc_column;
    this.image_right = image_right;
    this.text_button_more = text_button_more;
    this.text = text;
    this.image = image;
    this.alt_image = alt_image;
    this.bloc_number = bloc_number;
    this.css = css;
    this.background_color = background_color;
    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
  }

  public async update(
    e: InputTypes,
    field: string | undefined,
    input?: string | undefined
  ) {
    console.log("width", e, field, input);
    switch (field) {
      case "show_picture":
        if (
          typeof e === "object" &&
          e !== null &&
          "target" in e &&
          e.target !== null &&
          "checked" in e.target
        ) {
          this.set_show_picture(e.target.checked ? true : false);
        }
        break;
      case "show_text":
        if (
          typeof e === "object" &&
          e !== null &&
          "target" in e &&
          e.target !== null &&
          "checked" in e.target
        ) {
          this.set_show_text(e.target.checked ? true : false);
        }

        break;
      case "bloc_column":
        if (typeof e === "boolean") {
          this.set_bloc_column(e);
        }
        break;
      case "bloc_number":
        if (typeof e === "number") {
          this.set_bloc_number(e);
        }

        break;
      case "image_right":
        if (typeof e === "boolean") {
          this.set_image_right(e);
        }

        break;
      case "text":
        if (typeof e === "object" && e !== null) {
          if (Array.isArray(e)) {
            this.set_text(e as JSONContent[]);
          } else {
            console.error("Invalid type for text field:", e);
          }
        }

        break;
      case "text_button_more":
        if (
          typeof e === "object" &&
          e !== null &&
          "target" in e &&
          e.target !== null &&
          "checked" in e.target
        ) {
          this.set_text_button_more(e.target.checked ? true : false);
        }
        break;
      case "title":
        if (
          typeof e === "object" &&
          e !== null &&
          "target" in e &&
          e.target !== null &&
          "value" in e.target
        ) {
          this.set_title(e.target.value || "");
        }
        break;
      case "alt_image":
        if (
          typeof e === "object" &&
          e !== null &&
          "target" in e &&
          e.target !== null &&
          "value" in e.target
        ) {
          this.set_alt_image(e.target.value || "");
        }

        break;
      case "color":
        if (
          typeof e === "object" &&
          e !== null &&
          "target" in e &&
          e.target !== null &&
          "value" in e.target
        ) {
          this.set_background_color(e.target.value || "");
        }

        break;
      case "image":
        if (typeof e === "string") {
          this.set_image(e);
        }
        break;
      case "delete_picture":
        this.image = "";
        break;
      case "css":
        switch (input) {
          case "width":
            if (
              typeof e === "object" &&
              e !== null &&
              "target" in e &&
              e.target !== null &&
              "value" in e.target &&
              e.target.value !== undefined
            ) {
              console.log("width", e.target.value);
              this.css.width = parseInt(e.target.value);
            }

            break;
          case "height":
            if (
              typeof e === "object" &&
              e !== null &&
              "target" in e &&
              e.target !== null &&
              "value" in e.target &&
              e.target.value !== undefined
            ) {
              this.css.height = parseInt(e.target.value);
            }
            break;
          case "position":
            if (
              typeof e === "object" &&
              e !== null &&
              "target" in e &&
              e.target !== null &&
              "alt" in e.target
            ) {
              this.css.position = e.target.alt;
            }
            break;
        }
        break;
    }

    return this;
  }

  public async remove() {
    this.set_parameters(
      "delete&id=" +
        this.id +
        "&type=" +
        this.type +
        "&id_component=" +
        this.page_id +
        "&associated_table=page"
    );

    const new_bloc = await this.delete_bloc();
    return new_bloc;
  }
  _get_class_api_call_parameters() {
    return this.parameters;
  }
  public get_parameters(): string {
    return this.parameters;
  }
  public set_parameters(value: string) {
    this.parameters = value;
  }

  public _show_picture(): boolean {
    return this.show_picture;
  }
  public set_show_picture(value: boolean) {
    this.show_picture = value;
  }

  public _show_text(): boolean {
    return this.show_text;
  }
  public set_show_text(value: boolean) {
    this.show_text = value;
  }

  public _bloc_column(): boolean {
    return this.bloc_column;
  }
  public set_bloc_column(value: boolean) {
    this.bloc_column = value;
  }

  public _image_right(): boolean {
    return this.image_right;
  }
  public set_image_right(value: boolean) {
    this.image_right = value;
  }

  public _text_button_more(): boolean {
    return this.text_button_more;
  }
  public set_text_button_more(value: boolean) {
    this.text_button_more = value;
  }

  public _text(): JSONContent[] {
    return this.text;
  }
  public set_text(value: JSONContent[]) {
    this.text = value;
  }

  public _image(): string {
    return this.image;
  }
  public set_image(value: string) {
    this.image = value;
  }

  public _alt_image(): string {
    return this.alt_image;
  }
  public set_alt_image(value: string) {
    this.alt_image = value;
  }

  public _bloc_number(): number {
    return this.bloc_number;
  }
  public set_bloc_number(value: number) {
    this.bloc_number = value;
  }

  public _css(): OptionsCss {
    return this.css;
  }
  public set_css(value: OptionsCss) {
    this.css = value;
  }

  public _background_color(): string {
    return this.background_color;
  }
  public set_background_color(value: string) {
    this.background_color = value;
  }

  public _id(): number {
    return this.id;
  }
  public set_id(value: number) {
    this.id = value;
  }
  public _title(): string {
    return this.title;
  }
  public set_title(value: string) {
    this.title = value;
  }

  public _type(): string {
    return this.type;
  }
  public set_type(value: string) {
    this.type = value;
  }
}
