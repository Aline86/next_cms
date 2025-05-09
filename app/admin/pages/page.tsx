"use client";

import React from "react";

import Layout from "../../../pages/layout";
import ClientView from "../../../pages/admin/pages/ClientView";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Layout>
      <ClientView />
    </Layout>
  );
}
