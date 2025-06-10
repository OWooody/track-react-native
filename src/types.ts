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
  planId?: string;                // Subscription plan ID from your backend
  referrer?: string;              // URL of the referring page (get it from Adjust or any tool you are using as a deeplink)
  userAgent?: string;             // User agent string of the browser/device
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