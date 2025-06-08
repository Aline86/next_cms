"use client";
import Link from "next/link";
import Page from "../../../../../models/Page";
import Image from "next/image";
import { useEffect, useState } from "react";
import CarouselData from "../../../../../models/CarouselData";

interface CardDatas {
  value: CarouselData | Record<string, unknown>;
  full: boolean;
}

function InsideCardDataShow({ value, full }: CardDatas) {
  const [external, isExternalLink] = useState<boolean>(true);
  const [page, setPage] = useState<Page>();

  const image =
    value !== undefined && value.image_url !== undefined
      ? process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
        "/api/uploadfile/" +
        value.image_url
      : "";

  const style = {
    width: "100%",
    height: "100%",

    cursor: "pointer",
  };
  const style_data = {
    display: "block",
    background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), no-repeat center / cover`,
    width: `${`100%`}`,
    PointerEvents: "none",
    height: `${full ? `30vh` : `15vh`}`,
    borderRadius: "5px",
    border:
      value !== undefined
        ? value.image_url !== ""
          ? ""
          : "1px solid rgb(168, 166, 166)"
        : "",
  };
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
    if (value !== undefined && typeof value.href_url === "string") {
      checkExternal(value.href_url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value !== undefined ? (
    external ? (
      <a
        key={String(value.id)}
        href={typeof value.href_url === "string" ? value.href_url : undefined}
        target="_blank"
        className="relative block w-full h-full"
        style={style_data}
      >
        {value.image_url !== "" && (
          <Image
            className="rounded overflow-hidden object-cover"
            src={image}
            fill={true}
            alt="Image"
            style={style}
          />
        )}
        {"text" in value &&
          typeof value.text === "string" &&
          value.text.length > 0 && (
            <div className="absolute bottom-0 text-center w-full text-gray-200  p-1  break-words">
              {String(value.text)}
            </div>
          )}
      </a>
    ) : (
      <Link
        href={{ pathname: `/` + page?.slug }}
        style={style_data}
        className="relative block w-full h-full"
        key={String(value.id)}
      >
        {value.image_url !== "" && (
          <Image
            className="rounded overflow-hidden  object-cover"
            src={image}
            fill={true}
            alt="Image"
            style={style}
          />
        )}
        {typeof (value as CarouselData).text === "string" &&
          (value as CarouselData).text.length > 0 && (
            <div className="absolute bottom-0 text-center w-full text-gray-200  p-1  break-words">
              {String(value.text)}
            </div>
          )}
      </Link>
    )
  ) : (
    <></>
  );
}

export default InsideCardDataShow;
