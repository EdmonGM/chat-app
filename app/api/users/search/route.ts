import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const username = searchParams.get("query")?.trim();

  if (!username) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  try {
    const users = await prisma.user.findMany({
      where: { username: { contains: username }, NOT: { id: session.user.id } },
      select: {
        id: true,
        username: true,
        avatar: true,
        name: true,
      },
      orderBy: { username: "asc" },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("SEARCH USER ERROR: ", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
