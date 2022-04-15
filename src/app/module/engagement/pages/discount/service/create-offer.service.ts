import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Injectable, OnInit } from '@angular/core';
import { APPLIED_TO, COUNTRY_TYPE, DISCOUNT_SUMMARY } from 'src/app/core/constants/app-constants';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { AppData } from 'src/app/shared/services/app-data.service';

@Injectable({
    providedIn: 'root'
})
export class CreateOfferService {
    currency: any;
    summaryObj = DISCOUNT_SUMMARY;
    setDiscountTerms: any //Set discount terms method variable
    setProAndCollObj: any; // set product and collection object
    setProAndCollIds: any; // set product and collection ids

    constructor(private apiRequestService: ApiRequestService, private router: Router) {
        // console.log(this.currency);
    }

    init(getDiscountTerms, getProAndCollObj, getProAndCollIds) {
        this.setDiscountTerms = getDiscountTerms;
        this.setProAndCollObj = getProAndCollObj;
        this.setProAndCollIds = getProAndCollIds;
    }

    createCoupon(reqBody) {
        delete reqBody.couponId;
        return this.apiRequestService.post('discountV3', reqBody).then((res) => {
        });
    }

    getCoupons() {
        // const reqBody = { outletIds: AppData.outletId };
        return this.apiRequestService.get('dGetDiscounts', '?outletIds=' + AppData.outletId);
    }

    getDiscountById(couponId) {
        return this.apiRequestService.get('dGetDisById', couponId);
    }

    updateCoupon(reqBody) {
        return this.apiRequestService.put('dUpdateCoupon', '', reqBody).then((res) => {
        });;
    }

    changeCouponStatus(obj) {
        // const reqBody = JSON.parse(JSON.stringify(obj));
        // reqBody['status'] = reqBody['status'] === 'inactive' ? 'active' : 'inactive'
        // const reqBody = {
        //   status: obj.status === 'inactive' ? 'active' : 'inactive',
        //   couponId: obj.couponId,
        //   couponCode: obj.couponCode,
        //   outletIds: obj.outletIds
        // }
        // return this.apiRequestService.put('dUpdateCoupon', '', reqBody);
        //const reqBody = { status: obj['status'] === 'inactive' ? 'active' : 'inactive' };
        const reqBody = { status: obj['status'] };
        return this.apiRequestService.patch('dDeleteCoupon', obj.couponId + '/status', reqBody);
    }

    deleteCoupon(couponId) {
        const reqBody = { status: 'deleted' };
        return this.apiRequestService.patch('dDeleteCoupon', couponId + '/status', reqBody);
    }

    /* ************************Discount Summary************************ */

    getDiscountSummary(formObj) {
        this.currency = COUNTRY_TYPE[AppData.restData.config.currency];
        // formGroup.valueChanges.subscribe((formObj) => {
        if (formObj['discountType'] === 'percentage') {
            delete this.summaryObj['freeDelivery'];
            delete this.summaryObj['freeDeliveryMinAmt'];
            delete this.summaryObj['bogo'];
            delete this.summaryObj['netDiscount'];
            this.setDiscountTerms(this.summaryObj);
            this.setPercentTerm(formObj);

        } else if (formObj['discountType'] === 'net') {
            delete this.summaryObj['freeDelivery'];
            delete this.summaryObj['freeDeliveryMinAmt'];
            delete this.summaryObj['bogo'];
            delete this.summaryObj['percentDiscount'];
            this.setDiscountTerms(this.summaryObj);
            this.setFixedAmountTerm(formObj);
        } else if (formObj['discountType'] === 'freeDelivery') {
            delete this.summaryObj['percentDiscount'];
            delete this.summaryObj['netDiscount'];
            delete this.summaryObj['bogo'];
            this.summaryObj['freeDelivery'] = 'Free shipping on all products';
            this.setDiscountTerms(this.summaryObj);
            // this.setFreeShippingTerms(formObj)
        } else if (formObj['discountType'] === 'bogo') {
            delete this.summaryObj['freeDelivery'];
            delete this.summaryObj['freeDeliveryMinAmt'];
            delete this.summaryObj['percentDiscount'];
            delete this.summaryObj['minAmount'];
            delete this.summaryObj['netDiscount'];
            this.setDiscountTerms(this.summaryObj);
            this.setBogoDiscountTerms(formObj);
        } else if (formObj['couponAppliesToV']) {
            this.setAppliesToDisTerm(formObj);
        }
        if (formObj['advancedSettingSelectedV']) {
            this.setUsageDiscountTerms(formObj);
        } else {
            this.removeUsageDiscountTerm()
        }
        // });
    }

    setMaximumDisPrice(formObj) {
        const maxDis = formObj['percentage']['maxDiscount'];
        const percentDisTrm = this.summaryObj['percentDiscount'];
        this.summaryObj['percentDiscount'] = percentDisTrm.concat(' upto ' + this.currency.symbol + ` ${maxDis}`);
        this.setDiscountTerms(this.summaryObj);
    }

    setPercentTerm(formObj) {
        const percentDis = formObj['percentage']['discountValue'];
        if (percentDis) {
            this.summaryObj['percentDiscount'] = `${percentDis}` + '% off ' + APPLIED_TO[formObj['couponAppliesToV']];
            if (formObj['percentage']['maxDiscount']) {
                this.setMaximumDisPrice(formObj);
            }
            this.setDiscountTerms(this.summaryObj);
        } else {
            delete this.summaryObj['percentDiscount'];
            this.setDiscountTerms(this.summaryObj);
        }
    }

    setFixedAmountTerm(formObj) {
        const netDis = formObj['net']['discountValue'];
        if (netDis) {
            this.summaryObj['netDiscount'] = this.currency.symbol + ` ${netDis}` + ' off ' + APPLIED_TO[formObj['couponAppliesToV']];
            this.setDiscountTerms(this.summaryObj);
        } else {
            delete this.summaryObj['netDiscount'];
            this.setDiscountTerms(this.summaryObj);
        }
    }

    // setFreeShippingTerms(formObj) {
    //   const freeDisObj = formObj['freeDelivery'];
    //   if (freeDisObj['minAmountOptedV'] && freeDisObj['minAmount']) {
    //     this.summaryObj['freeDeliveryMinAmt'] = 'Applies to shipping rates under' `${this.currency.symbol} ${freeDisObj['minAmount']}`;
    //     this.setDiscountTerms(this.summaryObj);
    //   } else {
    //     delete this.summaryObj['freeDeliveryMinAmt'];
    //     this.setDiscountTerms(this.summaryObj);
    //   }
    // }

    setAppliesToDisTerm(formObj) {
        const percentDisVal = formObj['percentage'];
        const netDisVal = formObj['net'];
        const appliesToDisVal = formObj['couponAppliesToV'];
        if (percentDisVal && percentDisVal['discountValue']) {
            this.summaryObj['percentDiscount'] = `${percentDisVal['discountValue']}` + '% off ' + APPLIED_TO[appliesToDisVal];
            this.setDiscountTerms(this.summaryObj);
        } else if (netDisVal && netDisVal['discountValue']) {
            this.summaryObj['netDiscount'] = this.currency.symbol + ` ${netDisVal['discountValue']}` + ' off ' + APPLIED_TO[appliesToDisVal];
            this.setDiscountTerms(this.summaryObj);
        }
    }

    setBogoDiscountTerms(formObj) {
        const satisfiesObj = formObj.bogo['satisfies'];
        const getsObj = formObj.bogo['gets'];
        if (satisfiesObj['qty'] && getsObj['qty']) {
            this.setSumOnBogoObjChange('QTY', satisfiesObj['qty'], getsObj);
        } else if (satisfiesObj['amount'] && getsObj['qty']) {
            this.setSumOnBogoObjChange('AMOUNT', satisfiesObj['amount'], getsObj);
        } else {
            delete this.summaryObj['bogo'];
            this.setDiscountTerms(this.summaryObj);
        }
    }

    setSumOnBogoObjChange(type, qtyOrAmt, getsObj) {
        let getItemStr = '';
        let maxPerOrderStr = '';
        let qtyStr = '';
        if (qtyOrAmt) {
            if (type === 'QTY') {
                qtyStr = 'Buy ' + `${qtyOrAmt}` + ' items \n';
            } else {
                qtyStr = 'Spend ' + this.currency.symbol + ` ${qtyOrAmt}` + '\n';
            }
        } else {
            qtyStr = '';
        }


        if (getsObj['atDiscountedValueV'] === 'percentage' && getsObj['qty'] && getsObj['withDiscount']) {
            getItemStr = 'Get ' + `${getsObj['qty']}` + ' items at ' + `${getsObj['withDiscount']}` + '% off \n';
        } else if (getsObj['atDiscountedValueV'] === 'free') {
            getItemStr = 'Get ' + `${getsObj['qty']}` + ' items free \n';
        } else {
            getItemStr = '';
        }
        if (getsObj['maxPerOrderV'] && getsObj['perOrderTimes']) {
            maxPerOrderStr = 'and ' + `${getsObj['perOrderTimes']}` + ' uses per order';
        } else {
            maxPerOrderStr = '';
        }
        if (qtyStr !== '' && getItemStr !== '') {
            const finalStr = qtyStr + getItemStr + maxPerOrderStr;

            this.summaryObj['bogo'] = finalStr;
            this.setDiscountTerms(this.summaryObj);
        } else {
            delete this.summaryObj['bogo'];
            this.setDiscountTerms(this.summaryObj);
        }
    }

    removeUsageDiscountTerm() {
        delete this.summaryObj['limitUses'];
        this.setDiscountTerms(this.summaryObj);
    }

    setUsageDiscountTerms(formObj) {
        const usageObj = formObj['usage'];
        if (usageObj && usageObj['totalTimes']) {
            const limitUses = 'Limit of ' + `${usageObj['totalTimes']}` + ' uses';
            this.summaryObj['limitUses'] = limitUses;
            this.setDiscountTerms(this.summaryObj);
        } else {
            delete this.summaryObj['limitUses'];
            this.setDiscountTerms(this.summaryObj);
        }
    }

    getMiniReqDiscountTerms(formGroup: FormGroup) {
        formGroup.get('cart').valueChanges.subscribe((cartObj) => {
            if (cartObj['minRequirementV'] === 'none') {
                delete this.summaryObj['minAmount'];
                delete this.summaryObj['minQty'];
                this.setDiscountTerms(this.summaryObj);
            } else if (cartObj['minRequirementV'] === 'amount') {
                delete this.summaryObj['minQty'];
                this.setMiniReqDiscountSummary('minAmount', cartObj['minAmount'], 'Minimum purchase of ' + this.currency.symbol + ` ${cartObj['minAmount']}`);
            } else if (cartObj['minRequirementV'] === 'quantity') {
                delete this.summaryObj['minAmount'];
                this.setMiniReqDiscountSummary('minQty', cartObj['minQty'], 'Minimum purchase of ' + `${cartObj['minQty']}` + ' items');
            }
        });
    }


    setMiniReqDiscountSummary(key, val, msg) {
        if (val) {
            this.summaryObj[key] = msg;
        } else {
            delete this.summaryObj[key];
        }
        this.setDiscountTerms(this.summaryObj);

    }


    openProductionAndCollectionModal(val) {
        // return new Promise(async (resolve, reject) => {
        //     const mObj = val;
        //     const modalRef = this.modalService.open(ProductCollectionComponent, getConfig('PROD_COLLECTION_MODAL'));
        //     modalRef.componentInstance.modalObj = mObj;
        //     modalRef.result.then((res) => {
        //         resolve(res);
        //     }).catch((error) => {
        //         console.log(error);
        //     });
        // });
    }

    getListOfSelectedOutletIds(selectedOutlets) {
        const outletIds = selectedOutlets
            .map((v, i) => v ? selectedOutlets[i].outletId : null)
            .filter(v => v !== null);
        return outletIds;
    }

    setWeekdaysArr(weekdays, weekDaysList) {
        let finalWeekdays = [];
        weekDaysList.map((obj, indI) => {
            weekdays.forEach((wObj, indJ) => {
                if (wObj && indI === indJ) { finalWeekdays.push(indI); }
            });
        });
        return finalWeekdays;
    }
}
