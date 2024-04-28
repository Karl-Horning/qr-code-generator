// Choose error correction code (ECC) parameter (&ecc=H)
// L (low, ~7% destroyed data may be corrected)
// M (middle, ~15% destroyed data may be corrected)
// Q (quality, ~25% destroyed data may be corrected)
// H (high, ~30% destroyed data may be corrected)

// Choose hex value colour
// https://api.qrserver.com/v1/create-qr-code/?data=Hello&size=600x600&ecc=H&color=ff0000

// Choose background hex value colour
// https://api.qrserver.com/v1/create-qr-code/?data=Hello&size=600x600&ecc=H&color=ff0000&bgcolor=000000

// Add a margin from 1 to 50
// https://api.qrserver.com/v1/create-qr-code/?data=Hello&size=600x600&ecc=H&color=ff0000&bgcolor=000000&margin=50

// Choose format for code:
// png
// gif
// jpeg
// jpg
// svg
// eps
// https://api.qrserver.com/v1/create-qr-code/?data=Hello&size=600x600&ecc=H&color=ff0000&bgcolor=000000&margin=50&qzone-100&format=png

// Minimum 100x100
// Maximum if png|gif|jpeg|jpg 1000x1000
// Maximum if svg|eps 1000000x1000000
// Choose height and width

// Choose text
// (Between 1 to 900 characters)

// Encode text

// Send get request to http(s)://api.qrserver.com/v1/create-qr-code/?data=[URL-encoded-text]&size=[pixels]x[pixels]
// https://api.qrserver.com/v1/create-qr-code/?data=Hello&size=500x500

// export default function Home() {
//     return (
//         <main className="container mx-auto">
//             <div className="grid grid-cols-2">
//                 Test!
//             </div>
//         </main>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
    const [qrCodeImage, setQRCodeImage] = useState<string | null>(null);

    useEffect(() => {
        // Make a GET request to the QR code API endpoint
        axios
            .get(
                "https://api.qrserver.com/v1/create-qr-code/?data=Hello&size=600x600&ecc=H&color=000000&bgcolor=ffffff&margin=25&qzone-100&format=png",
                {
                    responseType: "arraybuffer", // Set response type to arraybuffer
                }
            )
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
