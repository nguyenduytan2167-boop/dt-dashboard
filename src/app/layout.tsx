import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hệ Thống Phòng Đào Tạo - PRD",
  description: "Hệ thống cập nhật tự động các công việc Phòng Đào tạo. Quản lý thời khóa biểu, thống kê giờ giảng, báo cáo tiến độ và tình hình mở lớp.",
  keywords: ["Phòng Đào Tạo", "PRD", "Thời khóa biểu", "Quản lý đào tạo", "Giờ giảng", "Báo cáo"],
  authors: [{ name: "Phòng Đào Tạo" }],
  icons: {
    icon: "/prd-logo.png",
  },
  openGraph: {
    title: "Hệ Thống Phòng Đào Tạo - PRD",
    description: "Hệ thống cập nhật tự động các công việc Phòng Đào tạo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
