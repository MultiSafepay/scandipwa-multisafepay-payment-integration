import {Field} from 'Util/Query';
import { isSignedIn } from 'Util/Auth';

/**
 * @namespace MultiSafepay/Query/Multisafepay/Query/MultisafepayQuery */
export class MultisafepayQuery {
    /**
     *
     * @param options
     * @returns {Field}
     */
    restoreQuote(options) {
        return new Field('restoreQuote')
            .addArgument('input', 'RestoreQuoteInput', options);
    }

    /**
     *
     * @param guestCartId
     * @returns {Field}
     */
    getPaymentMethodsWithAdditionalMeta(guestCartId) {
        const query = new Field('cart')
            .addField(this._getPaymentMethodFields());

        query.addArgument('cart_id', 'String!', guestCartId);

        return query;
    }

    /**
     *
     * @param addressInformation
     * @param guestCartId
     * @returns {*}
     */
    getSaveAddressInformation(addressInformation, guestCartId) {
        const mutation = new Field('saveAddressInformation')
            .addArgument('addressInformation', 'SaveAddressInformation!', addressInformation)
            .addFieldList(this._getSaveAddressInformationFields());

        this._addGuestCartId(guestCartId, mutation);

        return mutation;
    }

    _getSaveAddressInformationFields() {
        return [
            this._getPaymentMethodsField(),
            this._getTotalsField()
        ];
    }

    _getPaymentMethodsField() {
        return new Field('payment_methods')
            .addFieldList(this._getPaymentMethodFields());
    }

    _getPaymentMethodFields() {
        return [
            'code',
            'title',
            this._getMultisafepayAvailableIssuersFields(),
            this._getMultisafepayAdditionalMetaFields()
        ];
    }

    _getTotalsField() {
        return new Field('totals')
            .addFieldList(this._getTotalsFields());
    }

    _getTotalsFields() {
        return [
            'subtotal',
            'tax_amount',
            'base_grand_total',
            'grand_total',
            'discount_amount',
            'shipping_amount',
            'subtotal_incl_tax',
            'shipping_incl_tax',
            'quote_currency_code',
            'shipping_tax_amount',
            'subtotal_with_discount',
            'shipping_discount_amount',
            this._getTotalItemField()
        ];
    }

    _getTotalItemField() {
        return new Field('items')
            .addFieldList(this._getTotalItemFields());
    }

    _getTotalItemFields() {
        return [
            'qty',
            'name',
            'price',
            'item_id',
            'options',
            'tax_amount',
            'tax_percent',
            'price_incl_tax',
            'discount_amount',
            'discount_percent'
        ];
    }

    /**
     *
     * @returns {Field}
     * @private
     */
    _getMultisafepayAvailableIssuersFields() {
        return new Field('multisafepay_available_issuers')
            .addFieldList([
                'code',
                'description',
            ]);
    }

    /**
     *
     * @returns {Field}
     * @private
     */
    _getMultisafepayAdditionalMetaFields() {
        return new Field('multisafepay_additional_data')
            .addFieldList([
                'image',
                'is_preselected',
            ]);
    }

    _addGuestCartId(guestCartId, mutation) {
        if (guestCartId && !isSignedIn()) {
            mutation.addArgument('guestCartId', 'String!', guestCartId);
        }
    }

    /**
     *
     * @param guestCartId
     * @param mutation
     * @private
     */
    _addCartId(guestCartId, mutation) {
        mutation.addArgument('cart_id', 'String!', guestCartId);
    }
}

export default new MultisafepayQuery();
