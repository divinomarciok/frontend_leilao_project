import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Caso haja token, permitir o acesso
  return NextResponse.next();
}

// Aplicar o middleware apenas às rotas que precisam de proteção
export const config = {
  matcher: ['/products/:path*'],
};
