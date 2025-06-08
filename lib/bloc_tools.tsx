import PictureGroup from "../models/PictureGroup";
import ScreenHome from "../models/Screen";
import TextPicture from "../models/TextPicture";
import Page from "../models/Page";
import Button from "../models/Button";
import Video from "../models/Video";
import Carousel from "../models/Carousel";
import ComponentTypes from "./types";
import Header from "../models/Header";
import Footer from "../models/FooterData";

export default class BlocTools {
  page: Page;
  isInitSite: boolean;
  constructor(page: Page) {
    this.page = page;
    this.isInitSite = false;
  }

  getAllBlocsPage = async () => {
    const page = await this.getPageBlocs();

    return page;
  };
  getPage = async () => {
    return this.page;
  };

  setPageAttributes = () => {};
  getPageBlocs = async (): Promise<(ComponentTypes[] | Page[]) | undefined> => {
    const blocs_for_page = await this.page.get_bloc();

    if (
      blocs_for_page !== undefined &&
      blocs_for_page !== null &&
      typeof blocs_for_page === "object" &&
      "page" in blocs_for_page &&
      blocs_for_page.page !== null &&
      typeof blocs_for_page.page === "object" &&
      Object.keys(blocs_for_page.page)[0] !== null
    ) {
      this.page = this.page.hydrate(Object.values(blocs_for_page.page)[0]);
      const blocs = Object.values(blocs_for_page.page) as Record<
        string,
        unknown
      >[];

      const ordered_data = await this.getAllRequests(blocs);
      if (ordered_data !== undefined) {
        return ordered_data;
      }
    }
  };

  getAllRequests = async (array_async: Record<string, unknown>[]) => {
    const unordered_data = () => {
      const async_result: ComponentTypes[] | undefined = [];
      let index = 0;

      Object.entries(array_async).map(
        ([, bloc_content]: [string, Record<string, unknown>]) => {
          if (
            typeof bloc_content === "object" &&
            "text_picture" in bloc_content
          ) {
            if (Array.isArray(bloc_content.text_picture)) {
              const sub_bloc = bloc_content.text_picture;
              sub_bloc.forEach((element) => {
                index++;
                const text_picture_content = new TextPicture(
                  this.page.id,

                  element.bloc_number as number,
                  element.id as number
                );

                async_result[index] = text_picture_content.hydrate(element);
              });
            }
          }

          if (
            typeof bloc_content === "object" &&
            "picture_group" in bloc_content
          ) {
            if (Array.isArray(bloc_content.picture_group)) {
              const sub_bloc = bloc_content.picture_group;
              sub_bloc.forEach((element) => {
                index++;
                const text_picture_content = new PictureGroup(
                  this.page.id,

                  element.bloc_number as number,
                  element.id as number
                );

                async_result[index] = text_picture_content.hydrate(element);
              });
            }
          }

          if (typeof bloc_content === "object" && "video" in bloc_content) {
            if (Array.isArray(bloc_content.video)) {
              const sub_bloc = bloc_content.video;
              sub_bloc.forEach((element) => {
                index++;
                const text_picture_content = new Video(
                  this.page.id,

                  element.bloc_number as number,
                  element.id as number
                );

                async_result[index] = text_picture_content.hydrate(element);
              });
            }
          }

          if (typeof bloc_content === "object" && "button" in bloc_content) {
            if (Array.isArray(bloc_content.button)) {
              const sub_bloc = bloc_content.button;
              sub_bloc.forEach((element) => {
                index++;
                const text_picture_content = new Button(
                  this.page.id,

                  element.bloc_number as number,
                  element.id as number
                );

                async_result[index] = text_picture_content.hydrate(element);
              });
            }
          }

          if (typeof bloc_content === "object" && "screen" in bloc_content) {
            if (Array.isArray(bloc_content.screen)) {
              const sub_bloc = bloc_content.screen;
              sub_bloc.forEach((element) => {
                index++;
                const text_picture_content = new ScreenHome(
                  this.page.id,

                  element.bloc_number as number,
                  element.id as number
                );

                async_result[index] = text_picture_content.hydrate(element);
              });
            }
          }
          if (typeof bloc_content === "object" && "carousel" in bloc_content) {
            if (Array.isArray(bloc_content.carousel)) {
              const sub_bloc = bloc_content.carousel;
              sub_bloc.forEach((element) => {
                index++;
                const text_picture_content = new Carousel(
                  this.page.id,

                  element.bloc_number as number,
                  element.id as number
                );

                async_result[index] = text_picture_content.hydrate(element);
              });
            }
          }
        }
      );

      return async_result;
    };

    const typedData = unordered_data();
    if (typedData !== undefined) {
      const header = await this.getHeader();
      const ordered = [];
      if (header !== undefined) {
        ordered[0] = header;
        const ordered_data = this.sortComponents(
          Object.values(typedData) as Array<ComponentTypes>
        );

        ordered.push(...ordered_data);
        const footer = await this.getFooter(ordered);

        if (footer !== undefined) {
          ordered.push(footer);
          return ordered;
        }
      }
    }
  };
  getHeader = async () => {
    const header_content = await new Header(1, 0).get_bloc();
    const header =
      header_content !== undefined &&
      "header" in header_content &&
      header_content.header !== undefined &&
      header_content.header !== null &&
      Array.isArray(header_content.header) &&
      header_content.header[0] !== undefined
        ? new Header(1, 0).hydrate(header_content.header[0])
        : undefined;
    if (header !== undefined) {
      return header;
    } else {
      const header_content = await new Header(-1, 0).save_bloc();

      this.isInitSite = true;
      const header =
        header_content !== undefined &&
        "header" in header_content &&
        header_content.header !== undefined &&
        header_content.header !== null &&
        Array.isArray(header_content.header) &&
        header_content.header[0] !== undefined
          ? new Header(1, 0).hydrate(header_content.header[0])
          : undefined;
      if (header !== undefined) {
        return header;
      }
    }
  };
  getFooter = async (blocs: ComponentTypes[]) => {
    const footer_content = await new Footer(1, blocs.length).get_bloc();

    const footer =
      footer_content !== undefined &&
      "footer" in footer_content &&
      footer_content.footer !== undefined &&
      footer_content.footer !== null &&
      Array.isArray(footer_content.footer) &&
      footer_content.footer[0] !== undefined
        ? new Footer(1, blocs.length).hydrate(footer_content.footer[0])
        : undefined;

    if (footer !== undefined) {
      return footer;
    } else {
      const footer_content = await new Footer(-1, blocs.length).save_bloc();
      this.isInitSite = true;
      const footer =
        footer_content !== undefined &&
        "footer" in footer_content &&
        footer_content.footer !== undefined &&
        footer_content.footer !== null &&
        Array.isArray(footer_content.footer) &&
        footer_content.footer[0] !== undefined
          ? new Footer(1, blocs.length).hydrate(footer_content.footer[0])
          : undefined;
      if (footer !== undefined) {
        return footer;
      }
    }
  };
  getBloc = (promise: Promise<ComponentTypes>): Promise<ComponentTypes> => {
    return new Promise(async function (resolve) {
      resolve(await promise);
    });
  };
  sortComponents = (array_unsorted: Array<ComponentTypes> | Array<Page>) => {
    array_unsorted.sort(this.compareFn);

    return array_unsorted;
  };
  compareFn(a: ComponentTypes | Page, b: ComponentTypes | Page) {
    return a.bloc_number - b.bloc_number;
  }
}
