"use client";
import { useEffect, useState } from "react";

import s from "./style.module.css";

import Nav from "./Nav/Nav";

import reseaux from "./../../../../assets/reseaux.png";
import Header from "../../../../../models/Header";
import Image from "next/image";
import Link from "next/link";
import LinkNetworksAndOthersHeader from "../../../../../models/LinkNetworksAndOthersHeader";

interface HeaderInfo {
  input_bloc: Record<string, unknown> | Header;
  isResponsive: boolean;
  toggle: boolean;
  full: boolean;
  page_number?: number;
}
function HeaderVizualization({
  input_bloc,
  full,
  isResponsive,
  toggle,
  page_number,
}: HeaderInfo) {
  const [open, setOpen] = useState(false);
  const [, setResize] = useState(0);
  const [result, setResult] = useState<MediaQueryList>();

  const [classes, set_classes] = useState<string | undefined>();
  const [bg, set_bg] = useState<React.CSSProperties | undefined>();
  const [trigger_show_link, setTrigger_show_link] = useState(true);

  const handleShowLinks = () => {
    setTrigger_show_link(!trigger_show_link);
  };

  function updateSize() {
    setResize(window?.innerWidth);
  }
  useEffect(() => {
    window?.addEventListener("resize", updateSize);
  }, [result?.matches]);

  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 800px)") as MediaQueryList);
  }, []);
  useEffect(() => {
    set_classes(
      (input_bloc !== undefined && isResponsive) || result?.matches
        ? " uppercase text-xl light top-[1rem]" + s.title_responsive
        : " uppercase text-3xl light " + s.title
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.matches]);
  useEffect(() => {
    setTrigger_show_link(false);
  }, [isResponsive]);

  useEffect(() => {}, [classes, toggle]);
  useEffect(() => {
    if (input_bloc !== undefined) {
      set_bg({
        background:
          input_bloc.image_url !== ""
            ? `url(${
                process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
                "/api/uploadfile/" +
                String(input_bloc?.image_url)
              })`
            : page_number !== undefined &&
              page_number > 1 &&
              input_bloc.background_color === "#00000000"
            ? "#00000030"
            : String(input_bloc.background_color),

        backdropFilter:
          page_number !== undefined &&
          page_number > 1 &&
          input_bloc.background_color === "#00000000"
            ? "blur(10px)"
            : "blur(0px)",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return input_bloc !== undefined &&
    classes !== undefined &&
    bg !== undefined ? (
    <nav id={full ? s.nav : s.nav_edition} style={bg}>
      <div className={s.nav_bar}>
        <div
          className={
            isResponsive /* || result.matches */ ? s.logo_responsive : s.logo
          }
        >
          <Link href="/">
            {input_bloc?.logo_url !== "" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={
                  process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
                  "/api/uploadfile/" +
                  input_bloc?.logo_url
                }
                alt="logo"
              />
            )}
          </Link>
        </div>
        {input_bloc.background_color === "#00000000" &&
        page_number !== undefined &&
        page_number > 1 &&
        classes !== undefined ? (
          <h1 className={s.title_responsive + classes}>
            {String(input_bloc?.title)}
          </h1>
        ) : (
          input_bloc.background_color !== "#00000000" &&
          classes !== undefined && (
            <h1 className={s.title_responsive + classes}>
              {String(input_bloc?.title)}
            </h1>
          )
        )}
        <label
          className={full ? s.burger_container : s.burger_container_edition}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div
            className={`${s.burger_line} ${open && s.burger_line_color}`}
          ></div>
          <div
            className={`${s.burger_line} ${open && s.burger_line_color}`}
          ></div>
          <div
            className={`${s.burger_line} ${open && s.burger_line_color}`}
          ></div>
        </label>
        <Nav opened={open} setOpen={setOpen} full={full} />

        <div className={s.selector}>
          <div
            className={`${s.inside_selector} flex gap-4 items-center justify-end`}
          >
            {isResponsive &&
              Array.isArray(
                (input_bloc as Header)?.link_networks_an_others_header
              ) &&
              (input_bloc as Header).link_networks_an_others_header.length >
                0 && (
                <div className={s.plus} onClick={() => handleShowLinks()}>
                  <Image
                    src={reseaux}
                    alt="réseaux sociaux"
                    width={25}
                    height={25}
                  />
                </div>
              )}

            {Array.isArray(
              (input_bloc as Header)?.link_networks_an_others_header
            ) &&
              (input_bloc as Header).link_networks_an_others_header.length >
                0 &&
              (input_bloc as Header).link_networks_an_others_header.map(
                (value: LinkNetworksAndOthersHeader, key: number) => {
                  return (
                    <a
                      key={key}
                      className={s.facebook}
                      href={value.background_url}
                      title={value.title}
                      target="_blank"
                    >
                      {value.logo_url.length > 0 ? (
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
                            "/api/uploadfile/" +
                            value.logo_url
                          }
                          alt={value.title}
                          className={
                            trigger_show_link ? "tr show_link" : "tr small"
                          }
                          width={30}
                          height={30}
                        />
                      ) : (
                        value.name
                      )}
                    </a>
                  );
                }
              )}
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <></>
  );
}

export default HeaderVizualization;
