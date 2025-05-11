/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Page from "../../../../models/Page";
import BlocTools from "../../../../lib/bloc_tools";
import Link from "next/link";
import BlocDisplay from "../../../../pages/admin/blocks/picker/block_picker";
import Blocs from "../../../../pages/admin/blocks/blocks";
import s from "./style.module.css";
import { useParams } from "next/navigation";
import Layout from "../../../../pages/layout";
import Toast from "../../../../lib/Toast";
import Footer from "../../../../models/FooterData";
import Header from "../../../../models/Header";
import { Button } from "@headlessui/react";
import SnippetTypes from "../../../../lib/snippet_types";
import User from "../../../../models/User";

export default function ClientView({ id }: { id: string }) {
  const params = useParams();
  const [toggle, setToggle] = useState(false);
  const [drag, setToDrag] = useState(false);
  const [dragBegin, setDragBegin] = useState(0);
  const [open, setOpen] = useState(false);
  const [page_type, setPage] = useState(new Page(Number(id), 0, null));
  const [focus, setFocus] = useState<boolean>(false);
  const [show_message, set_show_message] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [counter, setCounter] = useState(0);
  const [goTo, setGoTo] = useState(false);
  const [header, setHeader] = useState<Header>(new Header());
  const [footer, setFooter] = useState(new Footer());
  const getPage = async () => {
    const page = await page_type.get_bloc();
    if (page !== undefined) {
      setPage(page);
    }
  };

  const tools = new BlocTools(page_type);

  const [blocs, setBlocs] = useState<(SnippetTypes | Header | Footer)[]>([]);
  const [highlight, setHighlight] = useState<SnippetTypes>();
  async function asynchronRequestsToPopulateBlocs(goToB: boolean = false) {
    setBlocs([]);

    const result_header = await header.get_bloc();
    setHeader(result_header);
    const result_footer = await footer.get_bloc();
    setFooter(result_footer);

    const bloc_pages = await tools.getAllBlocsPage();

    const counter_total = counter + 1;

    setCounter(counter_total);
    if (Array.isArray(bloc_pages)) {
      setBlocs(
        bloc_pages.filter(
          (bloc): boolean =>
            bloc instanceof Header ||
            bloc instanceof Footer ||
            !(bloc instanceof Page) // Ensure compatibility with the parameter's type
        ) as (SnippetTypes | Header | Footer)[]
      );
      if (goToB) {
        if (blocs !== undefined && bloc_pages !== undefined) {
          const lastBloc = bloc_pages[bloc_pages.length - 1];
          if (!(lastBloc instanceof Page)) {
            setHighlight(lastBloc);
          }
        }

        setGoTo(!goTo);
      } else {
        setToggle(!toggle);
      }
    }
  }
  function handleScroll() {
    const timedelay = 0;

    let height: number = 0;
    const minScrollHeight: number = 100;
    const scrollId = setInterval(function () {
      if (window !== undefined && height <= document.body.scrollHeight) {
        window?.scrollBy(0, minScrollHeight);
      } else {
        clearInterval(scrollId);
      }
      height += minScrollHeight;
    }, timedelay);
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
  }, []);

  useEffect(() => {}, [toggle, blocs, highlight, page_type]);
  useEffect(() => {
    asynchronRequestsToPopulateBlocs();

    set_show_message(!show_message);
  }, [refresh]);

  useEffect(() => {
    handleScroll();
  }, [goTo]);
  useEffect(() => {
    getPage();
  }, []);
  useEffect(() => {}, [blocs]);
  return (
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
          {blocs.length > 0 && (
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
              getPage={asynchronRequestsToPopulateBlocs}
            />
            <h1 className="page_title mb-8 mt-8">{page_type.title}</h1>

            <Blocs
              blocs={blocs}
              setBlocs={setBlocs}
              setDragBegin={setDragBegin}
              dragBegin={dragBegin}
              drag={drag}
              toggle={toggle}
              setRefresh={setRefresh}
              refresh={refresh}
              setToggle={setToggle}
              page_id={Number(id)}
              highlight={highlight}
              setHighlight={setHighlight}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
