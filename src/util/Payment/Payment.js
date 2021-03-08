/* eslint-disable fp/no-let */

// import getStore from 'Util/Store';

/**
 * @param {String} paymentCode
 * @namespace MultiSafepay/Util/Payment/isMultisafepayPayment
 */
export const isMultisafepayPayment = (paymentCode) => {
    if (paymentCode
        && (paymentCode.includes('multisafepay_') || paymentCode === 'multisafepay')
    ) {
        return true;
    }

    return false;
};

/**
 * @param {String} paymentCode
 * @namespace MultiSafepay/Util/Payment/isMultisafepayRecurringPayment
 */
export const isMultisafepayRecurringPayment = (paymentCode) => {
    if (paymentCode
        && paymentCode.includes('multisafepay_')
        && (paymentCode.includes('_recurring') || paymentCode.includes('_vault'))
    ) {
        return true;
    }

    return false;
};
