
# MissionsPerformance.org

A professional website for evaluating the diplomatic efforts of states' Permanent Missions to the United Nations.

## Overview

MissionsPerformance.org is a groundbreaking initiative focused on evaluating diplomatic excellence through key metrics such as voting influence, gender parity, co-sponsorship of resolutions, and overall engagement. Our goal is to enhance the efficiency of the United Nations and create a better world through improved diplomatic practice.

## Features

- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Interactive Statistics Carousel**: Auto-rotating carousel with manual controls
- **Site Search**: Client-side search functionality across all content
- **Contact Forms**: Functional contact and suggestion forms
- **Professional Navigation**: Dropdown menus and intuitive user experience
- **Social Media Integration**: Links to LinkedIn, X (Twitter), and Facebook
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML and ARIA labels
- **SEO Optimized**: Proper meta tags, heading hierarchy, and descriptions

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with flexbox, grid, and animations
- **Vanilla JavaScript**: ES6+ features, no external frameworks
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## Project Structure

```
/
├── index.html                 # Homepage
├── about-us.html             # About Us page
├── contact.html              # Contact form page
├── improve-un.html           # UN improvement suggestions form
├── donate.html               # Donation/support page
├── our-team.html             # Team page (placeholder)
├── join-us.html              # Careers page (placeholder)
├── resources.html            # Resources and links
├── signup.html               # Newsletter signup (placeholder)
├── thematic-issues.html      # Thematic issues analysis (placeholder)
├── countries-regions.html    # Country/regional analysis (placeholder)
├── reports.html              # Research reports (placeholder)
├── assets/
│   ├── css/
│   │   ├── main.css          # Main styles and responsive design
│   │   └── components.css    # Component-specific styles
│   └── js/
│       ├── main.js           # Core functionality and navigation
│       ├── carousel.js       # Statistics carousel functionality
│       └── search.js         # Site search functionality
└── README.md                 # This file
```

## Deployment on GitHub Pages

### Quick Setup

1. **Create a new repository** on GitHub
2. **Upload all files** to the repository root
3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main" (or your default branch)
   - Folder: "/ (root)"
4. **Access your site** at `https://yourusername.github.io/repository-name`

### Detailed Instructions

1. **Create Repository**
   ```bash
   # If using command line
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/repository-name.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Navigate to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Custom Domain** (Optional)
   - In the "Pages" settings, add your custom domain
   - Create a CNAME file in the repository root with your domain name
   - Configure DNS settings with your domain provider

### Important Notes

- GitHub Pages may take a few minutes to deploy initially
- Changes pushed to the main branch will automatically update the site
- The site will be publicly accessible once deployed
- HTTPS is automatically enabled for .github.io domains

## Color Scheme

- **Background**: #FCFAF7 (warm beige)
- **Primary**: #163851 (professional blue)
- **Secondary**: #CEAB5F (elegant gold)
- **Text**: #333333 (dark gray)
- **Text Light**: #666666 (medium gray)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Optimized images and assets
- Minified CSS and JavaScript
- Lazy loading for non-critical content
- Efficient DOM manipulation
- Debounced search functionality

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios
- Responsive text scaling

## Future Enhancements

The website is designed for easy expansion and can accommodate:
- Dynamic content management
- Database integration for reports and data
- User authentication and accounts
- Advanced search and filtering
- Multilingual support
- Analytics integration

## Support

For questions or issues related to the website, please contact the development team or create an issue in the repository.

## License

© 2024 MissionsPerformance.org. All rights reserved.
