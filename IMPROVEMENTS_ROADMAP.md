# Improvements Roadmap

This document outlines the architectural improvements that have been completed and those that remain to be done.

## ✅ Completed Improvements

### 1. TypeScript Configuration (HIGH PRIORITY)
- ✅ Unified TypeScript configurations
- ✅ Removed conflicts between tsconfig.json, tsconfig.app.json, and tsconfig.build.json
- ✅ Set consistent ES2020 target and module resolution
- ✅ Enabled strict mode with better error checking

### 2. Package Dependencies (HIGH PRIORITY)
- ✅ Added peerDependencies section to package.json
- ✅ Properly declared React, ReactDOM, and Ionic React as peer dependencies
- ✅ This helps library consumers understand required dependencies

### 3. SCSS System (HIGH PRIORITY)
- ✅ Created comprehensive design tokens system (`_tokens.scss`)
- ✅ Created reusable mixins library (`_mixins.scss`)
- ✅ Integrated tokens and mixins into main styles.scss
- ✅ Provides spacing scale, typography, breakpoints, shadows, etc.

### 4. Export Standardization (HIGH PRIORITY)
- ✅ Changed AmountLimit from default export to named export
- ✅ Removed redundant `src/shared/index.ts` barrel file
- ✅ Simplified export chain in `src/index.ts` using wildcard exports
- ✅ All components now use consistent named export pattern

### 5. Code Cleanup (MEDIUM PRIORITY)
- ✅ Removed dead code from InfoCard component (commented CircularProgressbar)
- ✅ Removed unused imports (gitBranch from Modal)
- ✅ Removed unused value prop from InfoCard

### 6. Code Quality Tools (MEDIUM PRIORITY)
- ✅ Enhanced ESLint configuration with better rules
- ✅ Added Prettier configuration (.prettierrc)
- ✅ Added Prettier ignore file (.prettierignore)
- ✅ Configured proper linting for TypeScript and Storybook

### 7. Build Configuration (MEDIUM PRIORITY)
- ✅ Fixed Rollup configuration syntax errors
- ✅ Updated external dependencies list
- ✅ Configured proper SCSS handling (no extraction to single file)
- ✅ Set up proper SVG icons copying

### 8. Documentation (LOW PRIORITY)
- ✅ Updated CLAUDE.md with new architecture details
- ✅ Added styling system documentation
- ✅ Added code quality standards
- ✅ Added peer dependencies information

## 📋 Remaining Improvements

### HIGH PRIORITY (Recommended Next Steps)

#### 1. Create types.ts Files for All Components
**Status**: Not started
**Effort**: ~4-6 hours
**Impact**: High - Improves type safety and developer experience

Currently only 2 components have dedicated `types.ts` files. Need to create them for 44 remaining components:

**Shared UI Components (23):**
- AmountInput, AmountLimit, BalanceCard, CardWidthImage, CheckCard, Checkbox, CheckboxCard, ChoiceCard, DatePicker, DateWheelPicker, DocumentsCard, HistoryItem, Input, Modal, NumberCategoryOptions, PaymentDetailsButton, PurposeSelector, Select, SomSpan, SwitchOption, TermCard, TextArea, ToastProvider, Toggle

**Widgets (9):**
- AccountCard, AnimatedStatusImg, CardSelect, CustomTabs, InfoCard, NavMenuItem, PaymentAction, PhonePicker, StoryTabs

**Action Items:**
- Extract inline interfaces/types to dedicated `types.ts` files
- Standardize naming (use `IProps` consistently)
- Export types from component index
- Add type re-exports to main index.ts

#### 2. Fix Type Safety Issues
**Status**: Not started
**Effort**: ~2-3 hours
**Impact**: High - Eliminates `any` types

Replace `any` types with proper types:
- Modal: `actionIcon?: any` → `actionIcon?: TIconType`
- AccountCard: `logo: any` → `logo: TIconType`
- Input: `preIcon?: any`, `postIcon?: any` → proper icon types
- Other components with `any` usage

#### 3. Organize Hooks into model/ Directories
**Status**: Not started
**Effort**: ~1-2 hours
**Impact**: Medium - Better organization

Move custom hooks to `model/` subdirectories:
- PhonePicker: Move `usePhonePicker.ts` to `model/`
- Any other components with custom hooks not in model/

### MEDIUM PRIORITY

#### 4. Add Missing Storybook Stories
**Status**: Not started
**Effort**: ~3-4 hours
**Impact**: Medium - Better documentation

Add stories for 6 components:
- BalanceCard
- DateWheelPicker
- SomSpan
- SwitchOption
- InfoCard
- PhonePicker

#### 5. Standardize Import Paths
**Status**: Not started
**Effort**: ~2-3 hours
**Impact**: Medium - Consistency

Convert all relative imports to use `@/` alias:
```typescript
// Before
import { Icon } from "../../assets/icons/Icon";

// After
import { Icon } from "@/shared/assets/icons/Icon";
```

#### 6. Add Component Tests
**Status**: Not started
**Effort**: ~8-12 hours
**Impact**: Medium - Quality assurance

- Set up Vitest or Jest
- Add unit tests for utility functions
- Add component tests for critical components
- Set up test coverage reporting

### LOW PRIORITY

#### 7. Fix Directory Naming
**Status**: Not started
**Effort**: ~5 minutes
**Impact**: Low - Consistency

Rename `CardWidthImage` to `CardWithImage` (typo fix)

#### 8. Create Component Scaffold Tool
**Status**: Not started
**Effort**: ~2-3 hours
**Impact**: Low - Developer experience

Create a CLI tool or script to scaffold new components with:
- Proper directory structure
- types.ts file
- index.tsx with standard pattern
- styles.scss
- index.stories.tsx

#### 9. Add Contributor Guidelines
**Status**: Not started
**Effort**: ~1 hour
**Impact**: Low - Team alignment

Create CONTRIBUTING.md with:
- Component creation guidelines
- PR process
- Code style requirements
- Testing requirements

## Implementation Priority Order

### Week 1: Critical Fixes
1. ✅ Fix TypeScript configuration
2. ✅ Add peerDependencies
3. ✅ Create SCSS system
4. ✅ Standardize exports

### Week 2: Type System (Recommended Next)
1. Create types.ts for all components
2. Fix type safety issues (replace `any`)
3. Organize hooks into model/ directories

### Week 3: Documentation & Testing
1. Add missing Storybook stories
2. Standardize import paths
3. Begin adding component tests

### Week 4: Polish
1. Fix directory naming
2. Create component scaffold tool
3. Add contributor guidelines

## Metrics & Goals

### Current State
- TypeScript configuration: ✅ Fixed
- Components with types.ts: 2/46 (4%)
- Components with stories: 40/46 (87%)
- Code quality tools: ✅ Configured
- Build system: ✅ Fixed

### Target State (After All Improvements)
- Components with types.ts: 46/46 (100%)
- Components with stories: 46/46 (100%)
- Type safety: 0 `any` types
- Test coverage: >70%
- Import consistency: 100% using `@/` alias

## Notes

- All architectural analysis reports are in the repository root:
  - ARCHITECTURE_ANALYSIS.md (detailed findings)
  - ARCHITECTURE_SUMMARY.md (quick overview)
  - DETAILED_FINDINGS.md (component-by-component breakdown)
  - ARCHITECTURE_REPORT_INDEX.md (navigation guide)

- These reports contain extensive details about every issue found and can be used as reference during implementation
