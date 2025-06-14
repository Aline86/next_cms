import { JSX } from "react";
import "./global.css";
export default function Layout({ children }: { children: JSX.Element }) {
  return <div className="w-full pt-[60px]">{children}</div>;
}
