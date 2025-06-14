import { JSONContent } from "@tiptap/react";
import Container from "../lib/Container";
import OptionsCss from "./OptionsCss";

import InputTypes from "../lib/InputTypes";
import { ModelUpdateData } from "./ModelUpdateData";

export default class TextPicture extends Container {
  show_picture: boolean;
  show_text: boolean;
  bloc_column: boolean;
  image_right: boolean;
  text_button_more: boolean;
  text: JSONContent[];
  image_url: string;
  alt_image: string;
  bloc_number: number;
  css: OptionsCss | Record<string, unknown>;
  background_color: string;
  parameters: string;
  page_id: number;
  constructor(
    page_id: number,
    bloc_number: number,
    id: number = -1,
    show_picture: boolean = true,
    show_text: boolean = true,
    bloc_column: boolean = false,
    image_right: boolean = false,
    text_button_more: boolean = false,
    text: JSONContent[] = [],
    image_url: string = "",
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
    this.image_url = image_url;
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
    let value;
    if (
      typeof e === "object" &&
      e !== null &&
      "target" in e &&
      (e as Event).target !== undefined
    ) {
      value = ((e as Event).target as HTMLInputElement).value;
    } else if (e !== undefined) {
      value = e;
    }

    if (
      (value !== undefined && typeof value !== "object") ||
      Array.isArray(value)
    ) {
      const command = new ModelUpdateData(
        this,
        field as keyof this,
        undefined,
        value,
        input
      );
      const updated = command.execute();
      Object.assign(this, updated);

      return this;
    }
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

  public _image_url(): string {
    return this.image_url;
  }
  public set_image_url(value: string) {
    this.image_url = value;
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

  public _css(): OptionsCss | Record<string, unknown> {
    return this.css;
  }
  public async set_css(value: OptionsCss) {
    if (value instanceof OptionsCss) {
      const data = await value.classToPlainObject();
      this.css = data;
    } else {
      this.css = value;
    }
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
  public get_name(): string {
    return "Bloc de texte et image";
  }
}
