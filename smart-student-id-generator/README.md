# Smart Student ID Generator

A modern web application for generating professional student ID cards with QR code integration.

## 📋 Overview

The Smart Student ID Generator is a mini version of a larger school management system's ID card generation module. It enables users to create, preview, save, and download student ID cards.

## 🛠️ Technical Stack

- **Frontend**: ReactJS 18+
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Styling**: TailwindCSS
- **QR Code**: qrcode.react
- **Image Generation**: html-to-image
- **Data Persistence**: localStorage

## ✨ Features

### Student Data Form

Captures essential student information:
- Name
- Roll Number
- Class & Division (dropdown)
- Allergies (multi-select)
- Photo Upload (with preview)
- Rack Number
- Bus Route Number (dropdown)

### Smart ID Card Preview

Generates a professional ID card displaying:
- Student information
- Uploaded photo
- QR code containing full JSON data of the student
- Special highlighting for allergies
- Bus and rack numbers

### Template Switching

Two professionally designed templates:
- **Standard**: Clean, professional design with all essential information
- **Premium**: Enhanced design with gradient backgrounds and improved visual hierarchy

### Data Persistence

- ID cards are saved to localStorage
- Users can browse, search, and manage previously generated cards
- Cards can be downloaded as PNG images

## 🧠 Implementation Approach

### Form Design & Data Capture

I designed the form to be user-friendly while capturing all required data points. Each field includes proper validation, and the multi-select allergies implementation provides a seamless experience for selection and deselection.

### QR Code Integration

The QR code contains the complete student information in JSON format, making it scannable and machine-readable. This allows for quick data retrieval when scanned with a compatible device.

### Responsive Layout

The application is fully responsive, with a grid-based layout that adapts to different screen sizes. On small screens, the layout shifts to a vertical orientation for better user experience.

### Persistent Storage

Student data is stored in localStorage, allowing for:
- Retrieval of previously generated ID cards
- Searchable list of students
- Managing (viewing/deleting) existing cards

### Accessibility

Special attention was paid to accessibility features including:
- Proper ARIA attributes
- Semantic HTML elements
- Keyboard navigation support
- Screen reader friendly elements

## 📈 Future Enhancements

Given more time, the application could be enhanced with:
- Authentication for multi-user support
- Backend integration for cloud storage
- Bulk ID card generation
- Custom template creation
- PDF export for multiple cards
- Barcode scanner integration for quick access

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `bun install`
3. Start the development server: `bun run dev`

## 📷 Screenshots

[Screenshots would be included here in a production README]
