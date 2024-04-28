"use client";

import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import QRCodeStyling, {
    DrawType,
    TypeNumber,
    Mode,
    ErrorCorrectionLevel,
    DotType,
    CornerSquareType,
    CornerDotType,
    Options,
} from "qr-code-styling";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { imageExtensions } from "./ImageOptions";

interface QrCodeProps {
    height?: number;
    width?: number;
    margin?: number;
    type?: DrawType | undefined;
    data?: string;
    image?: string;
    qrOptions?: {
        typeNumber?: TypeNumber;
        mode?: Mode;
        errorCorrectionLevel?: ErrorCorrectionLevel;
    };
    imageOptions?: {
        hideBackgroundDots?: boolean;
        imageSize?: number;
        margin?: number;
        crossOrigin?: string;
    };
    dotsOptions?: {
        color?: string;
        type?: DotType;
    };
    backgroundOptions?: {
        color?: string;
    };
    cornersSquareOptions?: {
        color?: string;
        type?: CornerSquareType;
    };
    cornersDotOptions?: {
        color?: string;
        type?: CornerDotType;
    };
}

export default function QrCode({
    height = 300,
    width = 300,
    margin = 10,
    type = "svg" as DrawType,
    data = "https://karl-horning.github.io",
    image = "/favicon.ico",
    qrOptions = {
        typeNumber: 0 as TypeNumber,
        mode: "Byte" as Mode,
        errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
    },
    imageOptions = {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 20,
        crossOrigin: "anonymous",
    },
    dotsOptions = {
        color: "#222222",
        type: "rounded" as DotType,
    },
    backgroundOptions = {
        color: "#5FD4F3",
    },
    cornersSquareOptions = {
        color: "#222222",
        type: "extra-rounded" as CornerSquareType,
    },
    cornersDotOptions = {
        color: "#222222",
        type: "dot" as CornerDotType,
    },
}: QrCodeProps) {
    const [options, setOptions] = useState<Options>({
        width,
        height,
        margin,
        type,
        data,
        image,
        qrOptions,
        imageOptions,
        dotsOptions,
        backgroundOptions,
        cornersSquareOptions,
        cornersDotOptions,
    });
    const [fileExt, setFileExt] = useState("svg");
    const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            qrCode.append(ref.current);
        }
    }, [qrCode, ref]);

    useEffect(() => {
        if (!qrCode) return;
        qrCode.update(options);
    }, [qrCode, options]);

    const onDataChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOptions((options) => ({
            ...options,
            data: event.target.value,
        }));
    };

    const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFileExt(event.target.value);
    };

    const onDownloadClick = () => {
        if (!qrCode) return;
        qrCode.download({
            extension: fileExt,
        });
    };

    return (
        <section className="mx-auto">
            <h2 className="my-4 text-center text-2xl">
                QR code styling for React
            </h2>
            {/* QR Code */}
            <div ref={ref} />
            <div>
                <Input
                    className="py-4"
                    label="Text or URL"
                    onChange={onDataChange}
                    size="lg"
                    value={options.data}
                    variant="faded"
                />

                <Select
                    label="Select an image format"
                    className="mb-4"
                    defaultSelectedKeys={[imageExtensions[0].value]}
                    onChange={onExtensionChange}
                    value={fileExt}
                    variant="faded"
                >
                    {imageExtensions.map((extension) => (
                        <SelectItem
                            key={extension.value}
                            value={extension.value}
                        >
                            {extension.label}
                        </SelectItem>
                    ))}
                </Select>

                <Button
                    className="mb-4 w-full"
                    color="primary"
                    onClick={onDownloadClick}
                    size="lg"
                >
                    Download QR Code
                </Button>
            </div>
        </section>
    );
}
