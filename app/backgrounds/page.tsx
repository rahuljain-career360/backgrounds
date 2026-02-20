import Link from "next/link";
import { backgrounds } from "@/app/data/backgrounds";
import { CustomLink } from "../components/CustomLink";


export default function BackgroundPage() {
  return (
    <main className="home">
      <h1 className="main-heading">Select Background</h1>

      <div className="buttons">
        {Object.entries(backgrounds).map(([slug, bg]) => (
          <CustomLink key={slug} href={`/backgrounds/${slug}`} label={bg.name} />
        ))}
      </div>
    </main>
  );
}
