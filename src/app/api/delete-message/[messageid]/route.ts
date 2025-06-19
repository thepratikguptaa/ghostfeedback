import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, {params}: {params: {messageid: string}}): Promise<NextResponse> {
    const messageId = params.messageid
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User

    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: 'User not authenticated'
        }, { status: 401 })
    }

    try {
        const updateResult = await UserModel.updateOne(
            {_id: user._id},
            {$pull: {messages: {_id: messageId}}}
        )
        if (updateResult.modifiedCount === 0) {
            return NextResponse.json({
                success: false,
                message: 'Message not found or already deleted'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Message Deleted'
        }, { status: 200 });

    } catch (error) {
        console.error('Error deleting message:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to delete message'
        }, { status: 500 });
    }


}