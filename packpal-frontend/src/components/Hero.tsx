
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  ctaLink: string;
  ctaText: string;
}

const Hero = ({ title, subtitle, imageSrc, ctaLink, ctaText }: HeroProps) => {
  return (
    <div className="relative h-[70vh] min-h-[600px] bg-cover bg-center" style={{ backgroundImage: `url(${imageSrc})` }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="travel-container h-full flex items-center relative z-10">
        <div className="max-w-2xl text-white animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl mb-8">{subtitle}</p>
          <Link to={ctaLink}>
            <Button className="bg-travel-teal hover:bg-travel-teal/90 text-white text-lg px-8 py-6">
              {ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
