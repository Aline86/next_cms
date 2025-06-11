// app/[slug]/ClientView.tsx (or wherever this belongs)
"use server";

import Page from "../../models/Page";
import Header from "../../models/Header";
import Footer from "../../models/FooterData";

import ScreenHome from "../../models/Screen";

import BlocTools from "../../lib/bloc_tools";

import HeaderVizualization from "../../components/admin/blocks/front_end_components/header/header";
import ScreenVizualisation from "../../components/admin/blocks/front_end_components/screen/screen";
import PictureGroupVizualisation from "../../components/admin/blocks/front_end_components/picture_group/PictureGroup";
import GridVizualisation from "../../components/admin/blocks/front_end_components/grid/PictureGroup";
import Bloc from "../../components/admin/blocks/front_end_components/text_picture/bloc";
import MiniaturesVisualization from "../../components/admin/blocks/front_end_components/miniatures/Miniatures";
import FooterVizualization from "../../components/admin/blocks/front_end_components/footer/footer";
import Carousel from "../../models/Carousel";
import PictureGroup from "../../models/PictureGroup";
import CarouselVisualization from "../../components/admin/blocks/front_end_components/carousel/Carousel";
import CarouselAutoVisualization from "../../components/admin/blocks/front_end_components/auto/Carousel";
import ButtonVisualization from "../../components/admin/blocks/front_end_components/button/Button";
import VideoVisualization from "../../components/admin/blocks/front_end_components/video/Video";

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

  return (
    blocs !== undefined &&
    page_type !== undefined && (
      <>
        <div className="w-[80vw] m-auto min-h-[100vh] pt-[50px]">
          {blocs !== undefined &&
            blocs?.map((value, index) => {
              return (
                <div key={index} className="mb-8">
                  {value.type === "header" && (
                    <HeaderVizualization
                      input_bloc={value as Header | Record<string, unknown>}
                      full={true}
                      isResponsive={false}
                      toggle={true}
                      page_number={id}
                    />
                  )}

                  {value.type === "screen" && (
                    <ScreenVizualisation
                      bloc={value as ScreenHome | Record<string, unknown>}
                      full={true}
                      isResponsive={false}
                      toggle={false}
                    />
                  )}

                  {value.type === "picture_group" &&
                  "is_grid" in value &&
                  value.is_grid === 0 ? (
                    <PictureGroupVizualisation
                      input_bloc={value}
                      isResponsive={false}
                      full={true}
                      toggle={false}
                    />
                  ) : typeof value === "object" &&
                    value !== null &&
                    ("is_grid" in value ||
                      (value as Record<string, unknown>)) ? ( // crude check for PictureGroup or Record<string, unknown>
                    <GridVizualisation
                      input_bloc={
                        value as Record<string, unknown> | PictureGroup
                      }
                      isResponsive={false}
                      toggle={false}
                      refresh={false}
                    />
                  ) : null}
                  {value.type === "text_picture" &&
                    typeof value === "object" &&
                    value !== null &&
                    // Ensure value is TextPicture or Record<string, unknown>
                    ("text" in value || "title" in value) && (
                      <Bloc
                        isResponsive={false}
                        index={index}
                        bloc={value as Record<string, unknown>}
                        num_bloc={index}
                        full={true}
                        toggle={false}
                        refresh={false}
                      />
                    )}
                  {value.type === "button" && (
                    <ButtonVisualization
                      bloc={value as Record<string, unknown>}
                      full={true}
                      toggle={false}
                      isResponsive={false}
                    />
                  )}
                  {value.type === "video" && (
                    <VideoVisualization
                      bloc={value as Record<string, unknown>}
                      full={true}
                      toggle={false}
                    />
                  )}
                  {value.type === "carousel" &&
                  typeof value === "object" &&
                  "carousel_type" in value &&
                  value.carousel_type === "miniatures" &&
                  value !== null ? (
                    <MiniaturesVisualization
                      input_bloc={value as Carousel | Record<string, unknown>}
                      refresh={false}
                      full={true}
                      isResponsive={false}
                      toggle={false}
                    />
                  ) : value !== null &&
                    "carousel_type" in value &&
                    value.carousel_type === "carousel" ? (
                    <CarouselVisualization
                      input_bloc={value as Carousel | Record<string, unknown>}
                      full={true}
                      toggle={false}
                    />
                  ) : (
                    value !== null &&
                    "carousel_type" in value &&
                    value.carousel_type === "auto" && (
                      <CarouselAutoVisualization
                        slides={value as Carousel | Record<string, unknown>}
                        full={true}
                        toggle={false}
                      />
                    )
                  )}
                </div>
              );
            })}
        </div>
        {blocs[blocs.length - 1] !== undefined &&
          blocs[blocs.length - 1].type === "footer" && (
            <FooterVizualization
              input_bloc={
                blocs[blocs.length - 1] as Footer | Record<string, unknown>
              }
              isResponsive={false}
              full={true}
            />
          )}
      </>
    )
  );
}
