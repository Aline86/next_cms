import { CheckboxProps } from "@headlessui/react";
import { JSONContent } from "@tiptap/react";
import { ChangeEvent } from "react";

type InputTypes =
  | Event
  | MouseEvent
  | React.MouseEvent<HTMLLabelElement>
  | React.MouseEvent<HTMLButtonElement>
  | React.MouseEvent<HTMLDivElement>
  | React.MouseEvent<HTMLSpanElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.MouseEvent<HTMLImageElement>
  | React.MouseEvent<HTMLTextAreaElement>
  | React.MouseEvent<HTMLInputElement>
  | React.MouseEvent<HTMLSelectElement>
  | React.MouseEvent<HTMLFormElement>
  | React.MouseEvent<HTMLUListElement>
  | React.MouseEvent<HTMLTableElement>
  | ChangeEvent<HTMLButtonElement>
  | ChangeEvent<HTMLSelectElement>
  | JSONContent[]
  | string
  | number
  | boolean
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<CheckboxProps>
  | File;
export default InputTypes;
