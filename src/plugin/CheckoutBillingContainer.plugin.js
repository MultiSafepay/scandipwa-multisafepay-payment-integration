
import {
    BRAINTREE,
    KLARNA
} from 'Component/CheckoutPayments/CheckoutPayments.config';

import { MULTISAFEPAY_IDEAL_CODE } from './CheckoutPayments.plugin';

export class CheckoutBillingContainerPlugin {
    getPaymentDataPlugin = (args, callback = () => {}, instance) => {
        const { asyncData } = args;
        const { paymentMethod: code } = instance.state;
        console.log(code);
        callback.apply(instance, args);

        console.log(asyncData, code);

        switch (code) {
            case MULTISAFEPAY_IDEAL_CODE:
                const [{
                    cc_type,
                    encryptedCardNumber: number,
                    encryptedExpiryMonth: expiryMonth,
                    encryptedExpiryYear: expiryYear,
                    encryptedSecurityCode: cvc,
                    holderName,
                    storeCc: store_cc,
                    javaEnabled: java_enabled,
                    colorDepth: screen_color_depth,
                    screenWidth: screen_width,
                    screenHeight: screen_height,
                    timeZoneOffset: timezone_offset,
                    language
                }] = asyncData || args[0];

                return {
                    code,
                    additional_data: {
                        cc_type,
                        number,
                        expiryMonth,
                        expiryYear,
                        cvc,
                        holderName,
                        store_cc,
                        java_enabled,
                        screen_color_depth,
                        screen_width,
                        screen_height,
                        timezone_offset,
                        language
                    }
                };

            case BRAINTREE:
                const [{ nonce }] = asyncData || args[0];

                return {
                    code,
                    additional_data: {
                        payment_method_nonce: nonce,
                        is_active_payment_token_enabler: false
                    }
                };

            case KLARNA:
                const [{ authorization_token }] = asyncData || args[0];

                return {
                    code,
                    additional_data: {
                        authorization_token
                    }
                };

            default:
                return { code };
        }
    };
}

const {
    getPaymentDataPlugin
} = new CheckoutBillingContainerPlugin();

export const config = {
    'Component/CheckoutBilling/Container': {
        'member-function': {
            _getPaymentData: getPaymentDataPlugin
        }
    }
};

export default config;
