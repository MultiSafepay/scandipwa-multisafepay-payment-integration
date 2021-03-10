/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package multisafepay-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */
import {getQueryParam} from 'Util/Url';
import {isMultisafepayPayment} from '../util/Payment';

export class CheckoutPlugin {
    aroundShippingStep = (args, callback, instance) => {
        const {pathname} = instance.props.location;
        const originalElement = callback.apply(instance, args);

        if (pathname === '/checkout/success') {
            const {setHeaderState, setNavigationState, goBack, setDetailsStep} = instance.props;
            const location = instance.props.location,
                paymentCode = getQueryParam('paymentCode', location),
                orderId = getQueryParam('incrementId', location);

            if (isMultisafepayPayment(paymentCode)) {
                return setDetailsStep(orderId);
            }
        } else {
            return originalElement;
        }
    };
}

const {
    aroundShippingStep
} = new CheckoutPlugin();

export const config = {
    'Route/Checkout/Component': {
        'member-function': {
            renderShippingStep: aroundShippingStep
        }
    }
};

export default config;
