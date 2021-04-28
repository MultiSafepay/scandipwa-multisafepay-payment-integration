/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa-multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */
import {getQueryParam} from 'Util/Url';
import {isMultisafepayPayment} from '../util/Payment';

export class CheckoutPlugin {
    aroundComponentDidMount = (args, callback, instance) => {
        const {pathname} = instance.props.location;

        if (pathname === '/checkout/success') {
            const {setDetailsStep} = instance.props;
            const location = instance.props.location,
                paymentCode = getQueryParam('paymentCode', location),
                orderId = getQueryParam('incrementId', location);

            if (isMultisafepayPayment(paymentCode)) {
                return setDetailsStep(orderId);
            }
        }

        return callback.apply(instance, args);
    };
}

const {
    aroundComponentDidMount
} = new CheckoutPlugin();

export const config = {
    'Route/Checkout/Component': {
        'member-function': {
            componentDidMount: aroundComponentDidMount
        }
    }
};

export default config;
