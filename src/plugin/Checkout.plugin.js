/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa-multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */
import BrowserDatabase from '@scandipwa/scandipwa/src/util/BrowserDatabase';

import { SHIPPING_STEP } from 'Route/Checkout/Checkout.config';
import { isSignedIn } from 'Util/Auth';
import { getQueryParam } from 'Util/Url';

import { isMultisafepayPayment } from '../util/Payment';

export const MULTISAFEPAY_GUEST_CHECKOUT = 'is_multisafepay_guest_order';

const CHECKOUT_SUCCESS_URL_PATH = '/checkout/success';
const ONE_MINUTE_IN_SECONDS = 60;

export class CheckoutPlugin {
    aroundRenderGuestForm = (args, callback, instance) => {
        const { pathname } = instance.props.location;

        if (pathname === CHECKOUT_SUCCESS_URL_PATH && BrowserDatabase.getItem(MULTISAFEPAY_GUEST_CHECKOUT)) {
            return null;
        }

        return callback.apply(instance, args);
    };

    aroundRenderStep = (args, callback, instance) => {
        const { pathname } = instance.props.location;
        const { checkoutStep } = instance.props;

        if (checkoutStep === SHIPPING_STEP && pathname === CHECKOUT_SUCCESS_URL_PATH) {
            const { setDetailsStep } = instance.props;
            const { location } = instance.props;
            const paymentCode = getQueryParam('paymentCode', location);
            const orderId = getQueryParam('incrementId', location);

            if (isMultisafepayPayment(paymentCode)) {
                if (!isSignedIn()) {
                    BrowserDatabase.setItem(true, MULTISAFEPAY_GUEST_CHECKOUT, ONE_MINUTE_IN_SECONDS);
                }

                return setDetailsStep(orderId);
            }
        }

        return callback.apply(instance, args);
    };
}

const {
    aroundRenderGuestForm,
    aroundRenderStep
} = new CheckoutPlugin();

export const config = {
    'Route/Checkout/Component': {
        'member-function': {
            renderGuestForm: aroundRenderGuestForm,
            renderStep: aroundRenderStep
        }
    }
};

export default config;
