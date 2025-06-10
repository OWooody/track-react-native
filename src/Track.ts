import { Platform, NativeModules } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { TrackConfig, TrackEvent, SessionData } from './types';

export class Track {
  private static instance: Track;
  private config: TrackConfig;
  private sessionId: string;
  private sessionStartTime: string;
  private pathHistory: string[] = [];

  private constructor(config: TrackConfig) {
    this.config = {
      apiUrl: 'https://api.track.com',
      debug: false,
      ...config,
    };
    this.sessionId = uuidv4();
    this.sessionStartTime = new Date().toISOString();
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

  private async sendEvent(event: TrackEvent): Promise<void> {
    try {
      const response = await fetch(`${this.config.apiUrl}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          ...event,
          sessionId: this.sessionId,
          timestamp: event.timestamp || new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send event: ${response.statusText}`);
      }

      if (this.config.debug) {
        console.log('Event sent successfully:', event);
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('Error sending event:', error);
      }
      throw error;
    }
  }

  public async trackEvent(event: TrackEvent): Promise<void> {
    await this.sendEvent(event);
  }

  public async trackScreen(screenName: string, properties?: Record<string, any>): Promise<void> {
    this.pathHistory.push(screenName);
    await this.trackEvent({
      name: 'screen_view',
      properties: {
        screenName,
        ...properties,
      },
      pageTitle: screenName,
      pageType: 'screen',
    });
  }

  public async trackUser(userId: string, properties?: Record<string, any>): Promise<void> {
    await this.trackEvent({
      name: 'user_identified',
      userId,
      properties,
    });
  }

  public async trackConversion(
    conversionType: string,
    value?: number,
    currency?: string,
    properties?: Record<string, any>
  ): Promise<void> {
    await this.trackEvent({
      name: 'conversion',
      conversionType,
      value,
      currency,
      properties,
    });
  }

  public async trackElementInteraction(
    elementId: string,
    elementType: string,
    elementText?: string,
    elementCategory?: string,
    properties?: Record<string, any>
  ): Promise<void> {
    await this.trackEvent({
      name: 'element_interaction',
      elementId,
      elementType,
      elementText,
      elementCategory,
      properties,
    });
  }

  public getSessionData(): SessionData {
    return {
      sessionId: this.sessionId,
      startTime: this.sessionStartTime,
      pathHistory: this.pathHistory,
      deviceType: Platform.OS,
      os: Platform.Version.toString(),
    };
  }
} 