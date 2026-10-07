import type { Metadata } from "next";
import { DictionariesView } from "./_widgets/dictionaries-view";

export const metadata: Metadata = {
  title: "Dictionaries",
  description: "Every language you are growing a vocabulary in.",
};

export default function DictionariesPage() {
  return <DictionariesView />;
}
