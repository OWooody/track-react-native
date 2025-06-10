# Track React Native SDK

A React Native SDK for the Track User Behavior Analytics Platform.

## Installation

```bash
npm install track-react-native
# or
yarn add track-react-native
```

## Usage

### Initialize the SDK

```typescript
import { Track } from 'track-react-native';

// Initialize the SDK with your API key
Track.initialize({
  apiKey: 'your-api-key',
  debug: true, // Optional: Enable debug mode
  apiUrl: 'https://your-api-url.com' // Optional: Custom API URL
});
```

### Track Events

```typescript
// Get the Track instance
const track = Track.getInstance();

// Track a custom event
await track.trackEvent({
  name: 'button_click',
  properties: {
    buttonId: 'submit-button',
    buttonText: 'Submit'
  }
});

// Track screen views
await track.trackScreen('HomeScreen', {
  referrer: 'LoginScreen'
});

// Track user identification
await track.trackUser('user-123', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Track conversions
await track.trackConversion(
  'purchase',
  99.99,
  'USD',
  {
    productId: 'product-123',
    productName: 'Premium Plan'
  }
);

// Track element interactions
await track.trackElementInteraction(
  'submit-button',
  'button',
  'Submit',
  'form',
  {
    formId: 'signup-form'
  }
);
```

### Get Session Data

```typescript
const sessionData = track.getSessionData();
console.log('Current session:', sessionData);
```

## Features

- Automatic session tracking
- Screen view tracking
- User identification
- Conversion tracking
- Element interaction tracking
- Custom event tracking
- Debug mode
- TypeScript support

## API Reference

### Track.initialize(config: TrackConfig)

Initializes the SDK with the provided configuration.

### Track.getInstance()

Returns the singleton instance of the Track SDK.

### track.trackEvent(event: TrackEvent)

Tracks a custom event with the provided properties.

### track.trackScreen(screenName: string, properties?: Record<string, any>)

Tracks a screen view event.

### track.trackUser(userId: string, properties?: Record<string, any>)

Tracks a user identification event.

### track.trackConversion(conversionType: string, value?: number, currency?: string, properties?: Record<string, any>)

Tracks a conversion event.

### track.trackElementInteraction(elementId: string, elementType: string, elementText?: string, elementCategory?: string, properties?: Record<string, any>)

Tracks an element interaction event.

### track.getSessionData()

Returns the current session data.

## License

MIT 