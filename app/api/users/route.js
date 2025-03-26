import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


async function checkUserStatus(userId) {
  try {
    if (!userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { status: true },
    });

    return user
  } catch (error) {
    console.error("Check status error:", error);
    return { error: "Internal server error" };
  }
}

export async function GET(request) {
  const userId = request.headers.get("user-id")

  try {
    const user = await checkUserStatus(userId)
    if (!user || user.status === 'BLOCKED') {
      return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL), 302)
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL), 302);
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        lastLogin: 'desc'
      },
    });
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(request) {
  const userId = request.headers.get("user-id")

  try {
    const user = await checkUserStatus(userId)
    if (!user || user.status === 'BLOCKED') {
      return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL), 302)
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL), 302);
  }
  try {
    const { ids } = await request.json();
    const users = await prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PATCH(request) {
  const userId = request.headers.get("user-id")

  try {
    const user = await checkUserStatus(userId)
    if (!user || user.status === 'BLOCKED') {
      return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL), 302)
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL), 302);
  }
  try {
    const { ids, status } = await request.json();
    const users = await prisma.user.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        status,
      },
    });
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}