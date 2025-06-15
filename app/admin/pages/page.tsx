"use client";

import React from "react";

import Layout from "./../../../components/layout";
import ClientView from "./../../../components/admin/pages/ClientView";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Layout>
      <ClientView />
    </Layout>
  );
}
