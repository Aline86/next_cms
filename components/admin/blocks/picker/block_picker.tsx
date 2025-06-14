import { useEffect } from "react";

import s from "./style.module.css";
import Page from "../../../../models/Page";
import remove from "./../../../assets/fermer.png";
import Image from "next/image";
import ComponentTypes from "../../../../lib/types";
import useBlocStore from "../../../../store/blocsStore";
import blocksToRender from "../../../../lib/config/blocsToRender";

interface BlocData {
  blocs: Array<ComponentTypes>;
  open: boolean;
  setOpen: (value: boolean) => void;
  page: Page;
}

function BlocDisplay({ blocs, open, setOpen, page }: BlocData) {
  const addBloc = useBlocStore((state) => state.addBloc);

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
          {blocksToRender !== undefined &&
            Object.values(blocksToRender).map((item, index) => {
              const ModelData =
                item.model !== undefined ? item.model : undefined;
              return (
                item.icon_picture !== undefined &&
                ModelData !== undefined && (
                  <div key={index}>
                    {"variants" in item ? (
                      Object.values(item.variants).map((variant, index) => {
                        return (
                          <div key={index} className={s.container_auto}>
                            <Image
                              src={variant.icon_picture}
                              alt={variant.name}
                              width={40}
                              height={40}
                            />
                            <input
                              type="submit"
                              value={variant.name}
                              onClick={(e) => {
                                e.preventDefault();
                                addBloc(
                                  new ModelData(
                                    page.id,
                                    blocs.length - 1,
                                    -1,
                                    variant.specialty
                                  )
                                );

                                setOpen(!open);
                              }}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div key={index} className={s.container_auto}>
                        <Image
                          src={item.icon_picture}
                          alt={item.name}
                          width={40}
                          height={40}
                        />
                        <input
                          type="submit"
                          value={item.name}
                          onClick={(e) => {
                            e.preventDefault();
                            addBloc(
                              new ModelData(page.id, blocs.length - 1, -1)
                            );

                            setOpen(!open);
                          }}
                        />
                      </div>
                    )}
                  </div>
                )
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default BlocDisplay;
