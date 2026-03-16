# Logo Setup Instructions

## Required Logo File

Place your company logo at: `frontend/public/assets/cslogo.jpeg`

### Logo Specifications:
- **Format**: JPEG or PNG
- **Recommended Size**: 200x200 pixels minimum
- **Background**: Transparent (for PNG) or white background
- **File Name**: `cslogo.jpeg` (exactly as specified)

### Favicon Setup:
1. Crop the hexagon CS icon from your logo
2. Create a favicon.ico file (16x16, 32x32, 48x48 sizes)
3. Place it at: `frontend/public/favicon.ico`

### Additional Logo Sizes (Optional):
- `frontend/public/logo192.png` - 192x192 pixels
- `frontend/public/logo512.png` - 512x512 pixels

## Current Implementation:
The logo is used in:
- Navbar (height: 48px)
- Footer (height: 40px)
- Dark mode: Logo is wrapped in a white background pill for visibility

## If Logo File is Missing:
The application will show a broken image icon. Please ensure the logo file is placed in the correct location before deployment.
