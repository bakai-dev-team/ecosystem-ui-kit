# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`@bakai-ecosystem/ui-kit` is a React component library for the Bakai ecosystem. It provides reusable UI components built with React, TypeScript, Ionic React, and SCSS.

## Development Commands

### Building
```bash
npm run build          # Full build (JS, types, styles, SVG icons)
npm run build:js       # Compile TypeScript to JavaScript
npm run build:types    # Generate TypeScript declaration files
npm run clean          # Remove dist directory
```

### Development
```bash
npm run dev            # Start Vite dev server (port 3001)
npm run storybook      # Run Storybook on port 6006
npm run build-storybook # Build static Storybook
```

### Code Quality
```bash
npm run lint           # Run ESLint (if configured in scripts)
npm run format         # Format code with Prettier (if configured)
```

## Architecture

### Project Structure
```
src/
├── shared/          # Shared resources
│   ├── ui/          # Basic UI components (Button, Input, Modal, etc.)
│   ├── assets/      # Static assets (icons, animations, styles, svg-icons)
│   └── libs/        # Utility functions and helpers
└── widgets/         # Complex composite components (PhonePicker, CardSelect, etc.)
```

### Component Organization
- **shared/ui/**: Atomic UI components, mostly wrapping Ionic React components with custom styling
- **widgets/**: Higher-level composite components that combine multiple UI elements

Each component directory typically contains:
- `index.tsx` - Component implementation
- `styles.scss` - Component-specific styles
- `types.ts` - TypeScript type definitions
- `index.stories.tsx` - Storybook stories
- Custom hooks (e.g., `useDateWheelPicker.ts`) when needed

### Build Process

The build uses TypeScript compiler (not bundlers like Rollup or Webpack) with custom post-processing:

1. **TypeScript compilation** (`tsconfig.build.json`):
   - Excludes `*.stories.tsx`, `*.test.*`, and story directories
   - Outputs to `dist/` directory
   - Generates declaration files separately

2. **Asset copying** (via Node.js scripts):
   - `copy-styles.mjs`: Recursively copies all `.scss` files from `src/` to `dist/`
   - `copy-svg-icons.mjs`: Copies SVG icons from `src/shared/assets/svg-icons/` to `dist/shared/assets/svg-icons/`

This approach preserves the exact source structure in the distribution, allowing consumers to import SCSS files directly.

### Path Aliases

The project uses `@/*` path alias mapping to `./src/*`:
- Configured in `tsconfig.json`
- Also configured in Vite config (`vite.config.ts`)
- Also configured in Storybook (`.storybook/main.ts`)

### Ionic React Integration

Most UI components are thin wrappers around Ionic React components (e.g., `IonButton`) with:
- Custom SCSS styling
- Additional variant/size props
- TypeScript type safety

### Key Dependencies

- **@ionic/react**: Base UI component library
- **formik**: Form management
- **yup**: Schema validation
- **react-toastify**: Toast notifications
- **lottie-react**: Animation support
- **react-pdf**: PDF viewing capabilities
- **country-flag-icons**: Country flag components

## Important Notes

### When Adding New Components

1. Place in `src/shared/ui/` for atomic components or `src/widgets/` for composite ones
2. Follow the established structure: `index.tsx`, `styles.scss`, `types.ts`, `index.stories.tsx`
3. Export from the appropriate barrel file (`src/shared/ui/index.ts` or `src/widgets/index.ts`)
4. Add to root `src/index.ts` for public API
5. SCSS files will be automatically copied to `dist/` during build

### Styling System

The project uses a comprehensive SCSS system with:

- **Variables** (`src/shared/assets/styles/variables.scss`): CSS custom properties for colors, theming
- **Tokens** (`src/shared/assets/styles/_tokens.scss`): Design tokens (spacing, typography, shadows)
- **Mixins** (`src/shared/assets/styles/_mixins.scss`): Reusable SCSS patterns
- **Component styles**: Co-located with each component
- **Theme support**: Light and dark modes via `:root` and `:root.dark`

When creating new components:
- Import shared mixins/tokens when needed: `@use "@/shared/assets/styles/mixins"`
- Use CSS custom properties from variables.scss (e.g., `var(--ion-color-primary)`)
- Follow the design token system for spacing, typography, etc.
- SCSS files are copied as-is to dist during build

### Development Server

- Vite dev server runs on port 3001
- Configured to allow host `webapp-test.bakai.kg`
- Use Storybook (port 6006) for component development and documentation

### Package Distribution

The package exports:
- Main entry: `./dist/index.js`
- TypeScript types: `./dist/index.d.ts`
- Only `dist/` and `README.md` are published (see `files` in package.json)

### Code Quality Standards

- **ESLint**: Configured with TypeScript, React, and Storybook rules
- **Prettier**: Code formatting with 2-space tabs, semicolons, double quotes
- **TypeScript**: Strict mode enabled with modern ES2020 target
- **Exports**: All components use named exports (no default exports)
- **Import paths**: Use `@/` alias for cleaner imports

### Peer Dependencies

The library requires consumers to install:
- react ^18.0.0
- react-dom ^18.0.0
- @ionic/react ^8.0.0
- @ionic/react-router ^8.0.0

These are listed in `peerDependencies` to avoid version conflicts.
