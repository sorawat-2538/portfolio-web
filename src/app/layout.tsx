import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/sidebar/sidebar-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteSidebar } from "@/components/sidebar/site-sidebar";
import { BackToTop } from "@/components/back-to-top";

// ฟอนต์ทั้งเว็บ — Inter (อังกฤษ) · ตัวอักษรไทย fallback เป็น Aktiv Grotesk Thai
// (bundle เองใน globals.css → ไทยเรนเดอร์เหมือนกันทุกเครื่อง ไม่พึ่งฟอนต์ระบบผู้ชม)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "S.Tunaram — UX/UI Designer",
  description:
    "Portfolio of S.Tunaram — a UX/UI designer with 8 years as the sole designer at a construction tech startup and a digital media platform, owning end-to-end design across web and mobile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${inter.variable} h-full font-sans`}>
      <body className="min-h-full flex flex-col antialiased">
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
      </body>
    </html>
  );
}
