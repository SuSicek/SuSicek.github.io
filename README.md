# UCHYTIL s.r.o. Vue.js Website

This is the converted Vue.js version of the UCHYTIL s.r.o. website.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Enable PowerShell script execution (if needed):**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── main.js          # Vue app entry point
├── App.vue          # Root component
├── components/      # Reusable components
│   ├── AppHeader.vue
│   └── AppFooter.vue
└── views/           # Page components
    ├── Home.vue
    ├── AboutUs.vue
    ├── ContactUs.vue
    ├── Career.vue
    ├── Job.vue
    ├── References.vue
    ├── ReferenceTemplate.vue
    ├── DivisionTemplate.vue
    └── Eshop.vue
```

## Features Converted

✅ **Completed:**
- Project structure setup with Vite + Vue 3
- Vue Router configuration for all pages
- Home page with slideshow and company stats
- Contact page with leadership and divisions
- Header navigation with services dropdown
- Footer component
- All page templates created
- Responsive design maintained

🔄 **In Progress:**
- JavaScript functionality migration
- CSS optimization
- Animation integration (GSAP)

📋 **To Do:**
- JSON data integration
- Form handling
- Image optimization
- Performance optimization

## Key Changes from Original

1. **Single Page Application (SPA):** Now uses Vue Router instead of separate HTML files
2. **Component Architecture:** Modular, reusable Vue components
3. **Reactive Data:** Vue's reactive system instead of manual DOM manipulation
4. **Modern Build System:** Vite for fast development and optimized builds
5. **ES6+ Modules:** Modern JavaScript module system

## Available Routes

- `/` - Home page
- `/aboutus` - About Us
- `/contact-us` - Contact page
- `/career` - Career opportunities
- `/job` - Job details
- `/references` - Project references
- `/reference/:id` - Individual reference
- `/division/:division` - Division pages (energetika, stavebnictvi, prumysl)
- `/eshop` - E-shop

## Development Notes

- All existing CSS files are preserved and imported globally
- Images and assets remain in their original locations
- JSON data files can be imported directly into components
- GSAP animations need to be properly integrated with Vue lifecycle

## Browser Support

- Chrome 87+
- Firefox 78+
- Safari 14+
- Edge 88+