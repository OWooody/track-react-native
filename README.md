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

// Track a simple event
await track.trackEvent({
  name: 'button_click',
  properties: {
    buttonId: 'submit-button',
    buttonText: 'Submit'
  }
});

// Track an event with timestamp
await track.trackEvent({
  name: 'user_action',
  properties: {
    action: 'login'
  },
  timestamp: new Date().toISOString()
});
```

## API Reference

### Track.initialize(config: TrackConfig)

Initializes the SDK with the provided configuration.

```typescript
interface TrackConfig {
  apiKey: string;
  apiUrl?: string;
  debug?: boolean;
}
```

### Track.getInstance()

Returns the singleton instance of the Track SDK.

### track.trackEvent(event: TrackEvent)

Tracks an event with the provided properties.

```typescript
interface TrackEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
}
```

## License

MIT 