import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Search,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MoreVertical
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

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

  // For now, any authenticated user can access admin (in production, you'd check roles)
  
  // Mock admin stats
  const stats = [
    { label: "Total Users", value: "52,431", icon: Users, change: "+12.5%" },
    { label: "Active Projects", value: "1,247", icon: Briefcase, change: "+8.2%" },
    { label: "Total Revenue", value: "$2.4M", icon: DollarSign, change: "+15.3%" },
    { label: "Platform Growth", value: "18.6%", icon: TrendingUp, change: "+2.1%" }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "user_reported",
      message: "User @freelancer123 reported for spam",
      time: "2 hours ago",
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      type: "project_completed",
      message: "Project 'E-commerce Website' completed successfully",
      time: "4 hours ago",
      status: "completed",
      priority: "low"
    },
    {
      id: 3,
      type: "payment_dispute",
      message: "Payment dispute opened for project #1847",
      time: "6 hours ago",
      status: "pending",
      priority: "high"
    },
    {
      id: 4,
      type: "new_user",
      message: "New user registration: TechCorp Solutions",
      time: "1 day ago",
      status: "verified",
      priority: "low"
    }
  ];

  // Mock user management data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      type: "Freelancer",
      status: "Active",
      joinDate: "2024-01-15",
      projects: 47,
      rating: 4.8
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@techcorp.com",
      type: "Client",
      status: "Active",
      joinDate: "2024-02-20",
      projects: 12,
      rating: 4.9
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@freelance.com",
      type: "Freelancer",
      status: "Suspended",
      joinDate: "2024-03-10",
      projects: 23,
      rating: 3.2
    }
  ];

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      client: "TechCorp Solutions",
      freelancer: "John Doe",
      status: "In Progress",
      budget: "$2,500",
      startDate: "2024-12-01"
    },
    {
      id: 2,
      title: "Mobile App Design",
      client: "StartupVentures",
      freelancer: "Sarah Designer",
      status: "Completed",
      budget: "$1,200",
      startDate: "2024-11-15"
    },
    {
      id: 3,
      title: "Content Writing",
      client: "Digital Marketing Pro",
      freelancer: "Alex Writer",
      status: "Disputed",
      budget: "$600",
      startDate: "2024-12-10"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      "Active": "default",
      "Suspended": "destructive",
      "Pending": "secondary",
      "In Progress": "default",
      "Completed": "secondary",
      "Disputed": "destructive"
    };
    return statusMap[status as keyof typeof statusMap] || "default";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      "high": "text-red-600",
      "medium": "text-yellow-600", 
      "low": "text-green-600"
    };
    return colors[priority as keyof typeof colors] || "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-lg text-gray-600">Monitor and manage the SB Works platform</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Security Center
              </Button>
              <Button>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Reports (3)
              </Button>
            </div>
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
                      <p className="text-sm text-green-600">{stat.change} from last month</p>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                            {activity.priority.toUpperCase()}
                          </span>
                          <Badge variant={getStatusBadge(activity.status) as any} className="text-xs">
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Users className="w-6 h-6 mb-2" />
                      Manage Users
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Briefcase className="w-6 h-6 mb-2" />
                      Review Projects
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Shield className="w-6 h-6 mb-2" />
                      Security Center
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <AlertTriangle className="w-6 h-6 mb-2" />
                      Handle Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search users..." className="pl-10 w-64" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="freelancer">Freelancers</SelectItem>
                    <SelectItem value="client">Clients</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar className="w-10 h-10 mr-3">
                                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{user.type}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={getStatusBadge(user.status) as any}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.projects}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.rating}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search projects..." className="pl-10 w-64" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="disputed">Disputed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Client:</span> {project.client}
                          </div>
                          <div>
                            <span className="font-medium">Freelancer:</span> {project.freelancer}
                          </div>
                          <div>
                            <span className="font-medium">Budget:</span> {project.budget}
                          </div>
                          <div>
                            <span className="font-medium">Start Date:</span> {project.startDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <Badge variant={getStatusBadge(project.status) as any}>
                          {project.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Reports & Issues</h2>
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No active reports</h3>
              <p className="text-gray-600">All reports have been resolved or are awaiting user action</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
