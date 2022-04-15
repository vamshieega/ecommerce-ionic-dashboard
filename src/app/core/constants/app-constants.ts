/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
/* eslint-disable quote-props */
export const TUTORIAL_URL =
  'ZnuQXTqJTdM';
export const AVOID_SPACE = '^[a-zA-Z0-9]+(?:(?:. |[’ ])[a-zA-Z0-9]+)*$';
export const REST_NAME_PATTERN = "^[a-zA-Z0-9]+(?:(?:. |[’' ])[a-zA-Z0-9]+)*$";
export const ONLY_CHARACTERS = '^[a-zA-Z]+(?:(?:. |[’ ])[a-zA-Z]+)*$';
export const ONLY_CHAR = '^[a-zA-Z ]+$';
// eslint-disable-next-line @typescript-eslint/quotes
export const CHAR_WITH_NUMBER = '^[a-zA-Z0-9_ ]*$';
// eslint-disable-next-line @typescript-eslint/quotes
export const AVOID_SPACE_ONLY =
  "^[a-zA-Z0-9!-/:-@Z-`|]+(?:(?:. |[' ])[a-zA-Z0-9!-/:-@Z-`|]+)*$";
export const ONLY_CHARACTERS_WITH_AND_DOT =
  '^[a-zA-Z]+(?:(?:. |[’ ])[.&a-zA-Z.&]+)*$';
export const EMAIL_PATTERN =
  /^(([^<>!#$%&\^\*()\[\]\\.,;:\s@'"?`~]+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// export const GOOGLE_API_KEY = 'AIzaSyCxhBrN_GJqqrfeX7URiJvVAWsQOpMVFOk';
export const INTERVAL_TIME_ONE_MIN = 1000 * 60;
export const COUNTER = 2;
export const OUTLET_FORM_STATUS = 'complete';
export const GOOGLE_API_KEY = 'AIzaSyCxhBrN_GJqqrfeX7URiJvVAWsQOpMVFOk';
export const NEW_COUNTRY_CODES = [{ code: '+91' }, { code: '+1' }];


export const ROUTES_STR = {
  // Account Related
  login: '/login',
  signUp: '/signup',
  otp: '/otp',
  createPassword: '/create-password',
  forgetPassword: '/forget-password',

  // Products
  orders: '/home/orders',
  //Order Detail
  orderDetail: '/home/orders/order-detail',

  //Dashboard
  dashboard: '/home/dashboard',
  createOutlet: '/home/profile',
  manageAddress: '/home/profile/manage-address',
  customTiming: '/home/profile/custom-timing',
  manage: '/home/manage-outlet',
  deliveryRadius: '/home/profile/delivery-radius',
  deliveryService: '/home/profile/delivery-service',
  deliveryCalculation: '/home/profile/delivery-calculation',
  merchantinfo: '/home/merchant',
  accountSetting: '/home/account-setting',
  //Order Detail
  orderCancel: '/home/orders/order-cancel',
  oncallOrdering: '/home/on-call-order',
  //network
  offline: '/offline',

  //products
  categories: '/home/products/categories',
  allItems: '/home/products/all-items',
  newItem: '/home/products/new-item',
  //item: '/home/products/new-item/add-variant',
  addVariant: '/home/products/new-item/add-variant',
  addAddon: '/home/products/new-item/add-addons',
  //reports
  reports: '/home/reports',
  //discount
  discount: '/home/engagement/discount',
  createOffer: '/home/engagement/create-discount',
  discountType: '/home/engagement/create-discount/discount-type',
  discountAppliesTo: '/home/engagement/create-discount/applies-to',
  discountSchedule: '/home/engagement/create-discount/discount-schedule'
};

export const SIDE_MENU_LIST = [
  { name: 'Dashboard', url: ROUTES_STR.dashboard, displayInMobile: true, subMenu: [] },
  { name: 'Orders', url: ROUTES_STR.orders, subMenu: [] },
  {
    name: 'Products', url: '', collapsed: true,
    subMenu: [
      { name: 'Menu Items', url: ROUTES_STR.allItems },
      { name: 'Categories', url: ROUTES_STR.categories },
      { name: 'Item Import', url: ROUTES_STR.reports },
    ],
  },
  { name: 'Setup', url: ROUTES_STR.createOutlet, subMenu: [] },

  { name: 'On-call Ordering', url: ROUTES_STR.oncallOrdering, subMenu: [] },

  {
    name: 'Marketing', url: '', collapsed: true,
    subMenu: [
      { name: 'discount', url: ROUTES_STR.discount },
    ],
  },
];
export const FIRST_OUTLET_COMPLETE = [
  { title: 'Account Settings', url: ROUTES_STR.accountSetting },
  { title: 'Reports', url: ROUTES_STR.reports },
];

export const APP_DETAILS = {
  // 'deviceId': DEVICE_ID,
  appVersion: '1.0.0',
  app: 'restaurant_panel',
};
export enum DashboardStepStatus {
  incomplete = 'incomplete',
  complete = 'complete',
}

export const DEFAULT_COLORS = {
  primaryColor: '#213454',
  secondaryColor: '#E3EDFD'
};


export const ORDER_PAGE_LIMIT = 50;

export const OTP_CONFIG = {
  allowNumbersOnly: true,
  length: 4,
  disableAutoFocus: false,
  inputStyles: {
    width: '40px',
    height: '45px',
    background: 'var(--white-clr) 0% 0% no-repeat padding-box',
    border: '1px solid var(--primary-dark-clr)',
    'border-radius': '4px',
    'font-size': '1.2rem',
    'text-align': 'center',
    color: 'var(--secondary-blue-clr)',
    outline: '0',
    margin: '4px',
  },
};
export const SECONDS = 59;
export const seconds = SECONDS;
export const COUNTERR = 2;

export const FOREGROUND_MSG = 'New order received, Click here to accept';
export const EXIT_MSG = 'Are you sure, do you want to exit?';
export const PLAYSTORE_URL =
  'https://play.google.com/store/apps/details?id=com.yumzy.partnerapp';

export const CALL_PERMISSION = 'Permission denied, Update manually';
export const CALL_PERMISSION_MSG =
  'The app will only have access to the phone call while you are using the app';



export const PROFILE_MENU_LIST = [
  { name: 'Basic Details', headerInfo: 'Outlet info', isCompleted: false },
  {
    name: 'Operational timings',
    headerInfo: 'Outlet timings',
    isCompleted: false,
  },
  { name: 'Billing / Taxes', headerInfo: 'Licence', isCompleted: false },
  { name: 'FSSAI', headerInfo: 'Licence', isCompleted: false },
  { name: 'Bank Details', headerInfo: 'Bank details', isCompleted: false },
  {
    name: 'Delivery Config',
    headerInfo: 'Delivery configuration',
    isCompleted: false,
  },
  {
    name: 'Order Config',
    headerInfo: 'Order configuration',
    isCompleted: false,
  },
];

export const DAYS_FULL = [
  'sunday',
  'monday',
  'tuesday',
  'wednedsday',
  'thursday',
  'friday',
  'saturday',
];
export const DAYS_HALF = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const WEEKDAYS = [
  { key: '0', val: 'Sun', select: false },
  { key: '1', val: 'Mon', select: false },
  { key: '2', val: 'Tue', select: false },
  { key: '3', val: 'Wed', select: false },
  { key: '4', val: 'Thu', select: false },
  { key: '5', val: 'Fri', select: false },
  { key: '6', val: 'Sat', select: false },
];
export const WEEKS = [false, false, false, false, false, false, false];

export const AGM_MAP_CUSTOM_STYLES = [
  {
    featureType: 'all',
    elementType: 'labels.text',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
];
export const ADDRESS_BY_CITY = {
  types: [],
  componentRestrictions: { country: ['IN', 'US'] },
  fields: ['address_components', 'geometry', 'place_id', 'formatted_address'],
};

export const MENU_LAYOUT_CODE = {
  NORMAL_MENU_ITEM: 11,
  NORMAL_MENU_ITEM_WITH_LEFT_IMG: 12,
  NORMAL_MENU_ITEM_WITH_RIGHT_IMG: 16,
  TOP_ITEM: 15,

  // BEST_SELLER_ITEM: 14,
  // RECOMMENDED_ITEM: 13,
  // NORMAL_MENU_ITEM: 12,
  // TOP_ITEM: 15,
  // NORMAL_MENU_ITEM_WITHOUT_IMG: 11,
  // NORMAL_MENU_ITEM_WITH_RIGHT_IMG: 16,
};

export const CONFIRM_MODAL = {
  switch_on_title: 'Do you want to make this item available?',
  switch_on_Icon: 'icon-on',
  save: 'save',
  switch_off_title: 'Do you want to make this item unavailable?',
  switch_off_Icon: 'icon-off',
  delete_Icon: 'icon-delete',
  delete_variant: 'Do you want to delete this variant?',
};

export const DELIVERY_PROVIDERS = [
  {
    name: 'Dunzo',
    maxDistance: 12,
    icon: '../../../../assets/delivery_providers/dunzo_icon.png',
  },
  {
    name: 'Shadowfax',
    maxDistance: 7,
    icon: '../../../../assets/delivery_providers/shadowfax_icon.png',
  },
  {
    name: 'Rapido',
    maxDistance: 10,
    icon: '../../../../assets/delivery_providers/rapido_icon.png',
  },
  {
    name: 'Wefast',
    maxDistance: 9,
    icon: '../../../../assets/delivery_providers/wefast_icon.png',
  },
];

export const COUNTRY_TYPE = {
  inr: { name: 'INR', symbol: '₹', code: '+91' },
  usd: { name: 'USD', symbol: '$', code: '+1' },
  cad: { name: 'CAD', symbol: '$', code: '+1' },
};

export const ORDER_STATUS_TYPE = {
  food: [
    {
      id: 1,
      name: 'New Orders',
      type: 'NEW_ORDERS',
      class: 'new-order',
      modelKey: 'acceptanceWait',
    },
    {
      id: 2,
      name: 'Preparing',
      type: 'PREPARING',
      class: 'preparing',
      modelKey: 'foodPreparation',
    },
    {
      id: 3,
      name: 'Food Ready',
      type: 'FOOD_READY',
      class: 'food-ready',
      modelKey: 'foodReady',
    },
    {
      id: 4,
      name: 'Completed',
      type: 'COMPLETED',
      class: 'completed',
      modelKey: 'outForDelivery',
    },
    {
      id: 5,
      name: 'Past Orders',
      type: 'PAST_ORDERS',
      class: 'past-orders',
      modelKey: 'pastOrders',
    },
  ],
  grocery: [
    {
      id: 1,
      name: 'New Orders',
      type: 'NEW_ORDERS',
      class: 'new-order',
      modelKey: 'acceptanceWait',
    },
    {
      id: 2,
      name: 'In-Progress',
      type: 'PREPARING',
      class: 'preparing',
      modelKey: 'foodPreparation',
    },
    {
      id: 3,
      name: 'Out For Delivery',
      type: 'FOOD_READY',
      class: 'food-ready',
      modelKey: 'foodReady',
    },
    {
      id: 4,
      name: 'Completed',
      type: 'COMPLETED',
      class: 'completed',
      modelKey: 'outForDelivery',
    },
    {
      id: 5,
      name: 'Past Orders',
      type: 'PAST_ORDERS',
      class: 'past-orders',
      modelKey: 'pastOrders',
    },
  ],
  stationary: [
    {
      id: 1,
      name: 'New Orders',
      type: 'NEW_ORDERS',
      class: 'new-order',
      modelKey: 'acceptanceWait',
    },
    {
      id: 2,
      name: 'In-Progress',
      type: 'PREPARING',
      class: 'preparing',
      modelKey: 'foodPreparation',
    },
    {
      id: 3,
      name: 'Out For Delivery',
      type: 'FOOD_READY',
      class: 'food-ready',
      modelKey: 'foodReady',
    },
    {
      id: 4,
      name: 'Completed',
      type: 'COMPLETED',
      class: 'completed',
      modelKey: 'outForDelivery',
    },
    {
      id: 5,
      name: 'Past Orders',
      type: 'PAST_ORDERS',
      class: 'past-orders',
      modelKey: 'pastOrders',
    },
  ],
  'fruits&veggies': [
    {
      id: 1,
      name: 'New Orders',
      type: 'NEW_ORDERS',
      class: 'new-order',
      modelKey: 'acceptanceWait',
    },
    {
      id: 2,
      name: 'In-Progress',
      type: 'PREPARING',
      class: 'preparing',
      modelKey: 'foodPreparation',
    },
    {
      id: 3,
      name: 'Out For Delivery',
      type: 'FOOD_READY',
      class: 'food-ready',
      modelKey: 'foodReady',
    },
    {
      id: 4,
      name: 'Completed',
      type: 'COMPLETED',
      class: 'completed',
      modelKey: 'outForDelivery',
    },
    {
      id: 5,
      name: 'Past Orders',
      type: 'PAST_ORDERS',
      class: 'past-orders',
      modelKey: 'pastOrders',
    },
  ],
  'meat&poultry': [
    {
      id: 1,
      name: 'New Orders',
      type: 'NEW_ORDERS',
      class: 'new-order',
      modelKey: 'acceptanceWait',
    },
    {
      id: 2,
      name: 'Preparing',
      type: 'PREPARING',
      class: 'preparing',
      modelKey: 'foodPreparation',
    },
    {
      id: 3,
      name: 'Food Ready',
      type: 'FOOD_READY',
      class: 'food-ready',
      modelKey: 'foodReady',
    },
    {
      id: 4,
      name: 'Completed',
      type: 'COMPLETED',
      class: 'completed',
      modelKey: 'outForDelivery',
    },
    {
      id: 5,
      name: 'Past Orders',
      type: 'PAST_ORDERS',
      class: 'past-orders',
      modelKey: 'pastOrders',
    },
  ],
  bakery: [
    {
      id: 1,
      name: 'New Orders',
      type: 'NEW_ORDERS',
      class: 'new-order',
      modelKey: 'acceptanceWait',
    },
    {
      id: 2,
      name: 'Preparing',
      type: 'PREPARING',
      class: 'preparing',
      modelKey: 'foodPreparation',
    },
    {
      id: 3,
      name: 'Food Ready',
      type: 'FOOD_READY',
      class: 'food-ready',
      modelKey: 'foodReady',
    },
    {
      id: 4,
      name: 'Completed',
      type: 'COMPLETED',
      class: 'completed',
      modelKey: 'outForDelivery',
    },
    {
      id: 5,
      name: 'Past Orders',
      type: 'PAST_ORDERS',
      class: 'past-orders',
      modelKey: 'pastOrders',
    },
  ],
  others: [
    {
      id: 1,
      name: 'New Orders',
      type: 'NEW_ORDERS',
      class: 'new-order',
      modelKey: 'acceptanceWait',
    },
    {
      id: 2,
      name: 'In-Progress',
      type: 'PREPARING',
      class: 'preparing',
      modelKey: 'foodPreparation',
    },
    {
      id: 3,
      name: 'Out For Delivery',
      type: 'FOOD_READY',
      class: 'food-ready',
      modelKey: 'foodReady',
    },
    {
      id: 4,
      name: 'Completed',
      type: 'COMPLETED',
      class: 'completed',
      modelKey: 'outForDelivery',
    },
    {
      id: 5,
      name: 'Past Orders',
      type: 'PAST_ORDERS',
      class: 'past-orders',
      modelKey: 'pastOrders',
    },
  ],
  '': [
    {
      id: 1,
      name: 'New Orders',
      type: 'NEW_ORDERS',
      class: 'new-order',
      modelKey: 'acceptanceWait',
    },
    {
      id: 2,
      name: 'In-Progress',
      type: 'PREPARING',
      class: 'preparing',
      modelKey: 'foodPreparation',
    },
    {
      id: 3,
      name: 'Out For Delivery',
      type: 'FOOD_READY',
      class: 'food-ready',
      modelKey: 'foodReady',
    },
    {
      id: 4,
      name: 'Completed',
      type: 'COMPLETED',
      class: 'completed',
      modelKey: 'outForDelivery',
    },
    {
      id: 5,
      name: 'Past Orders',
      type: 'PAST_ORDERS',
      class: 'past-orders',
      modelKey: 'pastOrders',
    },
  ],
};

export const ORDER_STATUS = {
  acceptanceWait: { keys: 'acceptanceWait,valetOnWayToConfirm', sort: 1 },
  foodPreparation: { keys: 'foodPreparation', sort: 1 },
  foodReady: { keys: 'foodReady,waitingDeliveryPickup', sort: 1 },
  outForDelivery: { keys: 'outForDelivery,delivered,complete', sort: -1 },
  pastOrders: {
    keys: 'outForDelivery,delivered,complete,cancelled,rejected,inDispute,enforcedCancel',
    sort: -1,
  },
};

export const PAGE_TITLE = {
  dashboard: 'Dashboard',
  order: 'Manage Orders',
  product: 'Products',
  category: 'Categories',
  import: ' Item Import',
  outletSetup: 'Outlet Setup',
  social: 'Socials',
  discount: 'Discount',
  omniChannel: 'Omni-Channel',
  report: 'Reports',
};

export const ORDER_STATUS_BTN_TEXT = {
  food: {
    acceptanceWait: 'ACCEPT ORDER',
    foodPreparation: 'FOOD READY',
    foodReady: 'COMPLETE ORDER',
  },
  grocery: {
    acceptanceWait: 'Accept',
    foodPreparation: 'Out For Delivery',
    foodReady: 'Mark Delivered',
  },
};

export const UPLOAD_FILE_BEAN = {
  bytes: null,
  contentType: null,
  documentId: null,
  fileType: null,
  name: null,
  size: null,
};

export const BUSINESS_TYPE_LIST = [
  { key: 'food', val: 'Restaurant' },
  { key: 'grocery', val: 'Grocery' },
  { key: 'stationary', val: 'Stationary' },
  { key: 'fruits&veggies', val: 'Fruits & Vegetables' },
  { key: 'meat&poultry', val: 'Meat & Poultry' },
  { key: 'bakery', val: 'Bakery' },
  { key: 'others', val: 'Others' },
];

export const SLOT_TIME = [
  { key: '0000', value: '12:00 AM' },
  { key: '0030', value: '12:30 AM' },
  { key: '0100', value: '01:00 AM' },
  { key: '0130', value: '01:30 AM' },
  { key: '0200', value: '02:00 AM' },
  { key: '0230', value: '02:30 AM' },
  { key: '0300', value: '03:00 AM' },
  { key: '0330', value: '03:30 AM' },
  { key: '0400', value: '04:00 AM' },
  { key: '0430', value: '04:30 AM' },
  { key: '0500', value: '05:00 AM' },
  { key: '0530', value: '05:30 AM' },
  { key: '0600', value: '06:00 AM' },
  { key: '0630', value: '06:30 AM' },
  { key: '0700', value: '07:00 AM' },
  { key: '0730', value: '07:30 AM' },
  { key: '0800', value: '08:00 AM' },
  { key: '0830', value: '08:30 AM' },
  { key: '0900', value: '09:00 AM' },
  { key: '0930', value: '09:30 AM' },
  { key: '1000', value: '10:00 AM' },
  { key: '1030', value: '10:30 AM' },
  { key: '1100', value: '11:00 AM' },
  { key: '1130', value: '11:30 AM' },
  { key: '1200', value: '12:00 PM' },
  { key: '1230', value: '12:30 PM' },
  { key: '1300', value: '1:00 PM' },
  { key: '1330', value: '1:30 PM' },
  { key: '1400', value: '2:00 PM' },
  { key: '1430', value: '2:30 PM' },
  { key: '1500', value: '3:00 PM' },
  { key: '1530', value: '3:30 PM' },
  { key: '1600', value: '4:00 PM' },
  { key: '1630', value: '4:30 PM' },
  { key: '1700', value: '5:00 PM' },
  { key: '1730', value: '5:30 PM' },
  { key: '1800', value: '6:00 PM' },
  { key: '1830', value: '6:30 PM' },
  { key: '1900', value: '7:00 PM' },
  { key: '1930', value: '7:30 PM' },
  { key: '2000', value: '8:00 PM' },
  { key: '2030', value: '8:30 PM' },
  { key: '2100', value: '9:00 PM' },
  { key: '2130', value: '9:30 PM' },
  { key: '2200', value: '10:00 PM' },
  { key: '2230', value: '10:30 PM' },
  { key: '2300', value: '11:00 PM' },
  { key: '2330', value: '11:30 PM' },
  { key: '2359', value: '11:59 PM' },
];

export const GETTING_STARTED_STEPS = [
  {
    stepTitle: 'Create your first outlet',
    stepSequence: 'Step 1',
    key: 'outletCreation',
    stepDescription: 'Configure an outlet to receive and prepare orders.',
    anchor: 'Know more',
    createButton: 'Create Outlet',
    status: 'incomplete',
    stepImg:
      'https://sgp1.digitaloceanspaces.com/listing/restaurant-dashboard-v2/assets/images/v3Steps/outlet-setup-video-img.png',
    stepBgColor: '#DE9290',
    videoUrl: 'K1F8zI0liuM',
    path: ROUTES_STR.createOutlet,
  },
  {
    stepSequence: 'Step 2',
    key: 'deploy',
    stepTitle: 'Create your domain name',
    stepDescription:
      'Configure a domain name for your outlet to receive online orders.',
    anchor: 'Know more',
    createButton: 'Create Domain',
    status: 'incomplete',
    stepImg:
      'https://sgp1.digitaloceanspaces.com/listing/restaurant-dashboard-v2/assets/images/v3Steps/create-outlet-video-image.png',
    stepBgColor: '#7AEDFA',
    videoUrl: 'wOaRV5bQ-Kk',
    path: ROUTES_STR.accountSetting,
  },
  {
    stepSequence: 'Step 3',
    key: 'categoryCreation',
    stepTitle: 'Create categories for your items',
    stepDescription:
      'Configure categories to segregate your items under different types',
    anchor: 'Know more',
    createButton: 'Create Categories',
    status: 'incomplete',
    stepImg:
      'https://sgp1.digitaloceanspaces.com/listing/restaurant-dashboard-v2/assets/images/v3Steps/create-categories-video-image.png',
    stepBgColor: '#9F84D0',
    videoUrl: 'Ybfjy2PD0es',
    //category page pending
    path: ROUTES_STR.accountSetting,
  },
  {
    stepSequence: 'step 4',
    key: 'menuCreation',
    stepTitle: 'Create items for customer view',
    stepDescription:
      'Configure individual items and make them available for ordering.',
    anchor: 'Know more',
    createButton: 'Create Items',
    status: 'incomplete',
    stepImg:
      'https://sgp1.digitaloceanspaces.com/listing/restaurant-dashboard-v2/assets/images/v3Steps/layout-selection-video-image.png',
    stepBgColor: '#82EFA4',
    videoUrl: 'zDjbuOhSr1s',
    //Item page pending
    path: ROUTES_STR.accountSetting,
  },
];
export const DISCOUNT_SUMMARY = {
  'main': 'Available on online sales channels',
}

export const APPLIED_TO = {
  all: 'all products',
  collection: 'collections',
  items: 'products'
}

export const ALLOWED_CERTIFICATE_TYPE = [
  'image/png',
  'image/PNG',
  'image/jpg',
  'image/JPG',
  'image/jpeg',
  'image/JPEG',
  'application/pdf',
];

export const GSTIN_TAXES = [
  { key: '0', value: '0%' },
  { key: '5', value: '5%' },
  { key: '12', value: '12%' },
  { key: '18', value: '18%' },
];


export const CLASS_COLOR_MAP = {
  'revenue-generated': '#28a745',
  'tax-component': '#663399',
  'revenue-value': '#dc3545',
  'avg-order-value': '#ffc107',
  'completed-order': '#28a745',
  'cancelled-orders': '#dc3545',
  'total-orders': '#3d2643',
  'food-ready': '#ffc107',
  'customer-reordered': '#663399',
  'new-customer': '#28a745',
};
export const COLOR_PALETTE = [
  {
    "primaryColor": "#40A944",
    "primaryColorGrd1": "#40A944FA",
    "primaryColorGrd2": "#40A9441A",
    "secondaryColor": "#ffffff",

  },
  {
    "primaryColor": "#264653",
    "primaryColorGrd1": "#264653FA",
    "primaryColorGrd2": "#2646531A",
    "secondaryColor": "#2A9D8F",

  },
  {
    "primaryColor": "#845EC2",
    "primaryColorGrd1": "#845EC2FA",
    "primaryColorGrd2": "#845EC21A",
    "secondaryColor": "#F9F871",

  },
  {
    "primaryColor": "#FF7C8D",
    "primaryColorGrd1": "#FF7C8DFA",
    "primaryColorGrd2": "#FF7C8D1A",
    "secondaryColor": "#2F4858",

  },
  {
    "primaryColor": "#0F38DE",
    "primaryColorGrd1": "#0F38DEFA",
    "primaryColorGrd2": "#0F38DE1A",
    "secondaryColor": "#FADE4B",

  },
  {
    "primaryColor": "#ECAC4E",
    "primaryColorGrd1": "#ECAC4EFA",
    "primaryColorGrd2": "#ECAC4E41A",
    "secondaryColor": "#384854",

  },
  {
    "primaryColor": "#006D77",
    "primaryColorGrd1": "#006D77FA",
    "primaryColorGrd2": "#006D771A",
    "secondaryColor": "#E29578",

  },

  {
    "primaryColor": "#541847",
    "primaryColorGrd1": "#541847FA",
    "primaryColorGrd2": "#5418471A",
    "secondaryColor": "#CF2D30",

  },
  {
    "primaryColor": "#402D2E",
    "primaryColorGrd1": "#402D2EFA",
    "primaryColorGrd2": "#402D2E1A",
    "secondaryColor": "#F8DCD2",

  },
  {
    "primaryColor": "#5720E5",
    "primaryColorGrd1": "#5720E5FA",
    "primaryColorGrd2": "#5720E51A",
    "secondaryColor": "#66D7C5",

  },
  {
    "primaryColor": "#000000",
    "primaryColorGrd1": "#000000FA",
    "primaryColorGrd2": "#0000001A",
    "secondaryColor": "#ffffff",

  },
  {
    "primaryColor": "#43675A",
    "primaryColorGrd1": "#43675AFA",
    "primaryColorGrd2": "#43675A1A",
    "secondaryColor": "#E96137",

  },
  {
    "primaryColor": "#FFCDB2",
    "primaryColorGrd1": "#FFCDB2FA",
    "primaryColorGrd2": "#FFCDB21A",
    "secondaryColor": "#2F4858",

  },
  {
    "primaryColor": "#BEE9E8",
    "primaryColorGrd1": "#BEE9E8FA",
    "primaryColorGrd2": "#BEE9E81A",
    "secondaryColor": "#5FA8D3",

  },
  {
    "primaryColor": "#CB997E",
    "primaryColorGrd1": "#CB997EFA",
    "primaryColorGrd2": "#CB997E1A",
    "secondaryColor": "#6B705C",

  },
  {
    "primaryColor": "#03045E",
    "primaryColorGrd1": "#03045EFA",
    "primaryColorGrd2": "#03045E1A",
    "secondaryColor": "#CAF0F8",

  },
  {
    "primaryColor": "#081C15",
    "primaryColorGrd1": "#081C15FA",
    "primaryColorGrd2": "#081C151A",
    "secondaryColor": "#D8F3DC",

  },
  {
    "primaryColor": "#F72585",
    "primaryColorGrd1": "#F72585FA",
    "primaryColorGrd2": "#F725851A",
    "secondaryColor": "#4CC9F0",

  },
  {
    "primaryColor": "#212529",
    "primaryColorGrd1": "#212529FA",
    "primaryColorGrd2": "#2125291A",
    "secondaryColor": "#F8F9FA",

  },
  {
    "primaryColor": "#4F000B",
    "primaryColorGrd1": "#4F000BFA",
    "primaryColorGrd2": "#4F000B1A",
    "secondaryColor": "#FFE6A7",

  }
];
