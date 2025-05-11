"use client";

import React from "react";

import ClientView from "../../../../pages/admin/pages/[id]/ClientView";

export const dynamic = "force-dynamic";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  return <ClientView id={id} />;
}
