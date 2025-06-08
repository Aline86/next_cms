import Container from "../lib/Container";
import slugify from "react-slugify";
import ComponentTypes from "../lib/types";

export default class Page extends Container {
  parameters: string;
  bloc_number: number;
  slug: string;
  page_id: number | null;
  description: string;
  constructor(
    id: number = -1,
    page_number: number = -1,
    page_id: number | null,
    title: string = "",
    description: string = "",
    slug: string = "",
    type: string = "page"
  ) {
    super(id, title, type);
    this.id = id;
    this.page_id = page_id;
    this.title = title;
    this.description = description;
    this.slug = slug;
    this.type = type;
    this.bloc_number = page_number;
    this.parameters = this.type + "&id=" + this.id + "&type=" + this.type;
  }
  _get_class_api_call_parameters(): string {
    return this.parameters;
  }
  updatePage(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    switch (field) {
      case "title":
        this.set_title(e.target.value);
        this.slug = this.sanitizeName(e.target.value);
        break;
    }
  }

  async send_blocs_page(blocs: ComponentTypes[] | Record<string, unknown>[]) {
    this.send_blocs(blocs);
  }

  async get_pages() {
    const component =
      this.page_id !== null && this.page_id !== undefined
        ? "&id_component=" + this.page_id
        : "";
    this.set_parameters("pages&type=pages" + component);

    const page_array: Page[] = [];
    const pages = await this.get_blocs();
    pages.forEach((page) => {
      page_array.push(
        new Page(
          page.id,
          page.bloc_number,
          page.page_id,
          page.title,
          page.description,
          page.slug
        ).hydrate(page)
      );
    });
    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    return page_array;
  }
  async get_sub_pages() {
    const component =
      this.id !== null && this.id !== undefined
        ? "&id_component=" + this.id
        : "";
    this.set_parameters("pages&type=pages" + component);

    const page_array: Page[] = [];
    const pages = await this.get_blocs();
    pages.forEach((page) => {
      page_array.push(
        new Page(
          page.id,
          page.bloc_number,
          page.page_id,
          page.title,
          page.description,
          page.slug
        )
      );
    });
    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    return page_array;
  }
  async get_blocs_for_page() {
    this.set_parameters(this.type + "&id=" + this.id + "&type=" + this.type);
    const page_array: Array<unknown> = [];
    const pages = await this.get_bloc();
    if (pages) {
      pages.forEach((component) => {
        page_array.push(component);
      });
    }

    return page_array;
  }

  public async remove() {
    this.set_parameters(
      "delete_" + this.type + "&id=" + this.id + "&type=" + this.type
    );

    const result = await this.delete_bloc();
    if (result !== undefined) {
      this.set_parameters(this.type + "&id=1&type=" + this.type);
      return this;
    }
  }
  sanitizeName(filename: string) {
    const result = filename.replace(/\(.*?\)/g, "");

    return slugify(result);
  }
  public get_parameters(): string {
    return this.parameters;
  }
  public set_parameters(value: string) {
    this.parameters = value;
  }
  public get_bloc_number(): number {
    return this.bloc_number;
  }
  public set_bloc_number(value: number) {
    this.bloc_number = value;
  }
  public get_slug(): string {
    return this.slug;
  }
  public set_slug(value: string) {
    this.slug = value;
  }
  public get_description(): string {
    return this.description;
  }
  public set_description(value: string) {
    this.description = value;
  }
  public get_page_id(): number | null {
    return this.page_id;
  }
  public set_page_id(value: number | null) {
    this.page_id = value;
  }
}
