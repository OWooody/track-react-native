# Track React Native SDK

A simple React Native SDK for tracking events.

## Installation

```bash
npm install track-react-native
# or
yarn add track-react-native
```

## Usage

### Initialize the SDK

```typescript
import { Track, EventTypes } from 'track-react-native';

// Initialize the SDK with your API key
Track.initialize({
  apiKey: 'your-api-key',
  debug: true, // Enable debug mode for detailed logging
  apiUrl: 'https://your-api-url.com' // Your API endpoint
});

// Get the Track instance
const track = Track.getInstance();

// Set user ID for all subsequent events
track.setUserId('user123');
```

### Track Events

```typescript
// Track a page view
try {
  await track.trackEvent({
    name: EventTypes.SCREEN_VIEW,
    category: 'navigation',
    action: 'view',
    path: '/home',
    pageTitle: 'Home Page',
    properties: {
      referrer: 'Login Page'
    }
    // userId is automatically included from setUserId
  });
} catch (error) {
  console.error('Failed to track event:', error);
}

// Track a purchase
try {
  await track.trackEvent({
    name: EventTypes.PURCHASE,
    category: 'conversion',
    action: 'submit',
    value: 99.99,
    itemId: 'premium-plan',
    itemName: 'Premium Plan',
    itemCategory: 'Subscription',
    properties: {
      currency: 'USD',
      paymentMethod: 'credit_card'
    }
    // userId is automatically included from setUserId
  });
} catch (error) {
  console.error('Failed to track event:', error);
}
```

### User Identification

The SDK provides methods to manage user identification:

```typescript
// Set user ID for all subsequent events
track.setUserId('user123');

// Get current user ID
const currentUserId = track.getUserId();

// Track user login
await track.trackEvent({
  name: EventTypes.LOGIN,
  category: 'engagement',
  action: 'submit',
  path: '/login',
  pageTitle: 'Login Page',
  properties: {
    method: 'email'
  }
  // userId is automatically included from setUserId
});
```

## Event Types and Categories

### Predefined Event Types

```typescript
const EventTypes = {
  // Page/Screen Events
  PAGE_VIEW: 'page_view',
  SCREEN_VIEW: 'screen_view',
  
  // User Events
  USER_IDENTIFIED: 'user_identified',
  USER_LOGOUT: 'user_logout',
  
  // Conversion Events
  PURCHASE: 'purchase',
  SIGNUP: 'signup',
  SUBSCRIPTION: 'subscription',
  
  // Element Interaction Events
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  LINK_CLICK: 'link_click',
  
  // Error Events
  ERROR: 'error',
  EXCEPTION: 'exception',
  
  // Performance Events
  PERFORMANCE: 'performance',
  LOAD_TIME: 'load_time',
  
  // Custom Events
  CUSTOM: 'custom'
}
```

### Event Categories

```typescript
type EventCategory = 
  | 'engagement'    // User interactions
  | 'conversion'    // Business goals
  | 'navigation'    // Page/screen views
  | 'error'         // Error tracking
  | 'performance'   // Performance metrics
  | 'custom'        // Custom events
```

### Event Actions

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

## API Reference

### Track.initialize(config: TrackConfig)

Initializes the SDK with the provided configuration.

```typescript
interface TrackConfig {
  apiKey: string;      // Your API key
  apiUrl?: string;     // Optional: Custom API URL (default: 'https://api.track.com')
  debug?: boolean;     // Optional: Enable debug mode (default: false)
}
```

### Track.getInstance()

Returns the singleton instance of the Track SDK.

### track.setUserId(userId: string)

Sets the user ID to be used for all subsequent events. This ID will be automatically included in all events unless explicitly overridden.

### track.getUserId(): string | null

Returns the current user ID or null if not set.

### track.trackEvent(event: TrackEvent)

Tracks an event with the provided properties. The SDK automatically adds a timestamp and user ID (if set) to each event.

```typescript
interface TrackEvent {
  name: string;                   // Required: Name of the event
  properties?: EventProperties;   // Optional: Additional properties
  timestamp?: string;             // Optional: ISO timestamp
  category?: EventCategory;       // Optional: Event category (default: "engagement")
  path?: string;                  // Optional: Page path
  pageTitle?: string;             // Optional: Page title
  action?: EventAction;           // Optional: Action performed
  itemName?: string;              // Optional: Name of the item
  itemId?: string;                // Optional: ID of the item
  itemCategory?: string;          // Optional: Category of the item
  value?: number;                 // Optional: Numeric value
  planId?: string;                // Optional: Plan identifier
  userId?: string;                // Optional: User identifier
  referrer?: string;              // Optional: URL of the referring page
  userAgent?: string;             // Optional: User agent string
}
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
    name: EventTypes.CUSTOM,
    category: 'engagement',
    action: 'click',
    path: '/custom-page',
    pageTitle: 'Custom Page',
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

## Troubleshooting

If you encounter issues:

1. Enable debug mode to see detailed logs
2. Check the API endpoint is accessible
3. Verify your API key is correct
4. Ensure proper network connectivity
5. Check the event data format

## License

MIT 