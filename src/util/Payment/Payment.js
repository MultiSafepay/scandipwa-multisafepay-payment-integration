/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa-multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */

/**
 * @param {String} paymentCode
 * @namespace ScandipwaMultisafepayPaymentIntegration/Util/Payment/isMultisafepayPayment */
export const isMultisafepayPayment = (paymentCode) => paymentCode && (paymentCode.includes('multisafepay_')
    || paymentCode === 'multisafepay');

/**
 * @param {String} paymentCode
 * @namespace ScandipwaMultisafepayPaymentIntegration/Util/Payment/isMultisafepayRecurringPayment */
export const isMultisafepayRecurringPayment = (paymentCode) => paymentCode && paymentCode.includes('multisafepay_')
        && (paymentCode.includes('_recurring') || paymentCode.includes('_vault'));
