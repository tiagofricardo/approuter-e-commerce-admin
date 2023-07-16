import prismadb from "@/lib/prismadb";

export default async function getStockCount(storeId) {
  const stockCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
}
