import { Platform, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TrackConfig, TrackEvent, EventTypes } from './types';

const USER_ID_KEY = '@track_user_id';

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

  private async sendEvent(event: TrackEvent): Promise<void> {
    try {
      // Get user ID directly from storage
      let userId = null;
      try {
        userId = await AsyncStorage.getItem(USER_ID_KEY);
        if (this.config.debug) {
          console.log('Retrieved user ID from storage:', userId);
        }
      } catch (error) {
        if (this.config.debug) {
          console.error('Error retrieving user ID:', error);
        }
      }

      // Add user ID to event if available
      const eventWithUser = {
        ...event,
        userId: userId,
        timestamp: new Date().toISOString(),
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

  public async setUserId(userId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_ID_KEY, userId);
      if (this.config.debug) {
        console.log('User ID set to:', userId);
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('Error saving user ID:', error);
      }
      throw error;
    }
  }

  public async getUserId(): Promise<string | null> {
    try {
      const userId = await AsyncStorage.getItem(USER_ID_KEY);
      if (this.config.debug) {
        console.log('Retrieved user ID:', userId);
      }
      return userId;
    } catch (error) {
      if (this.config.debug) {
        console.error('Error retrieving user ID:', error);
      }
      return null;
    }
  }

  public async clearUserId(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_ID_KEY);
      if (this.config.debug) {
        console.log('User ID cleared');
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('Error clearing user ID:', error);
      }
      throw error;
    }
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