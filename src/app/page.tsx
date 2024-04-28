import QrCode from "@/components/QrCode/QrCode";

export default function Home() {
    return (
        <main className="container mx-auto">
            <div className="grid grid-cols-2">
                <QrCode />
            </div>
        </main>
    );
}
