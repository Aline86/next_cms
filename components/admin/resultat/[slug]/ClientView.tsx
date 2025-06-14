/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

import Page from "../../../../models/Page";
import useBlocStore from "../../../../store/blocsStore";
import Layout from "../../../layout";
import Link from "next/link";
import BlocTools from "../../../../lib/bloc_tools";
import blocksToRender from "../../../../lib/config/blocsToRender";
import Footer from "../../../../models/FooterData";
import FooterVizualization from "../../blocks/front_end_components/footer/footer";

export const dynamic = "force-dynamic";
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
      setPage(page);
    }
  };
  type BlocksToRenderKey = keyof typeof blocksToRender;

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
                  blocs.map((bloc, index) => {
                    const blocType = bloc.type as BlocksToRenderKey;
                    const FrontComponent = blocksToRender[blocType].frontend;
                    return (
                      <div
                        key={index}
                        className={index < blocs.length - 1 ? "mb-8" : ""}
                      >
                        {bloc.type !== "footer" && (
                          <FrontComponent
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            bloc={bloc as any}
                            full={true}
                            isResponsive={isReponsive}
                            toggle={toggle}
                            refresh={refresh}
                            index={index}
                            page_id={Number(id)}
                            num_bloc={index}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
              {blocs[blocs.length - 1] instanceof Footer && (
                <FooterVizualization
                  bloc={blocs[blocs.length - 1] as Footer}
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
