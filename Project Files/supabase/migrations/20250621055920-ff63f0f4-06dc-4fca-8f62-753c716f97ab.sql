
-- Create companies table with sample data
CREATE TABLE IF NOT EXISTS public.companies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT,
  industry TEXT NOT NULL,
  size TEXT NOT NULL,
  location TEXT NOT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 0,
  reviews INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  active_projects INTEGER NOT NULL DEFAULT 0,
  total_hires INTEGER NOT NULL DEFAULT 0,
  verified BOOLEAN NOT NULL DEFAULT false,
  skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows everyone to read companies (public data)
CREATE POLICY "Companies are viewable by everyone" 
  ON public.companies 
  FOR SELECT 
  USING (true);

-- Insert sample companies data
INSERT INTO public.companies (name, industry, size, location, rating, reviews, description, active_projects, total_hires, verified, skills) VALUES
('TechCorp Solutions', 'Technology', '50-200 employees', 'San Francisco, CA', 4.8, 156, 'Leading software development company specializing in enterprise solutions and cloud technologies.', 12, 89, true, ARRAY['React', 'Node.js', 'AWS', 'Python']),
('Digital Marketing Pro', 'Marketing', '10-50 employees', 'New York, NY', 4.6, 92, 'Full-service digital marketing agency helping businesses grow their online presence.', 8, 134, true, ARRAY['SEO', 'Content Marketing', 'Social Media', 'PPC']),
('Creative Studios Inc', 'Design', '10-50 employees', 'Los Angeles, CA', 4.9, 78, 'Award-winning creative agency specializing in branding, web design, and multimedia content.', 15, 67, true, ARRAY['Graphic Design', 'Branding', 'Video Production', 'Web Design']),
('StartupVentures', 'Startup', '1-10 employees', 'Austin, TX', 4.4, 34, 'Fast-growing startup developing innovative mobile applications for the healthcare industry.', 5, 23, false, ARRAY['Mobile Development', 'Healthcare', 'UI/UX', 'API Development']),
('Analytics Corp', 'Data Science', '200+ employees', 'Seattle, WA', 4.7, 203, 'Data analytics and business intelligence company serving Fortune 500 clients.', 18, 145, true, ARRAY['Data Analysis', 'Machine Learning', 'Python', 'Tableau']),
('E-commerce Experts', 'E-commerce', '50-200 employees', 'Miami, FL', 4.5, 118, 'Specialized e-commerce development and consulting firm with expertise in Shopify and WooCommerce.', 22, 178, true, ARRAY['Shopify', 'WooCommerce', 'E-commerce', 'Digital Marketing']),
('CloudTech Innovations', 'Technology', '200+ employees', 'Boston, MA', 4.7, 289, 'Enterprise cloud solutions provider helping businesses migrate to modern infrastructure.', 25, 234, true, ARRAY['AWS', 'Azure', 'DevOps', 'Cloud Architecture']),
('Mobile First Agency', 'Design', '10-50 employees', 'Portland, OR', 4.5, 67, 'Specialized mobile app design agency creating beautiful user experiences.', 9, 56, true, ARRAY['Mobile Design', 'React Native', 'Flutter', 'UI/UX']),
('FinTech Solutions', 'Startup', '50-200 employees', 'Chicago, IL', 4.8, 145, 'Financial technology company building next-generation payment solutions.', 14, 89, true, ARRAY['Blockchain', 'Payment Systems', 'React', 'Node.js']),
('Content Creators Hub', 'Marketing', '1-10 employees', 'Denver, CO', 4.3, 42, 'Creative content agency specializing in video production and social media marketing.', 7, 38, false, ARRAY['Video Production', 'Social Media', 'Content Strategy', 'YouTube']);
