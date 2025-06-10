export interface TrackConfig {
  apiKey: string;
  apiUrl?: string;
  debug?: boolean;
}

export interface EventProperties {
  [key: string]: any;
}

export interface TrackEvent {
  name: string;
  properties?: EventProperties;
  timestamp?: string;
  sessionId?: string;
  userId?: string;
  planId?: string;
  category?: string;
  action?: string;
  pageTitle?: string;
  pageType?: string;
  elementId?: string;
  elementType?: string;
  elementText?: string;
  elementCategory?: string;
  value?: number;
  currency?: string;
  conversionType?: string;
  funnelStep?: string;
  itemId?: string;
  itemName?: string;
  itemCategory?: string;
  contentId?: string;
}

export interface SessionData {
  sessionId: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  pathHistory: string[];
  referrer?: string;
  userAgent?: string;
  browser?: string;
  city?: string;
  country?: string;
  deviceType?: string;
  organizationId?: string;
  os?: string;
  userId?: string;
} 