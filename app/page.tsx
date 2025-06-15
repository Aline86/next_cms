export const dynamic = "force-dynamic";

import Page from "./../models/Page";
import Layout from "./../components/layout";
import Head from "next/head";
import { Metadata } from "next";
import { JSX } from "react";
import ClientView from "./[slug]/ClientView";
import BlocTools from "./../lib/bloc_tools";
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
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "/" || slug === null || slug === undefined) {
    const page_type = new Page(1, 0, null);

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
  }
  return {
    title: "Titre du site", // Default title
    description: "Description du site", // Default description
  };
}

export default async function Homepage({
  params,
}: Props): Promise<JSX.Element | null> {
  const { slug } = await params;
  const id =
    slug === "/" || slug === null || slug === undefined
      ? 1
      : await getPageId(slug); // Default to 1 if slug is undefined
  if (id !== undefined) {
    const page_type = new Page(id, 0, null);

    const getAllBlocs = async (page_type: Page) => {
      const tools = new BlocTools(page_type);

      const bloc_pages = await tools.getAllBlocsPage();

      const blocs = Array.isArray(bloc_pages)
        ? bloc_pages.map(async (bloc) => await bloc.classToPlainObject())
        : [];

      const bloc_result = Promise.all(blocs).then((data) => {
        return data;
      });

      if (bloc_result !== undefined) {
        return bloc_result;
      }
    };
    const blocs = await getAllBlocs(page_type);

    return (
      <>
        <Head>
          <title>{page_type.title}</title>
          <meta name="description" content={page_type.description} />
          <meta property="og:title" content={page_type.title} />
          <meta property="og:description" content={page_type.description} />
        </Head>
        <main id="body">
          {blocs !== undefined && page_type !== undefined && (
            <Layout>
              <>
                <ClientView params={{ id: id }} />
              </>
            </Layout>
          )}
        </main>
      </>
    );
  }
  return null;
}
