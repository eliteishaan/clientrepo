# Vivaan Portfolio: CMS User Guide

Welcome to the Sanity Studio content management system for the Vivaan Portfolio. This guide will help you manage your content securely without needing a developer.

## Accessing the Studio
Navigate to `yourwebsite.com/studio` to access the Sanity dashboard. You will need to log in with your authorized account.

## Singleton Documents (Settings)
Singletons are special documents that exist only once. You **cannot** delete them or duplicate them to prevent breaking the layout.

- **Website Settings**: Manage your global navigation links, footer links, homepage hero configuration, and default SEO (titles, descriptions, OG images).
- **Portfolio Owner**: Manage your bio, primary role, key metrics (max 4), and calls-to-action on the homepage.
- **Resume Download**: Upload the current PDF of your resume and define its version string (e.g., "Fall 2026").

## Standard Collections (Content)
Collections contain multiple items that can be reordered and published individually.

### Projects
When creating a Project:
- **Cover Image**: Required. Used for the project grid on the homepage and the main cinematic hero on the project page. Ensure you use the crop/hotspot tool to focus the image properly.
- **Slug**: Required. This generates the URL for the project. Make sure it is unique.
- **Ordering**: You can reorder "Featured Projects" by dragging and dropping them in the Studio list. The frontend will automatically respect this order.
- **Rich Text (Research, Design, Testing)**: You can freely add bold text, lists, and images in these sections. 

### Experience
- Add your work history. Ensure the "Cover Image" is uploaded to give the timeline its cinematic look.
- **Ordering**: The frontend automatically sorts Experience chronologically by `Start Date`.

### Education & Awards
- Enter your academic history and accolades.
- **Ordering**: These are automatically sorted chronologically by `Start Date` or `Date`.

## Publishing Workflow
1. **Drafts**: Any changes you make are auto-saved as a *Draft*. They will not appear on the live site until you hit **Publish**.
2. **Publish**: Click the green **Publish** button in the bottom right corner of the document to push changes live.
3. **Discard Changes**: If you make a mistake while drafting, click the arrow next to Publish and select "Discard Changes" to revert to the last published version.

## Image Upload Guidelines
- **Format**: `.webp` or `.jpg` are recommended for photography. `.png` or `.svg` for logos and blueprints.
- **Hotspot**: Always use the Sanity Hotspot tool (the little target icon on uploaded images) to tell the system what the most important part of the image is. This ensures it looks good on mobile devices when cropped.
- **Alt Text**: Always provide Alt Text for images to ensure your portfolio remains accessible and scores highly on SEO.

## Safe Deletion
You can safely delete Projects, Experiences, Education, and Awards by clicking the three dots in the document view and selecting "Delete". 
*Note: Singletons like Website Settings and Portfolio Owner cannot be deleted.*
