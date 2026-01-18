import { Link } from "lucide-react";

export default function Aside() {
  return (
    <>
      <h2 className="text-2xl font-bold">Aside</h2>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </>
  );
}
