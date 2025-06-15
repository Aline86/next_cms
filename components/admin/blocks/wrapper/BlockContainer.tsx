import ShrinkParams from "./shrink_params";
import ComponentTypes from "./../../../../lib/types";
import { SetStateAction, useEffect, useState } from "react";
import blocksToRender from "./../../../../lib/config/blocsToRender";

interface BlocData {
  bloc: ComponentTypes | Record<string, unknown>;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
  setDragBegin?: (index: number) => void;
  updateDragBloc?: (index: number) => Promise<void>;
  handleDragOver?: React.DragEventHandler<HTMLDivElement>;
  isOpen: boolean;
  drag: boolean;
  index: number;

  toggle: boolean;
  isResponsive: boolean;
  full: boolean;
  page_id: number;
  setToggle: React.Dispatch<SetStateAction<boolean>>;
}

function BlockContainer({
  bloc,
  setRefresh,
  refresh,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  isOpen,
  drag,
  index,
  toggle,
  isResponsive,
  full,
  page_id,
  setToggle,
}: BlocData) {
  const [openModal, setOpenModal] = useState(isOpen);
  type BlocksToRenderKey = keyof typeof blocksToRender;
  const blocType = bloc.type as BlocksToRenderKey;
  const FrontComponent = blocksToRender[blocType].frontend;
  const BackComponent = blocksToRender[blocType].backend;
  useEffect(() => {}, [refresh, bloc]);
  return bloc !== undefined ? (
    <div
      draggable={drag}
      onDragStart={() => setDragBegin !== undefined && setDragBegin(index)}
      onDragOver={handleDragOver}
      onDrop={(e) => {
        console.log(e);
        updateDragBloc?.(index);
      }}
      key={index}
      onClick={() => setOpenModal(!openModal)}
    >
      <ShrinkParams
        key={index}
        setDragBegin={
          setDragBegin
            ? async (index: number) => {
                setDragBegin(index);
              }
            : undefined
        }
        updateDragBloc={async (event: number): Promise<void> => {
          if (updateDragBloc) {
            await updateDragBloc(event);
          }
        }}
        drag={drag}
        index={index !== undefined ? index + 1 : index}
        bloc={bloc as ComponentTypes}
        handleDragOver={handleDragOver}
        component_visualization={
          <FrontComponent
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            bloc={bloc as any}
            full={full}
            isResponsive={isResponsive}
            toggle={toggle}
            refresh={refresh}
            index={index}
            page_id={page_id}
            num_bloc={index}
          />
        }
        css_position={
          <>
            <BackComponent
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              bloc={bloc as any}
              page_id={page_id}
              toggle={toggle}
              setToggle={setToggle}
              isResponsive={isResponsive}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </>
        }
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </div>
  ) : (
    <></>
  );
}

export default BlockContainer;
