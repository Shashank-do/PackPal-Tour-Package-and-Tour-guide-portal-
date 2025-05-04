
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface DestinationProps {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  rating: number;
}

const DestinationCard = ({ id, title, location, image, price, rating }: DestinationProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-travel-dark">{title}</CardTitle>
            <CardDescription>{location}</CardDescription>
          </div>
          <div className="bg-travel-blue text-white px-2 py-1 rounded-md text-sm">
            {rating}/5
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold text-travel-blue">
          ${price} <span className="text-sm font-normal text-gray-500">/ person</span>
        </p>
      </CardContent>
      <CardFooter>
        <Link to={`/package/${id}`} className="w-full">
          <Button variant="default" className="w-full bg-travel-teal hover:bg-travel-teal/90">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
