import Carousel from "../models/Carousel";
import PictureGroup from "../models/PictureGroup";
import ScreenHome from "../models/Screen";
import TextPicture from "../models/TextPicture";
import Page from "../models/Page";
import SnippetTypes from "./snippet_types";

export default class BlocTools {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getAllBlocsPage = async () => {
    return await this.getPage();
  };

  getPage = async (): Promise<void | Array<SnippetTypes> | Page[]> => {
    this.page = await this.page.get_bloc();

    const fullfilled_bloc_component_promises =
      await this.page.get_blocs_for_page();

    if (Array.isArray(fullfilled_bloc_component_promises)) {
      return this.getAllRequests(fullfilled_bloc_component_promises);
    }
  };

  getAllRequests = async (async_result: Array<unknown>) => {
    const unordered_data = async (page: Page) => {
      async_result.forEach(async (bloc, index) => {
        if (
          typeof bloc === "object" &&
          bloc !== null &&
          "type" in bloc &&
          "bloc_number" in bloc &&
          "id" in bloc &&
          bloc.type === "text_picture"
        ) {
          const text_picture = new TextPicture(
            bloc.id as number | undefined,
            bloc.bloc_number as number,
            page.id
          );

          async_result[index] = text_picture.get_bloc();
        }
        if (
          typeof bloc === "object" &&
          bloc !== null &&
          "type" in bloc &&
          "bloc_number" in bloc &&
          "id" in bloc &&
          bloc.type === "carousel"
        ) {
          const carousel = new Carousel(
            page.id,
            bloc.bloc_number as number,
            bloc.id as number
          );
          async_result[index] = carousel.get_bloc();
        }
        if (
          typeof bloc === "object" &&
          bloc !== null &&
          "type" in bloc &&
          "bloc_number" in bloc &&
          "id" in bloc &&
          bloc.type === "picture_group"
        ) {
          const picture_group = new PictureGroup(
            page.id,
            bloc.bloc_number as number,
            bloc.id as number
          );

          async_result[index] = picture_group.get_bloc();
        }
        /* if (bloc.type === "button") {
          let button = new Button(page.id, bloc.bloc_number, bloc.id);
          async_result[index] = this.getBloc(button.get_bloc());
        }
        if (bloc.type === "video") {
          let video = new Video(page.id, bloc.bloc_number, bloc.id);
          async_result[index] = this.getBloc(video.get_bloc());
        }
        if (bloc.type === "parallaxe") {
          let parallaxe = new Parallaxe(page.id, bloc.bloc_number, bloc.id);
          async_result[index] = this.getBloc(parallaxe.get_bloc());
        }*/
        if (
          typeof bloc === "object" &&
          bloc !== null &&
          "type" in bloc &&
          "bloc_number" in bloc &&
          "id" in bloc &&
          bloc.type === "screen"
        ) {
          const screen = new ScreenHome(
            page.id,
            bloc.bloc_number as number,
            bloc.id as number
          );

          async_result[index] = screen.get_bloc();
        }
      });

      return async_result;
    };

    const promises = await unordered_data(this.page);

    return Promise.all(promises).then((data) => {
      const typedData = data as Array<SnippetTypes>;
      if (typedData !== undefined && Array.isArray(typedData)) {
        const ordered = this.sortComponents(typedData);

        return ordered;
      }
    });
  };

  getBloc = (promise: Promise<SnippetTypes>): Promise<SnippetTypes> => {
    return new Promise(async function (resolve) {
      resolve(await promise);
    });
  };
  sortComponents = (array_unsorted: Array<SnippetTypes> | Array<Page>) => {
    const arr = array_unsorted;
    let n = arr.length;
    let swapped;
    // Bubble Sort Algorithm
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        // Compare the adjacent items based on the `key`
        if (arr[i].bloc_number > arr[i + 1].bloc_number) {
          // Swap the elements if they're in the wrong order
          const temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }
      n--;

      // Reduce the range of the next iteration
    } while (swapped); // Continue if a swap occurred

    return arr;
  };
}
