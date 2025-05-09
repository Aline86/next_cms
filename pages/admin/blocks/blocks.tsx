/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, Suspense, lazy } from "react";

/*import BlocHeader from "./BlocHeader";*/

import PictureGroup from "../../../models/PictureGroup";
import Header from "../../../models/Header";
import BlocHeader from "./BlocHeader";
/*import { Button } from "./lib/button/class/Button";*/
import TextPicture from "../../../models/TextPicture";
import ScreenHome from "../../../models/Screen";
import Carousel from "../../../models/Carousel";
import Footer from "../../../models/FooterData";
import BlocFooter from "./BlocFooter";

import InputTypes from "../../../lib/InputTypes";
import SnippetTypes from "../../../lib/snippet_types";

/*import { Video } from "./lib/video/class/Video";*/

/*import { Parallaxe } from "./lib/parallaxe/class/Parallaxe";*/

/*import Footer from "./lib/footer/Footer";
import BlocFooter from "./BlocFooter";*/

const BlocTextPictureComponent = lazy(() => import("./BlocTextPicture"));
const BlocCarouselComponent = lazy(() => import("./BlocCarousel"));
const BlocPictureGroupComponent = lazy(() => import("./BlocPictureGroup"));
/*const BlocButtonComponent = lazy(() => import("./BlocButton"));
const BlocVideoComponent = lazy(() => import("./BlocVideo"));
const BlocParallaxeComponent = lazy(() => import("./BlocParallaxe"));*/
const BlocGridComponent = lazy(() => import("./BlocGrid"));
const BlocScreenComponent = lazy(() => import("./BlocScreen"));

interface BlocData {
  blocs: Array<SnippetTypes | Header | Footer>;
  setDragBegin: React.Dispatch<React.SetStateAction<number>>;
  dragBegin: number;
  drag: boolean;
  toggle: boolean;
  setBlocs: React.Dispatch<
    React.SetStateAction<Array<SnippetTypes | Header | Footer>>
  >;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  page_id: number;
  refresh: boolean;

  highlight: SnippetTypes | undefined;

  setHighlight: React.Dispatch<React.SetStateAction<SnippetTypes | undefined>>;
}

function Blocs({
  blocs,
  setDragBegin,
  dragBegin,
  drag,
  toggle,
  setBlocs,
  refresh,
  setRefresh,
  setToggle,
  page_id,

  highlight,
  setHighlight,
}: BlocData) {
  // edit with new component type when you add a bloc

  const [footer, setFooter] = useState(new Footer());

  type ComponentTypes = SnippetTypes | Header | Footer;

  const removeBloc = async (bloc: ComponentTypes) => {
    const new_bloc_array: Array<ComponentTypes> = [];
    if (blocs !== undefined && blocs.length > 0) {
      blocs.splice(blocs.indexOf(bloc), 1);

      if ("remove" in bloc && typeof bloc.remove === "function") {
        await bloc.remove();
      }
      blocs.map(
        async (bloc_in_blocs: SnippetTypes | Header | Footer, index) => {
          if ("bloc_number" in bloc_in_blocs) {
            bloc_in_blocs.set_bloc_number(index + 1);
            new_bloc_array[index] = await bloc_in_blocs.save_bloc();
          }
        }
      );
      Promise.all(blocs).then((data) => {
        const typedData = data as Array<ComponentTypes>;
        if (typedData !== undefined && Array.isArray(typedData)) {
          // setBlocs(new_bloc_array);
          setRefresh(!refresh);
        }
      });
    }
  };

  const saveBlocAll = async () => {
    const new_bloc_array: Array<ComponentTypes> = [];
    if (blocs !== undefined && blocs.length > 0) {
      blocs.map(async (bloc, index) => {
        if (!(bloc instanceof Header) && !(bloc instanceof Footer)) {
          bloc.set_bloc_number(index + 1);
          new_bloc_array[index] = await bloc.save_bloc();
        }
      });

      Promise.all(new_bloc_array).then((data) => {
        const typedData = data as Array<ComponentTypes>;
        if (typedData !== undefined && Array.isArray(typedData)) {
          // setBlocs(new_bloc_array);
          setRefresh(!refresh);
        }
      });
    }
    //setBlocs(new_bloc_array);
    // setRefresh(!refresh);
  };
  const updateDragBloc = async (lastKey: number) => {
    const start = dragBegin;
    const end = lastKey;

    await moveElements(start, end);
  };
  const moveElements = async (start: number, end: number) => {
    if (blocs === undefined || blocs.length === 0) return;
    const newItems = [...blocs];
    const draggedItemValue = newItems[start];
    newItems.splice(start, 1);
    newItems.splice(end, 0, draggedItemValue);
    const new_bloc_array: Array<ComponentTypes> = [];
    newItems.map(async (bloc: ComponentTypes, index) => {
      if (
        "set_bloc_number" in bloc &&
        typeof bloc.set_bloc_number === "function"
      ) {
        bloc.set_bloc_number(index + 1);
      }
      new_bloc_array.push(bloc);
    });
    // saving the new info in database
    new_bloc_array.map(async (bloc_to_save: ComponentTypes) => {
      await bloc_to_save.save_bloc();
    });
    setBlocs(new_bloc_array);
  };

  const saveBloc = async (bloc: ComponentTypes) => {
    if (blocs === undefined || blocs.length === 0) return;
    setBlocs([...blocs]); // Pass the current blocs array or an appropriate value
    bloc.save_bloc();
    setRefresh(!refresh);
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    /* (event.target as HTMLElement).style.backgroundColor = "white";
    event.currentTarget.style.fontSize = "50px";
    (event.target as HTMLElement).style.border = "3px solid lightgray";*/
  };

  const [header, setHeader] = useState<Header>(new Header());

  const savePrerequisites = async () => {
    await saveHeaderAndFooter(header);
    await saveHeaderAndFooter(footer);
  };
  const saveHeaderAndFooter = async (bloc: Header | Footer) => {
    if (bloc === undefined) return;
    await bloc.save_bloc();
    if (bloc.id === -1) {
      setRefresh(!refresh);
    } else {
      setToggle(!toggle);
    }
  };
  const updateComponent = async (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: undefined | string | number,
    component?: ComponentTypes
  ): Promise<void> => {
    if (component === undefined) return;
    if (component instanceof Footer) {
      const result = await component?.update(event, field, input, index);

      if (result instanceof Footer) {
        blocs[blocs.length - 1] = result;
        setFooter(result);

        if (field === "remove") {
          setRefresh(!refresh);
        } else {
          setToggle(!toggle);
        }
      }
    } else if (component instanceof Header) {
      const result = await component?.update(event, field, input, index);
      if (result instanceof Header) {
        blocs[0] = result;

        setBlocs(blocs);
        setHeader(result);
        if (field === "remove" && index !== undefined) {
          setRefresh(!refresh);
        } else {
          setToggle(!toggle);
        }
      }
    } else if (component instanceof TextPicture) {
      const result = await component?.update(
        event,
        field !== undefined ? field : "",
        input
      );

      if (result instanceof TextPicture) {
        setHighlight(result);

        blocs[result.bloc_number - 1] = result;

        setBlocs(blocs);
        if (field === "remove") {
          setRefresh(!refresh);
        } else {
          setToggle(!toggle);
        }
      }
    } else {
      const result = await component?.update(
        event,
        field !== undefined ? field : "",
        undefined,
        index
      );

      if (
        (result instanceof PictureGroup ||
          result instanceof ScreenHome ||
          result instanceof Carousel) &&
        "bloc_number" in result
      ) {
        setHighlight(result);

        blocs[result.bloc_number - 1] = result;

        setBlocs(blocs);
        if (field === "remove") {
          setRefresh(!refresh);
        } else {
          setToggle(!toggle);
        }
      }
    }
  };

  const getHeader = async () => {
    if (header === undefined) return;
    const new_bloc = await header.get_bloc();

    if (new_bloc.id === 1) {
      setHeader(header);
    }
  };
  const getFooter = async () => {
    if (footer === undefined) return;
    const new_bloc = await footer.get_bloc();

    if (new_bloc.id === 1) {
      setFooter(new_bloc);
    }
  };
  const getFooterAndHeader = async () => {
    await getHeader();
    await getFooter();
    setToggle(!toggle);
  };

  const adaptRoot = () => {
    const root = document.getElementById("root");
    if (root !== null) {
      root.style.paddingTop = "0px";
      root.style.paddingBottom = "0px";
    }
  };
  useEffect(() => {
    getFooterAndHeader();
    adaptRoot();
  }, []);

  useEffect(() => {
    getFooterAndHeader();
  }, [refresh, blocs]);
  useEffect(() => {}, [toggle, blocs, highlight]);
  return (
    <div className="w-full">
      {header !== undefined && (
        <BlocHeader
          bloc={header}
          updateComponent={async (
            event: InputTypes,
            field: string | undefined,
            input: string | undefined,
            index?: string | number | undefined,
            bloc?: ComponentTypes
          ): Promise<void> => {
            await updateComponent(event, field, input, index, bloc);
          }}
          toggle={toggle}
          saveBloc={savePrerequisites}
        />
      )}

      {blocs !== undefined &&
        blocs.length > 0 &&
        blocs.map((bloc, index) =>
          bloc instanceof TextPicture ? (
            <Suspense key={index} fallback={<div>Chargement...</div>}>
              <BlocTextPictureComponent
                key={index}
                bloc={bloc}
                setDragBegin={setDragBegin}
                updateDragBloc={async (event: number): Promise<void> => {
                  await updateDragBloc(event);
                }}
                handleDragOver={(event) => {
                  handleDragOver(event as React.DragEvent<HTMLDivElement>);
                }}
                removeBloc={async (bloc) => {
                  await removeBloc(bloc as TextPicture);
                }}
                updateComponent={async (
                  event: InputTypes,
                  field: string | undefined,
                  input: string | undefined,
                  index?: string | number | undefined,
                  bloc?: ComponentTypes
                ): Promise<void> => {
                  await updateComponent(event, field, input, index, bloc);
                }}
                saveBloc={async (bloc: TextPicture): Promise<void> => {
                  await saveBloc(bloc as TextPicture);
                }}
                saveBlocAll={saveBlocAll}
                drag={drag}
                toggle={toggle}
                page_id={page_id}
                index={index}
                isOpen={
                  highlight !== undefined &&
                  highlight.bloc_number === bloc.bloc_number
                }
              />
            </Suspense>
          ) : bloc instanceof PictureGroup ? (
            !bloc.is_grid ? (
              <Suspense key={index} fallback={<div>Chargement...</div>}>
                <BlocPictureGroupComponent
                  key={index}
                  bloc={bloc}
                  page_id={page_id}
                  setDragBegin={setDragBegin}
                  updateDragBloc={async (event: number): Promise<void> => {
                    await updateDragBloc(event);
                  }}
                  handleDragOver={(event) => {
                    handleDragOver(event as React.DragEvent<HTMLDivElement>);
                  }}
                  removeBloc={async (
                    bloc: ComponentTypes | undefined
                  ): Promise<void> => {
                    if (bloc) {
                      await removeBloc(bloc);
                    }
                  }}
                  updateComponent={async (
                    event: InputTypes,
                    field: string | undefined,
                    input?: string | undefined,
                    index?: string | number | undefined,
                    bloc?: PictureGroup
                  ): Promise<void> => {
                    await updateComponent(event, field, input, index, bloc);
                  }}
                  saveBlocAll={saveBlocAll}
                  drag={drag}
                  toggle={toggle}
                  index={index}
                  refresh={refresh}
                  isOpen={
                    highlight !== undefined &&
                    highlight.bloc_number === bloc.bloc_number
                  }
                  saveBloc={async (
                    bloc: ComponentTypes | undefined
                  ): Promise<void> => {
                    if (bloc) {
                      await saveBloc(bloc);
                    }
                  }}
                />
              </Suspense>
            ) : (
              <Suspense key={index} fallback={<div>Chargement...</div>}>
                <BlocGridComponent
                  key={index}
                  bloc={bloc}
                  setDragBegin={setDragBegin}
                  updateDragBloc={async (event: number): Promise<void> => {
                    await updateDragBloc(event);
                  }}
                  handleDragOver={(event) => {
                    handleDragOver(event as React.DragEvent<HTMLDivElement>);
                  }}
                  removeBloc={async (
                    bloc: ComponentTypes | undefined
                  ): Promise<void> => {
                    if (bloc) {
                      await removeBloc(bloc);
                    }
                  }}
                  updateComponent={async (
                    event: InputTypes,
                    field: string | undefined,
                    input: string | undefined,
                    index?: string | number | undefined,
                    bloc?: ComponentTypes
                  ): Promise<void> => {
                    await updateComponent(event, field, input, index, bloc);
                  }}
                  saveBloc={async (bloc: PictureGroup): Promise<void> => {
                    await saveBloc(bloc as PictureGroup);
                  }}
                  saveBlocAll={saveBlocAll}
                  drag={drag}
                  toggle={toggle}
                  setToggle={setToggle}
                  index={index}
                  refresh={refresh}
                  isOpen={
                    highlight !== undefined &&
                    highlight.bloc_number === bloc.bloc_number
                  }
                />
              </Suspense>
            )
          ) : bloc instanceof ScreenHome ? (
            <Suspense key={index} fallback={<div>Chargement...</div>}>
              <BlocScreenComponent
                key={index}
                bloc={bloc}
                setDragBegin={setDragBegin}
                updateDragBloc={async (event: number): Promise<void> => {
                  await updateDragBloc(event);
                }}
                handleDragOver={(event) => {
                  handleDragOver(event as React.DragEvent<HTMLDivElement>);
                }}
                removeBloc={async (
                  bloc: ComponentTypes | undefined
                ): Promise<void> => {
                  if (bloc) {
                    await removeBloc(bloc);
                  }
                }}
                updateComponent={async (
                  event: InputTypes,
                  field: string | undefined,
                  input: string | undefined,
                  index?: string | number | undefined,
                  bloc?: ComponentTypes
                ): Promise<void> => {
                  await updateComponent(event, field, input, index, bloc);
                }}
                saveBloc={async (bloc: ScreenHome): Promise<void> => {
                  await saveBloc(bloc as ScreenHome);
                }}
                saveBlocAll={saveBlocAll}
                drag={drag}
                toggle={toggle}
                setToggle={setToggle}
                refresh={refresh}
                index={index}
                isOpen={
                  highlight !== undefined &&
                  highlight.bloc_number === bloc.bloc_number
                }
              />
            </Suspense>
          ) : (
            bloc instanceof Carousel && (
              <Suspense key={index} fallback={<div>Chargement...</div>}>
                <BlocCarouselComponent
                  key={index}
                  bloc={bloc}
                  setDragBegin={setDragBegin}
                  updateDragBloc={async (event: number): Promise<void> => {
                    await updateDragBloc(event);
                  }}
                  handleDragOver={(event: React.DragEvent<HTMLDivElement>) => {
                    handleDragOver(event as React.DragEvent<HTMLDivElement>);
                  }}
                  removeBloc={async (
                    bloc: ComponentTypes | undefined
                  ): Promise<void> => {
                    if (bloc) {
                      await removeBloc(bloc);
                    }
                  }}
                  updateComponent={async (
                    event: InputTypes,
                    field: string | undefined,
                    input: string | undefined,
                    index?: string | number | undefined,
                    bloc?: ComponentTypes
                  ): Promise<void> => {
                    await updateComponent(event, field, input, index, bloc);
                  }}
                  saveBloc={async (bloc: Carousel): Promise<void> => {
                    await saveBloc(bloc as Carousel);
                  }}
                  saveBlocAll={saveBlocAll}
                  drag={drag}
                  toggle={toggle}
                  page_id={page_id}
                  index={index}
                  isOpen={
                    highlight !== undefined &&
                    highlight.bloc_number === bloc.bloc_number
                  }
                />
              </Suspense>
            )
          )
        )}
      {footer !== undefined && (
        <BlocFooter
          bloc={footer}
          updateComponent={async (
            event: InputTypes,
            field: string | undefined,
            input: string | undefined,
            index?: string | number | undefined,
            bloc?: ComponentTypes
          ): Promise<void> => {
            await updateComponent(event, field, input, index, bloc);
          }}
          toggle={toggle}
          saveBloc={savePrerequisites}
        />
      )}
    </div>
  );
}

export default Blocs;
