/* eslint-disable space-before-function-paren */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { AppData } from '../services/app-data.service';
import { FormGroup } from '@angular/forms';


// for get single group input filed validation
export function getInputFieldValidation(formName, fieldName, isSubmitted?) {
    if (formName.controls[fieldName].invalid && (formName.controls[fieldName].dirty ||
        formName.controls[fieldName].touched || isSubmitted)) {
        return true;
    }
    return false;
}

// for checking condition outlet on/off 
export function outletLetIsOff() {
    const obj = AppData.outletList.find(item => item.outletId === AppData.outletId);
    if (obj.available === 'off') {
        return true;
    }
    return false;
}

// for get nested group input filed validation
export function getNestedGrpFieldValidation(formName, grpFieldName, fieldName, isSubmitted?) {
    if (formName.get(grpFieldName).get(fieldName).invalid && (formName.get(grpFieldName).get(fieldName).dirty ||
        formName.get(grpFieldName).get(fieldName).touched || isSubmitted)) {
        return true;
    }
    return false;
}

// filter list
export function filterDataList(tempList, fieldName, searchStr) {
    return tempList.filter((inputObj) => {
        return inputObj[fieldName].toLowerCase().indexOf(searchStr) >= 0;
    });
}
export function mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function processTimeString(timeString) {
    let startDateHourString = timeString !== null ? timeString.substring(0, 2) : '';
    const startDateMinString = timeString !== null ? timeString.substring(2, 4) : '';
    let startDateAmPmString = 'AM';
    if (Number(startDateHourString) === 12) {
        startDateAmPmString = 'PM';
    } else if (Number(startDateHourString) > 12) {
        startDateHourString = Number(startDateHourString) - 12;
        startDateAmPmString = 'PM';
    } else if (Number(startDateHourString) > 24) {
        startDateHourString = Number(startDateHourString) - 24;
        startDateAmPmString = 'AM';
    }
    if (startDateHourString === '00' && startDateMinString === '00') {
        return '12:00 AM';
    } else {
        return (startDateHourString + ':' + startDateMinString + ' ' + startDateAmPmString);
    }
}

export function maxNumToBeAllowed(event, maxLen) {
    if (event.target.value.length >= maxLen) {
        return false;
    }
    return true;
}

export function generateDiscountCode(length) {
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

export function isItemAvailable(itm) {
    if (itm.itemAvailable && itm.itemOperational && itm.outletAvailable && itm.outletOperational) {
        // enable add button
        return true;
    } else {
        // disable
        return false;
    }
}

export function isOfferPresentWithinDate(offerList) {
    const today = new Date();
    const todayTime = String(today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()) + String(today.getMinutes());

    if (today.toISOString() >= offerList.startDate && today.toISOString() <= offerList.endDate) {
        if (todayTime >= offerList.startTime && todayTime <= offerList.endTime) {
            return true;
        }
    }
    return false;
}

export function capitalizeFirstString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function subCategoryScroll(itemList, index) {
    for (let i = index; i >= 0; i--) {
        if (itemList.list[i].type === 'category') {
            return itemList.list[i].name;
        }
    }
}
export function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function contrast(rgb1, rgb2) {
    var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05)
        / (darkest + 0.05);
}

export function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hexToRGB(h) {
    let r = "0", g = "0", b = "0";

    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

        // 6 digits
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }

    return [+r, +g, +b];
}

export function monthAsString(monthIndex) {
    let month = [{ name: 'Jan', num: '01' }, { name: 'Feb', num: '02' }, { name: 'Mar', num: '03' }, { name: 'Apr', num: '04' },
    { name: 'May', num: '05' }, { name: 'Jun', num: '06' }, { name: 'Jul', num: '07' }, { name: 'Aug', num: '08' },
    { name: 'Sep', num: '09' }, { name: 'Oct', num: '10' }, { name: 'Nov', num: '11' }, { name: 'Dec', num: '12' }];
    return month[monthIndex];
}
export function dayAsString(dayIndex) {
    let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[dayIndex];
}

export function getDates(startDate, daysToAdd) {
    let aryDates = [];
    for (let i = 0; i <= daysToAdd; i++) {
        let currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i + 1);
        aryDates.push(
            {
                'days': dayAsString(currentDate.getDay()),
                'day': currentDate.getDate(),
                'month': monthAsString(currentDate.getMonth()).name,
                'year': currentDate.getFullYear(),
                'dayNum': currentDate.getDay(),
                'date': currentDate.getFullYear() + '-' + monthAsString(currentDate.getMonth()).num + '-' + currentDate.getDate()
            })
    }
    return aryDates;
}
export function makeAddonsStr(addonsList) {
    let addonsText = ' ';
    addonsList.forEach(obj => {
        obj.options.map(opt => addonsText += opt.optionName + ', ');
    });
    const addonsStr = addonsText.substring(0, addonsText.length - 2);
    return addonsStr;
}

export function dynamicFontSize(textLength) {
    const baseSize = 9;
    if (textLength >= baseSize) {
        textLength = baseSize - 2;
    }
    const fontSize = baseSize - textLength
    return `${fontSize}vw`;
}

export function getIdsFromItems(list) {
    const ids = list.map((v, i) => v ? list[i].itemId : null).filter(v => v !== null);
    return ids;
}

export function getIdsFromCats(list) {
    const ids = list.map((v, i) => v ? list[i].catId : null).filter(v => v !== null);
    return ids;
}

export function mustMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        let control = formGroup.controls[controlName];
        let matchingControl = formGroup.controls[matchingControlName]
        if (
            matchingControl.errors &&
            !matchingControl.errors.confirmPasswordValidator
        ) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmPasswordValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
