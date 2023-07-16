import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req, params) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.params.storeId) {
      return new NextResponse("Storeid is required", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (err) {
    console.log("[STORE_PATCH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, params) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.params.storeId) {
      return new NextResponse("Storeid is required", { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (err) {
    console.log("[STORE_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
