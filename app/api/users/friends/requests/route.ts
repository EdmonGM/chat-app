import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action, senderId } = await req.json();

  if (!action || !senderId) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.friendRequest.delete({
        where: {
          senderId_receiverId: {
            senderId: senderId,
            receiverId: session.user.id,
          },
        },
      });

      if (action === "accept") {
        await tx.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            friends: { connect: { id: senderId } },
            friendsOf: { connect: { id: senderId } },
          },
        });

        await tx.user.update({
          where: {
            id: senderId,
          },
          data: {
            friends: { connect: { id: session.user.id } },
            friendsOf: { connect: { id: session.user.id } },
          },
        });
      }
    });
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.error("Friend request processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
