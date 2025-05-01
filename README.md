# Log Viewer Dashboard

A lightweight React + TypeScript log viewer dashboard that supports infinite scroll, customizable columns, and a clean user experience with loading and fallback states.

---

## Instructions to Run the App

### Step 1: Clone the repository

```bash
git clone https://github.com/thevarunnayak/middleware-assignment.git
cd middleware-assignment
```

### Step 2: Install dependencies

Make sure you have Node.js and npm installed on your machine.

```bash
npm install
```

### Step 3: Install dependencies

Run the following command to start the Vite development server:

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

### Assumptions and Design Choices

- **Manual Infinite Scroll**:  
  Implemented with a scroll event listener that detects when the user reaches the bottom of the container. It triggers a `setPage()` call to fetch the next set of logs.

- **Initial and Scroll Loading States**:

  - `isDataLoading` is used to show a global loading message while the initial data is fetched.
  - `isLoading` handles loading state when more logs are being fetched via scroll.

- **No External Packages**:  
  No external debounce or utility packages are used. Debounce is implemented manually using `useRef` and `setTimeout`.

- **Indian Date Format**:  
  All timestamps are displayed using `toLocaleString("en-IN")` for Indian locale formatting.

- **Visible Columns Toggle**:  
  Columns like **Timestamp**, **Severity**, and **Body** are shown/hidden based on a `visibleColumns` object passed via props.

- **No Image or Icon for Empty State**:  
  A clean text-only `NoData` component is displayed when no logs are available.

- **Simple UI and CSS**:  
  Basic styling with CSS — no external UI frameworks used.

### Notes on thought process

- **Manual Infinite Scroll**:  
  Implemented with a scroll event listener that detects when the user reaches the bottom of the container. It triggers a `setPage()` call to fetch the next set of logs.

- **Initial and Scroll Loading States**:

  - `isDataLoading` is used to show a global loading message while the initial data is fetched.
  - `isLoading` handles loading state when more logs are being fetched via scroll.

- **No External Packages**:  
  No external debounce or utility packages (like `lodash`) are used. Debounce is implemented manually using `useRef` and `setTimeout`.

- **Indian Date Format**:  
  All timestamps are displayed using `toLocaleString("en-IN")` for Indian locale formatting.

- **Visible Columns Toggle**:  
  Columns like **Timestamp**, **Severity**, and **Body** are shown/hidden based on a `visibleColumns` object passed via props.

- **No Image or Icon for Empty State**:  
  A clean text-only `NoData` component is displayed when no logs are available.

- **Simple UI and CSS**:  
  Basic styling with CSS — no external UI frameworks used.

- **Focused on User Experience**:  
  Smooth scrolling and clean fallbacks for empty or loading states.

- **Good Developer Experience**:  
  Code organized with separation of concerns across reusable components.

- **Minimal Bundle Size**:  
  Avoided third-party packages to keep the setup lightweight and performant.

- **Semantic HTML Usage**:  
  Used `<table>`, `<thead>`, and `<tbody>` for better accessibility and structural clarity.
