"use client";
import Link from "next/link";
import Page from "../../../../../models/Page";
import Image from "next/image";
import { useEffect, useState } from "react";
import CarouselData from "../../../../../models/CarouselData";
import ExternalLink from "../../../../../lib/dropdown/dropdown_types/ExrternalLink";
import FileLink from "../../../../../lib/dropdown/dropdown_types/File";
import Mailto from "../../../../../lib/dropdown/dropdown_types/Maito";
import PageID from "../../../../../lib/dropdown/dropdown_types/PageID";

interface CardDatas {
  value: CarouselData | Record<string, unknown>;
  full: boolean;
}

function InsideCardDataShow({ value, full }: CardDatas) {
  const [page, setPage] = useState<Page>();
  const [result, setResult] = useState<MediaQueryList>();
  const [, setResize] = useState(0);
  const array_all_possible_types = {
    external_link: new ExternalLink(String(value.href_url)),
    file: new FileLink(String(value.href_url)),
    mailto: new Mailto(String(value.href_url)),
    pageID: new PageID(String(value.href_url)),
  };

  let to_render_type: string = "";

  Object.values(array_all_possible_types).forEach((dropdown_class) => {
    if (dropdown_class.check_type()) {
      to_render_type = dropdown_class.get_type();
    }
  });
  const [choice_type] = useState<string>(to_render_type);

  const getPage = async () => {
    if (value !== undefined && value.href_url !== undefined) {
      const concerned_page = array_all_possible_types.pageID;
      const page = await concerned_page.get_page(Number(value.href_url));
      if (page !== undefined) {
        setPage(page);
      }
    }
  };
  function updateSize() {
    setResize(window?.innerWidth);
  }

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
  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 1000px)") as MediaQueryList);
  }, [value]);
  useEffect(() => {
    window?.addEventListener("resize", updateSize);
  }, [result?.matches]);

  useEffect(() => {
    if (choice_type === "pageID") {
      getPage();
    }
  }, [choice_type]);
  useEffect(() => {}, [page]);

  return value !== undefined && choice_type !== undefined ? (
    choice_type === "file" ? (
      <a
        key={String(value.id)}
        href={
          typeof value.href_url === "string"
            ? process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
              "/api/uploadfile/" +
              value.href_url
            : undefined
        }
        target="_blank"
        className="relative valuek w-full h-full"
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
    ) : choice_type === "pageID" ? (
      <Link
        href={{ pathname: `/` + page?.slug }}
        style={style_data}
        className="relative valuek w-full h-full"
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
    ) : (
      <a
        key={String(value.id)}
        href={typeof value.href_url === "string" ? value.href_url : undefined}
        target="_blank"
        className="relative valuek w-full h-full"
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
    )
  ) : (
    <></>
  );
}

export default InsideCardDataShow;
