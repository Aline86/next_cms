import Container from "../lib/Container";
import InputTypes from "../lib/InputTypes";

import CarouselData from "./CarouselData";
import { ModelUpdateData } from "./ModelUpdateData";

export default class Carousel extends Container {
  carousel_type: string;

  card_number: number;
  width: number;
  height: number;
  gap: number;
  bloc_number: number;
  carousel_data: Array<CarouselData | Record<string, unknown>>;
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
          ? ("carousel_data" as keyof this)
          : (field as keyof this),
        index !== undefined ? index : undefined,
        value,
        field
      );
      const updated = command.execute();
      Object.assign(this, updated);

      return this;
    }

    return this;
  }

  public async set_carousel_data(carousel_datas: Record<string, unknown>[]) {
    this.carousel_data = [];

    for (const carousel_data of carousel_datas) {
      await this.add_carousel_data(carousel_data);
    }
  }
  public add_data() {
    this.card_number++;
    this.carousel_data.push(
      new CarouselData(-1, Number(this.carousel_data.length) + 1, this.id)
    );
    this.save_bloc();
    return this;
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
    //this.save_bloc();
    return this;
  }
  public async add_carousel_data(carousel_data: Record<string, unknown>) {
    const data = new CarouselData(
      Number(carousel_data.id) as number | undefined,
      Number(carousel_data.card_number) as number,
      Number(this.id) as number,
      carousel_data.href_url as string | undefined,
      carousel_data.image_url as string | undefined,
      carousel_data.text as string | undefined,
      carousel_data.title as string | undefined,
      carousel_data.type as string | undefined,
      carousel_data.background_color as string | undefined,
      carousel_data.text_color as string | undefined
    );
    const plainObj = await data.classToPlainObject();
    this.carousel_data.push(plainObj as CarouselData);
  }
  public async remove_data(index: number | undefined) {
    if (index !== undefined) {
      return await this.remove_link(index);
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

  public get_carousel_data(): Array<CarouselData | Record<string, unknown>> {
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
