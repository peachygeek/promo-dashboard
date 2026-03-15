# Architectural Decisions

## 1. Expo as the Bundler

**Decision**: Use Expo SDK 52 with Metro for web bundling.

**Rationale**: Expo provides the simplest path to a React Native for Web project with zero-config Metro bundling, built-in TypeScript support, and seamless `react-native-web` integration. It also handles environment variable injection through `expo-constants`.

## 2. React Context + useReducer for Filter State

**Decision**: Use React Context with `useReducer` for managing filter/search state, while TanStack Query handles server state.

**Rationale**: This creates a clean separation between server state (promotions data, cached by React Query) and client state (filter selections, managed by Context). Context + `useReducer` was chosen because:
- Zero additional dependencies — uses built-in React APIs only
- The reducer pattern provides a clear, predictable state transition model via typed action objects
- Filter state is small and scoped (4 fields) — Context handles this well without the overhead of an external state library
- A custom `useFilters` hook abstracts away the dispatch calls, giving consumers a clean API (`setCategory`, `setStatus`, etc.) while keeping the reducer internals hidden

## 3. Optimistic Updates with React Query Mutations

**Decision**: Implement opt-in/opt-out using React Query's `onMutate` / `onError` pattern for optimistic updates.

**Rationale**: The opt-in toggle should feel instant to the user. By updating the cache before the server responds and rolling back on error, we achieve a snappy UX. React Query's mutation lifecycle (`onMutate` → `onError` → `onSettled`) provides a well-structured pattern for this with automatic rollback.

## 4. `useBreakpoint` Custom Hook

**Decision**: Create a custom `useBreakpoint` hook wrapping `useWindowDimensions` instead of using CSS media queries.

**Rationale**: The project requirement explicitly prohibits CSS media queries. `useWindowDimensions` is the React Native way to achieve responsive layouts. The hook returns semantic values (`isMobile`, `isTablet`, `isDesktop`, `numColumns`) that components use for conditional styling and `FlatList` column configuration.

## 5. `FlatList` with Dynamic `numColumns`

**Decision**: Use `FlatList` with a `key` prop that changes with `numColumns` to force re-mount on breakpoint changes.

**Rationale**: React Native's `FlatList` doesn't support changing `numColumns` dynamically without a key change. By tying the key to the breakpoint, we get a clean re-render when the viewport crosses a breakpoint threshold. This provides proper grid layouts at each breakpoint without CSS Grid.

## 6. `StyleSheet.create` Only

**Decision**: All styles are defined through `StyleSheet.create` — no external CSS, no inline style objects.

**Rationale**: Per project requirements, `StyleSheet.create` is mandatory. This ensures styles are validated at creation time, benefit from RN Web's CSS-in-JS optimization (atomic class generation), and keep the codebase consistent with native React Native conventions.

## 7. Error Boundaries + Error Fallback Components

**Decision**: Wrap each screen in an `ErrorBoundary` class component and provide an `ErrorFallback` functional component for API errors.

**Rationale**: Error boundaries (class components, React limitation) catch render-time errors and prevent the entire app from crashing. The `ErrorFallback` component handles data-fetching errors with a retry button. Together they cover both synchronous render errors and async API failures.

## 8. Collocated Navigation Types

**Decision**: Define navigation param types in `src/navigation/types.ts` and derive screen prop types from `NativeStackScreenProps`.

**Rationale**: This provides full type safety for navigation — `navigate()` calls are type-checked for required params, and screen components receive correctly-typed `route.params`. Co-locating types with the navigator config keeps them in sync.

## 9. Test Strategy

**Decision**: Test at multiple levels — unit tests for API functions and utilities, integration tests for hooks (via `renderHook`), and component tests for UI behavior.

**Rationale**: 
- **API tests** mock `fetch` to verify URLs, headers, and error handling without a running server
- **Hook tests** use `renderHook` with a `QueryClientProvider` wrapper to test loading/success/error states
- **Component tests** use `@testing-library/react-native` to test user-facing behavior (renders, interactions, accessibility)
- **Screen tests** render full navigation stacks to verify navigation flows

## 10. Theme Tokens

**Decision**: Centralize all design values (colors, spacing, typography, shadows, breakpoints) in `src/theme/tokens.ts`.

**Rationale**: A single source of truth for design tokens ensures visual consistency, makes theming changes easy, and prevents magic numbers scattered across components. Components import from `theme/` rather than defining their own values.
