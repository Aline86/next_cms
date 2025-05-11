import Container from "../lib/Container";
import InputTypes from "../lib/InputTypes";
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
  is_grid: number;

  constructor(
    page_id: number,
    bloc_number: number,
    id: number = -1,
    is_grid: number = 0,
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
    input?: undefined,
    index?: string | number | undefined
  ) {
    switch (field) {
      case "href_url":
        if (
          index !== undefined &&
          typeof index === "number" &&
          typeof e === "object" &&
          e !== null &&
          e !== undefined &&
          "target" in e &&
          e.target !== null &&
          "value" in e.target
        ) {
          this.picture_group_data[index].href_url = e.target.value || "";
        }

        break;
      case "text":
        if (
          index !== undefined &&
          typeof index === "number" &&
          typeof e === "object" &&
          e !== null &&
          e !== undefined &&
          "target" in e &&
          e.target !== null &&
          "value" in e.target &&
          e.target.value !== undefined
        ) {
          this.picture_group_data[index].text = e.target.value;
        }
        break;
      case "titre":
        if (
          typeof e === "object" &&
          e !== null &&
          e !== undefined &&
          "target" in e &&
          e.target !== null &&
          "value" in e.target &&
          e.target.value !== undefined
        ) {
          this.set_title(e.target.value);
        }
        break;
      case "height":
        if (
          typeof e === "object" &&
          e !== null &&
          e !== undefined &&
          "target" in e &&
          e.target !== null &&
          "value" in e.target &&
          e.target.value !== undefined
        ) {
          let height = parseInt(e.target.value);

          if (parseInt(e.target.value) < 15) {
            height = 15;
          } else if (parseInt(e.target.value) > 100) {
            height = 100;
          }
          this.set_height(height);
        }
        break;
      case "width":
        if (
          typeof e === "object" &&
          e !== null &&
          e !== undefined &&
          "target" in e &&
          e.target !== null &&
          "value" in e.target &&
          e.target.value !== undefined
        ) {
          const width = parseInt(e.target.value);

          this.set_width(width);
        }
        break;
      case "is_data_button":
        if (
          index !== undefined &&
          typeof index === "number" &&
          typeof e === "object" &&
          e !== null &&
          e !== undefined &&
          "target" in e &&
          e.target !== null &&
          "checked" in e.target &&
          e.target.value !== undefined
        ) {
          this.picture_group_data[index].is_data_button = e.target.checked
            ? true
            : false;
        }
        break;
      case "image_url":
        if (
          index !== undefined &&
          typeof index === "number" &&
          typeof e === "string"
        ) {
          this.picture_group_data[index].image_url = e;
        }
        break;
      case "color":
        if (
          index !== undefined &&
          index !== undefined &&
          typeof index === "number" &&
          typeof e === "object" &&
          e !== null &&
          e !== undefined &&
          "target" in e &&
          e.target !== null &&
          "value" in e.target &&
          e.target.value !== undefined
        ) {
          this.picture_group_data[index].text_color = e.target.value;
        }

        break;
      case "bg_color":
        if (
          index !== undefined &&
          index !== undefined &&
          typeof index === "number" &&
          typeof e === "object" &&
          e !== null &&
          e !== undefined &&
          "target" in e &&
          e.target !== null &&
          "value" in e.target &&
          e.target.value !== undefined
        ) {
          this.picture_group_data[index].background_color = e.target.value;
        }
        break;
      case "bloc_number":
        if (index !== undefined && typeof e === "number") {
          this.set_bloc_number(e);
        }
        break;
      case "delete_picture":
        if (
          index !== undefined &&
          index !== undefined &&
          typeof index === "number"
        ) {
          //UploadService.deleteUpload(e, this.token);
          this.picture_group_data[index].image_url = "";
        }
        break;
      case "ajout":
        this.add_data();

        break;
      case "remove":
        if (index !== undefined && typeof index === "number") {
          // this.picture_group_data.splice(index, 1);
          await this.remove_data(index);
        }
        break;
    }

    return this;
  }
  public set_picture_group_data(picture_group_datas: Array<PictureGroupData>) {
    this.picture_group_data = [];

    picture_group_datas.forEach((picture_group_data) => {
      this.add_picture_group_data(picture_group_data);
    });
  }
  public add_data() {
    this.card_number++;

    this.picture_group_data.push(
      new PictureGroupData(
        -1,
        this.picture_group_data[this.picture_group_data.length - 1]
          .card_number + 1,
        this.id
      )
    );
  }

  public async remove_link(index: number) {
    this.set_parameters(
      "delete_child&id=" +
        this.picture_group_data[index].id +
        "&type=" +
        this.type +
        "&associated_table=picture_group_data"
    );
    this.card_number = this.picture_group_data.length - 1;

    await this.delete_bloc();

    this.picture_group_data.splice(index, 1);
    this.picture_group_data.map((_, index_) => {
      this.picture_group_data[index_].card_number = index_;
    });

    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);

    return this;
  }
  public add_picture_group_data(picture_group_data: PictureGroupData) {
    this.picture_group_data.push(
      new PictureGroupData(
        Number(picture_group_data.id),
        Number(picture_group_data.card_number),
        this.id,
        Boolean(Number(picture_group_data.is_data_button)),
        picture_group_data.href_url,
        picture_group_data.image_url,
        picture_group_data.text,
        picture_group_data.title,
        picture_group_data.type,
        picture_group_data.background_color,
        picture_group_data.text_color
      )
    );
  }
  async remove_data(index: number | undefined) {
    if (index !== undefined) {
      this.remove_link(index);

      //this.picture_group_data.splice(index, 1);

      return this;
    }
  }
  public set_is_grid(is_grid: number) {
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
}
