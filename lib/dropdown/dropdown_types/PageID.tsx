import Page from "./../../../models/Page";
import DropdownTypes from "./DropdownType";

export default class PageID extends DropdownTypes {
  public string_to_ckeck: string;
  public type: string = "pageID";
  constructor(string_to_ckeck: string) {
    super();
    this.string_to_ckeck = string_to_ckeck;
  }

  public check_type() {
    let is_external_link = false;

    if (/^[-+]?\d+$/.test(this.string_to_ckeck)) {
      is_external_link = true;
    }
    return is_external_link;
  }

  public get_type() {
    return this.type;
  }

  public async get_page(id_page: number): Promise<Page | undefined> {
    const page = new Page(Number(id_page), -1, null);

    const new_page = await page.get_one_bloc();

    if (new_page !== undefined && "page" in new_page) {
      const page_data = Object.values(
        new_page.page as Record<string, unknown>
      )[0];
      const res = page.hydrate(page_data as Record<string, unknown>);
      return res;
    }
  }

  public async get_pages(id_parent_page: number) {
    const page = await this.get_page(id_parent_page);
    if (page !== undefined) {
      const async_result = await page.get_sub_pages();

      if (Array.isArray(async_result) && async_result.length >= 1) {
        return async_result;
      }
    }
  }
}
