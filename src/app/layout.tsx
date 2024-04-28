import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "QR Code Generator",
    description:
        "Generate a QR Code",
    generator: "Next.js",
    applicationName: "QR Code Generator",
    keywords: [
        "Next.js",
        "JavaScript",
    ],
    authors: [
        {
            name: "Karl Horning",
            url: "https://www.linkedin.com/in/karl-horning/",
        },
    ],
    creator: "Karl Horning",
    publisher: "Karl Horning",
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className="scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
        >
            <body className={inter.className}>{children}</body>
        </html>
    );
}
