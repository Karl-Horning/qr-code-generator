"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Input,
    Select,
    SelectItem,
    Slider,
} from "@nextui-org/react";
import { eccList, formatList } from "./data";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

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
    const [qrCodeColor, qrCodeSetColor] = useColor("#561ecb");
    const [qrCodeBgColor, qrCodeBgSetColor] = useColor("#561ecb");

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
        <div className="flex min-h-screen items-center justify-center">
            <Card>
                <CardHeader className="flex items-center justify-center text-2xl font-bold">
                    <h1 className="text-2xl font-bold">QR Code Generator</h1>
                </CardHeader>

                <Divider />

                <CardBody>
                    {qrCodeImage ? (
                        <Image
                            src={qrCodeImage}
                            alt="QR Code"
                            className="mb-4 max-h-full max-w-full"
                            height={500}
                            width={500}
                        />
                    ) : (
                        <p>Loading...</p>
                    )}
                    <Input
                        type="text"
                        label="Choose the text for the QR code to display"
                        className="mb-4"
                        variant="underlined"
                    />
                    <Select
                        items={eccList}
                        label="Choose error correction code (ECC) quality"
                        placeholder="Select ECC quality"
                        className="mb-4"
                        defaultSelectedKeys={[eccList[0].value]}
                        variant="underlined"
                    >
                        {(eccList) => (
                            <SelectItem key={eccList.value}>
                                {eccList.label}
                            </SelectItem>
                        )}
                    </Select>

                    <p className="pb-2 pl-1 text-xs">
                        Choose a foreground colour
                    </p>
                    <span className="mb-4">
                        <ColorPicker
                            color={qrCodeColor}
                            onChange={qrCodeSetColor}
                        />
                    </span>

                    <p className="pb-2 pl-1 text-xs">
                        Choose a background colour
                    </p>

                    <span className="mb-4">
                        <ColorPicker
                            color={qrCodeBgColor}
                            onChange={qrCodeBgSetColor}
                        />
                    </span>

                    <Select
                        items={formatList}
                        label="Choose an image format"
                        placeholder="Select image format"
                        className="mb-4"
                        defaultSelectedKeys={[formatList[0].value]}
                        variant="underlined"
                    >
                        {(formatList) => (
                            <SelectItem key={formatList.value}>
                                {formatList.label}
                            </SelectItem>
                        )}
                    </Select>

                    <Slider
                        label="Height & Width"
                        step={1}
                        maxValue={1000}
                        minValue={100}
                        defaultValue={100}
                        className="mb-4"
                    />

                    <Slider
                        label="Margin"
                        step={1}
                        maxValue={50}
                        minValue={1}
                        defaultValue={25}
                        className="mb-4"
                    />

                    <Button size="lg" color="primary" className="mb-4">
                        Generate QR Code
                    </Button>
                </CardBody>

                <Divider />

                <CardFooter className="flex items-center justify-center">
                    <small>&copy;2024 Karl Horning</small>
                </CardFooter>
            </Card>
        </div>
    );
}
