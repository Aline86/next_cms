import { useEffect, Suspense, lazy } from "react";
import PictureGroup from "../../../models/PictureGroup";
import Header from "../../../models/Header";
import BlocHeader from "./BlocHeader";
import TextPicture from "../../../models/TextPicture";
import ScreenHome from "../../../models/Screen";
import Carousel from "../../../models/Carousel";
import BlocFooter from "./BlocFooter";
import Button from "../../../models/Button";
import Video from "../../../models/Video";
import ComponentTypes from "../../../lib/types";
import Footer from "../../../models/FooterData";
import useBlocStore from "../../../store/blocsStore";

const BlocTextPictureComponent = lazy(() => import("./BlocTextPicture"));
const BlocCarouselComponent = lazy(() => import("./BlocCarousel"));
const BlocPictureGroupComponent = lazy(() => import("./BlocPictureGroup"));
const BlocButtonComponent = lazy(() => import("./BlocButton"));
const BlocVideoComponent = lazy(() => import("./BlocVideo"));
const BlocGridComponent = lazy(() => import("./BlocGrid"));
const BlocScreenComponent = lazy(() => import("./BlocScreen"));

interface BlocData {
  setDragBegin: React.Dispatch<React.SetStateAction<number>>;
  dragBegin: number;
  drag: boolean;
  toggle: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  page_id: number;
  refresh: boolean;

  highlight: number | null | undefined;
}

function Blocs({
  setDragBegin,
  dragBegin,
  drag,
  toggle,
  refresh,
  setRefresh,
  setToggle,
  page_id,
  highlight,
}: BlocData) {
  // edit with new component type when you add a bloc
  const blocs = useBlocStore((state) => state.blocs);

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
        bloc.set_bloc_number(index);
        new_bloc_array[index] = await bloc.save_bloc();
      }
    });

    // saving the new info in database
    Promise.all(new_bloc_array).then((data) => {
      const typedData = data as Array<ComponentTypes>;
      if (typedData !== undefined && Array.isArray(typedData)) {
        setRefresh(!refresh);
      }
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const adaptRoot = () => {
    const root = document.getElementById("root");
    if (root !== null) {
      root.style.paddingTop = "0px";
      root.style.paddingBottom = "0px";
    }
  };
  useEffect(() => {
    adaptRoot();
  }, []);

  useEffect(() => {
    setToggle(!toggle);
  }, [blocs]);

  useEffect(() => {}, [toggle]);
  return (
    <div className="w-full">
      {blocs !== undefined &&
        blocs.length > 0 &&
        blocs.map((bloc, index) =>
          bloc instanceof Header ? (
            <Suspense key={index} fallback={<div>Chargement...</div>}>
              <BlocHeader
                bloc={bloc}
                toggle={toggle}
                setRefresh={setRefresh}
                setToggle={setToggle}
              />
            </Suspense>
          ) : bloc instanceof TextPicture ? (
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
                drag={drag}
                toggle={toggle}
                page_id={page_id}
                index={index}
                openModal={
                  highlight !== null &&
                  highlight !== undefined &&
                  highlight === index
                }
                refresh={refresh}
                setRefresh={setRefresh}
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
                  drag={drag}
                  toggle={toggle}
                  index={index}
                  refresh={refresh}
                  openModal={
                    highlight !== null &&
                    highlight !== undefined &&
                    highlight === index
                  }
                  setRefresh={setRefresh}
                  setToggle={setToggle}
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
                  drag={drag}
                  toggle={toggle}
                  setToggle={setToggle}
                  index={index}
                  openModal={
                    highlight !== null &&
                    highlight !== undefined &&
                    highlight === index
                  }
                  refresh={refresh}
                  setRefresh={setRefresh}
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
                drag={drag}
                toggle={toggle}
                setToggle={setToggle}
                openModal={
                  highlight !== null &&
                  highlight !== undefined &&
                  highlight === index
                }
                refresh={refresh}
                setRefresh={setRefresh}
                index={index}
              />
            </Suspense>
          ) : bloc instanceof Carousel ? (
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
                drag={drag}
                toggle={toggle}
                page_id={page_id}
                openModal={
                  highlight !== null &&
                  highlight !== undefined &&
                  highlight === index
                }
                refresh={refresh}
                setRefresh={setRefresh}
                index={index}
              />
            </Suspense>
          ) : bloc instanceof Button ? (
            <Suspense key={index} fallback={<div>Chargement...</div>}>
              <BlocButtonComponent
                key={index}
                bloc={bloc}
                setDragBegin={setDragBegin}
                updateDragBloc={async (event: number): Promise<void> => {
                  await updateDragBloc(event);
                }}
                handleDragOver={(event: React.DragEvent<HTMLDivElement>) => {
                  handleDragOver(event as React.DragEvent<HTMLDivElement>);
                }}
                drag={drag}
                index={index}
                page_id={page_id}
                openModal={
                  highlight !== null &&
                  highlight !== undefined &&
                  highlight === index
                }
                refresh={refresh}
                setRefresh={setRefresh}
                toggle={toggle}
              />
            </Suspense>
          ) : (
            bloc instanceof Video && (
              <Suspense key={index} fallback={<div>Chargement...</div>}>
                <BlocVideoComponent
                  key={index}
                  bloc={bloc}
                  setDragBegin={setDragBegin}
                  updateDragBloc={async (event: number): Promise<void> => {
                    await updateDragBloc(event);
                  }}
                  handleDragOver={(event: React.DragEvent<HTMLDivElement>) => {
                    handleDragOver(event as React.DragEvent<HTMLDivElement>);
                  }}
                  drag={drag}
                  index={index}
                  openModal={
                    highlight !== null &&
                    highlight !== undefined &&
                    highlight === index
                  }
                  refresh={refresh}
                  setRefresh={setRefresh}
                  toggle={toggle}
                />
              </Suspense>
            )
          )
        )}
      {blocs.find((b) => b instanceof Footer) && (
        <BlocFooter
          bloc={blocs.find((b) => b instanceof Footer) as Footer}
          toggle={toggle}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
}

export default Blocs;
