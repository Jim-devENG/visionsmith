import { MarketingFooter } from "../../components/layout/MarketingFooter";
import { MarketingHeader } from "../../components/layout/MarketingHeader";
import { PageTransition } from "../../components/layout/PageTransition";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[color:var(--vs-bg)] text-[color:var(--vs-ink)] antialiased">
      <MarketingHeader />
      <div className="relative flex-1">
        <PageTransition>{children}</PageTransition>
      </div>
      <MarketingFooter />
    </div>
  );
}
