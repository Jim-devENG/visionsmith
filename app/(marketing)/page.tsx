import { CurrentFocus } from "../../components/sections/CurrentFocus";
import { Hero } from "../../components/sections/Hero";
import { NextStep } from "../../components/sections/NextStep";
import { Positioning } from "../../components/sections/Positioning";
import { System } from "../../components/sections/System";

export default function MarketingPage() {
  return (
    <main>
      <Hero />
      <Positioning />
      <System />
      <CurrentFocus />
      <NextStep />
    </main>
  );
}
