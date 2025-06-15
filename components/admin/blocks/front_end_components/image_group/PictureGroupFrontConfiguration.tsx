"use client";
import { useEffect } from "react";
import PictureGroup from "./../../../../../models/PictureGroup";
import picturegroupTypes from "./../../../../../lib/config/pictureGroupTypes";

interface CardDatas {
  bloc: PictureGroup;
  page_id: number;
  toggle: boolean;
  full: boolean;
  isResponsive: boolean;
}

function PictureGroupFrontConfiguration({
  bloc,
  toggle,
  page_id,
  full,
  isResponsive,
}: CardDatas) {
  const picture_group_type = Boolean(bloc.is_grid) ? "grid" : "picture_group";

  const CardData =
    picturegroupTypes[picture_group_type as keyof typeof picturegroupTypes]
      .frontend;
  useEffect(() => {}, [toggle]);
  return (
    bloc !== undefined && (
      <CardData
        bloc={bloc}
        toggle={toggle}
        refresh={false}
        page_id={page_id}
        isResponsive={isResponsive}
        full={full}
      />
    )
  );
}
export default PictureGroupFrontConfiguration;
