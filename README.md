# Track React Native SDK

A simple React Native SDK for tracking events.

## Installation

```bash
npm install track-react-native
# or
yarn add track-react-native
```

## Quick Start

```typescript
import { Track, EventTypes } from 'track-react-native';

// Initialize the SDK
const track = Track.initialize({
  apiKey: 'your-api-key',
  apiUrl: 'https://your-api-url.com', // Optional
  debug: true, // Enable debug mode for detailed logging
});

// Set user ID from your backend 
track.setUserId('user123');

// Track events
await track.trackEvent({
  name: EventTypes.SCREEN_VIEW,
  path: '/home',
  pageTitle: 'Home Page'
});

// Track purchase
await track.trackEvent({
  name: EventTypes.PURCHASE,
  value: 99.99,
  itemId: 'premium-plan',
  itemName: 'Premium Plan',
  properties: {
    currency: 'USD'
  }
});
```

## Event Properties

```typescript
interface TrackEvent {
  name: string;                   // Required: Event name
  properties?: object;            // Optional: Custom properties
  path?: string;                  // Optional: Page/screen path
  pageTitle?: string;             // Optional: Page/screen title
  value?: number;                 // Optional: Numeric value
  itemId?: string;                // Optional: Item ID
  itemName?: string;              // Optional: Item name
  itemCategory?: string;          // Optional: Item category
  userId?: string;                // Optional: User ID
  category?: string;              // Optional: Event category
  action?: string;                // Optional: Action performed
}
```

## Available Event Types

```typescript
const EventTypes = {
  // Page/Screen Events
  SCREEN_VIEW: 'screen_view',
  
  // User Events
  LOGIN: 'login',
  LOGOUT: 'logout',
  
  // Conversion Events
  PURCHASE: 'purchase',
  SIGNUP: 'signup',
  SUBSCRIBE: 'subscribe',
  
  // Action Events
  BOOK: 'book',
  CANCEL: 'cancel',
  VIEW_ITEM: 'view_item',
  BEGIN_CHECKOUT: 'begin_checkout',
  ADD_TO_CART: 'add_to_cart'
}
```

## Event Categories

```typescript
type EventCategory = 
  | 'engagement'    // User interactions (clicks, form submissions)
  | 'conversion'    // Business goals (purchases, signups)
  | 'navigation'    // Page/screen views
  | 'error'         // Error tracking
  | 'performance'   // Performance metrics
  | 'custom'        // Custom events
```

## Event Actions

```typescript
type EventAction = 
  | 'view'      // Viewing content
  | 'click'     // Clicking elements
  | 'submit'    // Form submissions
  | 'scroll'    // Scrolling behavior
  | 'search'    // Search actions
  | 'filter'    // Filtering content
  | 'sort'      // Sorting content
  | 'download'  // File downloads
  | 'share'     // Content sharing
  | 'custom'    // Custom actions
```

## Error Handling

The SDK provides detailed error information when debug mode is enabled. Common errors include:

1. **API Connection Issues**
   - Check if the `apiUrl` is correct
   - Verify network connectivity
   - Ensure the API endpoint is accessible

2. **Authentication Errors**
   - Verify your `apiKey` is correct
   - Check if the API key has proper permissions

3. **Request Format Issues**
   - Ensure event names are strings
   - Properties should be a valid JSON object
   - Timestamp should be a valid ISO string

Example of error handling with debug mode:

```typescript
Track.initialize({
  apiKey: 'your-api-key',
  debug: true, // Enable debug mode
  apiUrl: 'https://your-api-url.com'
});

const track = Track.getInstance();

try {
  await track.trackEvent({
    name: EventTypes.SCREEN_VIEW,
    path: '/home',
    pageTitle: 'Home Page',
    properties: {
      test: 'value'
    }
  });
} catch (error) {
  // Debug mode will show:
  // - The API URL being used
  // - The event data being sent
  // - Detailed error message from the server
  console.error('Full error details:', error);
}
```

## License

MIT 