import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  try {
    if (!params.params.colorId) {
      return new NextResponse("Color Id is required", { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.params.sizeId,
      },
    });

    return NextResponse.json(color);
  } catch (err) {
    console.log("[COLOR_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, params) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.params.colorId) {
      return new NextResponse("Color Id is required", { status: 400 });
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

    const color = await prismadb.color.updateMany({
      where: {
        id: params.params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (err) {
    console.log("[COLOR_PATCH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, params) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
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

    const color = await prismadb.color.deleteMany({
      where: {
        id: params.params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (err) {
    console.log("[COLOR_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
