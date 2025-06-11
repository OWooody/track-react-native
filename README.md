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

## Error Handling

```typescript
try {
  await track.trackEvent({
    name: EventTypes.SCREEN_VIEW,
    path: '/home'
  });
} catch (error) {
  console.error('Failed to track event:', error);
}
```

## License

MIT 