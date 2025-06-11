export interface TrackConfig {
  apiKey: string;
  apiUrl?: string;
  debug?: boolean;
}

export interface EventProperties {
  [key: string]: any;
}

export type EventCategory = 
  | 'engagement'
  | 'conversion'
  | 'navigation'
  | 'error'
  | 'performance'
  | 'custom';

export type EventAction = 
  | 'view'
  | 'click'
  | 'submit'
  | 'scroll'
  | 'search'
  | 'filter'
  | 'sort'
  | 'download'
  | 'share'
  | 'custom';

export interface TrackEvent {
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

// Predefined event types for common tracking scenarios
export const EventTypes = {
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
} as const; 