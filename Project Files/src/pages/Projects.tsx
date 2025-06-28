import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Heart, Clock, DollarSign, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      description: "Looking for an experienced developer to build a modern e-commerce website with React and Node.js. The site should include payment integration, user authentication, and admin dashboard.",
      budget: "$2,000 - $5,000",
      category: "Web Development",
      skills: ["React", "Node.js", "MongoDB", "Stripe"],
      timePosted: "2 hours ago",
      proposals: 8,
      client: "TechCorp Solutions",
      urgent: false
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      description: "Need a creative designer to design the user interface for a fitness tracking mobile app. Looking for modern, clean designs with great user experience.",
      budget: "$800 - $1,500",
      category: "UI/UX Design",
      skills: ["Figma", "Adobe XD", "Mobile Design", "Prototyping"],
      timePosted: "4 hours ago",
      proposals: 12,
      client: "FitLife Inc",
      urgent: true
    },
    {
      id: 3,
      title: "Content Writing for Blog",
      description: "Seeking experienced content writers to create engaging blog posts about technology trends. Need 10 articles, 1000 words each, with SEO optimization.",
      budget: "$500 - $800",
      category: "Content Writing",
      skills: ["SEO", "Blog Writing", "Technology", "Research"],
      timePosted: "6 hours ago", 
      proposals: 15,
      client: "Digital Marketing Pro",
      urgent: false
    },
    {
      id: 4,
      title: "Logo Design & Branding",
      description: "Startup company needs a professional logo design and complete branding package including business cards, letterhead, and brand guidelines.",
      budget: "$300 - $600",
      category: "Graphic Design",
      skills: ["Logo Design", "Branding", "Adobe Illustrator", "Print Design"],
      timePosted: "1 day ago",
      proposals: 22,
      client: "StartupVentures",
      urgent: false
    },
    {
      id: 5,
      title: "Data Analysis & Visualization",
      description: "Need data scientist to analyze customer data and create interactive dashboards. Experience with Python, Pandas, and Tableau required.",
      budget: "$1,200 - $2,000",
      category: "Data Science",
      skills: ["Python", "Pandas", "Tableau", "Data Analysis"],
      timePosted: "1 day ago",
      proposals: 6,
      client: "Analytics Corp",
      urgent: true
    },
    {
      id: 6,
      title: "Video Editing for YouTube",
      description: "Looking for video editor to edit weekly YouTube videos. Need someone who can add graphics, transitions, and color correction.",
      budget: "$200 - $400",
      category: "Video Editing",
      skills: ["Adobe Premiere", "After Effects", "YouTube", "Color Grading"],
      timePosted: "2 days ago",
      proposals: 18,
      client: "ContentCreator",
      urgent: false
    }
  ];

  const categories = ["all", "Web Development", "UI/UX Design", "Content Writing", "Graphic Design", "Data Science", "Video Editing"];
  const budgetRanges = ["all", "Under $500", "$500-$1000", "$1000-$2000", "Over $2000"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleApplyProject = (projectId: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to apply for projects",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully!",
    });
    console.log(`Applied to project ${projectId} by user ${user.id}`);
  };

  const handleSaveProject = (projectId: number) => {
    if (!user) {
      toast({
        title: "Authentication Required", 
        description: "Please sign in to save projects",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    toast({
      title: "Project Saved",
      description: "Project has been saved to your favorites!",
    });
    console.log(`Saved project ${projectId} by user ${user.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Projects</h1>
          <p className="text-xl text-gray-600">Find your next opportunity from {projects.length} active projects</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search projects, skills, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={budgetFilter} onValueChange={setBudgetFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Budget Range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map(range => (
                  <SelectItem key={range} value={range}>
                    {range === "all" ? "All Budgets" : range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl text-blue-600 hover:text-blue-800 cursor-pointer">
                        {project.title}
                      </CardTitle>
                      {project.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          URGENT
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Project Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {project.budget}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {project.proposals} proposals
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {project.timePosted}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {project.client}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 ml-4">
                    <Button 
                      onClick={() => handleSaveProject(project.id)}
                      variant="outline" 
                      size="sm"
                      className="w-10 h-10 p-0"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{project.category}</Badge>
                  <Button 
                    onClick={() => handleApplyProject(project.id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Projects
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
