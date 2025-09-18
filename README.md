# PDF Generator App

A Next.js application for collecting user details and generating PDFs.

## Features

- **Form Screen**: Collect user information with validation
- **PDF Preview Screen**: Preview and download user details as PDF
- **Form Validation**: Required fields with proper validation
- **PDF Generation**: Generate PDFs using jsPDF

## Form Fields

- Name (required)
- Email (required, with email validation)
- Phone Number (required, minimum 10 digits)
- Position (optional)
- Description (optional, multiline)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- Next.js 15
- TypeScript
- React Hook Form
- Zod (validation)
- jsPDF (PDF generation)
- Tailwind CSS

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Then deploy to Vercel platform.