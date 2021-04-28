/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa-multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */
import { isMultisafepayPayment } from '../util/Payment';
import {
    MULTISAFEPAY_AFTERPAY_CODE,
    MULTISAFEPAY_DIRECTBANKTRANSFER_CODE,
    MULTISAFEPAY_DIRECTDEBIT_CODE,
    MULTISAFEPAY_EINVOICING_CODE,
    MULTISAFEPAY_IDEAL_CODE,
    MULTISAFEPAY_IN3_CODE,
    MULTISAFEPAY_PAYAFTER_CODE
} from './CheckoutPayments.plugin';

export class CheckoutBillingContainerPlugin {
    getPaymentDataPlugin = (args, callback = () => {}, instance) => {
        const { paymentMethod: code } = instance.state;
        const result = callback.apply(instance, args);

        switch (code) {
        case MULTISAFEPAY_IDEAL_CODE:
        case MULTISAFEPAY_AFTERPAY_CODE:
        case MULTISAFEPAY_IN3_CODE:
        case MULTISAFEPAY_DIRECTBANKTRANSFER_CODE:
        case MULTISAFEPAY_DIRECTDEBIT_CODE:
        case MULTISAFEPAY_EINVOICING_CODE:
        case MULTISAFEPAY_PAYAFTER_CODE:
            const { additional_data } = instance.state;

            return {
                code,
                additional_data: additional_data || ''
            };

        default:
            return result;
        }
    };

    /**
     *
     * @param args
     * @param callback
     * @param instance
     */
    aroundOnPaymentMethodSelect = (args, callback = () => {}, instance) => {
        if (args[1] && args[0] && isMultisafepayPayment(args[0])) {
            instance.setState({ paymentMethod: args[0], additional_data: args[1] || [] });
        } else {
            callback.apply(instance, args);
        }
    };
}

const {
    getPaymentDataPlugin,
    aroundOnPaymentMethodSelect
} = new CheckoutBillingContainerPlugin();

export const config = {
    'Component/CheckoutBilling/Container': {
        'member-function': {
            _getPaymentData: getPaymentDataPlugin,
            onPaymentMethodSelect: aroundOnPaymentMethodSelect
        }
    }
};

export default config;
