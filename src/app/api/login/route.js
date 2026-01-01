import { NextResponse } from "next/server";
import { users } from "@/lib/users";

export async function POST(request) {
    const { email, password } = await request.json();

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return NextResponse.json( 
            { message: "Invalid credentials" },
            { status: 401 }
        );
    }

    const response = NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
    );

    // set auth cookie
    response.cookies.set("token", "dummy-token", {
        httpOnly: true,
        path: "/",
    });

    return response;
}
