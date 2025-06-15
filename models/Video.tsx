import Container from "./../lib/Container";
import InputTypes from "./../lib/InputTypes";
import { ModelUpdateData } from "./ModelUpdateData";

export default class Video extends Container {
  text: string;
  width: number;
  height: number;
  bloc_number: number;
  overlay: boolean;
  parameters: string;
  page_id: number;
  image_url;
  constructor(
    page_id: number,
    bloc_number: number,
    id: number = -1,
    overlay: boolean = true,
    text: string = "",
    width: number = 100,
    height: number = 100,
    title: string = "",
    type: string = "video",
    image_url: string = ""
  ) {
    super(id, title, type);

    this.bloc_number = bloc_number;
    this.page_id = page_id;
    this.overlay = overlay;
    this.width = width;
    this.height = height;
    this.text = text;
    this.image_url = image_url;
    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
  }

  public async update(e: InputTypes, field: string | undefined) {
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
  public get_image_url(): string {
    return this.parameters;
  }
  public set_image_url(value: string) {
    this.image_url = value;
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

  public _text(): string {
    return this.text;
  }
  public set_text(value: string) {
    this.text = value;
  }

  public _bloc_number(): number {
    return this.bloc_number;
  }
  public set_bloc_number(value: number) {
    this.bloc_number = value;
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
    return "Vidéo";
  }
}
