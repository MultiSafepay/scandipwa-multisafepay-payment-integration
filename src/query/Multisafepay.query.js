/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa-multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */
import { isSignedIn } from 'Util/Auth';
import { Field } from 'Util/Query';

/**
 * @namespace ScandipwaMultisafepayPaymentIntegration/Query/Multisafepay/Query/MultisafepayQuery */
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
     * @returns {*}
     */
    getMultisafepayApiToken() {
        return new Field('getMultisafepayApiToken')
            .addFieldList(
                [
                    'multisafepay_api_token'
                ]
            );
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

    /**
     *
     * @returns {MultisafepayQuery[]}
     * @private
     */
    _getSaveAddressInformationFields() {
        return [
            this._getPaymentMethodsField(),
            this._getTotalsField()
        ];
    }

    /**
     *
     * @returns {Field}
     * @private
     */
    _getPaymentMethodsField() {
        return new Field('payment_methods')
            .addFieldList(this._getPaymentMethodFields());
    }

    /**
     *
     * @returns {(string|Field)[]}
     * @private
     */
    _getPaymentMethodFields() {
        return [
            'code',
            'title',
            this._getMultisafepayAvailableIssuersFields(),
            this._getMultisafepayAdditionalMetaFields()
        ];
    }

    /**
     *
     * @returns {Field}
     * @private
     */
    _getTotalsField() {
        return new Field('totals')
            .addFieldList(this._getTotalsFields());
    }

    /**
     *
     * @returns {(string|MultisafepayQuery)[]}
     * @private
     */
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

    /**
     *
     * @returns {Field}
     * @private
     */
    _getTotalItemField() {
        return new Field('items')
            .addFieldList(this._getTotalItemFields());
    }

    /**
     *
     * @returns {string[]}
     * @private
     */
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
                'description'
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
                'is_preselected'
            ]);
    }

    /**
     *
     * @param guestCartId
     * @param mutation
     * @private
     */
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
