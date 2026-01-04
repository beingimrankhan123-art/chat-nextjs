import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import user from "@/models/user";

export async function POST(request) {
    await dbConnect();

    const { email, password } = await request.json();

    // find user
    const user = await user.findOne({ email });

    if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 401 }
        );
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
        );
    }

    const response = NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
    );

    // temporary auth cookie (later replace with JWT / NextAuth)
    response.cookies.set("token", user._id.toString(), {
        httpOnly: true,
        path: "/",
    });

    return response;
}
