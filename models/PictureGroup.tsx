import Container from "./../lib/Container";
import InputTypes from "./../lib/InputTypes";
import { ModelUpdateData } from "./ModelUpdateData";

import PictureGroupData from "./PictureGroupData";

export default class PictureGroup extends Container {
  card_number: number;
  width: number;
  height: number;
  gap: number;
  bloc_number: number;
  picture_group_data: Array<PictureGroupData>;
  parameters: string;
  page_id: number;
  is_grid: boolean;

  constructor(
    page_id: number,
    bloc_number: number,
    id: number = -1,
    is_grid: boolean = false,
    card_number: number = 4,
    width: number = 3,
    height: number = 35,
    gap: number = 30,
    title: string = "",
    type: string = "picture_group",
    picture_group_data: Array<PictureGroupData> = []
  ) {
    super(id, title, type);
    this.page_id = page_id;
    this.title = title;
    this.type = type;
    this.card_number = card_number;
    this.width = width;
    this.height = height;
    this.bloc_number = bloc_number;
    this.gap = gap;
    this.is_grid = is_grid;

    if (picture_group_data.length === 0) {
      this.picture_group_data = this.init_datas();
    } else {
      this.picture_group_data = picture_group_data;
    }

    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
  }

  _get_class_api_call_parameters() {
    return this.parameters;
  }
  init_datas() {
    const picture_group_data = [];
    for (let index = 0; index < this.card_number; index++) {
      picture_group_data.push(new PictureGroupData(-1, index, this.id));
    }
    return picture_group_data;
  }
  public async remove() {
    this.set_parameters("delete&id=" + this.id + "&type=" + this.type);

    const new_bloc = await this.delete_bloc();
    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    return new_bloc;
  }
  public async update(
    e: InputTypes,
    field: string,
    input?: string | undefined,
    index?: number | undefined
  ) {
    let value;
    if (
      typeof e === "object" &&
      e !== null &&
      "target" in e &&
      (e as { target: unknown }).target !== undefined
    ) {
      value = (
        (e as { target: { value?: unknown } }).target as HTMLInputElement
      ).value;
    } else if (
      e !== undefined &&
      typeof e === "string" &&
      index !== undefined
    ) {
      value = e;
    } else if (typeof e !== "object") {
      value = e;
    }
    if (value !== undefined) {
      const command = new ModelUpdateData(
        this,
        index !== undefined
          ? ("picture_group_data" as keyof this)
          : (field as keyof this),
        index !== undefined ? index : undefined,
        value,
        field
      );
      const updated = command.execute();
      Object.assign(this, updated);

      return this;
    }
  }
  public async set_picture_group_data(
    picture_group_datas: Record<string, unknown>[]
  ) {
    this.picture_group_data = [];

    for (const picture_group_data of picture_group_datas) {
      await this.add_picture_group_data(picture_group_data);
    }
  }
  public async add_data() {
    this.card_number++;
    this.picture_group_data.push(
      new PictureGroupData(-1, Number(this.picture_group_data.length), this.id)
    );
    const result = await this.save_bloc();
    if (result !== undefined) {
      return this;
    }
  }

  public async remove_link(index: number) {
    this.set_parameters(
      "delete_child&id=" +
        this.picture_group_data[index].id +
        "&type=" +
        this.type +
        "&associated_table=picture_group_data"
    );

    const result = await this.delete_bloc();
    if (result === undefined) {
      this.picture_group_data.splice(index, 1);
      this.picture_group_data.map((_, index_) => {
        this.picture_group_data[index_].card_number = index_;
      });
      this.card_number = this.picture_group_data.length;

      this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    }
    return this;
  }
  public async add_picture_group_data(
    picture_group_data: Record<string, unknown>
  ) {
    const data = new PictureGroupData(
      Number(picture_group_data.id),
      Number(picture_group_data.card_number),
      this.id,
      Boolean(Number(picture_group_data.is_data_button)),
      picture_group_data.href_url as string | undefined,
      picture_group_data.image_url as string | undefined,
      picture_group_data.text as string | undefined,
      picture_group_data.title as string | undefined,
      picture_group_data.type as string | undefined,
      picture_group_data.background_color as string | undefined,
      picture_group_data.text_color as string | undefined
    );
    const plainObj = await data.classToPlainObject();
    this.picture_group_data.push(plainObj as PictureGroupData);
  }
  public async remove_data(index: number | undefined) {
    if (index !== undefined) {
      const res = await this.remove_link(index);
      if (res !== undefined) {
        return this;
      }
    }
  }
  public set_is_grid(is_grid: boolean) {
    this.is_grid = is_grid;
  }
  public get_is_grid() {
    return this.is_grid;
  }

  public get_data_number(): number {
    return this.card_number;
  }
  public set_data_number(value: number) {
    this.card_number = value;
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

  public get_picture_group_data(): Array<PictureGroupData> {
    return this.picture_group_data;
  }

  public get_parameters(): string {
    return this.parameters;
  }
  public set_parameters(value: string) {
    this.parameters = value;
  }

  public get_page_id(): number {
    return this.page_id;
  }
  public set_page_id(value: number) {
    this.page_id = value;
  }
  public get_name(): string {
    return this.is_grid ? "Grille d'images" : "Groupe d'images";
  }
}
