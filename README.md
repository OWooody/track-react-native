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
```

### Track Events

```typescript
// Get the Track instance
const track = Track.getInstance();

// Track a page view
try {
  await track.trackEvent({
    name: EventTypes.PAGE_VIEW,
    category: 'navigation',
    action: 'view',
    pageTitle: 'Home Page',
    properties: {
      referrer: 'Login Page'
    }
  });
} catch (error) {
  console.error('Failed to track event:', error);
}

// Track a button click
try {
  await track.trackEvent({
    name: EventTypes.BUTTON_CLICK,
    category: 'engagement',
    action: 'click',
    elementId: 'submit-button',
    elementType: 'button',
    elementText: 'Submit',
    properties: {
      formId: 'signup-form'
    }
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
    currency: 'USD',
    properties: {
      productId: 'premium-plan',
      productName: 'Premium Plan'
    }
  });
} catch (error) {
  console.error('Failed to track event:', error);
}
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

### track.trackEvent(event: TrackEvent)

Tracks an event with the provided properties. The SDK automatically adds a timestamp to each event.

```typescript
interface TrackEvent {
  name: string;                   // Name of the event, use EventTypes for predefined events (e.g., 'purchase', 'page_view')
  properties?: EventProperties;   // Additional custom properties for the event
  category?: EventCategory;       // Category of the event, use EventCategory for predefined categories (e.g., 'conversion', 'engagement')
  action?: EventAction;           // Action performed, use EventAction for predefined actions (e.g., 'click', 'submit', 'view')
  value?: number;                 // Purchase amount or subscription price (VAT included)
  currency?: string;              // Currency code for the value (e.g., 'USD', 'EUR')
  userId?: string;                // Unique identifier of the user (from your backend)
  pageTitle?: string;             // Title of the page where the event occurred (automatically generated if not provided)
  itemId?: string;                // Item ID or product ID from your backend
  itemName?: string;              // Item or product name from your backend
  itemCategory?: string;          // Category of the item involved
  planId?: string;                // Identifier of the subscription plan
  referrer?: string;              // URL of the referring page
  userAgent?: string;             // User agent string of the browser/device
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