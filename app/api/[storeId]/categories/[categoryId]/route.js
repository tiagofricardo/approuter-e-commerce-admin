import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  try {
    if (!params.params.categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.params.categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log("[CATEGORY_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, params) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard is required", { status: 400 });
    }

    if (!params.params.categoryId) {
      return new NextResponse("Category is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prismadb.category.updateMany({
      where: {
        id: params.params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });
    console.log(category);
    return NextResponse.json(category);
  } catch (err) {
    console.log("[CATEGORY_PATCH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, params) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.params.categoryId) {
      return new NextResponse("CategoryId is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log("[CATEGORY_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
