import prismadb from "@/lib/prismadb";

export default async function getSalesCount(storeId) {
  const salesCount = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
}
