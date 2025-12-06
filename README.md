# Drive Lah Documentation

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Deployment](#deployment)

---

## Overview

Drive-Lah is a modern React application built with TypeScript and Vite, featuring a subscription management system for car listing services. The application provides a clean, user-friendly interface for selecting subscription plans and managing add-ons.

### Key Features

- 🚗 Multiple subscription tiers (Just mates, Good mates, Best mates)
- 🔧 Add-on management (GPS, Insurance)
- 💳 Payment card integration
- 🎨 Responsive design with SCSS
- ✅ Comprehensive testing (Unit & E2E)
- ♿ Accessibility focused

---

## Technology Stack

### Core

- **React 19.2.0** - UI framework
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool & dev server
- **React Router DOM 7.10.1** - Routing

### State Management

- **Redux Toolkit 2.11.0** - Global state management
- **React Redux 9.2.0** - React bindings for Redux
- **Redux Persist 6.0.0** - State persistence

### Styling

- **SCSS/Sass 1.94.2** - CSS preprocessing
- Custom design system with variables

### Testing

- **Vitest 4.0.15** - Unit testing
- **Playwright 1.57.0** - E2E testing
- **Testing Library** - Component testing
- **axe-core** - Accessibility testing

### Code Quality

- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript ESLint** - Type-aware linting

---

## Project Structure

```
drive-lah/
├── src/
│   ├── subscription/
│   │   ├── components/
│   │   │   ├── PlanCard.tsx
│   │   │   └── PlanCard.scss
│   │   ├── sections/
│   │   │   ├── PlanSection.tsx
│   │   │   ├── AddOnsSection.tsx
│   │   │   ├── CardDetailsSection.tsx
│   │   │   └── InfoSection.tsx
│   │   ├── hooks/
│   │   │   └── useSubscription.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── icons/
│   │       └── index.tsx
│   ├── shared/
│   │   └── styles/
│   │       └── variables.scss
│   ├── store/
│   │   └── index.ts
│   └── App.tsx
├── tests/
│   ├── unit/
│   └── e2e/
├── playwright.config.ts
├── vitest.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Key Directories

- **`src/subscription/`** - Subscription feature module
- **`src/shared/`** - Shared utilities, styles, and components
- **`src/store/`** - Redux store configuration
- **`tests/`** - Test files (unit and E2E)

---

## Getting Started

### Prerequisites

- Node.js 20+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone
cd drive-lah

# Install dependencies
bun install

# OR

npm install

# Start development server
bun run dev

# OR

npm run dev
```

### Available Scripts

```bash
# Development
bun run dev              # Start dev server

# Building
bun run build            # Build for production
bun run preview          # Preview production build

# Testing
bun run test             # Run unit tests
bun run test:ui          # Run unit tests with UI
bun run test:coverage    # Generate coverage report
bun run test:e2e         # Run E2E tests
bun run test:e2e:ui      # Run E2E tests with UI

# Code Quality
bun run lint             # Lint code
bun run lint:fix         # Fix linting issues
```

---

## Development Guidelines

### Component Structure

```typescript
// 1. Imports
import { memo } from "react";
import { ComponentProps } from "./types";
import "./Component.scss";

// 2. Interface/Types
interface Props {
  title: string;
  onAction: () => void;
}

// 3. Component
function Component({ title, onAction }: Props) {
  return (

      {title}
      Action

  );
}

// 4. Export
export default memo(Component);
```

### SCSS/BEM Naming Convention

```scss
.block {
  // Block styles

  &__element {
    // Element styles
  }

  &--modifier {
    // Modifier styles
  }
}
```

### Type Definitions

```typescript
// Always define explicit types
export interface PlanDetails {
  id: PlanType;
  title: string;
  price: string;
  priceLabel?: string;
  features: Feature[];
}

// Use enums for fixed values
export enum PlanType {
  JUST_MATES = "JUST_MATES",
  GOOD_MATES = "GOOD_MATES",
  BEST_MATES = "BEST_MATES",
}
```

### Custom Hooks Pattern

```typescript
export function useSubscription() {
  const [state, setState] = useState(initialState);

  const handleAction = useCallback(() => {
    // Logic here
  }, [dependencies]);

  return {
    state,
    handleAction,
  };
}
```

---

## Testing

### Unit Testing (Vitest)

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Component from "./Component";

describe("Component", () => {
  it("renders correctly", () => {
    render();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

### E2E Testing (Playwright)

```typescript
import { test, expect } from "@playwright/test";

test("user can select a plan", async ({ page }) => {
  await page.goto("/");
  await page.click('[data-testid="plan-good-mates"]');
  await expect(page.locator(".plan-card--selected")).toBeVisible();
});
```

### Testing Configuration

The project uses Playwright's `webServer` configuration to automatically start the dev server:

```typescript
// playwright.config.ts
export default defineConfig({
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Deployment

### Build Process

```bash
# Type check
bun run build

# This runs:
# 1. tsc -b (TypeScript compilation)
# 2. vite build (Production bundle)
```

### Production Build Output

```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── index.html
```

### Environment Variables

Create `.env` files for different environments:

```bash
# .env.development
VITE_API_URL=http://localhost:3000

# .env.production
VITE_API_URL=https://api.production.com
```

---

## Contributing

### Git Workflow

1. Create a feature branch
2. Make changes
3. Run tests and linting
4. Commit with meaningful messages
5. Push and create a pull request

### Commit Messages

Follow conventional commits:

```
feat: add new subscription plan
fix: resolve card validation issue
docs: update README
test: add E2E tests for plan selection
```

### Code Review Checklist

- ✅ TypeScript types are properly defined
- ✅ Components are properly tested
- ✅ SCSS follows BEM naming
- ✅ No console errors or warnings
- ✅ Accessible (keyboard navigation, ARIA)
- ✅ Responsive design implemented

---

## Performance Optimization

### Code Splitting

```typescript
// Use React.lazy for route-based splitting
const Subscription = lazy(() => import('./pages/Subscription'));

// In routing
}>

    } />


```

### Memoization

```typescript
// Memo for expensive components
export default memo(Component);

// useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// useCallback for stable function references
const handleClick = useCallback(() => {
  doSomething();
}, [dependencies]);
```

---

## Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill process on port 5173
npx kill-port 5173
```

**Type errors:**

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
```

**Test failures:**

```bash
# Clear test cache
bun run test --clearCache
```

---

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vite.dev/guide/)
- [Playwright Documentation](https://playwright.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)

---

## Contact

For questions or support, please contact afshalhassan7@gmail.com
