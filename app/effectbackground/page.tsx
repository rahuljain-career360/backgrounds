import Link from "next/link";
import { backgrounds } from "@/app/data/backgrounds";
import { CustomLink } from "../components/CustomLink";
import { effectBackgrounds } from "../data/effectBackgrounds";


export default function EffectBackgroundPage() {
  return (
    <main className="home">
      <h1 className="main-heading">Select Effect Background</h1>

      <div className="buttons">
        {Object.entries(effectBackgrounds).map(([slug, bg]) => (
          <CustomLink key={slug} href={`/effectbackground/${slug}`} label={bg.name} />
        ))}
      </div>
    </main>
  );
}
