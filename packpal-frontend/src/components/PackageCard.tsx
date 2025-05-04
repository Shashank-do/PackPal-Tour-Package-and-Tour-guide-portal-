
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

export interface PackageProps {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  duration: string;
  groupSize: string;
  startDate: string;
  description: string;
}

const PackageCard = ({ id, title, location, image, price, duration, groupSize, startDate, description }: PackageProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="h-56 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
      <CardHeader>
        <CardTitle className="text-travel-dark">{title}</CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="line-clamp-2 text-gray-600">{description}</p>
        
        <div className="flex flex-wrap justify-between text-sm text-gray-500 gap-2">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-travel-teal" />
            {duration}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-travel-teal" />
            {startDate}
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1 text-travel-teal" />
            {groupSize}
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-2xl font-bold text-travel-blue">
            ${price} <span className="text-sm font-normal text-gray-500">/ person</span>
          </p>
        </div>
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

export default PackageCard;
