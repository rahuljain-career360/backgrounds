import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
        <Link className="home-buttons" href="backgrounds" >Backgrounds</Link>
        <Link className="home-buttons" href="timers" >Timers</Link>
        <Link className="home-buttons" href="effectbackground" >Effective Backgrounds</Link>
    </div>
  );
}
