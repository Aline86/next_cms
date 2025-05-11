/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

import Page from "../models/Page";
import Layout from "./layout";
import GridVizualisation from "./admin/blocks/front_end_components/grid/PictureGroup";
import HeaderVizualization from "./admin/blocks/front_end_components/header/header";
import Header from "../models/Header";
import Bloc from "./admin/blocks/front_end_components/text_picture/bloc";
import ScreenVizualisation from "./admin/blocks/front_end_components/screen/screen";
import MiniaturesVisualization from "./admin/blocks/front_end_components/miniatures/Miniatures";
import PictureGroupVizualisation from "./admin/blocks/front_end_components/picture_group/PictureGroup";
import FooterVizualization from "./admin/blocks/front_end_components/footer/footer";
import Footer from "../models/FooterData";
import Carousel from "../models/Carousel";
import PictureGroup from "../models/PictureGroup";
import ScreenHome from "../models/Screen";
import TextPicture from "../models/TextPicture";
import BlocTools from "../lib/bloc_tools";

export default function Homepage() {
  const [toggle] = useState(false);

  const [header, setHeader] = useState<Header>(new Header());
  const [footer, setFooter] = useState(new Footer());

  const page_type = new Page(1, 0, null);
  const tools = new BlocTools(page_type);

  const [blocs, setBlocs] = useState<
    Array<
      | PictureGroup
      | TextPicture
      | ScreenHome
      | PictureGroup
      | Header
      | Footer
      | Carousel
    >
  >([]);

  async function asynchronRequestsToPopulateBlocs() {
    setBlocs([]);
    const result_header = await header.get_bloc();
    setHeader(result_header);
    const result_footer = await footer.get_bloc();
    setFooter(result_footer);

    const bloc_pages = await tools.getAllBlocsPage();

    if (bloc_pages !== undefined) {
      const result = bloc_pages.filter(
        (bloc) =>
          bloc instanceof PictureGroup ||
          bloc instanceof TextPicture ||
          bloc instanceof ScreenHome ||
          bloc instanceof Header ||
          bloc instanceof Footer ||
          bloc instanceof Carousel
      );
      setBlocs(result);
    }
  }

  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, []);

  return (
    <Layout>
      <>
        <div className="w-[80vw] m-auto min-h-[100vh]">
          {header !== undefined && (
            <HeaderVizualization
              input_bloc={header}
              full={true}
              isResponsive={false}
              toggle={true}
              page_number={1}
            />
          )}
          {blocs !== undefined &&
            blocs.map((value, index) => {
              return (
                <div key={index} className="mb-8">
                  {value instanceof ScreenHome && (
                    <ScreenVizualisation
                      bloc={value}
                      toggle={false}
                      full={true}
                      isResponsive={false}
                    />
                  )}

                  {value instanceof PictureGroup &&
                    (!Boolean(value.is_grid) ? (
                      <PictureGroupVizualisation
                        input_bloc={value}
                        toggle={false}
                        isResponsive={false}
                        full={true}
                      />
                    ) : (
                      <GridVizualisation
                        input_bloc={value}
                        toggle={false}
                        refresh={false}
                        isResponsive={false}
                      />
                    ))}
                  {value instanceof TextPicture && (
                    <Bloc
                      isResponsive={false}
                      index={index}
                      bloc={value}
                      num_bloc={index}
                      toggle={false}
                      full={true}
                    />
                  )}
                  {value instanceof Carousel && (
                    <MiniaturesVisualization
                      input_bloc={value}
                      toggle={false}
                      refresh={false}
                      full={true}
                      isResponsive={false}
                    />
                  )}
                </div>
              );
            })}
        </div>
        {footer !== undefined && (
          <FooterVizualization
            input_bloc={footer}
            toggle={toggle}
            isResponsive={false}
            full={true}
          />
        )}
      </>
    </Layout>
  );
}
