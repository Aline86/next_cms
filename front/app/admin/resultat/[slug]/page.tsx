"use client";

import React from "react";

import { useEffect, useState } from "react";

import Layout from "../../../../pages/layout";
import ClientView from "../../../../pages/admin/[slug]/ClientView";
export const dynamic = "force-dynamic";
export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const [id, setId] = useState();
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
        setId(page.id);
      } catch {}
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };
  useEffect(() => {
    getPageId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  useEffect(() => {}, [id]);
  return (
    id !== undefined && (
      <Layout>
        <ClientView id={id} />
      </Layout>
    )
  );
}
