"use client";
import * as React from "react";
import ButtonModel from "../../../../../models/Button";
import { useEffect, useState } from "react";
import Page from "../../../../../models/Page";
import ButtonCard from "./ButtonCard";
import Parallaxe from "./Parallaxe";
import ExternalLink from "../../../../../lib/dropdown/dropdown_types/ExrternalLink";
import FileLink from "../../../../../lib/dropdown/dropdown_types/File";
import Mailto from "../../../../../lib/dropdown/dropdown_types/Maito";
import PageID from "../../../../../lib/dropdown/dropdown_types/PageID";
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
  const [page, setPage] = useState<Page>();
  const [result, setResult] = useState<MediaQueryList>();
  const [, setResize] = useState(0);

  const array_all_possible_types = {
    external_link: new ExternalLink(String(bloc.href_url)),
    file: new FileLink(String(bloc.href_url)),
    mailto: new Mailto(String(bloc.href_url)),
    pageID: new PageID(String(bloc.href_url)),
  };

  let to_render_type: string = "";

  Object.values(array_all_possible_types).forEach((dropdown_class) => {
    console.log(dropdown_class.check_type());
    if (dropdown_class.check_type()) {
      to_render_type = dropdown_class.get_type();
    }
  });

  Object.values(array_all_possible_types).forEach((dropdown_class) => {
    if (dropdown_class.check_type()) {
      to_render_type = dropdown_class.get_type();
    }
  });
  const [choice_type] = useState<string>(to_render_type);

  const getPage = async () => {
    if (bloc !== undefined && bloc.href_url !== undefined) {
      const concerned_page = array_all_possible_types.pageID;

      const page = await concerned_page.get_page(Number(bloc.href_url));

      if (page !== undefined) {
        setPage(page);
      }
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
    if (choice_type === "pageID") {
      getPage();
    }
  }, [choice_type, bloc, toggle, to_render_type]);
  useEffect(() => {}, [page]);

  return bloc !== undefined &&
    result !== undefined &&
    choice_type !== undefined ? (
    Boolean(bloc.is_parallaxe) === false ? (
      <ButtonCard
        bloc={bloc}
        full={full}
        result={result}
        external={choice_type}
        page={page}
        isResponsive={isResponsive}
        toggle={toggle}
      />
    ) : Boolean(bloc.is_parallaxe) ? (
      <Parallaxe
        bloc={bloc}
        full={full}
        result={result}
        external={choice_type}
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
