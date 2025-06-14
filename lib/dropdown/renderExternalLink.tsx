import { Input } from "@headlessui/react";
import useBlocStore from "../../store/blocsStore";
import ComponentTypes from "../types";
import s from "./style/styles.module.css";
import Button from "../../models/Button";
import PictureGroupData from "../../models/PictureGroupData";
import CarouselData from "../../models/CarouselData";

interface DropdownElementParams {
  bloc: ComponentTypes;
  data: Button | PictureGroupData | CarouselData;

  index?: number;
  page_id?: number;
}

function RenderExternalLink({ bloc, data, index }: DropdownElementParams) {
  const updateComponent = useBlocStore((state) => state.updateBloc);

  return (
    data !== undefined &&
    bloc !== undefined && (
      <div className={s.type}>
        <Input
          className="max-w-[250px]"
          defaultValue={
            data != null ? (data as { href_url?: string }).href_url : ""
          }
          placeholder="Url de redirection"
          onChange={(e) => {
            updateComponent(
              e,
              "href_url",
              undefined,
              index,
              bloc as ComponentTypes | undefined
            );
          }}
        />
      </div>
    )
  );
}

export default RenderExternalLink;
