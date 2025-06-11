/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Carousel from "../../../../models/Carousel";
import Footer from "../../../../models/FooterData";
import Header from "../../../../models/Header";
import Page from "../../../../models/Page";
import PictureGroup from "../../../../models/PictureGroup";
import ScreenHome from "../../../../models/Screen";
import TextPicture from "../../../../models/TextPicture";
import Video from "../../../../models/Video";
import useBlocStore from "../../../../store/blocsStore";
import CarouselAutoVisualization from "../../blocks/front_end_components/auto/Carousel";
import ButtonVisualization from "../../blocks/front_end_components/button/Button";
import CarouselVisualization from "../../blocks/front_end_components/carousel/Carousel";
import FooterVizualization from "../../blocks/front_end_components/footer/footer";
import GridVizualisation from "../../blocks/front_end_components/grid/PictureGroup";
import HeaderVizualization from "../../blocks/front_end_components/header/header";
import MiniaturesVisualization from "../../blocks/front_end_components/miniatures/Miniatures";
import PictureGroupVizualisation from "../../blocks/front_end_components/picture_group/PictureGroup";
import ScreenVizualisation from "../../blocks/front_end_components/screen/screen";
import Bloc from "../../blocks/front_end_components/text_picture/bloc";
import VideoVisualization from "../../blocks/front_end_components/video/Video";
import Layout from "../../../layout";
import ButtonData from "../../../../models/Button";
import Link from "next/link";
import BlocTools from "../../../../lib/bloc_tools";

//export const dynamic = "force-dynamic";
export default function ClientView({ id }: { id: string }) {
  const [toggle, setToggle] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [page_type, setPage] = useState(new Page(Number(id), 0, null));

  const [isReponsive, setResponsive] = useState(false);
  const setBlocs = useBlocStore((state) => state.setBlocs);
  const blocs = useBlocStore((state) => state.blocs);
  const getPage = async () => {
    const tools = new BlocTools(page_type);
    const page = await tools.getPage();
    if (page !== undefined) {
      console.log("page_type", page);
      setPage(page);
    }
  };

  async function asynchronRequestsToPopulateBlocs() {
    if (page_type !== undefined) {
      await getPage();

      const tools = new BlocTools(page_type);
      if (tools !== undefined) {
        const bloc_pages = await tools.getAllBlocsPage();
        if (tools.isInitSite) {
          setRefresh(!refresh);
        } else {
          if (bloc_pages !== undefined) {
            console.log(tools.isInitSite);

            setBlocs(bloc_pages);
          }
        }
      }
    }
  }
  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, [id]);
  useEffect(() => {
    setToggle(!toggle);
  }, [blocs, page_type]);
  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, [refresh]);

  return (
    <>
      <div
        className={
          isReponsive
            ? "flex align-items justify-center gap-8 mt-16 relative z-100 text-gray-300 "
            : "absolute flex align-items justify-center gap-8 mt-16 pt-[100px] relative z-100 text-gray-300"
        }
        style={{ transform: "translate(-50%, -50%)", top: "20%", left: "50%" }}
      >
        {!isReponsive && page_type !== undefined && (
          <Link
            href={{ pathname: `/admin/visualization/` + page_type.slug }}
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
            <>
              <div
                className={
                  isReponsive ? "w-sm m-auto mt-16" : "w-[90vw] m-auto mt-8 "
                }
              >
                {blocs !== undefined &&
                  blocs.length > 0 &&
                  blocs.map((value, index) => {
                    return (
                      <div key={index} className="mb-8">
                        {value instanceof Header && (
                          <HeaderVizualization
                            input_bloc={value}
                            full={true}
                            isResponsive={isReponsive}
                            toggle={toggle}
                            page_number={Number(id)}
                          />
                        )}
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
                            refresh={false}
                          />
                        )}
                        {value instanceof Carousel &&
                          (value.carousel_type === "miniatures" ? (
                            <MiniaturesVisualization
                              input_bloc={value}
                              toggle={toggle}
                              refresh={false}
                              full={true}
                              isResponsive={isReponsive}
                            />
                          ) : value !== null &&
                            "carousel_type" in value &&
                            value.carousel_type === "carousel" ? (
                            <CarouselVisualization
                              input_bloc={value as Carousel}
                              full={true}
                              isResponsive={isReponsive}
                              toggle={toggle}
                            />
                          ) : (
                            value !== null &&
                            "carousel_type" in value &&
                            value.carousel_type === "auto" && (
                              <CarouselAutoVisualization
                                slides={value as Carousel}
                                full={true}
                                toggle={false}
                              />
                            )
                          ))}
                        {value instanceof Video && (
                          <VideoVisualization
                            bloc={value as Video}
                            full={true}
                            toggle={false}
                          />
                        )}
                        {value instanceof ButtonData && (
                          <ButtonVisualization
                            bloc={value as ButtonData}
                            full={true}
                            toggle={false}
                            isResponsive={isReponsive}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
              {blocs[blocs.length - 1] instanceof Footer && (
                <FooterVizualization
                  input_bloc={blocs[blocs.length - 1] as Footer}
                  isResponsive={isReponsive}
                  full={true}
                />
              )}
            </>
          </Layout>
        )}
      </div>
    </>
  );
}
