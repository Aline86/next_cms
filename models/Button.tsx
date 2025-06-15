import Container from "./../lib/Container";
import InputTypes from "./../lib/InputTypes";
import { ModelUpdateData } from "./ModelUpdateData";

export default class Button extends Container {
  width: number;
  height: number;
  gap: number;
  bloc_number: number;
  parameters: string;
  page_id: number;
  href_url: string;
  image_url: string;
  text: string;
  background_color: string;
  button_text: string;
  is_parallaxe: boolean;
  constructor(
    page_id: number,
    bloc_number: number,
    id: number = -1,
    width: number = 15,
    height: number = 35,
    gap: number = 30,
    href_url: string = "",
    image_url: string = "",
    text: string = "",
    title: string = "",
    background_color: string = "#ffffff",
    type: string = "button",
    button_text: string = "",
    is_parallaxe: boolean = false
  ) {
    super(id, title, type);
    this.page_id = page_id;
    this.title = title;
    this.type = type;
    this.width = width;
    this.height = height;
    this.bloc_number = bloc_number;
    this.gap = gap;
    this.href_url = href_url;
    this.image_url = image_url;
    this.text = text;
    this.background_color = background_color;
    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
    this.button_text = button_text;
    this.is_parallaxe = is_parallaxe;
  }

  _get_class_api_call_parameters() {
    return this.parameters;
  }

  public async remove() {
    this.set_parameters("delete&id=" + this.id + "&type=" + this.type);

    const new_bloc = await this.delete_bloc();
    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    return new_bloc;
  }
  public async update(e: InputTypes, field: string) {
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
        undefined
      );
      const updated = command.execute();
      Object.assign(this, updated);

      return this;
    }
  }

  public get_width(): number {
    return this.width;
  }
  public set_width(value: number) {
    this.width = value;
  }

  public get_height(): number {
    return this.height;
  }
  public set_height(value: number) {
    this.height = value;
  }

  public get_gap(): number {
    return this.gap;
  }
  public set_gap(value: number) {
    this.gap = value;
  }

  public get_bloc_number(): number {
    return this.bloc_number;
  }
  public set_bloc_number(value: number) {
    this.bloc_number = value;
  }

  public get_parameters(): string {
    return this.parameters;
  }
  public set_parameters(value: string) {
    this.parameters = value;
  }
  public get_button_text(): string {
    return this.button_text;
  }
  public set_button_text(value: string) {
    this.button_text = value;
  }
  public get_href_url(): string {
    return this.href_url;
  }
  public set_href_url(value: string) {
    this.href_url = value;
  }
  public get_background_color(): string {
    return this.background_color;
  }
  public set_background_color(value: string) {
    this.background_color = value;
  }

  public get_image_url(): string {
    return this.image_url;
  }
  public set_image_url(value: string) {
    this.image_url = value;
  }

  public get_text(): string {
    return this.text;
  }
  public set_text(value: string) {
    this.text = value;
  }
  public get_is_parallaxe(): boolean {
    return this.is_parallaxe;
  }
  public set_is_parallaxe(value: boolean) {
    this.is_parallaxe = value;
  }
  public get_page_id(): number {
    return this.page_id;
  }
  public set_page_id(value: number) {
    this.page_id = value;
  }
  public get_name(): string {
    return "Bouton";
  }
}
