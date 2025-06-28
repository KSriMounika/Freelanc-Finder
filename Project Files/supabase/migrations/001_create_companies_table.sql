
-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo TEXT,
  industry VARCHAR(100) NOT NULL,
  size VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0.0,
  reviews INTEGER DEFAULT 0,
  description TEXT,
  active_projects INTEGER DEFAULT 0,
  total_hires INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample companies data
INSERT INTO companies (name, industry, size, location, rating, reviews, description, active_projects, total_hires, verified, skills) VALUES
('TechCorp Solutions', 'Technology', '50-200 employees', 'San Francisco, CA', 4.8, 156, 'Leading software development company specializing in enterprise solutions and cloud technologies.', 12, 89, true, '{"React", "Node.js", "AWS", "Python"}'),
('Digital Marketing Pro', 'Marketing', '10-50 employees', 'New York, NY', 4.6, 92, 'Full-service digital marketing agency helping businesses grow their online presence.', 8, 134, true, '{"SEO", "Content Marketing", "Social Media", "PPC"}'),
('Creative Studios Inc', 'Design', '10-50 employees', 'Los Angeles, CA', 4.9, 78, 'Award-winning creative agency specializing in branding, web design, and multimedia content.', 15, 67, true, '{"Graphic Design", "Branding", "Video Production", "Web Design"}'),
('StartupVentures', 'Startup', '1-10 employees', 'Austin, TX', 4.4, 34, 'Fast-growing startup developing innovative mobile applications for the healthcare industry.', 5, 23, false, '{"Mobile Development", "Healthcare", "UI/UX", "API Development"}'),
('Analytics Corp', 'Data Science', '200+ employees', 'Seattle, WA', 4.7, 203, 'Data analytics and business intelligence company serving Fortune 500 clients.', 18, 145, true, '{"Data Analysis", "Machine Learning", "Python", "Tableau"}'),
('E-commerce Experts', 'E-commerce', '50-200 employees', 'Miami, FL', 4.5, 118, 'Specialized e-commerce development and consulting firm with expertise in Shopify and WooCommerce.', 22, 178, true, '{"Shopify", "WooCommerce", "E-commerce", "Digital Marketing"}'),
('Global Consulting Group', 'Technology', '200+ employees', 'Chicago, IL', 4.7, 289, 'International consulting firm providing technology solutions and digital transformation services.', 25, 256, true, '{"Consulting", "Digital Transformation", "Enterprise Software", "Cloud Migration"}'),
('Design Collective', 'Design', '10-50 employees', 'Portland, OR', 4.8, 145, 'Collaborative design studio focusing on sustainable and user-centered design solutions.', 11, 98, true, '{"UX Design", "Sustainable Design", "Product Design", "Design Systems"}'),
('FinTech Innovations', 'Technology', '50-200 employees', 'Boston, MA', 4.6, 167, 'Financial technology company developing cutting-edge payment and investment platforms.', 14, 112, true, '{"FinTech", "Blockchain", "Payment Systems", "Mobile Banking"}'),
('Content Creators Hub', 'Marketing', '10-50 employees', 'Nashville, TN', 4.5, 87, 'Content marketing agency specializing in video production and social media strategy.', 9, 76, true, '{"Video Production", "Content Strategy", "Social Media", "Influencer Marketing"}');

-- Create index for better search performance
CREATE INDEX IF NOT EXISTS idx_companies_industry ON companies(industry);
CREATE INDEX IF NOT EXISTS idx_companies_size ON companies(size);
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_companies_description ON companies USING gin(to_tsvector('english', description));

-- Enable Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to companies
CREATE POLICY "Allow public read access to companies" ON companies
FOR SELECT USING (true);
