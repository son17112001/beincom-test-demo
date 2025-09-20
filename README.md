# {{projectName}}

{{projectDescription}}

## ✨ Features

- **Next.js 14** - React framework with App Router
- **Modern UI Components** - Reusable component library with SCSS modules
- **Internationalization** - Multi-language support with react-intl
- **State Management** - TanStack Query for server state
- **Form Handling** - RC Field Form integration
- **Data Visualization** - ApexCharts integration
- **File Upload** - React Dropzone integration
- **Rich Text Editor** - Quill editor
- **Drag & Drop** - DND Kit for interactive interfaces
- **Responsive Design** - Mobile-first approach
- **Type Safety** - ESLint and Prettier configuration
- **Performance** - Optimized with Next.js features

## 📋 Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the template:**
   ```bash
   npx create-next-app@latest my-app --template https://github.com/yourusername/nextjs-admin-template
   ```

2. **Navigate to project directory:**
   ```bash
   cd my-app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   NEXT_PUBLIC_APP_NAME={{projectName}}
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
{{projectName}}/
├── components/           # Reusable UI components
│   ├── Common/          # Basic components (Button, Input, etc.)
│   ├── layouts/         # Layout components
│   └── Pages/           # Page-specific components
├── constants/           # Application constants
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── locales/             # Internationalization files
├── middlewares/         # Next.js middlewares
├── pages/               # Next.js pages
├── public/              # Static assets
├── services/            # API services
├── styles/              # Global styles and SCSS
└── utils/               # Utility functions
```

## 🎨 Component Library

The template includes a comprehensive component library:

### Common Components
- **Button** - Various button styles and states
- **Input** - Form inputs with validation
- **Modal** - Modal dialogs and overlays
- **Table** - Data tables with sorting and pagination
- **Form** - Form components with validation
- **Loading** - Loading states and spinners
- **Alert** - Notification and alert components

### Layout Components
- **Header** - Application header
- **Sidebar** - Navigation sidebar
- **Footer** - Application footer
- **Layout** - Main layout wrapper

## 🌐 Internationalization

The template supports multiple languages:

1. **Add new locale:**
   ```bash
   # Add new locale to next.config.js
   locales: ['en', 'vi', 'fr']
   ```

2. **Create locale file:**
   ```json
   // locales/fr.json
   {
     "common": {
       "save": "Enregistrer",
       "cancel": "Annuler"
     }
   }
   ```

3. **Use in components:**
   ```jsx
   import { useIntl } from 'react-intl';

   const intl = useIntl();
   const saveText = intl.formatMessage({ id: 'common.save' });
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME={{projectName}}

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database (if applicable)
DATABASE_URL=your-database-url

# External Services
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

### Next.js Configuration

The template includes optimized Next.js configuration:

- **Image Optimization** - Configured for multiple domains
- **Internationalization** - Multi-language support
- **Webpack Configuration** - SVG support and SCSS modules
- **Security Headers** - Basic security configuration

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

## 🎯 Development Guidelines

### Code Style
- Use ESLint and Prettier for consistent code formatting
- Follow the existing component structure
- Use SCSS modules for styling
- Implement proper TypeScript types (if using TS)

### Component Development
- Create components in the appropriate directory
- Export components through index files
- Use SCSS modules for component-specific styles
- Implement proper prop validation

### State Management
- Use TanStack Query for server state
- Use React Context for global client state
- Implement proper error handling

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms
The template is compatible with any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [TanStack Query](https://tanstack.com/query) - Data fetching
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [ApexCharts](https://apexcharts.com/) - Data visualization

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](docs/)
2. Search [existing issues](https://github.com/yourusername/nextjs-admin-template/issues)
3. Create a new issue with detailed information

---

Made with ❤️ by {{authorName}}
