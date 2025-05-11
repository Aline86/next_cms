/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import s from "./styles.module.css";
import Footer from "../../../../../models/FooterData";

import isLightOrDark from "../../../../../lib/snippet";
import LinkNetworksAndOthersFooter from "../../../../../models/LinkNetworksAndOthersFooter";

interface FooterInfo {
  input_bloc: Footer;
  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}
function FooterVizualization({
  input_bloc,
  toggle,
  full,
  isResponsive,
}: FooterInfo) {
  const [opened, setOpened] = useState(false);
  const isLightOrDark_func = useCallback(isLightOrDark, []);
  const [responsive, setIsResponsive] = useState<
    React.CSSProperties | undefined
  >();
  const root_map: string =
    input_bloc !== undefined ? input_bloc?.map_iframe_url : "";

  const updateResponsiveFooter = () => {
    if (input_bloc !== undefined) {
      setIsResponsive({
        width: isResponsive ? "380px" : full ? "100%" : "43vw",

        backgroundColor: input_bloc.background_color,
        color: isLightOrDark_func(input_bloc.background_color)
          ? "white"
          : "black",
      });
    }
  };

  useEffect(() => {
    updateResponsiveFooter();
  }, [toggle, input_bloc]);
  useEffect(() => {
    if (input_bloc !== undefined) {
      setIsResponsive(
        input_bloc !== undefined
          ? {
              width: isResponsive ? "380px" : full ? "100%" : "43vw",
              backgroundColor: input_bloc.background_color,
              color: isLightOrDark_func(input_bloc.background_color)
                ? "white"
                : "black",
            }
          : undefined
      );
    }
  }, []);
  useEffect(() => {}, [responsive]);
  return input_bloc !== undefined ? (
    <div
      className={
        isResponsive
          ? "w-sm bottom-0  padding_footer relative overflow-x-hidden overflow-y-auto"
          : s.container + " padding_footer  h-[75px] w-[100%]"
      }
      style={{
        width: isResponsive ? "380px" : full ? "100%" : "43vw",

        backgroundColor: input_bloc.background_color,
        color: isLightOrDark_func(input_bloc.background_color)
          ? "white"
          : "black",
      }}
    >
      <div
        className={
          isResponsive
            ? " flex flex-col align-center justify-center"
            : s.facebook_container
        }
      >
        <div
          className={
            isResponsive ? "pt-4 flex justify-center w-full mb-4" : s.end
          }
        >
          {input_bloc?.links_network_an_others_footer !== undefined &&
            input_bloc.links_network_an_others_footer.length > 0 &&
            input_bloc.links_network_an_others_footer.map(
              (value: LinkNetworksAndOthersFooter, key: number) => {
                return value !== undefined &&
                  value.logo_url.length > 0 &&
                  value.name.length === 0 ? (
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
                    <img
                      className={"rounded"}
                      src={"http://localhost/api/uploadfile/" + value.logo_url}
                      alt={value.title}
                      width="auto" // Adjust width as needed
                      height="50px" // Adjust height as needed
                    />
                  </a>
                ) : (
                  value !== undefined && input_bloc !== undefined && (
                    <a
                      key={key}
                      className=" mt-2"
                      href={"http://localhost/api/uploadfile/" + value.logo_url}
                      title={value.title}
                      target="_blank"
                      style={{
                        position: "relative",

                        cursor: "pointer",
                        color: `${isLightOrDark(input_bloc.background_color)}`,
                        textDecoration: "underline",
                      }}
                    >
                      {value.name}
                    </a>
                  )
                );
              }
            )}
        </div>
      </div>
      <div className="flex flex-col align-center  justify-center text-sm">
        <h3 className="block text-center font-bold text-lg">
          {input_bloc.address.title}
        </h3>
        <div className="block text-center">{input_bloc.address.address}</div>
        <div className="block text-center">{input_bloc.address.town}</div>
      </div>
      {root_map !== "" ? (
        <div className={s.map} onClick={() => setOpened(!opened)}>
          <div className={s.see_map}>Voir la carte</div>
          <div className={!opened ? `${s.none}` : `${s.full_back_drop}`}>
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
  ) : (
    <footer></footer>
  );
}

export default FooterVizualization;
