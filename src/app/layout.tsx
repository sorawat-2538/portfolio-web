import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/sidebar/sidebar-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteSidebar } from "@/components/sidebar/site-sidebar";
import { BackToTop } from "@/components/back-to-top";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "S.Tunaram — Product Designer",
  description:
    "Portfolio of S.Tunaram — a solo product designer working hypothesis-driven, with manual A/B testing (GA4 + Clarity).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="pf-theme"
        >
          <SidebarProvider>
            <SiteHeader />
            <div className="mx-auto flex w-full max-w-[1180px] flex-1 px-5 sm:px-8 min-[900px]:px-0">
              <SiteSidebar />
              <div className="min-w-0 flex-1 min-[900px]:pl-[50px]">
                {children}
              </div>
            </div>
            <SiteFooter />
            <BackToTop />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
