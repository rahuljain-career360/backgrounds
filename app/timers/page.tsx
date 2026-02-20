import Link from "next/link";
import { CustomLink } from "../components/CustomLink";
import { timers } from "../data/timers";

export default function TimerPage() {
  return (
    <main className="home">
      <h1 className="main-heading">Select Timer</h1>

      <div className="buttons">
        {Object.entries(timers).map(([slug, bg]) => (
          <CustomLink key={slug} href={`/timers/${slug}`} label={bg.name} />
        ))}
      </div>
    </main>
  );
}
