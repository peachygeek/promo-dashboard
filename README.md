# Promo Dashboard

A responsive promotional-offers dashboard built with **React Native for Web**. The application renders in the browser while leveraging React Native's component model, styling system, and platform APIs.

## Tech Stack

| Concern             | Technology                                       |
| ------------------- | ------------------------------------------------ |
| **Core**            | React Native 0.76, React 18                      |
| **Web target**      | `react-native-web` 0.19                          |
| **Bundler**         | Expo 52 (Metro for web)                          |
| **Navigation**      | React Navigation 6 (`@react-navigation/native`)  |
| **Data fetching**   | TanStack Query v5                                |
| **State management**| React Context + `useReducer`                     |
| **Styling**         | `StyleSheet.create` (no CSS files)               |
| **Testing**         | Jest + React Native Testing Library              |
| **Mock API**        | JSON Server                                      |
| **Linting**         | ESLint + Prettier                                |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

Start the mock API server and the web app:

```bash
# Terminal 1: Start mock API
npm run mock-api

# Terminal 2: Start Expo for web
npm run web
```

The app will be available at `http://localhost:8081` and the mock API at `http://localhost:3001`.

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage
```

### Linting

```bash
npm run lint
npm run format
```

## Project Structure

```
promo-dashboard/
├── src/
│   ├── api/              # API client, React Query setup
│   ├── components/       # Reusable presentational components
│   ├── hooks/            # Custom hooks (usePromotions, useBreakpoint, etc.)
│   ├── navigation/       # React Navigation stack setup
│   ├── screens/          # Screen-level components
│   ├── state/            # Zustand store for filter state
│   ├── theme/            # Design tokens (colors, spacing, typography)
│   ├── types/            # TypeScript interfaces & enums
│   ├── utils/            # Date helpers, config
│   └── App.tsx           # Root application component
├── __tests__/            # Test files mirroring src/
├── db.json               # Mock API data (16 promotions)
├── .env.development      # Dev environment config
└── .env.production       # Production environment config
```

## Features

- **Promotion List**: Fetches promotions from mock API, renders in a responsive `FlatList` grid
- **Filter & Search**: Filter by category (Casino, Sports, Live Casino, Poker, General), status (active/expired), and free-text search
- **Opt-In / Opt-Out**: Toggle participation with optimistic UI updates and automatic rollback on failure
- **Detail View**: Navigate to promotion details via React Navigation stack
- **Responsive Layout**: Adapts from 1-column (mobile) to 2-column (tablet) to 3-column (desktop) using `useWindowDimensions`
- **Error & Loading States**: Animated skeleton loaders, error boundaries with retry, and pull-to-refresh
- **Accessibility**: `accessibilityLabel`, `accessibilityRole`, keyboard-navigable `Pressable` elements

## Environment Configuration

API base URL is configured via `.env` files:

- `.env.development` — points to `http://localhost:3001` (JSON Server)
- `.env.production` — points to production API URL

The URL is read at runtime via `expo-constants`, never hard-coded.
