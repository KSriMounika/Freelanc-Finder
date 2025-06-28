
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Users, Star, Briefcase, CheckCircle } from "lucide-react";
import { companiesService } from "@/services/companiesService";

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const companiesPerPage = 6;

  const { data: companiesData, isLoading, error } = useQuery({
    queryKey: ['companies', { searchTerm, industryFilter, sizeFilter, offset: currentPage * companiesPerPage }],
    queryFn: () => companiesService.getCompanies({
      searchTerm,
      industry: industryFilter,
      size: sizeFilter,
      offset: currentPage * companiesPerPage,
      limit: companiesPerPage
    })
  });

  const companies = companiesData?.data || [];
  const totalCompanies = companiesData?.count || 0;

  const industries = ["all", "Technology", "Marketing", "Design", "Startup", "Data Science", "E-commerce"];
  const sizes = ["all", "1-10 employees", "10-50 employees", "50-200 employees", "200+ employees"];

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const hasMoreCompanies = (currentPage + 1) * companiesPerPage < totalCompanies;

  if (isLoading && companies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading companies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading companies. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Top Companies</h1>
          <p className="text-xl text-gray-600">Discover amazing companies looking for talent</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={industryFilter} onValueChange={(value) => {
              setIndustryFilter(value);
              setCurrentPage(0);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry === "all" ? "All Industries" : industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sizeFilter} onValueChange={(value) => {
              setSizeFilter(value);
              setCurrentPage(0);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Company Size" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map(size => (
                  <SelectItem key={size} value={size}>
                    {size === "all" ? "All Sizes" : size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {companies.length} of {totalCompanies} companies
          </p>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {companies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={company.logo || "/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                        {company.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <p className="text-sm text-gray-600">{company.industry}</p>
                    </div>
                  </div>
                  {company.verified && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{company.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {company.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    {company.size}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {company.rating} ({company.reviews} reviews)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    {company.active_projects} active projects
                  </div>
                </div>

                {/* Skills */}
                {company.skills && company.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {company.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {company.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{company.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <Button className="w-full" variant="outline">
                  View Company
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {hasMoreCompanies && (
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More Companies"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
