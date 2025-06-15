/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import s from "./styles/Bloc.module.css";
import Image from "./image/image";

import {
  useEffect,
  useState,
  Suspense,
  CSSProperties,
  useCallback,
} from "react";

import TextPicture from "./../../../../../models/TextPicture";
import { JSONContent } from "@tiptap/react";
import isLightOrDark from "./../../../../../lib/snippet";

export interface Content {
  type: string;
  attrs?: {
    size?: string;
    href?: string;
    target?: string;
    rel?: string;
    class?: string | null;
    textAlign?: string | null;
  };
  content: {
    type: string;
    text: string;
    marks: Mark[];
  }[];
}
type Mark = {
  type:
    | "bold"
    | "link"
    | "code"
    | "italic"
    | "underline"
    | "strike"
    | "fontSize";
  attrs?: {
    size?: string;
    href?: string;
    target?: string;
    rel?: string;
    class?: string | null;
  };
};

interface BlocParams {
  index: number;
  bloc: TextPicture | Record<string, unknown>;
  num_bloc: number;
  toggle: boolean;
  refresh: boolean;
  full: boolean;
  isResponsive: boolean;
}

function Bloc({ bloc, toggle, isResponsive, refresh }: BlocParams) {
  const [result, setResult] = useState<MediaQueryList>();
  const [, setResize] = useState(0);
  const [float, setFloat] = useState<CSSProperties | undefined>();

  const [textWidth, setTextWidth] = useState<CSSProperties | undefined>();
  const [colorImage, setColor] = useState<CSSProperties | undefined>();
  const isLightOrDark_func = useCallback(isLightOrDark, []);

  function updateSize() {
    setResize(window?.innerWidth);
  }
  useEffect(() => {
    window?.addEventListener("resize", updateSize);
  }, [result?.matches]);

  useEffect(() => {
    setResult(window?.matchMedia("(max-width: 800px)") as MediaQueryList);
  }, []);

  useEffect(() => {}, [bloc]);
  function applyMarks(text: string, marks: Mark[] = []): string {
    let html = text;

    marks.forEach((mark) => {
      switch (mark.type) {
        case "bold":
          html = `<strong>${html}</strong>`;
          break;

        case "code":
          html = `<code>${html}</code>`;
          break;

        case "link": {
          const href = mark.attrs?.href || "#";
          const target = mark.attrs?.target || "_blank";
          const rel = mark.attrs?.rel || "noopener noreferrer";
          html = `<a href="${href}" target="${target}" rel="${rel}">${html}</a>`;
          break;
        }
        case "fontSize": {
          let size = "";

          if (mark.attrs?.size === "16") {
            size = "text-sm";
          } else if (mark.attrs?.size === "18") {
            size = "text-lg";
          } else if (mark.attrs?.size === "20") {
            size = "text-2xl";
          } else if (mark.attrs?.size === "24") {
            size = "text-3xl";
          }

          html = `<span class="${size}">${html}</span>`;
          break;
        }
        case "italic":
          html = `<em>${html}</em>`;
          break;

        case "underline":
          html = `<u>${html}</u>`;
          break;

        case "strike":
          html = `<strike>${html}</strike>`;
          break;
      }
    });

    return html;
  }
  function extractTextFromNode(
    node:
      | { text?: string; content?: { text?: string; content?: unknown[] }[] }
      | { [key: string]: unknown }[]
  ): string {
    let result: string = "";

    if (Array.isArray(node)) {
      node.forEach(
        (
          child:
            | {
                text?: string;
                content?: { text?: string; content?: unknown[] }[];
              }
            | { [key: string]: unknown }[]
        ) => {
          result += extractTextFromNode(child);
        }
      );
    } else if (typeof node === "object" && node !== null) {
      if (node.text) {
        result += node.text + " ";
      }

      if (node.content) {
        result += extractTextFromNode(node.content);
      }
    }

    return result;
  }
  function extractTextFromNodeBullet(
    node:
      | { text?: string; content?: { text?: string; content?: unknown[] }[] }
      | { [key: string]: unknown }[]
  ) {
    const result = [];

    if (Array.isArray(node)) {
      node.forEach((child) => {
        result.push(extractTextFromNode(child));
      });
    } else if (typeof node === "object" && node !== null) {
      if (node.text) {
        result.push(node.text + " ");
      }

      if (node.content) {
        result.push(extractTextFromNode(node.content));
      }
    }

    return result;
  }

  // Function to convert the provided Tiptap JSON into HTML
  function convertTiptapToHTML(nodes: JSONContent): string {
    let html = "";
    if (nodes !== undefined) {
      let paragraphHTML = "";

      if (nodes?.type === "paragraph" && nodes?.content !== undefined) {
        paragraphHTML += `<p style="text-align: ${
          nodes.attrs?.textAlign || "left"
        }">`;
        nodes?.content.forEach((node: JSONContent) => {
          if (node.type === "text" && node.text !== undefined) {
            const text = node.text;
            const marks = node.marks || [];
            paragraphHTML += applyMarks(
              text,
              marks.filter((mark): mark is Mark =>
                [
                  "bold",
                  "link",
                  "code",
                  "italic",
                  "underline",
                  "strike",
                  "fontSize",
                ].includes(mark.type)
              )
            );
          }
        });

        paragraphHTML += "</p>";
        html += paragraphHTML;
      }

      if (nodes?.type === "heading" && nodes?.content !== undefined) {
        paragraphHTML += `<h2 style="text-align: ${
          nodes.attrs?.textAlign || "left"
        }; font-size: 45px"> ${extractTextFromNode(nodes?.content)}</h2>`;

        html += paragraphHTML;
      }

      if (nodes?.type === "bulletList" && nodes?.content !== undefined) {
        const list = extractTextFromNodeBullet(nodes?.content);

        paragraphHTML += `<div class="ml-8 "><ul class="flex flex-col">`;

        list.forEach((enf: string) => {
          paragraphHTML += `<li class="mb-4 w-full"><span class="mr-2 mt-1">•</span>${enf}</li>`;
        });

        paragraphHTML += "</ul></div>";

        html += paragraphHTML;
      }
    }

    // your code
    // bloc?.text !== undefined && (bloc.text = html);
    return html;
  }

  useEffect(() => {
    if (bloc !== undefined && !bloc.bloc_column) {
      setFloat({
        width: `${(bloc.css as { width: number }).width * 0.5}%`,

        display: "flex",
        flexDirection: isResponsive
          ? "column"
          : bloc.image_right
          ? "row-reverse"
          : "row",
        alignItems: "center",
        gap: "60px",
      });
    } else if (bloc !== undefined && bloc.bloc_column) {
      setFloat({
        width: `100%`,

        margin: "0 auto",
      });
    }
  }, []);
  useEffect(() => {
    if (bloc !== undefined) {
      setColor({
        backgroundColor: String(bloc.background_color),
        padding: result?.matches || isResponsive ? "0" : "30px",

        height: "fit-content",
        flexDirection:
          bloc.bloc_column || isResponsive
            ? `column`
            : bloc.image_right
            ? `row-reverse`
            : `row`,
        gap: "30px",
      });
      setTextWidth({
        display: bloc.show_text ? "block" : "none",
        marginTop: bloc.bloc_column || result?.matches ? "30px" : "0px",
        //   paddingBottom: bloc.bloc_column || result?.matches ? "10px" : "40px",
        marginBottom: bloc.bloc_column || result?.matches ? "30px" : "0px",
        color:
          bloc?.background_color !== undefined
            ? isLightOrDark_func(String(bloc?.background_color))
              ? "white"
              : "black"
            : "black",
        width: `${
          bloc.bloc_column
            ? `100%`
            : bloc.image_url !== undefined
            ? `100%`
            : `100%`
        }`,
      });
      if (bloc !== undefined && !bloc.bloc_column) {
        setFloat({
          width: `${
            result?.matches
              ? "100%"
              : (bloc.css as { width: number }).width * 0.5
          }%`,

          display: "flex",
          flexDirection: bloc.image_right ? "row-reverse" : "row",
          alignItems: "center",
          gap: "30px",
        });
      } else if (bloc !== undefined && bloc.bloc_column) {
        setFloat({
          width: `${(bloc.css as { width: number }).width}%`,

          margin: "0 auto",
        });
      }
    }
  }, [isResponsive, result?.matches, toggle]);
  const [html, setHTML] = useState<Array<string>>([]);
  const output = () => {
    if (bloc !== undefined && bloc.text !== undefined) {
      const html: string[] = [];
      const json = typeof bloc.text === "object" ? bloc.text : [];

      if (
        json !== undefined &&
        json !== null &&
        Array.isArray(json) &&
        json.length > 0
      ) {
        json.map((value: JSONContent) => {
          if (value !== undefined) {
            html.push(convertTiptapToHTML(value));
          }
        });

        setHTML(html);
      }
    }
  };
  useEffect(() => {
    output();
  }, []);
  useEffect(() => {
    output();
  }, [bloc, toggle, refresh]);
  useEffect(() => {}, [colorImage, float]);

  return (
    <div className="flex  pb-8 mb-16 text-fiori flex-col align-center m-auto smaller max-w-[1000px] mx-auto">
      {bloc !== undefined && bloc.title !== "" && (
        <h2 className="text-6xl text-center mb-16 mt-8">
          {String(bloc.title)}
        </h2>
      )}

      <div
        className="rounded h-full md:flex md:items-center md:justify-center"
        style={colorImage}
      >
        {bloc !== undefined && String(bloc.image_url) && (
          <div className="m-auto" style={float}>
            <Image bloc={bloc} />
          </div>
        )}
        {bloc !== undefined && bloc.text === undefined && (
          <div className={s.clear_box}></div>
        )}

        <div className={s.text} style={textWidth}>
          <Suspense fallback={<div>Chargement...</div>}>
            {html !== undefined &&
              typeof html === "object" &&
              Array.isArray(html) &&
              html.length > 0 &&
              html.map((out, index) => {
                return (
                  <div
                    key={index}
                    className="tiptap none"
                    dangerouslySetInnerHTML={{ __html: out }}
                  />
                );
              })}
            {html !== undefined && typeof output === "string" && (
              <div
                className="tiptap none "
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Bloc;
