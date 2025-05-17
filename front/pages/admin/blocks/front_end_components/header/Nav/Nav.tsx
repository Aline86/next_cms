/* eslint-disable react-hooks/exhaustive-deps */
import s from "./styles.module.css";

import { useEffect, useState } from "react";
import Page from "../../../../../../models/Page";
import Link from "next/link";

interface NavInfo {
  opened: boolean;
  setOpen: (value: boolean) => void;
  full: boolean;
}
export default function Nav({ opened, setOpen, full }: NavInfo) {
  const [pages, setPages] = useState<Page[]>([]);
  const page_type = new Page(1, 0, null);

  const getPages = async () => {
    const async_result = await page_type.get_pages();

    if (Array.isArray(async_result) && async_result.length >= 1) {
      setPages(async_result);
    }
  };

  useEffect(() => {
    getPages();
  }, []);
  useEffect(() => {}, [pages]);
  return (
    <>
      <nav
        className={
          opened
            ? full
              ? `${s.side_menu} ${s.open_side_bar}`
              : `${s.side_menu_edition} ${s.open_side_bar}`
            : full
            ? `${s.side_menu}`
            : `${s.side_menu_edition}`
        }
      >
        {pages !== undefined &&
          pages.map((page, index) => {
            return (
              <ul className={s.ul_menu} key={index}>
                <div key={page.id}>
                  <Link
                    href={`/${page.slug}`}
                    key={page.id}
                    onClick={() => setOpen(false)}
                  >
                    <li>
                      <div>
                        <h3>{page.title}</h3>
                        <span></span>
                      </div>
                    </li>
                  </Link>
                </div>
              </ul>
            );
          })}
      </nav>
      {opened && (
        <div className={s.overlay} onClick={() => setOpen(false)}></div>
      )}
    </>
  );
}
