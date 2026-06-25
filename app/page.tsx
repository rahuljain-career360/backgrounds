import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
        <Link className="home-buttons" href="fd-calculator" >FD Calculator</Link>
        <Link className="home-buttons" href="video-exporter" >Video Exporter</Link>
        <Link className="home-buttons" href="video-upscaler" >Video Upscaler</Link>
        <Link className="home-buttons" href="color-maker" >Color Maker</Link>
        <Link className="home-buttons" href="image-enhancer" >Image Enhancer</Link>
        <Link className="home-buttons" href="download-tool" >Download Tool</Link>
        <Link className="home-buttons" href="backgrounds" >Backgrounds</Link>
        <Link className="home-buttons" href="premium-backgrounds" >Premium Backgrounds</Link>
        <Link className="home-buttons" href="blog" >Blog</Link>
        <Link className="home-buttons" href="timers" >Timers</Link>
        <Link className="home-buttons" href="colors" >Colors</Link>
        <Link className="home-buttons" href="buttons" >Buttons</Link>
        <Link className="home-buttons" href="form-builder" >Form Builder</Link>
        <Link className="home-buttons" href="bento-grids" >Bento Grids</Link>
        <Link className="home-buttons" href="portfolio" >3D Portfolio</Link>
        <Link className="home-buttons" href="game-portfolio" >3D Game Portfolio</Link>
        <Link className="home-buttons" href="effectbackground" >Effective Backgrounds</Link>
    </div>
  );
}
