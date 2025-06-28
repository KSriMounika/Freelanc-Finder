import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Briefcase, 
  Star, 
  DollarSign, 
  Clock, 
  MessageSquare,
  FileText,
  Settings,
  Heart,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userType] = useState("freelancer"); // This would come from user profile

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Mock user data
  const freelancerData = {
    name: "John Doe",
    title: "Full Stack Developer",
    avatar: "/placeholder.svg",
    rating: 4.8,
    completedProjects: 47,
    earnings: 28500,
    successRate: 96,
    responseTime: "2 hours",
    activeProjects: [
      {
        id: 1,
        title: "E-commerce Website Development",
        client: "TechCorp Solutions",
        progress: 75,
        deadline: "Dec 25, 2024",
        budget: "$2,500"
      },
      {
        id: 2,
        title: "Mobile App UI Design",
        client: "StartupVentures",
        progress: 40,
        deadline: "Jan 5, 2025",
        budget: "$1,200"
      }
    ],
    recentMessages: [
      {
        id: 1,
        client: "TechCorp Solutions",
        message: "Great progress on the project! Could you...",
        time: "2 hours ago",
        unread: true
      },
      {
        id: 2,
        client: "Digital Marketing Pro",
        message: "Thanks for the quick turnaround...",
        time: "1 day ago",
        unread: false
      }
    ]
  };

  const clientData = {
    name: "Sarah Johnson",
    company: "TechCorp Solutions",
    avatar: "/placeholder.svg",
    postedProjects: 12,
    activeHires: 3,
    totalSpent: 45000,
    averageRating: 4.9
  };

  const stats = userType === "freelancer" 
    ? [
        { label: "Completed Projects", value: freelancerData.completedProjects, icon: Briefcase },
        { label: "Average Rating", value: freelancerData.rating, icon: Star },
        { label: "Total Earnings", value: `$${freelancerData.earnings.toLocaleString()}`, icon: DollarSign },
        { label: "Success Rate", value: `${freelancerData.successRate}%`, icon: TrendingUp }
      ]
    : [
        { label: "Posted Projects", value: clientData.postedProjects, icon: Briefcase },
        { label: "Active Hires", value: clientData.activeHires, icon: User },
        { label: "Total Spent", value: `$${clientData.totalSpent.toLocaleString()}`, icon: DollarSign },
        { label: "Average Rating Given", value: clientData.averageRating, icon: Star }
      ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">
                  {user.email?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.email}
                </h1>
                <p className="text-lg text-gray-600">Full Stack Developer</p>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue={userType === "freelancer" ? "projects" : "posted"} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value={userType === "freelancer" ? "projects" : "posted"}>
              {userType === "freelancer" ? "Active Projects" : "Posted Projects"}
            </TabsTrigger>
            <TabsTrigger value={userType === "freelancer" ? "applications" : "applications"}>
              {userType === "freelancer" ? "Applications" : "Applications Received"}
            </TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Active Projects (Freelancer) / Posted Projects (Client) */}
          <TabsContent value={userType === "freelancer" ? "projects" : "posted"} className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {userType === "freelancer" ? "Active Projects" : "Posted Projects"}
              </h2>
              {userType === "client" && (
                <Button>Post New Project</Button>
              )}
            </div>
            
            {userType === "freelancer" ? (
              <div className="space-y-4">
                {freelancerData.activeProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <p className="text-gray-600">Client: {project.client}</p>
                        </div>
                        <Badge variant="outline">{project.budget}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="w-full" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            Due: {project.deadline}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Message Client
                            </Button>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects posted yet</h3>
                <p className="text-gray-600 mb-4">Start by posting your first project to find talented freelancers</p>
                <Button>Post Your First Project</Button>
              </div>
            )}
          </TabsContent>

          {/* Applications */}
          <TabsContent value="applications" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {userType === "freelancer" ? "My Applications" : "Applications Received"}
            </h2>
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600">
                {userType === "freelancer" 
                  ? "Start applying to projects that match your skills"
                  : "Applications will appear here when freelancers apply to your projects"
                }
              </p>
            </div>
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
            {userType === "freelancer" && (
              <div className="space-y-4">
                {freelancerData.recentMessages.map((message) => (
                  <Card key={message.id} className={`cursor-pointer hover:shadow-md transition-shadow ${message.unread ? 'border-blue-200' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{message.client}</h4>
                            {message.unread && (
                              <Badge variant="default" className="text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{message.message}</p>
                        </div>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Management</h3>
                  <p className="text-gray-600 mb-4">Update your profile information, skills, and portfolio</p>
                  <Button>Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
