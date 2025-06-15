"use client";
import { useEffect, useState } from "react";

import s from "./style.module.css";

import Nav from "./Nav/Nav";

import reseaux from "./../../../../assets/reseaux.png";
import Header from "./../../../../../models/Header";
import Image from "next/image";
import Link from "next/link";
import LinkNetworksAndOthersHeader from "./../../../../../models/LinkNetworksAndOthersHeader";

interface HeaderInfo {
  bloc: Record<string, unknown> | Header;
  isResponsive: boolean;
  toggle: boolean;
  full: boolean;
  page_id?: number;
}
function HeaderVizualization({
  bloc,
  full,
  isResponsive,
  toggle,
  page_id,
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
      (bloc !== undefined && isResponsive) || result?.matches
        ? " uppercase text-xl light top-[1rem]" + s.title_responsive
        : " uppercase text-3xl light " + s.title
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.matches]);
  useEffect(() => {
    setTrigger_show_link(false);
  }, [isResponsive]);
  useEffect(() => {}, [bg]);
  useEffect(() => {
    if (bloc !== undefined) {
      set_bg({
        background:
          bloc.image_url !== ""
            ? `url(${
                process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
                "/api/uploadfile/" +
                String(bloc?.image_url)
              })`

            : page_id !== undefined &&
              page_id > 1 &&
              bloc.background_color === ""
            ? "#00000030"
            : bloc.background_color !== ""
            ? String(bloc.background_color) + "80"
            : "",


        backdropFilter:
          page_id !== undefined && page_id > 1 && bloc.background_color === ""
            ? "blur(10px)"
            : "blur(10px)",
      });
    }
    console.log("page_id", page_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, bloc, page_id]);
  return bloc !== undefined && classes !== undefined && bg !== undefined ? (
    <nav id={full ? s.nav : s.nav_edition} style={bg}>
      <div className={s.nav_bar}>
        <div
          className={
            isResponsive /* || result.matches */ ? s.logo_responsive : s.logo
          }
        >
          <Link href="/">
            {bloc?.logo_url !== "" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={
                  process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
                  "/api/uploadfile/" +
                  bloc?.logo_url
                }
                alt="logo"
              />
            )}
          </Link>
        </div>
        {bloc.background_color === "" &&
        page_id !== undefined &&
        page_id > 1 &&
        classes !== undefined ? (
          <h1 className={s.title_responsive + classes}>
            {String(bloc?.title)}
          </h1>
        ) : (
          bloc.background_color !== "" &&
          classes !== undefined && (
            <h1 className={s.title_responsive + classes}>
              {String(bloc?.title)}
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
              Array.isArray((bloc as Header)?.link_networks_an_others_header) &&
              (bloc as Header).link_networks_an_others_header.length > 0 && (
                <div className={s.plus} onClick={() => handleShowLinks()}>
                  <Image
                    src={reseaux}
                    alt="réseaux sociaux"
                    width={25}
                    height={25}
                  />
                </div>
              )}

            {Array.isArray((bloc as Header)?.link_networks_an_others_header) &&
              (bloc as Header).link_networks_an_others_header.length > 0 &&
              (bloc as Header).link_networks_an_others_header.map(
                (
                  value: LinkNetworksAndOthersHeader | Record<string, unknown>,
                  key: number
                ) => {
                  return (
                    <a
                      key={key}
                      className={s.facebook}
                      href={String(value.background_url)}
                      title={String(value.title)}
                      target="_blank"
                    >
                      {String(value.image_url) !== "" ? (
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
                            "/api/uploadfile/" +
                            String(value.image_url)
                          }
                          alt={String(value.title)}
                          className={
                            trigger_show_link ? "tr show_link" : "tr small"
                          }
                          width={30}
                          height={30}
                        />
                      ) : (
                        String(value.name)
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
