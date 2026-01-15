# Quick Start Guide

## Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

## Project Structure

- `src/components/` - All React components
- `src/pages/` - Page components (Home, Archive)
- `src/data/projects.js` - Project data (edit this to add/update projects)
- `public/assets/` - Static assets (images, PDFs)
- `assets/` - Original assets folder (kept for reference)

## Key Features Implemented

✅ Scroll-triggered project card animations
✅ Hover states revealing tech stack
✅ Project detail modal
✅ Archive page with search and filter
✅ Contact modal with form
✅ Responsive navigation with mobile menu
✅ Accessibility features (keyboard nav, ARIA labels)
✅ Performance optimizations (lazy loading)

## Next Steps

1. **Customize content:**
   - Edit `src/data/projects.js` to update projects
   - Update personal info in components
   - Add your own images to `public/assets/`

2. **Connect contact form:**
   - Currently uses a mock submission
   - Integrate with Formspree, Netlify Forms, or your backend API
   - Update `src/components/Contact.jsx` handleSubmit function

3. **Deploy:**
   - Build: `npm run build`
   - Deploy `dist` folder to Vercel, Netlify, or Render

## Notes

- Images should be placed in `public/assets/` folder
- Resume PDF should be in `public/assets/` folder
- All image paths in `src/data/projects.js` use `/assets/` prefix
