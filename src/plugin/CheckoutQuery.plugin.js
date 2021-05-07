/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa-multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */
import { Field } from 'Util/Query';

export class CheckoutQueryPlugin {
    /**
     * @returns [Field]
     */
    aroundGetOrderField = () => new Field('order')
        .addFieldList([
            'order_id',
            this.getMultisafepayUrlFieldField()
        ]);

    getMultisafepayUrlFieldField() {
        return new Field('multisafepay_payment_url')
            .addFieldList([
                'payment_url',
                'error'
            ]);
    }
}

export const { aroundGetOrderField } = new CheckoutQueryPlugin();

export const config = {
    'Query/Checkout': {
        'member-function': {
            _getOrderField: aroundGetOrderField
        }
    }
};

export default config;
