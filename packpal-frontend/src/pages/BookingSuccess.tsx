
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BookingDetails {
  bookingId: string;
  packageTitle: string;
  travelers: string;
  date: Date;
  totalPrice: number;
}

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state as BookingDetails;
  
  useEffect(() => {
    // Redirect to homepage if no booking details are found
    if (!bookingDetails || !bookingDetails.bookingId) {
      navigate('/');
    }
  }, [bookingDetails, navigate]);
  
  if (!bookingDetails || !bookingDetails.bookingId) {
    return null;
  }
  
  return (
    <>
      <Navbar />
      
      <div className="min-h-[70vh] bg-travel-blue/5 flex items-center justify-center py-12">
        <div className="travel-container max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-travel-blue">Booking Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Thank you for booking with PackPal.
            </p>
            
            <div className="border-t border-b border-gray-200 py-6 my-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
                  <p className="font-bold">{bookingDetails.bookingId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Package</p>
                  <p className="font-bold">{bookingDetails.packageTitle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Travelers</p>
                  <p className="font-bold">{bookingDetails.travelers}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-bold">
                    {bookingDetails.date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Price</p>
                  <p className="font-bold text-travel-blue">${bookingDetails.totalPrice}</p>
                </div>
              </div>
            </div>
            
            <p className="mb-8 text-gray-600">
              A confirmation email has been sent to your email address with all the details.
              If you have any questions about your booking, please contact our customer service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-travel-blue hover:bg-travel-blue/90 min-w-36">
                  Return to Home
                </Button>
              </Link>
              <Link to="/destinations">
                <Button variant="outline" className="border-travel-blue text-travel-blue hover:bg-travel-blue/10 min-w-36">
                  Browse More Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default BookingSuccess;
