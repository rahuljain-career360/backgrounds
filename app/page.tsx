import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
        <Link className="home-buttons" href="video-exporter" >Video Exporter</Link>
        <Link className="home-buttons" href="color-maker" >Color Maker</Link>
        <Link className="home-buttons" href="download-tool" >Download Tool</Link>
        <Link className="home-buttons" href="backgrounds" >Backgrounds</Link>
        <Link className="home-buttons" href="premium-backgrounds" >Premium Backgrounds</Link>
        <Link className="home-buttons" href="blog" >Blog</Link>
        <Link className="home-buttons" href="timers" >Timers</Link>
        <Link className="home-buttons" href="colors" >Colors</Link>
        <Link className="home-buttons" href="buttons" >Buttons</Link>
        <Link className="home-buttons" href="effectbackground" >Effective Backgrounds</Link>
    </div>
  );
}
