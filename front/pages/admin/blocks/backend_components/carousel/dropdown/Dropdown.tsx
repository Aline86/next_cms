/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import s from "./styles.module.css";
import Page from "../../../../../../models/Page";
import CarouselData from "../../../../../../models/CarouselData";
import Carousel from "../../../../../../models/Carousel";

interface DropdownInfo {
  bloc: Carousel;
  data: CarouselData;
  index: number;
  updateCarousel: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
    bloc: Carousel,
    index: number
  ) => void;
}

function DropdownData({ bloc, data, index, updateCarousel }: DropdownInfo) {
  const [pages, setPages] = useState<Page[]>();
  const [page, setPage] = useState<Page>(new Page());
  const [choice, isExternalLink] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const getPages = async () => {
    const async_result = await page.get_pages();
    if (Array.isArray(async_result) && async_result.length >= 1) {
      setPages(async_result);
    }
  };
  const checkExternal = async (url: string) => {
    const prefixe = url.substring(0, 4);
    if (prefixe === "http") {
      isExternalLink("Lien url externe");
    } else if (prefixe !== "") {
      isExternalLink("Page interne");
      const prefixe = Number(url.substring(0, 2));
      const pageData = await getPage(prefixe);
      setPage(pageData);
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
    const new_page = await page.get_bloc();

    return new_page;
  };
  useEffect(() => {
    checkExternal(data.href_url);
    getPages();
  }, []);
  useEffect(() => {}, [choice]);
  return (
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
            value={toggle ? "" : data.href_url}
            placeholder="Url de redirection"
            onChange={(e) => {
              updateCarousel(e, "href_url", bloc, index);
              setToggle(false);
            }}
          />
        </div>
      ) : choice !== "" ? (
        <div className={s.type}>
          <select
            className={s.select_box}
            onChange={(e) => {
              updateCarousel(e, "href_url", bloc, index);
              setToggle(false);
            }}
            value={toggle ? "" : Number(data.href_url)}
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
  );
}

export default DropdownData;
