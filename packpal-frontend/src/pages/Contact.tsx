
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PackageLocationMap from "@/components/PackageLocationMap";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission delay
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  // Office location details
  const officeLocation = {
    coordinates: [-74.006, 40.7128] as [number, number], // New York
    title: "PackPal Headquarters",
    description: "123 Travel Avenue, Adventure City, 10001",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=300&auto=format&fit=crop"
  };

  return (
    <>
      <Navbar />
      
      <div className="bg-travel-blue/5 py-12 md:py-16">
        <div className="travel-container">
          <div className="text-center mb-12">
            <h1 className="heading-lg mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Have questions about our travel packages or need assistance with planning your trip?
              Reach out to us and our team of travel experts will help you craft the perfect vacation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="heading-sm mb-6">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="What is this regarding?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-travel-teal hover:bg-travel-teal/90" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Contact Information */}
            <div>
              {/* Map */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4">Find Us</h3>
                <div className="h-72 mb-4">
                  <PackageLocationMap 
                    location="New York, USA"
                    coordinates={officeLocation.coordinates}
                    title={officeLocation.title}
                    description={officeLocation.description}
                    image={officeLocation.image}
                  />
                </div>
              </div>
              
              {/* Contact Details */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="heading-sm mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-travel-blue/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-travel-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-travel-dark">Our Location</h3>
                      <p className="text-gray-600">{officeLocation.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-travel-blue/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-travel-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-travel-dark">Email Us</h3>
                      <p className="text-gray-600">info@packpal.com</p>
                      <p className="text-gray-600">support@packpal.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-travel-blue/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-travel-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-travel-dark">Call Us</h3>
                      <p className="text-gray-600">+1 (800) 123-4567</p>
                      <p className="text-gray-600">+1 (800) 765-4321</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-8">
                  <h3 className="font-semibold text-travel-dark mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="bg-travel-blue/10 p-3 rounded-full hover:bg-travel-blue hover:text-white transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="bg-travel-blue/10 p-3 rounded-full hover:bg-travel-blue hover:text-white transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="bg-travel-blue/10 p-3 rounded-full hover:bg-travel-blue hover:text-white transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="bg-travel-blue/10 p-3 rounded-full hover:bg-travel-blue hover:text-white transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Contact;
