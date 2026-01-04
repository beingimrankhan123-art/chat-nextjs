import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import user from "@/models/user";
import { connectDB } from "@/lib/db";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        console.log("email", email, password)
        await connectDB();
        console.log("after connection")
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await user.create({
            email,
            password: hashedPassword,
        });

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
