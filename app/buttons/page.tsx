import Link from "next/link";
import { CustomLink } from "../components/CustomLink";
import { buttons } from "../data/buttons";

export default function ButtonsPage() {
  return (
    <main className="home">
      <h1 className="main-heading">Premium Buttons</h1>
      <div className="buttons">
        {Object.entries(buttons).map(([slug, btn]) => (
          <CustomLink key={slug} href={`/buttons/${slug}`} label={btn.name} />
        ))}
      </div>
    </main>
  );
}
