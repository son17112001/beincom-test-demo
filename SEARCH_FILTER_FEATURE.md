# Search and Filter Feature

## Overview
This feature implements search and filter functionality for posts as specified in the requirements. Users can search for posts by title or content and sort posts based on different criteria.

## Features Implemented

### 1. Search Functionality
- **Location**: Header search bar
- **Functionality**:
  - Search posts by title or content
  - Real-time search with 500ms debounce
  - Clear search button (X) appears when typing
  - Search state is shared between Header and Homepage via Context

### 2. Filter Options
- **Location**: Filter dropdown button next to search bar
- **Available Options**:
  - **Newest First** (default): Sort by ID descending
  - **Oldest First**: Sort by ID ascending
  - **Title A-Z**: Sort by title ascending
  - **Title Z-A**: Sort by title descending
  - **Most Comments**: Sort by comments descending
  - **Least Comments**: Sort by comments ascending

### 3. UI Components

#### Header Component
- Updated search bar with integrated filter dropdown
- Responsive design (hides on mobile)
- Clear search functionality
- Filter button with dropdown arrow

#### FilterDropdown Component
- Reusable dropdown component
- Click outside to close
- Escape key to close
- Visual feedback for selected option
- Smooth animations

#### Homepage Component
- Displays search results
- Shows current filter applied
- Real-time updates when search/filter changes
- Maintains infinite scroll functionality

## Technical Implementation

### Context Management
- **SearchContext**: Manages global search and filter state
- **SearchProvider**: Wraps the app to provide context
- **useSearchContext**: Hook to access search state

### API Integration
- Updated `fetchPosts` and `searchPosts` functions
- Added `sortBy` and `order` parameters
- JSONPlaceholder API supports `_sort` and `_order` parameters

### State Management
- Search query with debouncing
- Filter selection with immediate updates
- Context-based state sharing between components

## Usage

### For Users
1. **Search**: Type in the search bar to find posts by title or content
2. **Filter**: Click the "Filter" button to open dropdown and select sorting option
3. **Clear**: Click the "X" button to clear search
4. **Results**: See filtered results update in real-time

### For Developers
```javascript
// Access search context in any component
const {
  searchQuery,
  selectedFilter,
  updateSearchQuery,
  updateSelectedFilter
} = useSearchContext();

// Use in API calls
const { data } = useInfinitePosts({
  searchQuery: debouncedSearchQuery,
  sortBy: currentFilter.sortBy,
  order: currentFilter.order,
});
```

## Files Modified/Created

### New Files
- `contexts/SearchContext.js` - Search context management
- `components/Common/FilterDropdown/` - Filter dropdown component
- `SEARCH_FILTER_FEATURE.md` - This documentation

### Modified Files
- `components/layouts/Header/Header.js` - Added search and filter UI
- `components/layouts/Header/Header.module.scss` - Updated styles
- `components/Pages/Homepage/Homepage.js` - Integrated search/filter
- `hooks/useInfinitePosts.js` - Added sort parameters
- `services/api/posts.js` - Updated API calls
- `pages/_app.js` - Added SearchProvider
- `contexts/index.js` - Exported SearchContext

## Responsive Design
- **Desktop**: Full search bar with filter dropdown
- **Tablet**: Compact filter button (text hidden)
- **Mobile**: Search bar hidden (can be moved to mobile menu if needed)

## Performance Considerations
- Debounced search to prevent excessive API calls
- React Query caching for efficient data management
- Context optimization to prevent unnecessary re-renders
- Infinite scroll maintains performance with large datasets

## Future Enhancements
- Advanced filters (date range, user, etc.)
- Search suggestions/autocomplete
- Saved search/filter preferences
- Mobile search modal
- Keyboard shortcuts for filters

