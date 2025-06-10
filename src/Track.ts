import { TrackConfig, TrackEvent } from './types';

export class Track {
  private static instance: Track;
  private config: TrackConfig;

  private constructor(config: TrackConfig) {
    this.config = {
      apiUrl: 'https://api.track.com',
      debug: false,
      ...config,
    };
  }

  public static initialize(config: TrackConfig): Track {
    if (!Track.instance) {
      Track.instance = new Track(config);
    }
    return Track.instance;
  }

  public static getInstance(): Track {
    if (!Track.instance) {
      throw new Error('Track not initialized. Call Track.initialize() first.');
    }
    return Track.instance;
  }

  public async trackEvent(event: TrackEvent): Promise<void> {
    try {
      if (this.config.debug) {
        console.log('Sending event to:', `${this.config.apiUrl}/api/events`);
        console.log('Event data:', event);
      }

      const response = await fetch(`${this.config.apiUrl}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send event: ${response.status} ${response.statusText} - ${errorText}`);
      }

      if (this.config.debug) {
        console.log('Event sent successfully:', event);
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('Error sending event:', error);
        console.error('Event that failed:', event);
        console.error('API URL:', this.config.apiUrl);
      }
      throw error;
    }
  }
} 