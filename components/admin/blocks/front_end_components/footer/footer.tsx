// app/components/FooterVizualization.tsx (Server Component)
"use client";
import s from "./styles.module.css";
import Footer from "../../../../../models/FooterData";
import isLightOrDark from "../../../../../lib/snippet";
import LinkNetworksAndOthersFooter from "../../../../../models/LinkNetworksAndOthersFooter";
import Image from "next/image";
import { useEffect } from "react";

interface FooterInfo {
  bloc: Footer | Record<string, unknown>;
  toggle?: boolean;
  full: boolean;
  isResponsive: boolean;
}

export default function FooterVizualization({
  bloc,
  toggle,
  full,
  isResponsive,
}: FooterInfo) {
  const root_map: string = String(bloc?.map_iframe_url) || "";

  const computedStyle = {
    width: isResponsive ? "380px" : full ? "" : "43vw",
    backgroundColor: String(bloc?.background_color ?? ""),
    color: isLightOrDark(String(bloc?.background_color ?? ""))
      ? "white"
      : "black",
  };
  useEffect(() => {}, [toggle]);
  return (
    <div className={s.footer_container}>
      <div
        className={
          isResponsive
            ? "w-sm bottom-0 padding_footer relative overflow-x-hidden overflow-y-auto"
            : s.container + " padding_footer h-[75px]"
        }
        style={computedStyle}
      >
        <div
          className={
            isResponsive
              ? "flex flex-col align-center justify-center"
              : s.facebook_container
          }
        >
          <div
            className={
              isResponsive ? "pt-4 flex justify-center w-full mb-4" : s.end
            }
          >
            {Array.isArray(bloc?.links_network_an_others_footer) &&
              bloc.links_network_an_others_footer.map(
                (value: LinkNetworksAndOthersFooter, key: number) =>
                  value?.image_url?.length > 0 && value?.name?.length === 0 ? (
                    <a
                      key={key}
                      className={
                        isResponsive
                          ? "flex justify-center w-full " + s.facebook
                          : s.facebook
                      }
                      href={value.background_url}
                      title={value.title}
                      target="_blank"
                    >
                      <Image
                        className="rounded"
                        src={
                          process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
                          "/api/uploadfile/" +
                          value.image_url
                        }
                        alt={value.title}
                        width={50}
                        height={50}
                      />
                    </a>
                  ) : (
                    value && (
                      <a
                        key={key}
                        className="mt-2"
                        href={
                          process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
                          "/api/uploadfile/" +
                          value.image_url
                        }
                        title={value.title}
                        target="_blank"
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          color: isLightOrDark(String(bloc.background_color))
                            ? "white"
                            : "black",
                          textDecoration: "underline",
                        }}
                      >
                        {value.name}
                      </a>
                    )
                  )
              )}
          </div>
        </div>

        <div className="flex flex-col align-center justify-center text-sm">
          <h3 className="block text-center font-bold text-lg">
            {String(
              bloc &&
                typeof bloc === "object" &&
                "address" in bloc &&
                bloc.address &&
                typeof bloc.address === "object" &&
                "title" in bloc.address
                ? (bloc.address as { title?: string }).title ?? ""
                : ""
            )}
          </h3>
          <div className="block text-center">
            {String(
              bloc &&
                typeof bloc === "object" &&
                "address" in bloc &&
                bloc.address &&
                typeof bloc.address === "object" &&
                "address" in bloc.address
                ? (bloc.address as { address?: string }).address ?? ""
                : ""
            )}
          </div>
          <div className="block text-center">
            {String(
              bloc &&
                typeof bloc === "object" &&
                "address" in bloc &&
                bloc.address &&
                typeof bloc.address === "object" &&
                "town" in bloc.address
                ? (bloc.address as { town?: string }).town ?? ""
                : ""
            )}
          </div>
        </div>

        {/* Static map section (no toggle logic here) */}
        {root_map !== "" ? (
          <div className={s.map}>
            <div className={s.see_map}>Voir la carte</div>
            <div className={s.full_back_drop}>
              <div className={s.drop}></div>
              <div className={s.map_content} id="map_content">
                <iframe
                  src={root_map + "&output=embed"}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  width="600"
                  height="450"
                ></iframe>
              </div>
            </div>
          </div>
        ) : (
          <div className={s.map}>
            <div className={s.see_map}></div>
          </div>
        )}
      </div>
    </div>
  );
}
