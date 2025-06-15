import Page from "../models/Page";
import ComponentTypes from "./types";
import Header from "../models/Header";
import Footer from "../models/FooterData";
import blocksToRenderSkeleton from "./config/blocsToRender";

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
      const blocs = Object.values(blocs_for_page.page)[0];

      const ordered_data = await this.getAllRequests(blocs);
      if (ordered_data !== undefined) {
        return (ordered_data as (ComponentTypes | Page | unknown[])[]).filter(
          (item): item is ComponentTypes | Page => !Array.isArray(item)
        );
      }
    }
  };

  getAllRequests = async (array_async: Record<string, unknown>) => {
    const unordered_data = () => {
      const async_result: ComponentTypes[] | undefined = [];
      let index = 0;
      const keys = Object.keys(array_async);
      console.log(keys);
      keys.forEach((name_object: string) => {
        const bloc_content =
          array_async[name_object] !== undefined
            ? array_async[name_object]
            : undefined;

        if (
          blocksToRenderSkeleton[
            name_object as keyof typeof blocksToRenderSkeleton
          ] !== undefined &&
          blocksToRenderSkeleton[
            name_object as keyof typeof blocksToRenderSkeleton
          ].model !== Header &&
          blocksToRenderSkeleton[
            name_object as keyof typeof blocksToRenderSkeleton
          ].model !== Footer
        )
          if (
            blocksToRenderSkeleton[
              name_object as keyof typeof blocksToRenderSkeleton
            ] !== undefined
          ) {
            const bloc_structure =
              blocksToRenderSkeleton[
                name_object as keyof typeof blocksToRenderSkeleton
              ];

            const ModelData = bloc_structure.model;

            if (
              Array.isArray(bloc_content) &&
              ModelData !== Header &&
              ModelData !== Footer
            ) {
              bloc_content.forEach(
                (bloc_content_variant: Record<string, unknown>) => {
                  index++;
                  interface BlocModelConstructor {
                    new (
                      pageId: number,
                      blocNumber: number,
                      id: number
                    ): ComponentTypes;
                  }
                  const bloc_class = new (ModelData as BlocModelConstructor)(
                    this.page.id as number,
                    bloc_content_variant.bloc_number as number,
                    bloc_content_variant.id as number
                  );

                  async_result[index] =
                    bloc_class.hydrate(bloc_content_variant);
                }
              );
            }
          }
      });

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

        const filteredOrdered = ordered.filter(
          (item): item is ComponentTypes => Array.isArray(item) === false
        );
        const footer = await this.getFooter(filteredOrdered);

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
        header_content !== undefined && header_content !== undefined
          ? new Header(1, 0)
          : undefined;
      if (header !== undefined) {
        const result = await header.get_bloc();
        if (result !== undefined) {
          return result;
        }
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
        ? new Footer(1, 100).hydrate(footer_content.footer[0])
        : undefined;

    if (footer !== undefined) {
      return footer;
    } else {
      const footer_content = await new Footer(-1, 0).save_bloc();
      this.isInitSite = true;
      const footer =
        footer_content !== undefined && footer_content !== undefined
          ? new Footer(1, 100)
          : undefined;
      if (footer !== undefined) {
        const result = await footer.get_bloc();
        if (result !== undefined) {
          return result;
        }
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
