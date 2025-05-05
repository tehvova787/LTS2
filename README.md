# AI Trading Education Platform

A modern, innovative AI-powered trading education platform built with Next.js, React, and Tailwind CSS. The platform leverages artificial intelligence to provide personalized learning experiences for traders of all levels.

## Features

- 🧠 AI-powered personalized learning paths
- 📊 Interactive trading simulations
- 📈 Adaptive content based on skill level
- 💬 24/7 AI assistant for support
- 📱 Fully responsive design
- 📌 Progress tracking and analytics
- 🏆 Gamification with achievements and badges
- 📝 Real-time quizzes and assessments

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js for 3D elements

## AI Capabilities

- **Personalized Learning**: AI analyzes user knowledge levels and creates tailored learning paths
- **Adaptive Content**: Content difficulty dynamically adjusts based on user performance
- **Learning Style Analysis**: AI identifies preferred learning styles and adapts content delivery
- **Smart Recommendations**: Course and practice recommendations based on progress and goals
- **24/7 Support**: AI assistant answers trading questions and provides guidance
- **Progress Analytics**: In-depth analysis of learning patterns and improvement opportunities

## AI Assistant Configuration

The platform includes a global AI assistant that is available on all pages. To configure the AI assistant:

1. Create a `.env.local` file in the root directory
2. Add your OpenAI API key:
```
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```
3. Alternatively, you can use Azure OpenAI API:
```
NEXT_PUBLIC_AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT=your_azure_openai_endpoint_here
```

Without a valid API key, the assistant will fall back to predefined responses for common questions.

## Project Structure

```
trading-education/
├── app/
│   ├── trading-education/         # Main platform pages
│   │   ├── dashboard/             # User dashboard
│   │   ├── courses/               # Course listings and lessons
│   │   ├── analytics/             # Learning analytics
│   │   ├── practice/              # Trading simulations
│   │   └── profile/               # User profile and settings
├── components/
│   ├── trading-education/         # Platform-specific components
│   │   ├── dashboard/             # Dashboard components
│   │   ├── courses/               # Course-related components
│   │   ├── analytics/             # Analytics visualizations
│   │   ├── practice/              # Simulation components
│   │   ├── profile/               # Profile components
│   │   └── shared/                # Shared components (AI Assistant, etc.)
│   ├── shared/                    # Global shared components
│       └── GlobalAIChat.tsx       # Global AI chat component
├── services/
│   └── aiService.ts               # AI service for handling API communication
```

## Installation and Setup

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your API keys as described in the AI Assistant Configuration section.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000/trading-education](http://localhost:3000/trading-education) in your browser.

## Building for Production

```bash
npm run build
```

## Platform Modules

### Dashboard
Central hub showing learning progress, recommended courses, and next steps.

### Courses
Adaptive learning content with video lessons, interactive examples, and AI-guided explanations.

### Analytics
Detailed insights into learning progress, strengths, and areas for improvement.

### Practice
Risk-free trading simulations with AI feedback and performance analysis.

### Profile
User settings, learning preferences, and personalization options.

## AI Assistance

The platform includes an AI chat assistant available throughout the learning experience to:
- Answer trading-related questions
- Provide clarification on concepts
- Suggest relevant learning resources
- Help troubleshoot practice sessions
- Offer personalized advice

The AI assistant is available globally on all pages of the site, allowing users to get help whenever they need it.

## License

MIT 