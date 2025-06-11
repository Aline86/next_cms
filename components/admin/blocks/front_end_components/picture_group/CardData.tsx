/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import Page from "../../../../../models/Page";
import PictureGroupData from "../../../../../models/PictureGroupData";
import InsideCardData from "./InsideCardData";

import { useEffect, useState } from "react";
import ExternalLink from "../../../../../lib/dropdown/dropdown_types/ExrternalLink";
import FileLink from "../../../../../lib/dropdown/dropdown_types/File";
import Mailto from "../../../../../lib/dropdown/dropdown_types/Maito";
import PageID from "../../../../../lib/dropdown/dropdown_types/PageID";

interface CardDatas {
  toggle: boolean;
  data: PictureGroupData | Record<string, unknown>;

  full: boolean;
  isResponsive: boolean;
}

function CardData({
  data,

  full,
}: CardDatas) {
  const [page, setPage] = useState<Page>();

  const array_all_possible_types = {
    external_link: new ExternalLink(String(data.href_url)),
    file: new FileLink(String(data.href_url)),
    mailto: new Mailto(String(data.href_url)),
    pageID: new PageID(String(data.href_url)),
  };

  let to_render_type: string = "";

  Object.values(array_all_possible_types).forEach((dropdown_class) => {
    if (dropdown_class.check_type()) {
      to_render_type = dropdown_class.get_type();
    }
  });

  const [choice_type] = useState<string>(to_render_type);

  const getPage = async () => {
    if (data !== undefined && data.href_url !== undefined) {
      const concerned_page = array_all_possible_types.pageID;
      const page = await concerned_page.get_page(Number(data.href_url));
      if (page !== undefined) {
        setPage(page);
      }
    }
  };

  useEffect(() => {
    if (choice_type === "pageID") {
      getPage();
    }
  }, [choice_type, data]);
  useEffect(() => {}, [page]);

  return data !== undefined ? (
    choice_type === "file" ? (
      <a
        target="_blank"
        href={
          process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
          "/api/uploadfile/" +
          data.href_url
        }
      >
        <InsideCardData data={data} full={full} />
      </a>
    ) : choice_type === "pageID" && page !== undefined ? (
      <Link
        //
        href={{ pathname: `/` + page.slug }}
      >
        <InsideCardData data={data} full={full} />
      </Link>
    ) : choice_type === "external_link" || choice_type === "mailto" ? (
      <a target="_blank" href={String(data.href_url)}>
        <InsideCardData data={data} full={full} />
      </a>
    ) : (
      <a
        target="_blank"
        href={data !== undefined ? String(data.href_url) : "/"}
      >
        <InsideCardData data={data} full={full} />
      </a>
    )
  ) : (
    <></>
  );
}

export default CardData;
