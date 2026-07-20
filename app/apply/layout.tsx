import Image from "next/image";
import Link from "next/link";

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[color:var(--vs-ink)] antialiased">
      <header className="flex justify-center py-10">
        <Link href="/">
          <Image src="/wordicon.png" alt="VisionSmith" width={669} height={373} priority className="h-9 w-auto opacity-90" />
        </Link>
      </header>
      <main>{children}</main>
      <footer className="border-t border-[color:var(--vs-line)] py-10 text-center">
        <p className="text-[12px] tracking-[0.02em] text-[color:var(--vs-subtle)]">Every chaos has a pattern.</p>
      </footer>
    </div>
  );
}
