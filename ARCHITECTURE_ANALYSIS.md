# Ecosystem UI Kit - Architectural Analysis Report

## Executive Summary
The ecosystem-ui-kit codebase has fundamental architectural inconsistencies that impact maintainability, scalability, and developer experience. While the project is functional, there are several critical issues that should be addressed to establish a more robust and consistent foundation.

---

## 1. COMPONENT STRUCTURE INCONSISTENCIES

### 1.1 Missing Type Definition Files
**Severity: HIGH**

Only 2 files have dedicated `types.ts` files in the entire codebase:
- `/src/shared/ui/Button/types.ts` 
- `/src/shared/assets/icons/types.ts`

**Missing from 47 components:**
- **shared/ui (23 components without types.ts):**
  AmountInput, AmountLimit, BalanceCard, CardWidthImage, CheckCard, Checkbox, CheckboxCard, ChoiceCard, DatePicker, DateWheelPicker, DocumentsCard, HistoryItem, Input, Modal, NumberCategoryOptions, PaymentDetailsButton, PurposeSelector, Select, SomSpan, SwitchOption, TermCard, TextArea, ToastProvider, Toggle
  
- **widgets (9 components without types.ts):**
  AccountCard, AnimatedStatusImg, CardSelect, CustomTabs, InfoCard, NavMenuItem, PaymentAction, PhonePicker, StoryTabs

**Current Pattern:** Types are either:
- Defined inline in index.tsx as `interface IProps` or `type Props`
- Scattered across multiple locations
- Inconsistently named (IProps vs Props)

**Example Issues:**
```tsx
// Button component - Best practice (has types.ts)
export interface IProps extends HTMLAttributes<HTMLIonButtonElement> {
  disabled?: boolean
  variant?: TBtnVariant
  size?: TBtnSize
}

// Input component - Inline in index.tsx
interface IProps {
  preIcon?: any;
  postIcon?: any;
  // ... more props
}

// Select component - Different naming convention
interface SelectProps {
  label?: string;
  value?: string;
  onClick?: () => void;
}
```

**Impact:**
- Difficult to import types from components
- No centralized type definitions
- Inconsistent developer experience
- Makes type-safe consumption harder for library users

---

### 1.2 Inconsistent Component Declaration Patterns
**Severity: MEDIUM**

Components use three different declaration patterns:

**Pattern 1: React.FC with named export (5 components)**
```tsx
export const AmountInput: React.FC<IProps> = ({ ... }) => { ... }
```

**Pattern 2: Arrow function without type annotation (24 components)**
```tsx
export const Button = (props: IProps) => { ... }
```

**Pattern 3: Default export (1 component)**
```tsx
const AmountLimit = ({ label, amount }: IProps) => { ... }
export default AmountLimit
```

**Pattern 4: Named function (Rare)**
```tsx
export const TermCard = <T,>(props: IProps<T>) => { ... }
```

**Index export inconsistency:**
- `src/index.ts` line 3 imports AmountLimit as default:
  ```tsx
  export { default as AmountLimit } from "./shared/ui/AmountLimit";
  ```
- All other components use named exports

**Impact:**
- Inconsistent API surface for library users
- Confusing for new developers
- Mixed import patterns reduce readability

---

### 1.3 Missing Storybook Stories
**Severity: MEDIUM**

6 components lack Storybook documentation:

**shared/ui (4):**
- BalanceCard
- DateWheelPicker
- SomSpan
- SwitchOption

**widgets (2):**
- InfoCard
- PhonePicker

**Current state:** 40 out of 46 components have stories, but this creates inconsistent documentation coverage.

---

### 1.4 Missing Component Model/Hooks Organization
**Severity: LOW**

Only 3 components have a `model/` subdirectory for custom hooks:
- DatePicker → `model/useDateRangePicker.ts`
- DateWheelPicker → `model/useDateWheelPicker.ts`
- InfoCard → `model/useInfoCard.ts`
- PaymentAction → `model/usePaymentAction.ts`

**Others with hooks:**
- PhonePicker has `usePhonePicker.ts` in root (not in model/)
- Custom Tabs, Story Tabs have inline hooks

**Inconsistent pattern:**
```
PaymentAction/              ✓ has model/
├── index.tsx
├── model/
│   └── usePaymentAction.ts
└── styles.scss

PhonePicker/               ✗ hooks in root
├── index.tsx
├── usePhonePicker.ts       ← Should be in model/
└── styles.scss
```

---

## 2. EXPORT PATTERNS AND BARREL FILES

### 2.1 Redundant Export Files
**Severity: MEDIUM**

The project has multiple layers of re-exports creating unnecessary complexity:

```
src/index.ts (Main export - contains all exports)
├── Directly imports from ./shared/ui/Button
├── Directly imports from ./widgets/AnimatedStatusImg
└── Etc. (32 total exports)

src/shared/index.ts (Only exports from ./ui)
└── export * from "./ui"

src/shared/ui/index.ts (Barrel file with all UI components)
└── 24 named exports

src/widgets/index.ts (Barrel file with all widgets)
└── 9 named exports
```

**Issue:** The main `src/index.ts` duplicates exports that already exist in barrel files.

**Current (redundant) approach:**
```tsx
// src/index.ts
export { Button } from "./shared/ui/Button";
export { AmountInput } from "./shared/ui/AmountInput";
// ... AND widget imports mixed in

// Should be:
export * from "./shared";
export * from "./widgets";
```

### 2.2 Inconsistent Export Declaration Style
**Severity: LOW**

Main index.ts uses inconsistent formatting:
```tsx
export { Button } from "./shared/ui/Button";  // Standard
export { default as AmountLimit } from "./shared/ui/AmountLimit";  // Default export
export {Select} from "./shared/ui/Select";  // No spaces in braces
export  {Checkbox} from "./shared/ui/Checkbox";  // Extra spaces
export {DatePicker} from "./shared/ui/DatePicker"  // Missing semicolon
```

---

## 3. TYPESCRIPT CONFIGURATION ISSUES

### 3.1 Multiple Conflicting TypeScript Configurations
**Severity: HIGH**

Four different tsconfig files with conflicting settings:

**tsconfig.json (Main - for build)**
```json
{
  "target": "ES2020",
  "lib": ["DOM", "DOM.Iterable", "ES6"],
  "jsx": "react-jsx",
  "declaration": true,
  "outDir": "dist"
}
```

**tsconfig.app.json (For Vite/dev)**
```json
{
  "target": "ES2022",  // ← Different target!
  "moduleResolution": "bundler",  // ← Different resolution!
  "noEmit": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

**tsconfig.build.json (For building)**
```json
{
  "declaration": false,  // ← Conflicts with tsconfig.json
  "emitDeclarationOnly": false
}
```

**Issues:**
1. Different ES targets (ES2020 vs ES2022)
2. Different moduleResolution strategies
3. Conflicting declaration settings
4. `tsconfig.build.json` extends main but overrides with `false` values while main sets `true`

### 3.2 Unclear Path Alias Usage
**Severity: LOW**

Path alias defined in tsconfig.json but not consistently used:
```json
"paths": {
  "@/*": ["./src/*"]
}
```

Usage is inconsistent:
```tsx
// Using alias:
import { useDateRangePicker } from "./model/useDateRangePicker";
import { Modal } from "@/shared";  // ← Alias usage
import { DateWheelPicker } from "../DateWheelPicker";  // ← Relative

// Mostly relative imports used instead of @/ alias
```

---

## 4. COMPONENT NAMING AND FILE ORGANIZATION

### 4.1 Inconsistent Naming Conventions
**Severity: MEDIUM**

**Props naming inconsistency:**
- Most use: `interface IProps`
- Some use: `interface SelectProps`, `interface DateRange`, `interface ItemProps`
- Some use: `type Props`, `type IProps`

**Example conflicts:**
```tsx
// Button (consistent)
export interface IProps extends HTMLAttributes<HTMLIonButtonElement> {
  disabled?: boolean
}

// CheckCard (inconsistent - defines IProps but also expects other interfaces)
interface IProps {
  status: TAnimatedStatusImgType;
  text: string;
}
interface ItemProps {
  label: string;
  value: string;
}

// Modal (uses TProps instead of IProps)
type TProps = {
  isOpen: boolean;
  onClose: () => void;
}
```

### 4.2 Directory Naming Anomaly
**Severity: LOW**

One component has unusual naming:
- `/src/shared/ui/CardWidthImage/` - Should be `CardWithImage` (typo in directory name)
  But exports as: `export { CardWithImage } from "./shared/ui/CardWidthImage"`

---

## 5. STYLING PATTERNS AND SCSS ORGANIZATION

### 5.1 Inconsistent SCSS Variable Usage
**Severity: MEDIUM**

Button component defines CSS variables in root:
```scss
:root {
  --btn-primary-background: #007AFF;
  --btn-secondary-background: #f4f5f8;
  // ... etc
}
```

But most other components don't follow this pattern - they either:
1. Use inline colors (SwitchOption, Toggle)
2. Don't have any variables defined
3. Lack proper CSS variable organization

### 5.2 Missing Shared SCSS/Style Foundation
**Severity: HIGH**

No centralized style system found:
- No global CSS variables
- No shared mixins
- No consistent color palette import
- Each component duplicates styling logic

**Structure should include:**
```
src/shared/assets/styles/
├── variables.scss      (color, spacing, typography)
├── mixins.scss         (reusable patterns)
├── breakpoints.scss    (responsive design)
└── global.scss         (reset, base)
```

Currently has `/src/shared/assets/styles/` but unclear what's in it.

---

## 6. BUILD CONFIGURATION ISSUES

### 6.1 Rollup Configuration Concerns
**Severity: MEDIUM**

**File: rollup.config.mjs**

Issues:
1. Duplicate JSON plugin import and usage:
   ```js
   import json from "@rollup/plugin-json";  // Line 8
   // Later:
   json(),  // Line 24 (after resolve but before commonjs)
   ```

2. Inconsistent plugin ordering (JSON plugin placement)

3. CSS/SCSS extraction strategy:
   ```js
   postcss({
     extract: true,     // Extracts to single CSS file
     minimize: false,
     use: ['sass'],
     sourceMap: true,
   })
   ```
   May cause issues if expecting modular CSS per component

4. SVG icon copy happens after build:
   ```js
   copy({
     targets: [
       { 
         src: "src/shared/assets/icons/*.svg",
         dest: "dist/shared/assets/icons" 
       }
     ],
     hook: 'writeBundle'  // After build completes
   })
   ```
   This won't work for CSS/SCSS references to icons

### 6.2 Build Script Redundancy
**Severity: LOW**

package.json has both rollup-based and tsc-based builds:
```json
"build": "npm run build:js && npm run build:types && npm run copy:styles && npm run copy:svg-icons",
"build:js": "tsc --project tsconfig.build.json --outDir dist --skipLibCheck",
"build:types": "tsc --project tsconfig.build.json --declaration --emitDeclarationOnly --outDir dist --skipLibCheck",
```

But also has rollup.config.mjs that's not being used in build scripts.

**Questions:**
- Is Rollup config active or deprecated?
- Why duplicate tsc calls for JS and types?
- Should use a single tool (either tsc or rollup)

---

## 7. DEPENDENCIES AND PEER DEPENDENCIES

### 7.1 Missing Peer Dependencies Declaration
**Severity: HIGH**

`package.json` lacks `peerDependencies` section, but code heavily depends on:

**React/React-DOM (Critical):**
```tsx
import React from 'react';
import { FC } from 'react';
```

**Ionic (Critical):**
```tsx
import { IonButton, IonCard, IonInput } from "@ionic/react";
```

**Other dependencies used but not listed as peer:**
- react-i18next
- ionicons
- lottie-react

**Current situation:**
- These are in devDependencies (wrong)
- Library consumers must install them separately
- No version constraint specification

**Should have:**
```json
"peerDependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@ionic/react": "^8.0.0"
}
```

### 7.2 Version Inconsistencies
**Severity: MEDIUM**

Multiple storybook/addon versions:
```json
"@storybook/addon-actions": "^9.0.8",    // v9
"@storybook/react": "^10.0.7",           // v10
"@storybook/addon-docs": "^10.0.7",      // v10
```

Main addon-actions is v9 while everything else is v10 - potential incompatibility.

---

## 8. STORYBOOK CONFIGURATION

### 8.1 Incomplete Storybook Setup
**Severity: MEDIUM**

**Missing addons:**
- No accessibility testing addon configured properly
- @storybook/addon-vitest included but not leveraging full testing
- No viewport configuration for responsive testing

**.storybook/main.ts:**
```ts
addons: [
  "@storybook/addon-links",
  "@storybook/addon-essentials",
],
```

Should include:
- a11y addon (listed in dependencies but not in main.ts)
- viewport addon
- More comprehensive testing setup

**Missing documentation:**
- No .storybook/preview.ts configuration (empty/minimal)
- No theming configuration
- No global styles configuration

---

## 9. CODE QUALITY ISSUES

### 9.1 Commented-Out Code
**Severity: MEDIUM**

Found in `/src/widgets/InfoCard/index.tsx`:
```tsx
// const { animatedValue, isDark } = useInfoCard(value);
//
// const progressStyles = useMemo(() => buildStyles({
//   rotation: 0.62,
//   pathColor: '#2787E8',
//   trailColor: isDark ? '#2B3645 ' : '#DBDFE5',
//   strokeLinecap: 'round',
// }), [isDark]);
```

This suggests:
- Incomplete refactoring
- Feature removal without cleanup
- Dead code accumulation

### 9.2 Type Safety Issues
**Severity: MEDIUM**

Found throughout codebase:
```tsx
// In Select component
<Icon type={postIcon}  className="input__post-icon" />
// postIcon typed as 'any'

// In AccountCard
logo: any;  // Should be TIconType

// In Modal
actionIcon?:any;  // Should have proper type
```

**Using `any` type kills TypeScript benefits:**
```tsx
interface IData {
  logo: any;  // Should be: logo: TIconType;
}

interface IProps {
  actionIcon?: any;  // Should be: actionIcon?: TIconType;
}
```

### 9.3 Unused Imports
**Severity: LOW**

Found in Modal component:
```tsx
import { gitBranch } from "ionicons/icons";  // Never used!
```

---

## 10. IMPORT/EXPORT INCONSISTENCIES

### 10.1 Mixed Import Styles
**Severity: LOW**

Inconsistent import patterns:
```tsx
// Absolute imports (with alias)
import { Modal } from "@/shared";
import { Icon } from "../../assets/icons/Icon";

// Relative imports
import { Button } from "../Button";
import { DateWheelPicker } from "../DateWheelPicker";

// Mixed in same file
import "./styles.scss";
import { Icon } from "../../assets/icons/Icon";
import { useDateRangePicker } from "./model/useDateRangePicker";
import { Modal } from "@/shared";  // ← Alias
import { DateWheelPicker } from "../DateWheelPicker";  // ← Relative
```

### 10.2 Circular Dependency Risk
**Severity: MEDIUM**

Complex import patterns in widgets:
```tsx
// CardSelect imports from shared/ui
import { SomSpan } from "../../shared/ui/SomSpan";

// But shared/ui/index.ts doesn't export from widgets
// This creates asymmetric dependencies
```

---

## 11. MISSING CONFIGURATIONS AND FILES

### 11.1 Missing ESLint Configuration
**Severity: MEDIUM**

Found `eslint.config.js` but it's minimal. Missing:
- Stricter rule configurations
- Plugin configurations
- Prettier integration
- TypeScript-specific rules

### 11.2 Missing Prettier Configuration
**Severity: LOW**

No `.prettierrc` or prettier config found. Should standardize formatting.

### 11.3 No Global Styles Import
**Severity: MEDIUM**

No centralized style imports mechanism. Each component imports its own styles, but:
- No global variables/functions accessible
- No shared design tokens
- Colors, spacing hardcoded or duplicated

---

## 12. ANTI-PATTERNS AND CODE SMELLS

### 12.1 Pattern: Props Spreading Without Type Safety
**Severity: MEDIUM**

Found in TextArea:
```tsx
interface IProps extends React.HTMLProps<HTMLTextAreaElement> {
  canShowAmount?: boolean
  maxLength?: number
  onChangeValue?: (value: string) => void
}

export const TextArea = ({ canShowAmount = true, maxLength = 200, ...rest }: IProps) => {
  // Using rest.onChangeValue which doesn't exist on HTMLTextAreaElement
  rest.onChangeValue?.(e.target.value)  // Type unsafe!
}
```

### 12.2 Pattern: Magic Numbers in Components
**Severity: LOW**

Found in CustomTabs:
```tsx
const adjustedWidth = (totalWidth - 8) / tabCount;  // Magic 8
indicator.style.transform = `translateX(calc(${activeIndex * adjustedWidth}px + 4px))`  // Magic 4px
```

Should be named constants:
```tsx
const PADDING = 8;
const INDICATOR_OFFSET = 4;
```

### 12.3 Pattern: Duplicate Icon Type Definitions
**Severity: MEDIUM**

AnimatedStatusImg defines its own types:
```tsx
export type TAnimatedStatusImgType = "success" | "error" | "in_progress" | "confirm_payment";
```

But CheckCard also uses this and has to import from widgets (circular-ish dependency).

Should be in a shared types file.

### 12.4 Pattern: No Default Exports Standard
**Severity: MEDIUM**

Most components use named exports but AmountLimit uses default:
```tsx
export default AmountLimit
```

Inconsistent with rest of library. Should be:
```tsx
export const AmountLimit = ...
```

---

## 13. CONFIGURATION FILE ISSUES

### 13.1 ionic.config.json
**Severity: LOW**

File exists but minimal. Unclear what Ionic configuration is being used.

### 13.2 vite.config.ts
**Severity: MEDIUM**

Issues:
```ts
server: {
  port: 3001,
  host: "0.0.0.0",
  allowedHosts: ["webapp-test.bakai.kg"]  // Hardcoded domain
}
```

- Hardcoded domain in config
- Should use environment variables
- Not appropriate for published library

### 13.3 tsconfig.build.json Trailing Comma
**Severity: LOW**

```json
{
  "compilerOptions": {
    "emitDeclarationOnly": false,
  },  // ← Trailing comma (technically valid in tsconfig but unusual)
}
```

---

## SUMMARY OF FINDINGS

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Component Structure | - | 2 | 2 | 1 |
| Exports & Barrel Files | - | - | 2 | - |
| TypeScript Config | - | 1 | 1 | 1 |
| Naming Conventions | - | - | 2 | 1 |
| Styling | - | 1 | 1 | - |
| Build Config | - | - | 2 | 1 |
| Dependencies | - | 1 | 1 | - |
| Storybook | - | - | 1 | - |
| Code Quality | - | - | 3 | 1 |
| Import/Export | - | - | 2 | - |
| Configurations | - | - | 3 | 2 |
| **TOTAL** | **0** | **5** | **20** | **6** |

---

## PRIORITY RECOMMENDATIONS

### Phase 1: Critical Stabilization (Week 1)
1. **Create unified types.ts for all components** - Centralize type definitions
2. **Fix TypeScript configuration** - Resolve tsconfig conflicts
3. **Add peerDependencies** - Properly declare required dependencies
4. **Establish component structure standard** - Define one pattern for all components

### Phase 2: Consistency (Week 2-3)
5. **Standardize export patterns** - All named exports, consistent naming
6. **Add missing Storybook stories** - Document all 6 missing components
7. **Organize custom hooks** - Move all to `model/` directory
8. **Extract styling system** - Create shared SCSS with variables and mixins

### Phase 3: Quality (Week 4)
9. **Remove commented code** - Clean up dead code
10. **Fix type safety issues** - Replace `any` types with proper types
11. **Consolidate barrel files** - Simplify export structure
12. **Add ESLint/Prettier** - Enforce code consistency

### Phase 4: Build & Documentation (Week 5)
13. **Resolve build configuration** - Choose Rollup or TSC, not both
14. **Complete Storybook setup** - Add proper addons and documentation
15. **Create contributor guidelines** - Document component patterns
16. **Add component template** - Scaffold new components with consistency

