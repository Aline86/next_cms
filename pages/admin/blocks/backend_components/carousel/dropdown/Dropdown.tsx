/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import s from "./styles.module.css";
import Page from "../../../../../../models/Page";
import CarouselData from "../../../../../../models/CarouselData";
import Carousel from "../../../../../../models/Carousel";
import useBlocStore from "../../../../../../store/blocsStore";

interface DropdownInfo {
  bloc: Carousel;
  data: CarouselData | Record<string, unknown>;
  index: number;
  page_id: number;
}

function DropdownData({ bloc, data, index, page_id }: DropdownInfo) {
  const [pages, setPages] = useState<Page[]>();
  const [page, setPage] = useState<Page>(new Page(page_id, 0, null));
  const [choice, isExternalLink] = useState<string | number>();
  const [toggle, setToggle] = useState<boolean>(false);

  const updateComponent = useBlocStore((state) => state.updateBloc);
  const getPages = async () => {
    if (page !== undefined) {
      const async_result = await page.get_sub_pages();

      if (Array.isArray(async_result) && async_result.length >= 1) {
        setPages(async_result);
      }
    }
  };
  const checkExternal = async (url: string) => {
    const prefixe = String(url).substring(0, 4);
    if (prefixe === "http" || prefixe === "") {
      isExternalLink("Lien url externe");
    } else if (String(url).startsWith("mailto")) {
      isExternalLink("Mailto");
      setToggle(true);
    } else if (
      prefixe !== "" &&
      !/.pdf/.test(String(url).substring(String(url).length - 4)) &&
      !String(url).startsWith("mailto")
    ) {
      isExternalLink("Page interne");
      const prefixe = Number(String(url).substring(0, 2));
      const pageData = await getPage(prefixe);
      if (pageData !== undefined) {
        setPage(pageData);
      }
    } else {
      isExternalLink("");
    }
  };
  const updateLink = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToggle(true);
    isExternalLink(e.target.value);
  };
  const getPage = async (id: number) => {
    page.set_id(id);
    const new_page = await page.get_one_bloc();

    if (new_page !== undefined && "page" in new_page) {
      const page_data = Object.values(
        new_page.page as Record<string, unknown>
      )[0];
      return page.hydrate(page_data as Record<string, unknown>);
    }
  };

  useEffect(() => {
    if (
      (data !== undefined && typeof data?.href_url === "string") ||
      typeof data?.href_url === "number"
    ) {
      checkExternal(String(data?.href_url));
    } else {
      checkExternal("");
    }
  }, []);
  useEffect(() => {
    getPages();
  }, [choice, page]);
  return data !== undefined ? (
    <div className={s.container}>
      <select
        className={s.select_box}
        onChange={(e) => updateLink(e)}
        value={choice !== "" ? choice : "Choisir une page de redirection"}
      >
        <option
          key={0}
          onClick={() => {
            isExternalLink("");
          }}
        >
          Choisir un type de redirection :
        </option>

        <option key={1} value="Lien url externe">
          Cible (url)
        </option>
        <option key={2} value="Page interne">
          Page du site
        </option>
      </select>
      {choice === "Lien url externe" ? (
        <div className={s.type}>
          <input
            className={s.href_url}
            value={
              toggle
                ? ""
                : typeof data.href_url === "string" ||
                  typeof data.href_url === "number"
                ? data.href_url
                : ""
            }
            placeholder="Url de redirection"
            onChange={(e) => {
              updateComponent(e, "href_url", undefined, index, bloc);
              setToggle(false);
            }}
          />
        </div>
      ) : choice !== "" ? (
        <div className={s.type}>
          <select
            className={s.select_box}
            onChange={(e) => {
              updateComponent(e, "href_url", undefined, index, bloc);
              setToggle(false);
            }}
            value={
              toggle
                ? ""
                : typeof data.href_url === "number"
                ? data.href_url
                : String(data.href_url ?? "")
            }
          >
            <option key={0}>Choisir une page de redirection</option>

            {pages !== undefined &&
              pages.map((value, index) => {
                return (
                  <option key={index} value={value.id}>
                    {value.title}
                  </option>
                );
              })}
          </select>
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    <></>
  );
}

export default DropdownData;
