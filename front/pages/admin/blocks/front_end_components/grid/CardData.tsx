import { useState } from "react";
import PictureGroupData from "../../../../../models/PictureGroupData";

import Picture from "./Picture";

interface CardDatas {
  data: PictureGroupData | Record<string, unknown> | undefined;
  index: number;
  isResponsive: boolean;
}

function CardDataGrid({ data, index, isResponsive }: CardDatas) {
  const [clicked_pic, set_clicked_pic] = useState(false);
  const handle_pic_click = (state: boolean) => {
    set_clicked_pic(state);
  };

  return data !== undefined && data.image_url !== "" ? (
    <div
      key={
        typeof data === "object" && data !== null && "id" in data
          ? String((data as { id?: string | number }).id)
          : undefined
      }
      className="relative w-full overflow-hidden rounded"
    >
      <Picture
        data={data}
        update_clicked_pic={handle_pic_click}
        clicked={clicked_pic}
        isResponsive={isResponsive}
      />
    </div>
  ) : (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 text-center">
      <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {Number(index + 1)}
      </div>
    </div>
  );
}

export default CardDataGrid;
