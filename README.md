# Investo Investment Platform

A full-stack investment platform built with React, TypeScript,  Node.js and Mysql

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons

### Backend
- Node.js + Express
- TypeScript
- MySQL database
- RESTful API architecture

## Quick Start

### Prerequisites
- Node.js (LTS version)
- MySQL 8.0+
- npm or yarn

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Frontend runs at `http://localhost:5173`

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create and configure .env file
cp .env.example .env
# Edit .env with your MySQL credentials

# Initialize database
mysql -u root -p < src/db/schema.sql

# Start development server
npm run dev
```
Backend runs at `http://localhost:3000`

## Development

### Available Scripts

#### Frontend
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

#### Backend
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

### Project Structure
```
investo-investment-platform/
├── src/                    # Frontend source
├── public/                 # Static assets
├── backend/
│   ├── src/
│   │   ├── db/           # Database schema
│   │   ├── routes/       # API routes
│   │   ├── models/       # Database models
│   │   └── index.ts      # Server entry
│   ├── package.json
│   └── tsconfig.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

## Database Schema

The application uses MySQL with the following main tables:
- `users` - User accounts
- `portfolios` - Investment portfolios
- `investments` - Individual investments
- `transactions` - Investment transactions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


