export const dynamic = "force-dynamic";
import React, { JSX } from "react";
import Layout from "../../pages/layout";
import PageModel from "../../models/Page";
import ClientView from "./ClientView";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getPageId = async (slug: string) => {
  // Convert plain objects back into Page instances
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
        "/api/slug.php?slug=" +
        slug,
      {
        referrerPolicy: "strict-origin-when-cross-origin", // n
        mode: "cors",
        headers: {
          Accept: "application/json",
          // Any other headers needed for the request
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    try {
      const page = await response.json();
      return page.id;
    } catch {}
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = await getPageId(slug);
  const page_type = new PageModel(id, 0, null);

  const new_page = await page_type.get_one_bloc();

  if (new_page !== undefined && "page" in new_page) {
    const page_data = Object.values(
      new_page.page as Record<string, unknown>
    )[0];
    const hydrated_page = page_type.hydrate(
      page_data as Record<string, unknown>
    );
    return {
      title: hydrated_page.title,
      description: hydrated_page.description,
    };
  }
  return {
    title: "CMS", // Default title
    description: "Nouveau next CMS", // Default description
  };
}
export default async function Page({
  params,
}: Props): Promise<JSX.Element | null> {
  const { slug } = await params;
  const id = await getPageId(slug);
  return id !== undefined && typeof id === "number" ? (
    <Layout>
      <ClientView params={{ id: id }} />
    </Layout>
  ) : null;
}
