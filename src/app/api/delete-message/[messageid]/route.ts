import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function DELETE(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const messageId = url.pathname.split("/").pop();
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: 'User not authenticated'
        }, { status: 401 })
    }

    try {
        const updateResult = await UserModel.updateOne(
            {_id: user._id},
            {$pull: {messages: {_id: messageId}}}
        )
        if (updateResult.modifiedCount == 0) {
            return Response.json({
                success: false,
                message: 'Message not found or already deleted'
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: 'Message Deleted'
        }, { status: 200 });

    } catch (error) {
        console.error('Error deleting message:', error);
        return Response.json({
            success: false,
            message: 'Failed to delete message'
        }, { status: 500 });
    }


}