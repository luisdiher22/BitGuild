import { type Metadata } from "next";
import { ClassSelector } from "~/components/onboarding/ClassSelector";

export const metadata: Metadata = { title: "Choose your class — BitGuild" };

export default function OnboardingPage() {
  return (
    <main id="main-content" className="w-full px-4 py-12">
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs uppercase tracking-widest text-text-secondary">
          Step 1 of 2 — Pick your class
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Who are you?</h1>
      </div>
      <ClassSelector />
    </main>
  );
}
