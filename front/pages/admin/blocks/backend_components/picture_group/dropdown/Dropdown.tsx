/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import s from "./styles.module.css";
import PictureGroup from "../../../../../../models/PictureGroup";
import PictureGroupData from "../../../../../../models/PictureGroupData";
import Page from "../../../../../../models/Page";
import InputTypes from "../../../../../../lib/InputTypes";

interface DropdownInfo {
  bloc: PictureGroup;
  data: PictureGroupData;
  index: number;
  updateComponent: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: string | number | undefined,
    bloc?: PictureGroup
  ) => Promise<void>;
}

function DropdownData({ bloc, data, index, updateComponent }: DropdownInfo) {
  const [pages, setPages] = useState<Page[]>();
  const [page, setPage] = useState<Page>(new Page());
  const [choice, isExternalLink] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const getPages = async () => {
    const async_result = await page.get_sub_pages();
    if (Array.isArray(async_result) && async_result.length >= 1) {
      setPages(async_result);
    }
  };
  const checkExternal = async (url: string) => {
    const prefixe = url.substring(0, 4);
    if (prefixe === "http" || prefixe === "") {
      isExternalLink("Lien url externe");
    } else if (/.pdf/.test(url.substring(url.length - 4))) {
      setToggle(true);
    } else {
      isExternalLink("Page interne");
      const prefixe = Number(url.substring(0, 2));
      const pageData = await getPage(prefixe);
      setPage(pageData);
    }
  };
  const updateLink = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setToggle(true);
    isExternalLink(e.target.value);
  };
  const getPage = async (id: number) => {
    page.set_id(id);
    const new_page = await page.get_bloc();

    return new_page;
  };
  useEffect(() => {
    if (data !== undefined) {
      checkExternal(data.href_url);
    }

    getPages();
  }, []);
  useEffect(() => {}, [choice]);
  return data !== undefined ? (
    <div className={s.container}>
      <select
        onChange={(e) => updateLink(e)}
        value={choice !== "" ? choice : "Choisir une page de redirection"}
      >
        <option key={0}>Choisir un type de redirection : </option>

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
            value={toggle ? "" : data !== undefined ? data.href_url : ""}
            placeholder="Url de redirection"
            onChange={(e) => {
              updateComponent(e, "href_url", undefined, index, bloc);
              setToggle(false);
            }}
          />
        </div>
      ) : (
        <div className={s.type}>
          <select
            className={s.select_box}
            onChange={(e) => {
              updateComponent(e, "href_url", undefined, index, bloc);
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
      )}
    </div>
  ) : (
    <></>
  );
}

export default DropdownData;
