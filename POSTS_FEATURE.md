# Posts Feature with Infinite Scroll

This feature implements a posts listing page with infinite scroll functionality using React Query and the JSONPlaceholder API.

## Features

- **Infinite Scroll**: Load more posts as you scroll down using `react-infinite-scroll-component`
- **React Query Integration**: Efficient data fetching and caching with `@tanstack/react-query`
- **Search Functionality**: Search posts by title or content with debounced input
- **Responsive Design**: Mobile-friendly layout with responsive grid
- **Post Details**: Individual post detail pages with comments
- **Loading States**: Proper loading indicators and error handling

## API Integration

The feature uses the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to fetch:
- Posts with pagination
- Individual post details
- Post comments
- User information

## Components

### 1. PostCard (`components/Common/PostCard/`)
- Displays individual post information
- Shows user avatar and name
- Expandable post content
- Link to post details

### 2. Posts Page (`pages/posts.js`)
- Main posts listing with infinite scroll
- Search functionality
- Loading and error states
- Responsive grid layout

### 3. Post Detail Page (`pages/posts/[id].js`)
- Individual post view
- Comments section
- User information
- Navigation back to posts list

## Hooks

### `useInfinitePosts`
- Manages infinite scroll data fetching
- Handles search functionality
- Provides loading and error states

### `usePost`, `usePostComments`, `useUser`
- Individual data fetching hooks
- Optimized caching and refetching

## API Services

### `services/api/posts.js`
- `fetchPosts`: Get paginated posts
- `fetchPostById`: Get single post
- `fetchPostComments`: Get post comments
- `fetchUserById`: Get user information
- `searchPosts`: Search posts by query

## Usage

1. Navigate to `/posts` to see the posts list
2. Scroll down to load more posts automatically
3. Use the search bar to filter posts
4. Click "View Details" to see individual post pages
5. Post detail pages show comments and user information

## Dependencies

- `@tanstack/react-query`: Data fetching and caching
- `react-infinite-scroll-component`: Infinite scroll functionality
- `axios`: HTTP client for API requests

## Styling

- Uses SCSS modules for component-specific styles
- Responsive design with mobile-first approach
- Loading animations and smooth transitions
- Modern card-based layout
