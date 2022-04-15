import { AppData } from './../services/app-data.service';
import { environment } from 'src/environments/environment';

// return object for add items into cart
export function addItemObj(itemObj) {
  const body = {
    item: {
      outletId: itemObj.outletId,
      itemId: itemObj.itemId,
      quantity: 1,
    },
    cartId: AppData.cartId,
  }
  return body;
}


// return object for update customized items
export function updateCustomizeItemObj(item, quantity) {
  const body = {
    item: updateCustomizeItems(item, quantity),
    cartId: AppData.cartId
  }
  return body;
}

// return object for update customized items with addon and variant
export function updateCustomizeItems(items, quantity) {
  const body = {
    outletId: items.outletId,
    itemId: items.itemId,
    quantity: quantity,
    addons: addonsObj(items.addons)
  }
  if (Object.keys(items.variant).length > 0)
    body['variant'] = variantObj(items.variant);
  return body;
}

//return object for variant
export function variantObj(obj) {
  const variant = {
    addonId: obj.addonId,
    addonName: obj.addonName,
    options: [obj.options.optionName]
  }
  return variant;
}

// return object for addons
export function addonsObj(addons) {
  console.log(addons);

  let addonsArr = [];
  addons.forEach(obj => {
    const addon = {
      addonId: obj.addonId,
      addonName: obj.addonName,
      options: optionsObj(obj.options)
    }

    addonsArr = addonsArr.concat(addon);
  });
  console.log(addonsArr);

  return addonsArr;
}

// return object for addons options
export function optionsObj(opt) {
  let options = [];
  opt.forEach(obj => {
    options = options.concat(obj.optionName);
  });
  console.log(options);
  return options;
}

// return object for increase and decrease items
export function increaseDecreaseItems(outlets) {
  const body = {
    outletId: outlets.outletId,
    cartId: AppData.cartId
  }
  return body;
}

// for get item quantity and index
export function itemQtyDecreaseIncreaseObj(itemObj) {
  const items = AppData.yourPlateItems['outlets'][0]['items'];
  let quantity = 0;
  let itmInd = 0;
  items.forEach((obj, ind) => {
    if (obj.itemId === itemObj.itemId || obj.itemId === itemObj.dishId) {
      quantity = obj.quantity;
      itmInd = ind;
    }
  });

  return { quantity, itmInd };
}

// create object for pass addons and variant for update customize item
export function modalAddonVariantsObj(itmObj, ind) {
  console.log(itmObj);

  // const addonsList = AppData.selectedAddonsList;
  // let addonsVariantList = [];
  // const selectedItem = AppData.itemsInPlate.find((itemsList) => itemsList.itemId === itmObj.itemId);
  // selectedItem.addons.forEach(addonId => {
  //   const addonsObj = addonsList.find((aItm) => aItm.addonId === addonId);
  //   if (addonsObj) { addonsVariantList.push(addonsObj); }
  // });
  // if (itmObj.variant) {
  //   const variantObj = addonsList.find((vItm) => vItm.addonId === itmObj.variant.addonId);
  //   if (variantObj) { addonsVariantList.push(variantObj); }
  // }
  const orderItemObj = AppData.selectedOrderItem.find((itm) => itm.itemId === itmObj.itemId);
  const body = {
    'item': orderItemObj,
    'cart': true,
    'selectedAddon': itmObj.addons,
    'selectedVariant': itmObj.variant
  }
  return body;
}

export function getVegNonVegItemImg(isVeg, containsEgg) {
  if (isVeg) {
    return containsEgg === true ? 'pending-color' : 'success-color';
  }
  return 'error-color';
}

// for create razor pay object
// export function createRazorPayOptions(res) {
//   const obj = {
//     "key": environment.razorPayKey,
//     "amount": res['totalAmount'],
//     "name": "Yumzy",
//     "order_id": res['sdkOrderId'],
//     "description": "Pay",
//     "image": "",
//     "prefill": {
//       "name": AppData.userInfoData['name'],
//       "email": AppData.userInfoData['email'],
//       "contact": AppData.userInfoData['mobile'],
//     },
//     "theme": {
//       "color": "#58d896"
//     }
//   };
//   return obj;
// }

export function makeAddressForDelivery() {
  const deliveryObj = AppData.customerDetails['address'];
  const body = {
    name: deliveryObj.name,
    landmark: deliveryObj.landmark,
    addressId: deliveryObj.addressId,
    addressTag: deliveryObj.addressTag,
    googleLocation: deliveryObj.googleLocation,
    houseNum: deliveryObj.houseNum,
    fullAddress: deliveryObj.fullAddress,
    city: deliveryObj.city,
    state: deliveryObj.state,
    pincode: deliveryObj.pincode,
    country: deliveryObj.country,
    longLat: deliveryObj.longLat
  }
  return body;
}

export function newOrderObj(spInstructions, slotObj, isSelfPickup) {
  const body = {
    address: makeAddressForDelivery(),
    specialInstructions: spInstructions,
    cartId: AppData.cartId,
    // postBackURL: AppData.config.config.hostUrl
    postBackURL: 'https://listingcdn.laalsa.com/restaurant-dashboard-v2/payment_success/payment_success.html',
    userId: AppData.customerDetails.user.userId

  }
  if (isSelfPickup) {
    body['slotInfo'] = {
      startTime: '',
      endTime: '',
      date: ''
    }
  } else {
    body['slotInfo'] = {
      startTime: slotObj.startTime || '',
      endTime: slotObj.endTime || '',
      date: slotObj.startTime ? slotObj.date : ''
    }
  }
  return body;
}

export function preCheckoutReqObj() {
  const body = {
    // address: {
    //   longLat: [AppData.customerDetails.long, AppData.customerDetails.lat],
    //   city: ''
    // },
    // userCity: AppData.customerDetails.address.city,
    userLongLat: AppData.customerDetails.address.longLat.coordinates,
    cartId: AppData.cartId,
    // userCountry: 'in' 
  }
  return body;
}
