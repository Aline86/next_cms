/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Page from "../../../../models/Page";
import BlocTools from "../../../../lib/bloc_tools";
import Link from "next/link";
import BlocDisplay from "../../../../components/admin/blocks/picker/block_picker";
import Blocs from "../../../../components/admin/blocks/blocks";
import s from "./style.module.css";
import { useParams } from "next/navigation";
import Layout from "../../../../components/layout";
import Toast from "../../../../lib/Toast";

import { Button } from "@headlessui/react";

import User from "../../../../models/User";
import useBlocStore from "../../../../store/blocsStore";

export default function ClientView({ id }: { id: string }) {
  const params = useParams();
  const [toggle, setToggle] = useState(false);
  const [drag, setToDrag] = useState(false);
  const [dragBegin, setDragBegin] = useState(0);
  const hightlight_bloc = useBlocStore((state) => state.getHightlight);
  const [open, setOpen] = useState(false);
  const [page_type, setPage] = useState(new Page(Number(id), 0, null));
  const [focus, setFocus] = useState<boolean>(false);
  const [show_message, set_show_message] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [counter, setCounter] = useState(0);
  const [canshow, setCanShow] = useState(false);
  const blocs = useBlocStore((state) => state.blocs);
  const setBlocs = useBlocStore((state) => state.setBlocs);

  const getPage = async () => {
    const tools = new BlocTools(page_type);
    const page = await tools.getPage();
    if (page !== undefined) {
      setPage(page);
    }
  };

  const [highlight] = useState<number | null | undefined>(hightlight_bloc());
  async function asynchronRequestsToPopulateBlocs() {
    if (page_type !== undefined) {
      await getPage();

      const tools = new BlocTools(page_type);
      if (tools !== undefined) {
        const bloc_pages = await tools.getAllBlocsPage();
        if (tools.isInitSite) {
          setRefresh(!refresh);
        } else {
          if (bloc_pages !== undefined) {
            const counter_total = counter + 1;
            setCounter(counter_total);
            setBlocs(bloc_pages);
            setCanShow(true);
          }
        }
      }
    }
  }

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

  useEffect(() => {
    asynchronRequestsToPopulateBlocs();
  }, [id]);

  useEffect(() => {
    set_show_message(!show_message);
    asynchronRequestsToPopulateBlocs();
  }, [refresh]);

  useEffect(() => {
    setToggle(!toggle);
  }, [blocs]);
  useEffect(() => {}, [toggle]);
  return blocs !== undefined && canshow ? (
    <Layout>
      <div className="w-full">
        <Toast
          message={"Les modifications ont été réalisées"}
          toggle_message={show_message}
          set_show_message={set_show_message}
          counter={counter}
        />
        <div className="flex flex-wrap justify-center content-start gap-8 mt-8 mb-2">
          <Link
            href={{ pathname: `/admin/resultat/` + params?.slug }}
            className="none"
          >
            <Button className="bg-slate-800 text-slate-50 cursor-pointer w-[200px] text-2xl h-[50px] rounded">
              Visualiser la page
            </Button>
          </Link>
          <Link href={{ pathname: `/admin/pages` }} className="none">
            <Button className="bg-slate-800 text-slate-50 cursor-pointer w-[200px] text-xl h-[50px] rounded">
              Liste des pages
            </Button>
          </Link>

          <Button
            onClick={() => setOpen(!open)}
            className="bg-slate-800 text-slate-50 cursor-pointer w-[200px] text-xl h-[50px] rounded"
          >
            Ajouter un bloc
          </Button>

          <Button
            onClick={() => logOut()}
            className="bg-slate-800 text-slate-50 cursor-pointer w-[200px] text-xl h-[50px] rounded"
          >
            Se déconnecter
          </Button>
          {blocs.length > 2 && (
            <Button className="bg-slate-800 text-slate-50 cursor-pointer w-[240px] text-xl h-[50px] rounded">
              <div
                className={s.navigate_2}
                style={{ backgroundColor: focus ? "#0d45a5" : "" }}
                onClick={(e) => {
                  e.preventDefault();
                  setToDrag(!drag);
                  setOpen(false);
                  setFocus(!focus);
                }}
              >
                Changer l&apos;ordre des blocs
              </div>
            </Button>
          )}
        </div>

        {page_type !== undefined && (
          <div>
            <BlocDisplay
              blocs={blocs}
              open={open}
              setOpen={setOpen}
              page={page_type}
            />
            <h1 className="page_title mb-8 mt-8">{page_type.title}</h1>
            <textarea
              id="message"
              defaultValue={page_type.description}
              placeholder="Courte description de la page"
              maxLength={250}
              onChange={(e) => {
                page_type.set_description(e.target.value);
              }}
              className="mt-8 block  p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
            <Button
              className="block leading-1 mb-8 bg-slate-800 text-slate-50 cursor-pointer rounded min-w-[150px] h-[50px] mt-8 float-right"
              onClick={() => {
                page_type.save_bloc();
              }}
            >
              Enregistrer
            </Button>

            <Blocs
              setDragBegin={setDragBegin}
              dragBegin={dragBegin}
              drag={drag}
              toggle={toggle}
              setRefresh={setRefresh}
              refresh={refresh}
              setToggle={setToggle}
              page_id={Number(id)}
              highlight={highlight}
            />
          </div>
        )}
      </div>
    </Layout>
  ) : (
    <></>
  );
}
