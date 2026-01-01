import { users } from "@/lib/users";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, password } = await request.json();

    // check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return NextResponse.json(
            { message: "User already exists" },
            { status: 400 }
        );
    }

    // save user (plain password for now)
    users.push({ email, password });

    return NextResponse.json(
        { message: "Signup successful" },
        { status: 201 }
    );
}
