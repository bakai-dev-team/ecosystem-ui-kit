# Detailed Findings by Component

## Components Missing Type Files (45 total)

### shared/ui Components (23 without types.ts)

#### Standard Components
- **AmountInput** - Inline `type IProps`
- **AmountLimit** - Inline `type IProps`
- **BalanceCard** - Inline `type Props`
- **CardWidthImage** - Inline types (no stories either)
- **CheckCard** - Inline `interface IProps` + `ItemProps`
- **Checkbox** - Inline `interface IProps` with nested `ItemProps`
- **CheckboxCard** - Inline types
- **ChoiceCard** - Inline types
- **DocumentsCard** - Inline types
- **HistoryItem** - Inline types
- **Input** - Inline `interface IProps` (exports type `ITextFieldTypes`)
- **Modal** - Inline `type TProps`
- **NumberCategoryOptions** - Inline `interface IProps`
- **PaymentDetailsButton** - Inline types
- **PurposeSelector** - Inline types
- **Select** - Inline `interface SelectProps`
- **SomSpan** - No props
- **SwitchOption** - Inline types
- **TermCard** - Inline `interface IProps<T>` (generic)
- **TextArea** - Inline `interface IProps`
- **ToastProvider** - Inline types
- **Toggle** - Inline `interface IProps`

#### Special Cases
- **DatePicker** - Inline `interface DatePickerProps` + `DateRange`
- **DateWheelPicker** - Inline `interface Props`

### widgets Components (9 without types.ts)

- **AccountCard** - Inline `interface IData` + `IProps` (exports IData!)
- **AnimatedStatusImg** - Exports two types: `TAnimatedStatusImgType`, `TAnimatedStatusSize`
- **CardSelect** - Inline `export type IAccountCard` + `type IProps`
- **CustomTabs** - Inline `interface IProps`
- **InfoCard** - Inline `interface IProps` (no stories)
- **NavMenuItem** - Inline types
- **PaymentAction** - Exports `type TPaymentActionType`, inline `IProps`
- **PhonePicker** - Inline `interface IProps` (no stories)
- **StoryTabs** - Inline types

---

## Components Missing Storybook Stories (6 total)

### shared/ui (4)
1. **BalanceCard** - Simple card component, shows balance with logo
2. **DateWheelPicker** - Date picker wheel interface
3. **SomSpan** - Tiny component (just styled span), displays "c"
4. **SwitchOption** - Switch/toggle option component

### widgets (2)
1. **InfoCard** - Has commented-out code suggesting incomplete development
2. **PhonePicker** - Phone input picker with 6-digit code

---

## Component Declaration Patterns Found

### React.FC Pattern (5 components)
```typescript
export const AmountInput: React.FC<IProps> = ({ ... }) => { ... }
```
- AmountInput
- Input (partial: `export const Input = ({ ... }) =>`)
- DateWheelPicker
- NumberCategoryOptions
- DatePicker

### Arrow Function, No Type (24 components)
```typescript
export const Button = (props: IProps) => { ... }
```
Most common pattern

### Default Export (1 component)
```typescript
const AmountLimit = ({ ... }) => { ... }
export default AmountLimit
```
- AmountLimit (ONLY ONE!)

### Generic/Special Patterns (Rare)
```typescript
export const TermCard = <T,>(props: IProps<T>) => { ... }
```
- TermCard (uses generics)

---

## Type Interface Naming Inconsistencies

### Uses "IProps"
- Button (in types.ts)
- AmountInput
- BalanceCard
- CheckCard
- Checkbox
- CheckboxCard
- ChoiceCard
- Input
- Modal (uses TProps instead)
- NumberCategoryOptions
- PaymentDetailsButton
- PurposeSelector
- SwitchOption
- TermCard
- TextArea
- Toggle
- DateWheelPicker
- PhonePicker
- InfoCard
- PaymentAction
- NavMenuItem
- CustomTabs

### Uses "Props"
- Select → `interface SelectProps`
- DatePicker → `interface DatePickerProps`
- CustomTabs → `interface IProps`
- StoryTabs → `interface IProps`

### Uses Custom Names
- Modal → `type TProps`
- CardSelect → `type IProps` + exports `export type IAccountCard`
- PaymentAction → exports `export type TPaymentActionType`

### Uses "any" Type (Unsafe)
- Modal: `actionIcon?: any`
- Input: `preIcon?: any`, `postIcon?: any`
- AccountCard: `logo: any`

---

## Components with Custom Hooks Organization Issues

### Properly Organized in model/
✓ DatePicker → `model/useDateRangePicker.ts`
✓ DateWheelPicker → `model/useDateWheelPicker.ts`
✓ InfoCard → `model/useInfoCard.ts`
✓ PaymentAction → `model/usePaymentAction.ts`

### Hooks in Root Directory (WRONG)
✗ PhonePicker → `usePhonePicker.ts` (should be in model/)

### Inline Hooks (Acceptable for small components)
- CustomTabs (useState, useRef, useEffect)
- StoryTabs (useState)
- Other components

---

## Code Quality Issues by Component

### Commented-Out Code
**Location:** `/src/widgets/InfoCard/index.tsx` (8 lines)
```typescript
// const { animatedValue, isDark } = useInfoCard(value);
// const progressStyles = useMemo(() => buildStyles({
//   rotation: 0.62,
//   pathColor: '#2787E8',
//   trailColor: isDark ? '#2B3645 ' : '#DBDFE5',
//   strokeLinecap: 'round',
// }), [isDark]);
```
**Issue:** Suggests incomplete feature or removal without cleanup

### Unused Imports
**Location:** `/src/shared/ui/Modal/index.tsx`
```typescript
import { gitBranch } from "ionicons/icons";  // Never used!
```

### Type Unsafe Patterns
**Location:** `/src/shared/ui/TextArea/index.tsx`
```typescript
interface IProps extends React.HTMLProps<HTMLTextAreaElement> {
  onChangeValue?: (value: string) => void
}

// rest.onChangeValue is NOT part of HTMLTextAreaElement!
```

---

## SCSS Organization Issues

### Components with CSS Variables (Only Button)
**File:** `/src/shared/ui/Button/styles.scss`
```scss
:root {
  --btn-primary-background: #007AFF;
  --btn-secondary-background: #f4f5f8;
  --btn-monochrome-background: #151616;
  --btn-solid-background: #007AFF1A;
  // ... etc
}
```

### Components with Inline Colors
- Toggle
- SwitchOption
- Most other components hardcode colors

### Missing Style System
No centralized:
- Color palette variables
- Spacing scale
- Typography system
- Responsive breakpoints
- Mixins for common patterns

---

## Export Pattern Inconsistencies in src/index.ts

### Standard Named Exports
```typescript
export { Button } from "./shared/ui/Button";
export { Input } from "./shared/ui/Input";
```

### Default Export (1 case)
```typescript
export { default as AmountLimit } from "./shared/ui/AmountLimit";
```

### Formatting Inconsistencies
```typescript
export { Button } from "./shared/ui/Button";           // ✓ Good spacing
export {Select} from "./shared/ui/Select";            // ✗ No spaces
export  {Checkbox} from "./shared/ui/Checkbox";       // ✗ Double space
export {DatePicker} from "./shared/ui/DatePicker"     // ✗ No semicolon
export {NumberCategoryOptions} from "./shared/ui/NumberCategoryOptions"
export {HistoryItem} from "./shared/ui/HistoryItem"
export  {AccountCard} from "./widgets/AccountCard"
```

---

## TypeScript Configuration Conflicts

### tsconfig.json (Main - for build)
```json
{
  "target": "ES2020",
  "lib": ["DOM", "DOM.Iterable", "ES6"],
  "jsx": "react-jsx",
  "declaration": true,
  "outDir": "dist",
  "baseUrl": ".",
  "paths": { "@/*": ["./src/*"] },
  "moduleResolution": "node"
}
```

### tsconfig.app.json (For Vite/dev)
```json
{
  "target": "ES2022",              // ← DIFFERENT!
  "lib": ["ES2022", "DOM", "DOM.Iterable"],
  "moduleResolution": "bundler",    // ← DIFFERENT!
  "noEmit": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

### Conflicts:
- ES2020 vs ES2022
- "node" vs "bundler" moduleResolution
- Different lib configurations
- Unused locals checking inconsistency

---

## Dependency Issues

### Missing peerDependencies
Code heavily uses but not declared as peer:
- `react` (18.3.1)
- `react-dom` (18.3.1)
- `@ionic/react` (8.7.9)
- `@ionic/react-router` (8.7.9)
- `react-i18next` (15.4.1)
- `ionicons` (8.0.13)
- `lottie-react` (2.4.1)
- `formik` (2.4.6)
- `yup` (1.7.1)
- `derive-valtio` (0.2.0)

### Version Mismatch
```json
"@storybook/addon-actions": "^9.0.8",    // v9
"@storybook/react": "^10.0.7",           // v10 - MISMATCH!
```

---

## Build Configuration Problems

### rollup.config.mjs Issues

1. **Duplicate JSON Plugin**
   ```javascript
   import json from "@rollup/plugin-json";  // Line 8
   // Later in plugins array:
   json(),  // Line 24
   ```

2. **CSS Extraction to Single File**
   ```javascript
   postcss({
     extract: true,  // All CSS in one file
   })
   ```
   Problem: Modular CSS per component would be better

3. **SVG Icon Timing Issue**
   ```javascript
   copy({
     hook: 'writeBundle'  // AFTER build
   })
   ```
   May not work for CSS references

### Build Script Redundancy
```json
"build:js": "tsc --project tsconfig.build.json --outDir dist",
"build:types": "tsc --project tsconfig.build.json --declaration --emitDeclarationOnly --outDir dist",
```
Same input file processed twice - why not combine?

---

## Import/Export Complexity

### Current Multi-Layer System
1. Component → `export const Component`
2. Barrel file → `export { Component } from "./Component"`
3. Shared barrel → `export { Component } from "./Component"`
4. Main index → `export { Component } from "./shared/ui/Component"`

**Result:** Library consumers can import from:
```typescript
import { Button } from '@bakai-ecosystem/ui-kit';         // ✓ Works
import { Button } from '@bakai-ecosystem/ui-kit/shared'; // ✓ Works
import { Button } from '@bakai-ecosystem/ui-kit/shared/ui'; // ✓ Works
import { Button } from '@bakai-ecosystem/ui-kit/shared/ui/Button'; // ✓ Works
```

**Problem:** Too many import paths, confusing API

### Path Alias Usage
Defined but inconsistently used:
- `import { Modal } from "@/shared"` (uses alias)
- `import { Button } from "../Button"` (doesn't use)
- Mixed within same file

---

## Directory Naming Issues

### CardWidthImage
- Directory: `/src/shared/ui/CardWidthImage/`
- Export: `export { CardWithImage }`
- **Problem:** Directory name has typo "Width" instead of "With"

---

## Component Feature Matrix

| Component | types.ts | stories | model/ | Pattern | Status |
|-----------|----------|---------|--------|---------|--------|
| Button | ✓ | ✓ | - | Good | OK |
| Input | ✗ | ✓ | - | OK | Needs types.ts |
| AmountInput | ✗ | ✓ | - | RC.FC | Needs types.ts |
| AmountLimit | ✗ | ✓ | - | Default export | Needs fixing |
| DatePicker | ✗ | ✓ | ✓ | OK | Needs types.ts |
| DateWheelPicker | ✗ | ✗ | ✓ | OK | Needs both |
| InfoCard | ✗ | ✗ | ✓ | OK | Needs stories + types |
| PhonePicker | ✗ | ✗ | ✗ | OK | Needs all |
| PaymentAction | ✗ | ✓ | ✓ | OK | Needs types.ts |
| BalanceCard | ✗ | ✗ | - | OK | Needs both |
| Toggle | ✗ | ✓ | - | OK | Needs types.ts |
| Modal | ✗ | ✓ | - | OK | Needs types, has unused import |
| SomSpan | ✗ | ✗ | - | OK | Needs both |
| Select | ✗ | ✓ | - | OK | Needs types.ts |
| (others) | ✗ | ✓ | - | Mixed | Mostly need types.ts |

---

## Action Items by Category

### Component Types (45 files to create)
All components except Button need types.ts files

### Story Files (6 files to create)
- BalanceCard
- DateWheelPicker
- SomSpan
- SwitchOption
- InfoCard
- PhonePicker

### Hook Organization (1 fix)
- Move PhonePicker/usePhonePicker.ts → PhonePicker/model/usePhonePicker.ts

### Default Export Fix (1 file)
- Convert AmountLimit from default export to named export

### Config Files (3 to fix)
- Consolidate tsconfig files
- Fix TypeScript conflicts
- Add peerDependencies to package.json

### Code Cleanup (3 items)
- Remove commented code from InfoCard
- Remove unused import from Modal
- Replace `any` types throughout

