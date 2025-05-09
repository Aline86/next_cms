"use client";
import Container from "../lib/Container";

import ComponentBloc from "../lib/Component";

import ComponentTypes from "../lib/InputTypes";
import CarouselData from "./CarouselData";

export default class Carousel extends Container implements ComponentBloc {
  carousel_type: string;

  card_number: number;
  width: number;
  height: number;
  gap: number;
  bloc_number: number;
  carousel_data: Array<CarouselData>;
  parameters: string;
  page_id: number;
  constructor(
    page_id: number,
    bloc_number: number,
    id: number = -1,
    carousel_type: string = "carousel",
    card_number: number = 4,
    width: number = 16,
    height: number = 20,
    gap: number = 30,
    title: string = "",
    type: string = "carousel",
    carousel_data: Array<CarouselData> = []
  ) {
    super(id, title, type);
    this.page_id = page_id;
    this.title = title;
    this.type = type;
    this.carousel_type = carousel_type;
    this.card_number = card_number;
    this.width = width;
    this.height = height;
    this.bloc_number = bloc_number;
    this.gap = gap;
    if (carousel_data.length === 0) {
      this.carousel_data = this.init_datas();
    } else {
      this.carousel_data = carousel_data;
    }

    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
  }

  _get_class_api_call_parameters() {
    return this.parameters;
  }
  init_datas() {
    const carousel_data = [];
    for (let index = 0; index < this.card_number; index++) {
      carousel_data.push(new CarouselData(-1, index, this.id));
    }
    return carousel_data;
  }

  public async remove() {
    this.set_parameters("delete&id=" + this.id + "&type=" + this.type);

    const new_bloc = await this.delete_bloc();
    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    return new_bloc;
  }
  public async update(
    e: ComponentTypes,
    field: string | undefined,
    input?: string | undefined,
    index?: string | number | undefined
  ) {
    switch (field) {
      case "href_url":
        if (index !== undefined) {
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
            if (typeof index === "number") {
              this.carousel_data[index].href_url = e.target.value;
            }
          }
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
          "checked" in e.target &&
          e.target.value !== undefined
        ) {
          if (typeof index === "number") {
            this.carousel_data[index].text = e.target.value;
          }
        }

        break;
      case "height":
        if (
          typeof e === "object" &&
          e !== null &&
          e !== undefined &&
          "target" in e &&
          e.target !== null &&
          "checked" in e.target &&
          e.target.value !== undefined
        ) {
          let height = parseInt(e.target.value);
          if (
            typeof e === "object" &&
            e !== null &&
            "target" in e &&
            "value" in e.target
          ) {
            if (parseInt(e.target.value) < 15) {
              height = 15;
            } else if (parseInt(e.target.value) > 100) {
              height = 100;
            }
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
          "checked" in e.target &&
          e.target.value !== undefined
        ) {
          let width = parseInt(e.target.value);
          if (parseInt(e.target.value) < 15) {
            width = 15;
          } else if (parseInt(e.target.value) > 100) {
            width = 100;
          }

          this.set_width(width);
        }
        break;
      case "image_url":
        if (
          index !== undefined &&
          typeof index === "number" &&
          typeof e === "string"
        ) {
          this.carousel_data[index].image_url = e;
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
          "checked" in e.target &&
          e.target.value !== undefined
        ) {
          this.carousel_data[index].background_color = e.target.value;
        }
        break;
      case "bloc_number":
        if (typeof e === "number") {
          this.set_bloc_number(e);
        }
        break;
      case "delete_picture":
        if (index !== undefined) {
          //UploadService.deleteUpload(e, this.token);
          if (typeof index === "number") {
            this.carousel_data[index].image_url = "";
          }
        }
        break;
      case "ajout":
        this.add_data();
        this.card_number++;
        break;
      case "remove":
        if (
          typeof index === "number" &&
          this.carousel_data[index] !== undefined
        ) {
          this.remove_data(index);
        }

        break;
    }

    return this;
  }
  public set_carousel_data(carousel_datas: Array<CarouselData>) {
    this.carousel_data = [];

    carousel_datas.forEach((carousel_data) => {
      this.add_carousel_data(carousel_data);
    });
  }
  public add_data() {
    this.carousel_data.push(
      new CarouselData(
        -1,
        Number(this.carousel_data[this.carousel_data.length - 1].card_number) +
          1,
        this.id
      )
    );
  }

  public async remove_link(index: number) {
    this.set_parameters(
      "delete_child&id=" +
        this.carousel_data[index].id +
        "&type=" +
        this.type +
        "&associated_table=carousel_data"
    );

    await this.delete_bloc();

    this.carousel_data.splice(index, 1);
    this.carousel_data.map((_, index_) => {
      this.carousel_data[index_].card_number = index_;
    });
    this.card_number = this.carousel_data.length;

    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    this.save_bloc();
    return this;
  }
  public add_carousel_data(carousel_data: CarouselData) {
    this.carousel_data.push(
      new CarouselData(
        carousel_data.id,
        carousel_data.card_number,
        this.id,
        carousel_data.href_url,
        carousel_data.image_url,
        carousel_data.text,
        carousel_data.title,
        carousel_data.type,
        carousel_data.background_color,
        carousel_data.text_color
      )
    );
  }
  remove_data(index: number | undefined) {
    if (index !== undefined) {
      this.remove_link(index);
    }
  }

  public get_carousel_type(): string {
    return this.carousel_type;
  }
  public set_carousel_type(value: string) {
    this.carousel_type = value;
  }

  public get_card_number(): number {
    return this.card_number;
  }
  public set_card_number(value: number) {
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

  public get_carousel_data(): Array<CarouselData> {
    return this.carousel_data;
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
