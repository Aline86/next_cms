/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import Layout from "../layout";
import { useEffect, useState } from "react";

import Page from "../../models/Page";
import Header from "../../models/Header";
import BlocTools from "../../lib/bloc_tools";

import Footer from "../../models/FooterData";
import PictureGroup from "../../models/PictureGroup";
import ScreenHome from "../../models/Screen";
import TextPicture from "../../models/TextPicture";
import Carousel from "../../models/Carousel";
import SnippetTypes from "../../lib/snippet_types";
import HeaderVizualization from "../../pages/admin/blocks/front_end_components/header/header";
import ScreenVizualisation from "../../pages/admin/blocks/front_end_components/screen/screen";
import PictureGroupVizualisation from "../../pages/admin/blocks/front_end_components/picture_group/PictureGroup";
import GridVizualisation from "../../pages/admin/blocks/front_end_components/grid/PictureGroup";
import Bloc from "../../pages/admin/blocks/front_end_components/text_picture/bloc";
import MiniaturesVisualization from "../../pages/admin/blocks/front_end_components/miniatures/Miniatures";
import FooterVizualization from "../../pages/admin/blocks/front_end_components/footer/footer";
export const dynamic = "force-dynamic";
export default function ClientView({ id }: { id: number }) {
  const [page_type] = useState(new Page(Number(id), 0, null));

  const [header, setHeader] = useState<Header>(new Header());
  const [footer, setFooter] = useState(new Footer());

  const tools = new BlocTools(page_type);

  const [blocs, setBlocs] = useState<(SnippetTypes | Header | Footer)[]>([]);

  async function asynchronRequestsToPopulateBlocs() {
    setBlocs([]);

    const result_header = await header.get_bloc();
    setHeader(result_header);
    const result_footer = await footer.get_bloc();
    setFooter(result_footer);

    const bloc_pages = await tools.getAllBlocsPage();

    if (Array.isArray(bloc_pages)) {
      const result = bloc_pages.filter(
        (bloc): boolean =>
          bloc instanceof Header ||
          bloc instanceof Footer ||
          !(bloc instanceof Page) // Ensure compatibility with the parameter's type
      ) as (SnippetTypes | Header | Footer)[];
      setBlocs(result);
    }
  }
  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, [id]);

  return (
    <Layout>
      <>
        {page_type !== undefined && (
          <div className="w-[80vw] m-auto  min-h-[100vh]">
            {header !== undefined && (
              <HeaderVizualization
                input_bloc={header}
                full={true}
                isResponsive={false}
                toggle={true}
                page_number={Number(id)}
              />
            )}
            {blocs !== undefined &&
              blocs.length > 0 &&
              blocs.map((value, index) => {
                return (
                  <div key={index} className="mb-8">
                    {value instanceof ScreenHome && (
                      <ScreenVizualisation
                        bloc={value}
                        toggle={true}
                        full={true}
                        isResponsive={false}
                      />
                    )}
                    {value instanceof PictureGroup &&
                      (!Boolean(value.is_grid) ? (
                        <PictureGroupVizualisation
                          input_bloc={value}
                          toggle={true}
                          isResponsive={false}
                          full={true}
                        />
                      ) : (
                        <GridVizualisation
                          input_bloc={value}
                          toggle={true}
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
                        toggle={true}
                        full={true}
                      />
                    )}
                    {value instanceof Carousel && (
                      <MiniaturesVisualization
                        input_bloc={value}
                        toggle={true}
                        refresh={false}
                        full={true}
                        isResponsive={false}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        )}
        {footer !== undefined && (
          <FooterVizualization
            input_bloc={footer}
            toggle={true}
            isResponsive={false}
            full={true}
          />
        )}
      </>
    </Layout>
  );
}
