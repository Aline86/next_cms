"use server";

import Page from "./../../models/Page";
import BlocTools from "./../../lib/bloc_tools";
import FooterVizualization from "./../../components/admin/blocks/front_end_components/footer/footer";
import blocksToRender from "./../../lib/config/blocsToRender";

export default async function ClientView({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const page_type = new Page(id, 0, null);

  const getAllBlocs = async (page_type: Page) => {
    const tools = new BlocTools(page_type);

    const bloc_pages = await tools.getAllBlocsPage();

    const blocs = Array.isArray(bloc_pages)
      ? bloc_pages.map(async (bloc) => await bloc.classToPlainObject())
      : [];

    const bloc_result = Promise.all(blocs).then((data) => {
      return data;
    });

    if (bloc_result !== undefined) {
      return bloc_result;
    }
  };
  const blocs = await getAllBlocs(page_type);
  type BlocksToRenderKey = keyof typeof blocksToRender;
  return (
    blocs !== undefined &&
    page_type !== undefined && (
      <>
        <div className={"w-[80vw] min-h-[100vh] m-auto"}>
          {blocs !== undefined &&
            blocs.length > 0 &&
            blocs.map((bloc, index) => {
              const blocType = bloc.type as BlocksToRenderKey;
              const FrontComponent = blocksToRender[blocType].frontend;
              return (
                <div
                  key={index}
                  className={index < blocs.length - 1 ? "mb-8  " : ""}
                >
                  {bloc.type !== "footer" && (
                    <FrontComponent
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      bloc={bloc as any}
                      full={true}
                      isResponsive={false}
                      toggle={true}
                      refresh={false}
                      index={index}
                      page_id={Number(id)}
                      num_bloc={index}
                    />
                  )}
                </div>
              );
            })}
        </div>
        {blocs[blocs.length - 1].type === "footer" && (
          <FooterVizualization
            bloc={blocs[blocs.length - 1] as Record<string, unknown>}
            isResponsive={false}
            full={true}
          />
        )}
      </>
    )
  );
}
