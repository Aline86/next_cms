/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import s from "./styles.module.css";
import Page from "../../../../../../models/Page";

import Button from "../../../../../../models/Button";
import DropZone from "../../../../../../models/DropZone";
import { MoonLoader } from "react-spinners";
import { Input } from "@headlessui/react";
import useBlocStore from "../../../../../../store/blocsStore";

interface DropdownInfo {
  bloc: Button;

  page_id?: number;
}

function DropdownData({
  bloc,

  page_id,
}: DropdownInfo) {
  const [pages, setPages] = useState<Page[]>();
  const [page, setPage] = useState<Page>(new Page(page_id, 0, null));
  const [choice, isExternalLink] = useState<string | number>();
  const [toggle, setToggle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    } else if (/.pdf/.test(String(url).substring(String(url).length - 4))) {
      isExternalLink("Fichier");
      setToggle(true);
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
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const upload_service = new DropZone();
    const res = await upload_service.update(file);
    if (res !== undefined) {
      setIsLoading(false);
      updateComponent(res, "href_url", undefined, undefined, bloc);
    }
  };
  useEffect(() => {
    if (
      (bloc !== undefined && typeof bloc?.href_url === "string") ||
      typeof bloc?.href_url === "number"
    ) {
      checkExternal(bloc.href_url);
    } else {
      checkExternal("");
    }
  }, []);
  useEffect(() => {
    getPages();
  }, [choice, page]);

  return (
    <div className="flex flex-col items-center justify-center gap-[15px] w-[calc(100%-20px)] mx-auto border border-gray-300 box-border p-5 mt-8">
      <select
        className="h-[35px] bg-white border border-gray-300 m-[5px]"
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
        <option key={3} value="Fichier">
          Fichier
        </option>
        <option key={4} value="Mailto">
          Redirection vers un mail
        </option>
      </select>
      {choice === "Lien url externe" ? (
        <div className={s.type}>
          <input
            className={s.href_url}
            value={
              toggle
                ? ""
                : typeof bloc.href_url === "string" ||
                  typeof bloc.href_url === "number"
                ? bloc.href_url
                : ""
            }
            placeholder="Url de redirection"
            onChange={(e) => {
              updateComponent(e, "href_url", undefined, undefined, bloc);
              setToggle(false);
            }}
          />
        </div>
      ) : choice === "Fichier" ? (
        <div className={s.type}>
          <div
            style={{
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              width: "100%",
            }}
          >
            <label>
              <span>Charger un fichier</span>
              <br />
              <span>Actuellement sélectionné : {bloc.href_url}</span>
              {isLoading ? (
                <MoonLoader />
              ) : (
                <label className="block w-fit cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Charger un fichier
                  <Input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      upload(e);

                      setToggle(true);
                    }}
                  />
                </label>
              )}
            </label>
          </div>
        </div>
      ) : choice === "Page interne" ? (
        <div className={s.type}>
          <select
            className="h-[35px] bg-white border border-gray-300 m-[5px]"
            onChange={(e) => {
              updateComponent(e, "href_url", undefined, undefined, bloc);
              setToggle(false);
            }}
            value={
              toggle
                ? ""
                : typeof bloc.href_url === "number"
                ? bloc.href_url
                : String(bloc.href_url ?? "")
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
        choice === "Mailto" && (
          <div className="w-full">
            <Input
              className="bg-slate-100 w-full"
              value={typeof bloc.href_url === "string" ? bloc.href_url : ""}
              placeholder="Ajouter une adresse mail"
              onChange={(e) => {
                updateComponent(
                  e.target.value.startsWith("mailto:")
                    ? e.target.value
                    : "mailto:" + e.target.value,
                  "href_url",
                  undefined,
                  undefined,
                  bloc
                );
              }}
            />
          </div>
        )
      )}
    </div>
  );
}

export default DropdownData;
