export const dynamic = "force-dynamic";
import React from "react";
import Layout from "../../pages/layout";

import ClientView from "./ClientView";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const getPageId = async () => {
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
  const id = await getPageId();

  return (
    id !== undefined &&
    typeof id === "number" && (
      <Layout>
        <ClientView params={Promise.resolve({ id: id })} />
      </Layout>
    )
  );
}
