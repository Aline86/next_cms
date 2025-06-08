"use client";
import * as React from "react";
import ButtonModel from "../../../../../models/Button";
import { useEffect, useState } from "react";
import Page from "../../../../../models/Page";
import ButtonCard from "./ButtonCard";
import Parallaxe from "./Parallaxe";
interface CustomCarouselInfo {
  bloc: ButtonModel | Record<string, unknown>;
  full: boolean;
  toggle: boolean;
  isResponsive: boolean;
}
function ButtonVisualization({
  bloc,
  full,
  toggle,
  isResponsive,
}: CustomCarouselInfo) {
  const [external, isExternalLink] = useState<string | number>();
  const [page, setPage] = useState<Page>();
  const [result, setResult] = useState<MediaQueryList>();
  const [, setResize] = useState(0);

  const checkExternal = async (url: string) => {
    const prefixe = String(url).substring(0, 4);

    if (prefixe === "http" || prefixe === "") {
      isExternalLink("External link");
      console.log("external", prefixe);
    } else if (/.pdf/.test(String(url).substring(String(url).length - 4))) {
      isExternalLink("Fichier");
    }
    if (String(url).startsWith("mailto")) {
      isExternalLink("Mailto");
    } else if (
      prefixe !== "http" &&
      prefixe !== "" &&
      !/.pdf/.test(String(url).substring(String(url).length - 4))
    ) {
      isExternalLink("PageID");

      const prefixe = Number(String(url).substring(0, 2));
      const pageData = await getPage(prefixe);
      setPage(pageData as Page | undefined);
    }
  };

  const getPage = async (id: number) => {
    const concerned_page = new Page(id, 0, null);

    const page = await concerned_page.get_one_bloc();

    if (
      page !== undefined &&
      "page" in page &&
      page.page &&
      Object.keys(page.page as object)[0] !== null
    ) {
      return (page.page as Page[])[0] as Page;
    }
  };
  function updateSize() {
    setResize(window?.innerWidth);
  }
  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 1000px)") as MediaQueryList);
  }, [bloc]);
  useEffect(() => {
    window?.addEventListener("resize", updateSize);
  }, [result?.matches]);
  useEffect(() => {
    if (
      (bloc !== undefined &&
        bloc?.href_url !== undefined &&
        typeof bloc?.href_url === "string") ||
      typeof bloc?.href_url === "number"
    ) {
      checkExternal(String(bloc.href_url));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [external, page, bloc, toggle]);
  return bloc !== undefined &&
    result !== undefined &&
    external !== undefined ? (
    Boolean(bloc.is_parallaxe) === false ? (
      <ButtonCard
        bloc={bloc}
        full={full}
        result={result}
        external={external}
        page={page}
        isResponsive={isResponsive}
        toggle={toggle}
      />
    ) : Boolean(bloc.is_parallaxe) ? (
      <Parallaxe
        bloc={bloc}
        full={full}
        result={result}
        external={external}
        page={page}
        toggle={toggle}
      />
    ) : (
      <></>
    )
  ) : (
    <div className="flex justify-center items-center h-full">
      <p className="text-gray-500">Chargement...</p>
    </div>
  );
}

export default ButtonVisualization;
