import { NextResponse, type NextRequest } from "next/server";
import { negotiateLocale } from "@/i18n/negotiate";

/**
 * `/` has no page of its own: send the visitor to /vi or /en with a 307, chosen
 * from Accept-Language, so it works without JavaScript. The response varies by
 * that header so shared caches never hand one visitor another's language.
 */
export const middleware = (request: NextRequest): NextResponse => {
  const locale = negotiateLocale(request.headers.get("accept-language"));
  const target = request.nextUrl.clone();
  target.pathname = `/${locale}`;
  const response = NextResponse.redirect(target, 307);
  response.headers.set("Vary", "Accept-Language");
  response.headers.set("Cache-Control", "private, no-cache");
  return response;
};

export const config = {
  matcher: "/",
};
