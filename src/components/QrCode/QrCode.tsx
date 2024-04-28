"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface QrCodeProps {
    // Choose text
    // (Between 1 to 900 characters)
    text?: string;
    // Choose error correction code (ECC) quality
    // L (low, ~7% destroyed data may be corrected)
    // M (middle, ~15% destroyed data may be corrected)
    // Q (quality, ~25% destroyed data may be corrected)
    // H (high, ~30% destroyed data may be corrected)
    ecc?: "L" | "M" | "Q" | "H";
    color?: string;
    bGcolor?: string;
    // From 1 to 50
    margin?: number;
    // Image format:
    // png
    // gif
    // jpeg
    // jpg
    // svg
    // eps
    format?: "png" | "gif" | "jpeg" | "jpg" | "svg" | "eps";
    // Minimum 100x100
    // Maximum if png|gif|jpeg|jpg 1000x1000
    // Maximum if svg|eps 1000000x1000000
    // Choose height and width
    height?: number;
    width?: number;
}

export default function QrCode({
    text = "https://karl-horning.github.io",
    ecc = "L",
    color = "000000",
    bGcolor = "ffffff",
    margin = 25,
    format = "svg",
    height = 300,
    width = height,
}: QrCodeProps) {
    const [qrCodeImage, setQRCodeImage] = useState<string | null>(null);

    const reqUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${text}&size=${height}x${width}&ecc=${ecc}&color=#${color}&bgcolor=#${bGcolor}&margin=${margin}&qzone-100&format=${format}`;

    useEffect(() => {
        // Make a GET request to the QR code API endpoint
        axios
            .get(reqUrl, {
                responseType: "arraybuffer", // Set response type to arraybuffer
            })
            .then((response) => {
                // Handle successful response
                console.log("response:", response);
                const imageUrl = `data:image/png;base64,${Buffer.from(response.data, "binary").toString("base64")}`;
                setQRCodeImage(imageUrl);
            })
            .catch((error) => {
                // Handle error
                console.error("Error fetching QR code:", error);
            });
    }, []);

    return (
        <div className="flex h-screen items-center justify-center">
            {qrCodeImage ? (
                <Image
                    src={qrCodeImage}
                    alt="QR Code"
                    className="max-h-full max-w-full"
                    height={500}
                    width={500}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
