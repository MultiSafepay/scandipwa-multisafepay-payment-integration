
import { cloneElement } from 'react';
import { getQueryParam } from 'Util/Url';

export class CheckoutPlugin {
    aroundShippingStep = (args, callback, instance) => {
        const { pathname } = instance.props.location;
        const originalElement = callback.apply(instance, args);

        if (pathname === '/checkout/success') {
            const {  setHeaderState, setNavigationState, goBack, setDetailsStep } = instance.props;
            const location = instance.props.location;
            const paymentCode = getQueryParam('paymentCode', location);
            const orderId = getQueryParam('incrementId', location);

            if (paymentCode && (paymentCode.includes('multisafepay_') || paymentCode === 'multisafepay')) {
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
