"use client";

import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

export default function OrderClient({ data }) {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage billboards for your store"
      />

      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
}
