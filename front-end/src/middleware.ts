import { NextResponse, type NextRequest } from 'next/server'

export const middleware = (request: NextRequest) => {
    const accessToken = request.cookies.get('accessToken')?.value;
    
    if (!accessToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/chats/:path*", "/settings/:path*"]
}