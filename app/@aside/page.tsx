import { Link } from "lucide-react";

export default function Aside() {
    return (
        <aside className="col-span-1 rounded-lg border border-b-neutral-900 bg-neutral-900/50 h-fit p-4">
            <h2 className="text-2xl font-bold">Aside</h2>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
            </ul>
        </aside>
    );
}