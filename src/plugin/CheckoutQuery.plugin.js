
import { Field } from 'Util/Query';

export class CheckoutQueryPlugin {
    /**
     * @returns [Field]
     */
    aroundGetOrderField = (args, callback, instance) => new Field('order')
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
