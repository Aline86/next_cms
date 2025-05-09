/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

import Header from "../../../models/Header";
import Layout from "../../layout";
import HeaderVizualization from "../blocks/front_end_components/header/header";
import ScreenVizualisation from "../blocks/front_end_components/screen/screen";
import PictureGroupVizualisation from "../blocks/front_end_components/picture_group/PictureGroup";
import GridVizualisation from "../blocks/front_end_components/grid/PictureGroup";
import Bloc from "../blocks/front_end_components/text_picture/bloc";
import MiniaturesVisualization from "../blocks/front_end_components/miniatures/Miniatures";
import Page from "../../../models/Page";
import BlocTools from "../../../lib/bloc_tools";
import Link from "next/link";

import FooterVizualization from "../blocks/front_end_components/footer/footer";
import Footer from "../../../models/FooterData";
import PictureGroup from "../../../models/PictureGroup";
import TextPicture from "../../../models/TextPicture";
import ScreenHome from "../../../models/Screen";
import Carousel from "../../../models/Carousel";
import SnippetTypes from "../../../lib/snippet_types";
export const dynamic = "force-dynamic";
export default function ClientView({ id }: { id: string }) {
  const [toggle, setToggle] = useState(false);

  const [page_type] = useState(new Page(Number(id), 0, null));
  const [header, setHeader] = useState<Header>(new Header());
  const [footer, setFooter] = useState(new Footer());
  const [isReponsive, setResponsive] = useState(false);
  const [refresh] = useState(false);
  const [goTo, setGoTo] = useState(false);

  const tools = new BlocTools(page_type);

  const [blocs, setBlocs] = useState<(SnippetTypes | Header | Footer)[]>([]);
  const [highlight, setHighlight] = useState<SnippetTypes | Header | Footer>();
  async function asynchronRequestsToPopulateBlocs(goToB: boolean = false) {
    setBlocs([]);
    const result_header = await header.get_bloc();
    setHeader(result_header);
    const result_footer = await footer.get_bloc();
    setFooter(result_footer);
    await footer.get_bloc();
    const bloc_pages = await tools.getAllBlocsPage();

    if (Array.isArray(bloc_pages)) {
      setBlocs(
        bloc_pages.filter(
          (bloc): boolean =>
            bloc instanceof Header ||
            bloc instanceof Footer ||
            !(bloc instanceof Page) // Ensure compatibility with the parameter's type
        ) as (SnippetTypes | Header | Footer)[]
      );
      if (goToB) {
        if (blocs !== undefined && bloc_pages !== undefined) {
          const lastBloc = bloc_pages[bloc_pages.length - 1];
          if (
            lastBloc instanceof Header ||
            lastBloc instanceof Footer ||
            !(lastBloc instanceof Page)
          ) {
            setHighlight(lastBloc);
          }
        }

        setGoTo(!goTo);
      } else {
        setToggle(!toggle);
      }
    }
  }

  function handleScroll() {
    const timedelay = 0;

    let height: number = 0;
    const minScrollHeight: number = 100;
    const scrollId = setInterval(function () {
      if (height <= document.body.scrollHeight) {
        if (typeof window !== "undefined") {
          window?.scrollBy(0, minScrollHeight);
        }
      } else {
        clearInterval(scrollId);
      }
      height += minScrollHeight;
    }, timedelay);
  }

  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, []);

  useEffect(() => {}, [toggle, blocs]);
  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, [refresh]);

  useEffect(() => {
    handleScroll();
  }, [goTo]);

  useEffect(() => {}, [highlight]);

  return (
    <>
      <div
        className={
          isReponsive
            ? "flex align-items justify-center gap-8 mt-16 relative z-100 text-gray-300"
            : "absolute flex align-items justify-center gap-8 mt-16 pt-[100px] relative z-100 text-gray-300"
        }
        style={{ transform: "translate(-50%, -50%)", top: "20%", left: "50%" }}
      >
        {!isReponsive && page_type !== undefined && (
          <Link
            href={{ pathname: `/admin/visualization/` + page_type?.slug }}
            className="border border-1-solid p-[15px] rounded-xl cursor-pointer"
          >
            Retour
          </Link>
        )}

        <a
          className={
            !isReponsive
              ? " border border-1-solid  p-[15px] rounded-xl cursor-pointer"
              : "absolute right-[100px] top-[0px] text-gray-800 border border-1-solid p-[15px] rounded-xl cursor-pointer"
          }
          onClick={() => setResponsive(!isReponsive)}
        >
          {!isReponsive ? "Mode responsive" : "Retour"}
        </a>
      </div>
      <div
        className={
          isReponsive
            ? "w-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[600px] absolute overflow-x-hidden overflow-y-auto"
            : blocs[0] !== undefined && blocs[0].type !== "screen"
            ? "w-full mt-[-150px]"
            : "w-full mt-[-350px]"
        }
      >
        {page_type !== undefined && (
          <Layout>
            <div
              className={
                isReponsive ? "w-sm m-auto mt-16" : "w-[90vw] m-auto mt-8 "
              }
            >
              {header !== undefined && (
                <HeaderVizualization
                  input_bloc={header}
                  full={true}
                  isResponsive={isReponsive}
                  toggle={toggle}
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
                          toggle={toggle}
                          full={true}
                          isResponsive={isReponsive}
                        />
                      )}
                      {value instanceof PictureGroup &&
                        (!value.is_grid ? (
                          <PictureGroupVizualisation
                            input_bloc={value}
                            toggle={toggle}
                            isResponsive={isReponsive}
                            full={true}
                          />
                        ) : (
                          <GridVizualisation
                            input_bloc={value}
                            toggle={toggle}
                            refresh={false}
                            isResponsive={isReponsive}
                          />
                        ))}
                      {value instanceof TextPicture && (
                        <Bloc
                          isResponsive={isReponsive}
                          index={index}
                          bloc={value}
                          num_bloc={index}
                          toggle={toggle}
                          full={true}
                        />
                      )}
                      {value instanceof Carousel && (
                        <MiniaturesVisualization
                          input_bloc={value}
                          toggle={toggle}
                          refresh={false}
                          full={true}
                          isResponsive={isReponsive}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </Layout>
        )}
        {footer !== undefined && (
          <FooterVizualization
            input_bloc={footer}
            toggle={toggle}
            isResponsive={isReponsive}
            full={true}
          />
        )}
      </div>
    </>
  );
}
