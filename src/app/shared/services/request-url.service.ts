/* eslint-disable @typescript-eslint/naming-convention */
import { AppData } from './app-data.service';

export type URL_KEYS =
  // Accounts Related URLs
  'login' | 'sendOtp' | 'signup' | 'logout' | 'initSignup' | 'completeSignup' | 'subinitSignup'
  | 'forgetPassword' | 'resetPassword' | 'restData'
  | 'storeNameValidation' | 'restConfig'
  //OutLet Levels URLs
  | 'outletDetails' | 'setAvailability' | 'outlet' | 'outletList' | 'fetchOutletDetails' | 'getCurrentAddress' | 'fssaiCertificateLink' |
  'verifyBankAccount' | 'viewUsers'

  // Order Management
  | 'deliveryInfo' | 'getOrders' | 'getOrderDetailsById' | 'changeStatus' | 'newOrderSubscription'

  // menu import
  | 'menuItemsList' | 'addMenuSlot' | 'menuItemById' | 'menuItemCreate' | 'menuItemUpdate' | 'menuItemDelete'

  // category Url
  | 'getCategory' | 'offMenuItem' | 'addSubCategory' | 'addCategory' | 'categoryReorder'
  | 'categorySwitch' | 'subCategorySwitch'

  //Discount
  | 'discountV3' | 'dCollection' | 'dProducts' | 'dGetDiscounts'
  | 'dGetDisById' | 'dGetCatByCatId' | 'dGetCatItemByCatIds' | 'dGetItmByItmId'
  | 'dUpdateCoupon' | 'dDeleteCoupon'

  //Account Verification Api(s)
  | 'initVerification' | 'verify'

  // Setup
  | 'setupDetails'

  //Update APK
  | 'updateApk'

  //reports
  | 'getReport';


const UrlMapping = {
  login: { url: AppData.baseUrl + '/account/login', showMsg: true, showLoading: true },
  signup: { url: AppData.baseUrl + '/account/v2/signup', showMsg: true, showLoading: true },
  logout: { url: AppData.baseUrl + '/account/logout', showMsg: false, showLoading: false },
  initSignup: { url: AppData.baseUrl + '/account/initSignup', showMsg: false, showLoading: true },
  sendOtp: { url: AppData.baseUrl + '/account/sendOtp', showMsg: false, showLoading: true },
  completeSignup: { url: AppData.baseUrl + '/account/v2/complete-signup', showMsg: true, showLoading: false },
  subinitSignup: { url: AppData.baseUrl + '/account/subuser/initSignup', showMsg: false, showLoading: false },
  forgetPassword: { url: AppData.baseUrl + '/account/forgetPassword', showMsg: false, showLoading: true },
  resetPassword: { url: AppData.baseUrl + '/account/resetPassword', showMsg: true, showLoading: false },
  restData: { url: AppData.baseUrl + '/account/restData', showMsg: false, showLoading: false },
  storeNameValidation: { url: AppData.baseUrl + '/account/v2/signupValidation', showMsg: false, showLoading: false },
  restConfig: { url: AppData.baseUrl + '/account/restConfig', showMsg: true, showLoading: false },
  // OutLet Levels URLs 
  outlet: { url: AppData.baseUrl + '/outlet', showMsg: true, showLoading: false },
  outletDetails: { url: AppData.baseUrl + '/outlet', showMsg: false, showLoading: false },
  outletList: { url: AppData.baseUrl + '/outlet/outletList', showMsg: false, showLoading: false },
  viewUsers: { url: AppData.baseUrl + '/outlet/viewUsers', showMsg: false, showLoading: false },
  setAvailability: { url: AppData.baseUrl + '/outlet/setAvailability', showMsg: true, showLoading: true },
  fetchOutletDetails: { url: AppData.baseUrl + '/outlet', showMsg: false, showLoading: false },
  verifyBankAccount: { url: AppData.baseUrl + '/outlet', showMsg: false, showLoading: false },

  // Menu management
  menuItemsList: { url: AppData.baseUrl + '/menu/item/getAllItemsByCategory', showMsg: false, showLoading: true },
  addMenuSlot: { url: AppData.baseUrl + '/menu/item/opHours', showMsg: true, showLoading: false },
  menuItemById: { url: AppData.baseUrl + '/menu/item/getItem', showMsg: false, showLoading: true },

  // Menu item Create
  menuItemUpdate: { url: AppData.baseUrl + '/menu/item/updateItem', showMsg: true, showLoading: true },
  menuItemCreate: { url: AppData.baseUrl + '/menu/item/addItem', showMsg: true, showLoading: true },
  menuItemDelete: { url: AppData.baseUrl + '/menu/item/deleteItem', showMsg: true, showLoading: true },

  // category Url
  subCategorySwitch: { url: AppData.baseUrl + '/menu/subCategory', showMsg: true, showLoading: false },
  categorySwitch: { url: AppData.baseUrl + '/menu/category', showMsg: true, showLoading: false },
  getCategory: { url: AppData.baseUrl + '/menu/category/getCatsByOutlet', showMsg: false, showLoading: false },
  addCategory: { url: AppData.baseUrl + '/menu/category/addCategory', showMsg: true, showLoading: false },
  addSubCategory: { url: AppData.baseUrl + '/menu/subCategory/addSubCategory', showMsg: true, showLoading: false },
  offMenuItem: { url: AppData.baseUrl + '/menu/item/setAvailability', showMsg: true, showLoading: true },
  categoryReorder: { url: AppData.baseUrl + '/menu/category/reorderCat', showMsg: true, showLoading: false },

  // order management
  changeStatus: { url: AppData.baseUrl + '/order/changeStatus', showMsg: true, showLoading: false },
  deliveryInfo: { url: AppData.baseUrl + '/order/deliveryInfo', showMsg: false, showLoading: false },
  getOrders: { url: AppData.baseUrl + '/order/orderList', showMsg: false, showLoading: false },
  getOrderDetailsById: { url: AppData.baseUrl + '/order/orderDetails/?orderId=', showMsg: false, showLoading: true },
  newOrderSubscription: { url: AppData.baseUrl + '/account/newOrderSubscription', showMsg: false },

  getCurrentAddress: { url: AppData.googleMapUrl + '/maps/api/geocode/json', showMsg: false, showLoading: false },

  // Setup 
  setupDetails: { url: AppData.baseUrl + '/outlet', showMsg: true, showLoading: false },


  //Discount 
  discountV3: { url: AppData.baseUrl + '/coupon/dashboard/', showMsg: true, showLoading: true },
  dCollection: { url: AppData.baseUrl + '/menu/category/getCatsByOutlet', showMsg: false, showLoading: true },
  dProducts: { url: AppData.baseUrl + '/menu', showMsg: false, showLoading: true },
  dGetDiscounts: { url: AppData.baseUrl + '/coupon/dashboard/', showMsg: false, showLoading: true },
  dGetDisById: { url: AppData.baseUrl + '/coupon/dashboard/', showMsg: false, showLoading: true },
  dGetCatItemByCatIds: { url: AppData.baseUrl + '/menu/category/items', showMsg: false, showLoading: false },
  dGetCatByCatId: { url: AppData.baseUrl + '/menu/category/list', showMsg: false, showLoading: false },
  dGetItmByItmId: { url: AppData.baseUrl + '/menu', showMsg: false, showLoading: false },
  dUpdateCoupon: { url: AppData.baseUrl + '/coupon/dashboard/', showMsg: true, showLoading: true },
  dDeleteCoupon: { url: AppData.baseUrl + '/coupon/dashboard/', showMsg: false, showLoading: true },

  // Account Verification Api(s)
  initVerification: { url: AppData.baseUrl + '/outlet/bank/account/initVerification', showMsg: false, showLoading: false },
  verify: { url: AppData.baseUrl + '/outlet/bank/account/verify', showMsg: false, showLoading: false },
  updateApk: { url: AppData.baseUrl + '/app/version/info', showMsg: false },


  //reports
  getReport: { url: AppData.baseUrl + '/report/getReports', showMsg: false },

};

export class RequestUrl {
  static get(key: URL_KEYS): any {
    return UrlMapping[key];
  }
}
