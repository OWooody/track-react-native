import { TrackConfig, TrackEvent } from './types';

export class Track {
  private static instance: Track;
  private config: TrackConfig;
  private userId: string | null = null;

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

  private async sendEvent(event: TrackEvent): Promise<void> {
    try {
      // Add user ID to event if available
      const eventWithUser = {
        ...event,
        userId: this.userId || event.userId,
        timestamp: event.timestamp || new Date().toISOString(),
      };

      if (this.config.debug) {
        console.log('Sending event to:', `${this.config.apiUrl}/api/events`);
        console.log('Event data:', eventWithUser);
      }

      const response = await fetch(`${this.config.apiUrl}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(eventWithUser),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send event: ${response.status} ${response.statusText} - ${errorText}`);
      }

      if (this.config.debug) {
        console.log('Event sent successfully:', eventWithUser);
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

  /**
   * Sets the user ID to be used for all subsequent events
   * @param userId The user ID to set
   */
  public setUserId(userId: string): void {
    this.userId = userId;
    if (this.config.debug) {
      console.log('User ID set to:', userId);
    }
  }

  /**
   * Gets the current user ID
   * @returns The current user ID or null if not set
   */
  public getUserId(): string | null {
    return this.userId;
  }
} 