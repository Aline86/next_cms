"use client";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import s from "./../../styles/tiptap.module.css";
import React, { useCallback, useEffect, useState } from "react";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph";
import FontSize from "../../../../../lib/FontSize";
import Image from "next/image";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import AlignCenterText from "./../../../../assets/center-align-text-svgrepo-com.svg";
import AlignLeftText from "./../../../../assets/texte-aligne-a-gauche.png";
import AlignRightText from "./../../../../assets/right-align-svgrepo-com.svg";
import AlignJustifyText from "./../../../../assets/justify-text-svgrepo-com.svg";
import Avant from "./../../../../assets/vers-lavant.png";
import Arrière from "./../../../../assets/en-arriere.png";
import Lier from "./../../../../assets/lier.png";
import Delier from "./../../../../assets/delier.png";
import Barre from "./../../../../assets/icons8-barré-50.png";
import UnderlineText from "./../../../../assets/icons8-souligner-50.png";
import Italic from "./../../../../assets/icons8-italique-24.png";
import Bold from "./../../../../assets/icons8-gras-50.png";

import H2 from "./../../../../assets/icons8-h2-48.png";

import Bullet from "./../../../../assets/icons8-liste-64.png";

import TextPicture from "../../../../../models/TextPicture";
import InputTypes from "../../../../../lib/InputTypes";

const Tiptap = ({
  updateBloc,
  bloc,
}: {
  updateBloc: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: undefined | string | number,
    component?: TextPicture
  ) => void;
  bloc: TextPicture | undefined;
}) => {
  const [, setJson] = useState<JSONContent>();
  const init: JSONContent[string] = [];
  const contentData: JSONContent = {
    type: "doc",
    content: init,
  };
  if (bloc?.text !== undefined && Array.isArray(bloc.text)) {
    bloc.text.map((data) => {
      contentData?.content?.push(data);
    });
  }

  const editor = useEditor({
    editable: true,
    content: contentData,
    onCreate({ editor }) {
      const json = editor.getJSON();
      setJson(json);

      if (bloc !== undefined && json.content !== undefined) {
        updateBloc(json.content, "text", undefined, undefined, bloc);
      }
      // You can now use this JSON however you like
    },
    // triggered on every change
    onUpdate: ({ editor }) => {
      const jsonData = editor.getJSON();
      setJson(jsonData);

      if (bloc !== undefined && jsonData.content !== undefined) {
        updateBloc(jsonData.content, "text", undefined, undefined, bloc);
      }
    },
    extensions: [
      StarterKit.configure({
        /*orderedList: {
          HTMLAttributes: {
            class: "pl-5 list-decimal",
          },
        },*/
        bulletList: {
          HTMLAttributes: {
            class: "pl-5 list-disc",
          },
        },

        heading: {
          levels: [1, 2, 3, 4],
          HTMLAttributes: {
            class: s.tiptap_heading,
          },
        },
      }),
      FontSize.configure({
        mergeNestedSpanStyles: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "left", "right", "center", "justify"],
      }),
      TextStyle.configure({ mergeNestedSpanStyles: true }),
      Highlight,
      Underline,
      Paragraph.configure({
        HTMLAttributes: {
          class: "mt-5",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],

        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
    ],
  });
  useEffect(() => {}, []);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window?.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`ml-5`}>
      <div className={`mb-5`}>
        <div className={`flex gap-2`}>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            disabled={!editor.can().chain().focus().setParagraph().run()}
            className={editor.isActive("paragraphe") ? "is-active" : ""}
          >
            Paragraphe
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <Image src={Bold} alt="Gras" width="20" height="20" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <Image src={Italic} alt="Italique" width="20" height="20" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            <Image src={Barre} alt="Barré" width="20" height="20" />
          </button>
          <button
            onClick={() =>
              editor.isActive("underline")
                ? editor.chain().focus().unsetUnderline().run()
                : editor.chain().focus().setUnderline().run()
            }
            className={editor.isActive("underline") ? "is-active" : ""}
          >
            <Image src={UnderlineText} alt="Souligné" width="20" height="20" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            <Image src={H2} alt="Souligné" width="20" height="20" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <Image src={Bullet} alt="Souligné" width="20" height="20" />
          </button>

          <Listbox>
            <span className="relative mt-2 w-20 inline">
              <ListboxButton className="grid w-20 cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                  Taille
                </span>
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-56 w-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
              >
                <ListboxOption
                  onClick={() => {
                    {
                      editor.commands.setFontSize("16");
                    }
                  }}
                  key={1}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                  value={16}
                >
                  <div className="flex items-center">16px</div>
                </ListboxOption>

                <ListboxOption
                  onClick={() => {
                    {
                      editor.commands.setFontSize("18");
                    }
                  }}
                  key={2}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                  value={18}
                >
                  <div className="flex items-center">18px</div>
                </ListboxOption>

                <ListboxOption
                  onClick={() => {
                    {
                      editor.commands.setFontSize("20");
                    }
                  }}
                  key={3}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                  value={20}
                >
                  <div className="flex items-center">20px</div>
                </ListboxOption>

                <ListboxOption
                  onClick={() => {
                    {
                      editor.commands.setFontSize("24");
                    }
                  }}
                  key={4}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                  value={24}
                >
                  <div className="flex items-center">24px</div>
                </ListboxOption>
              </ListboxOptions>
            </span>
          </Listbox>
          <button
            className="w-20 flex items-center justify-center gap-1 border "
            onClick={() => editor.commands.unsetFontSize()}
          >
            <Image
              src={Arrière}
              alt="Supprimer la taille"
              width="20"
              height="20"
            />{" "}
            taille
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Image
              src={Arrière}
              alt="Retour en arriere"
              width="20"
              height="20"
            />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Image src={Avant} alt="Retour en avant" width="20" height="20" />
          </button>
          <button
            onClick={setLink}
            className={editor.isActive("link") ? "is-active" : ""}
          >
            <Image src={Lier} alt="Ajouter un lien" width="20" height="20" />
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
          >
            <Image
              src={Delier}
              alt="Supprimer un lien"
              width="20"
              height="20"
            />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "is-active" : ""
            }
          >
            <Image
              src={AlignLeftText}
              alt="Alignement à gauche"
              width="20"
              height="20"
            />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "is-active" : ""
            }
          >
            <Image
              src={AlignCenterText}
              alt="Alignement au centre"
              width="20"
              height="20"
            />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "is-active" : ""
            }
          >
            <Image
              src={AlignRightText}
              alt="Alignement à droite"
              width="20"
              height="20"
            />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
            }
          >
            <Image
              src={AlignJustifyText}
              alt="Alignement justifié"
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
