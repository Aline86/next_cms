/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import Page from "../../../../../models/Page";
import PictureGroupData from "../../../../../models/PictureGroupData";
import InsideCardData from "./InsideCardData";

import { useEffect, useState } from "react";

interface CardDatas {
  toggle: boolean;
  data: PictureGroupData | Record<string, unknown> | undefined;

  full: boolean;
  isResponsive: boolean;
}

function CardData({
  data,
  toggle,

  full,
}: CardDatas) {
  const [external, isExternalLink] = useState<boolean>(true);
  const [page, setPage] = useState<Page>();

  const checkExternal = async (url: string) => {
    const prefixe = url.substring(0, 4);
    if (prefixe === "http" || prefixe === "") {
      isExternalLink(true);
    } else {
      isExternalLink(false);
      const prefixe = Number(url.substring(0, 2));
      const pageData = await getPage(prefixe);
      if (pageData !== undefined) {
        // If pageData is an array, select the first item; otherwise, use as Page
        if (Array.isArray(pageData) && pageData.length > 0) {
          setPage(pageData[0] as Page);
        } else if (
          pageData &&
          typeof pageData === "object" &&
          !Array.isArray(pageData)
        ) {
          setPage(pageData as Page);
        }
      }
    }
  };
  const getPage = async (id: number) => {
    const concerned_page = new Page(id, 0, null);
    const page = await concerned_page.get_bloc();
    if (page !== undefined) {
      return page;
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      checkExternal(String(data.href_url));
    }
  }, [toggle]);

  return external && data !== undefined ? (
    <a target="_blank" href={String(data.href_url)}>
      <InsideCardData data={data} full={full} />
    </a>
  ) : page !== undefined ? (
    <Link
      //
      href={{ pathname: `/` + page?.slug }}
    >
      <InsideCardData data={data} full={full} />
    </Link>
  ) : (
    <></>
  );
}

export default CardData;
