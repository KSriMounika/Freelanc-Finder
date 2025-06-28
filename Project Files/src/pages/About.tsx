
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Clock, Award, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Talented Community",
      description: "Access to thousands of skilled freelancers from around the world, vetted for quality and expertise."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "End-to-end security with secure payments, data protection, and dispute resolution."
    },
    {
      icon: Clock,
      title: "Real-time Collaboration",
      description: "Built-in chat, file sharing, and project management tools for seamless collaboration."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Rigorous quality control processes ensure every project meets the highest standards."
    }
  ];

  const stats = [
    { label: "Projects Completed", value: "75,000+", icon: CheckCircle },
    { label: "Active Freelancers", value: "50,000+", icon: Users },
    { label: "Client Satisfaction", value: "98%", icon: Star },
    { label: "Countries Served", value: "150+", icon: Users }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg",
      description: "Former tech executive with 15 years of experience in building scalable platforms."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/placeholder.svg",
      description: "Engineering leader passionate about creating seamless user experiences."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Community",
      image: "/placeholder.svg",
      description: "Community building expert focused on freelancer success and client satisfaction."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-blue-200">SB Works</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              We're revolutionizing the way clients connect with skilled freelancers, 
              creating opportunities and driving innovation in the gig economy.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To create a transparent, efficient, and secure platform where talent meets opportunity, 
              enabling businesses to grow and freelancers to thrive in the digital economy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Why We Started SB Works</h3>
              <p className="text-gray-600">
                Founded in 2020, SB Works emerged from a simple observation: the traditional hiring process 
                was broken. Companies struggled to find skilled talent quickly, while talented freelancers 
                had difficulty showcasing their expertise to the right clients.
              </p>
              <p className="text-gray-600">
                Our founders, having experienced these challenges firsthand, set out to create a platform 
                that would bridge this gap through technology, transparency, and trust.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <img 
                src="/placeholder.svg" 
                alt="Team collaboration" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-xl text-gray-600">
              We've built more than just a marketplace - we've created an ecosystem for success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate individuals behind SB Works
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover bg-gray-200"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparency",
                description: "We believe in open communication, clear expectations, and honest feedback throughout every interaction."
              },
              {
                title: "Quality",
                description: "We maintain high standards for both clients and freelancers, ensuring exceptional results on every project."
              },
              {
                title: "Innovation",
                description: "We continuously improve our platform with cutting-edge technology and user-centered design."
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Whether you're looking to hire top talent or showcase your skills, SB Works is your platform for success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started Today
              </Button>
            </Link>
            <Link to="/projects">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Browse Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
