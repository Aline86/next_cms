import { useEffect } from "react";

import s from "./style.module.css";

import couches from "./img/couches.png";
import cover from "./img/cover.png";
import miniatures from "./img/miniatures.png";
import text from "./img/picture.png";
import curseur from "./img/curseur.png";
import Page from "../../../../models/Page";
import remove from "./../../../assets/fermer.png";
import Image from "next/image";
import PictureGroup from "../../../../models/PictureGroup";
import TextPicture from "../../../../models/TextPicture";
import ScreenHome from "../../../../models/Screen";
import Carousel from "../../../../models/Carousel";
import SnippetTypes from "../../../../lib/snippet_types";
import Footer from "../../../../models/FooterData";
import Header from "../../../../models/Header";

interface BlocData {
  getPage: (refresh: boolean) => Promise<void>;
  blocs: Array<SnippetTypes | Header | Footer>;
  open: boolean;
  setOpen: (value: boolean) => void;
  page: Page;
}

function BlocDisplay({ getPage, blocs, open, setOpen, page }: BlocData) {
  const addBlocToBDD = async (bloc: SnippetTypes) => {
    await bloc.save_bloc();

    await getPage(true);
  };

  useEffect(() => {}, []);
  return (
    <div className={s.to_append}>
      <div
        className={
          open ? s.blocs_container_display : s.blocs_container_display_none
        }
      >
        <div className={s.close} onClick={() => setOpen(!open)}>
          <Image
            src={remove}
            alt={"fermer la fenêtre"}
            width={40}
            height={40}
          />
        </div>
        <div className={s.header_bloc_choose}>
          <div className={s.container_auto}>
            <Image
              src={cover}
              alt="Image de couverture"
              width={40}
              height={40}
            />
            <input
              type="submit"
              value="Image de couverture"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(
                  new ScreenHome(page.id, blocs.length + 1, -1, true)
                );

                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <Image src={couches} alt="groupe d'image" width={40} height={40} />
            <input
              type="submit"
              value="Groupe d'images"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(
                  new PictureGroup(page.id, blocs.length + 1, -1, false)
                );

                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <Image
              src={miniatures}
              alt="grille d'image"
              width={40}
              height={40}
            />
            <input
              type="submit"
              value="Grille d'images"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(
                  new PictureGroup(page.id, blocs.length + 1, -1, true)
                );

                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <Image
              src={curseur}
              alt="carousel miniatures"
              width={40}
              height={40}
            />
            <input
              type="submit"
              value="Défilé d'images Option 3 (miniatures)"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(
                  new Carousel(page.id, blocs.length + 1, -1, "miniatures")
                );

                setOpen(!open);
              }}
            />
          </div>
          <div className={s.container_auto}>
            <Image src={text} alt="texte image" width={40} height={40} />
            <input
              type="submit"
              value="Texte image"
              onClick={(e) => {
                e.preventDefault();
                addBlocToBDD(
                  new TextPicture(-1, blocs.length + 1, page.id, false)
                );

                setOpen(!open);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlocDisplay;
