/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Page from "../../../models/Page";

import s from "./../styles/pages/style.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

import User from "../../../models/User";
import Layout from "../../layout";

import BlocTools from "../../../lib/bloc_tools";
import { Button } from "@headlessui/react";

export const dynamic = "force-dynamic";
export function ButtonDemo() {
  return <Button className="bg-slate-800 text-slate-50">Button</Button>;
}

export default function ClientView() {
  const [pages, setPages] = useState<Page[]>([]);
  const [page] = useState<Page>();
  const [toggle, setToggle] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [dragBegin, setDragBegin] = useState(0);
  const getPages = async () => {
    const page_type = new Page(-1, 0, null);
    const pages = await page_type.get_pages();
    if (pages !== undefined) {
      setPages(pages);
    }
  };

  const updatePage = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    page: Page,
    key: number
  ) => {
    page.updatePage(e, field);
    pages[key] = page;
    setPages(pages);
    setToggle(!toggle);
  };
  const addPage = () => {
    pages.push(new Page(-1, pages.length + 1, null));

    setToggle(!toggle);
  };

  const savePage = async (page: Page) => {
    if (pages !== undefined && pages.length > 0) {
      if ("save_bloc" in page && typeof page.save_bloc === "function") {
        await page.save_bloc();
      }
      setRefresh(!refresh);
    }
  };
  const removePage = async (page: Page) => {
    const new_bloc_array: Array<Page> = [];
    if (pages !== undefined && pages.length > 0) {
      pages.splice(pages.indexOf(page), 1);

      if ("remove_page" in page && typeof page.remove_page === "function") {
        await page.remove_page();
      }
      pages.map(async (bloc_in_blocs: Page, index) => {
        if ("bloc_number" in bloc_in_blocs) {
          bloc_in_blocs.set_bloc_number(index + 1);
          new_bloc_array[index] = await bloc_in_blocs.save_bloc();
        }
      });
      Promise.all(pages).then((data) => {
        const typedData = data as Array<Page>;
        if (typedData !== undefined && Array.isArray(typedData)) {
          // setBlocs(new_bloc_array);
          setRefresh(!refresh);
        }
      });
    }

    setRefresh(!refresh);
  };
  const updateDragBloc = async (lastKey: number) => {
    const start = dragBegin;
    const end = lastKey;
    moveElements(start, end);
  };
  const moveElements = async (start: number, end: number) => {
    const newItems = [...pages];
    const draggedItemValue = newItems[start];
    newItems.splice(start, 1);
    newItems.splice(end, 0, draggedItemValue);

    const new_bloc_array = newItems.map(async (page: Page, index: number) => {
      page.set_bloc_number(index);

      return await page.save_bloc();
    });
    const bloc_tools = new BlocTools(new Page(-1, 0, null));

    const res = Promise.all(new_bloc_array).then((data) => {
      if (data !== undefined && Array.isArray(data)) {
        const ordered = bloc_tools.sortComponents(data);
        return ordered;
      }
    });
    const resultat = await res;

    if (resultat) {
      const filteredResult = resultat.filter(
        (item): item is Page => item instanceof Page
      );
      setPages(filteredResult);
    } else {
      console.error("Resultat is undefined");
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  async function logOut() {
    const user = new User("", "", "");
    user.logOut();
    await fetch("/api/pages", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    window?.history.pushState({}, "", "/admin/login");
    location.reload();
  }
  const getPage = async () => {
    const page_type = new Page(-1, 0, null);
    const results = await page_type.get_pages();
    if (results !== undefined && Array.isArray(results) && results.length > 0) {
      setPages(results);
    } else {
      page_type.set_id(-1);
      const results = await page_type.save_bloc();
      if (results !== undefined) {
        setRefresh(!refresh);
      }
    }
  };

  useEffect(() => {}, [pages]);

  useEffect(() => {
    getPages();
  }, [refresh, page]);

  useEffect(() => {
    getPage();
  }, []);
  return (
    <Layout>
      <>
        <h1 className="text-5xl text-center mt-8">Liste des pages</h1>
        {pages !== undefined && pages.length > 0 && (
          <div className={s.pages}>
            <div className="flex gap-8 m-8 ml-0">
              <li className={s.li}>
                <Button
                  className="bg-slate-800 text-slate-50 cursor-pointer rounded min-w-[200px] h-[50px]"
                  onClick={() => logOut()}
                >
                  Se déconnecter
                </Button>
              </li>
              <li
                className={s.li}
                onClick={(e) => {
                  e.preventDefault();
                  addPage();
                }}
              >
                <Button className="block leading-1 bg-slate-800 text-slate-50 cursor-pointer rounded min-w-[200px] h-[50px]">
                  <div>Ajouter une page +</div>
                </Button>
              </li>
            </div>

            {pages !== undefined &&
              pages.length >= 0 &&
              pages.map((page, key) => {
                return (
                  key >= 0 && (
                    <div
                      className={s.page}
                      key={key}
                      draggable={key > 1 ? true : false}
                      onDragStart={() => setDragBegin(key)}
                      onDragOver={handleDragOver}
                      onDrop={() => updateDragBloc(key)}
                    >
                      <h2>{key + 1}</h2>
                      <input
                        className={s.href_url}
                        placeholder="Titre de la page"
                        value={page.title}
                        onChange={(e) => {
                          updatePage(e, "title", page, key);
                        }}
                      />
                      <div className={s.end}>
                        {key >= 0 && (
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              savePage(page);
                            }}
                          >
                            SAUVEGARDER
                          </div>
                        )}
                        <div className="flex items-center cursor-pointer">
                          <Link
                            href={{
                              pathname: `/admin/pages/` + page.id,
                            }}
                          >
                            SOUS-PAGE
                          </Link>
                        </div>
                        <div className="flex items-center ">
                          <Link
                            href={{
                              pathname: `/admin/visualization/` + page.slug,
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6 cursor-pointer"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                              />
                            </svg>
                          </Link>
                        </div>

                        {key > 0 && (
                          <div
                            onClick={() => {
                              removePage(page);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6  cursor-pointer"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                );
              })}
          </div>
        )}
      </>
    </Layout>
  );
}
