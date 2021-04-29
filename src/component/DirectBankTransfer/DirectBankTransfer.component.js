/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa-multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */
/* eslint-disable react/destructuring-assignment */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { renderInputWithLabel } from '../../util/Form';
import { DIRECT_BANK_TRANSFER_CONTAINER_ID } from './DirectBankTransfer.config';

import './DirectBankTransfer.style';

/** @namespace ScandipwaMultisafepayPaymentIntegration/Component/DirectBankTransfer/Component/DirectBankTransferComponent */
export class DirectBankTransferComponent extends PureComponent {
    static propTypes = {
        selectedPaymentCode: PropTypes.string.isRequired,
        onPaymentMethodSelect: PropTypes.func.isRequired
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    componentDidMount() {
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({
            account_id: '',
            account_holder_name: '',
            account_holder_city: '',
            account_holder_country: '',
            account_holder_iban: '',
            account_holder_bic: ''
        });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                account_id: '',
                account_holder_name: '',
                account_holder_city: '',
                account_holder_country: '',
                account_holder_iban: '',
                account_holder_bic: ''
            }
        );
    }

    /**
     *
     * @param e
     */
    updateAccountId = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({ account_id: value });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                account_id: value,
                account_holder_name: this.state.account_holder_name,
                account_holder_city: this.state.account_holder_city,
                account_holder_country: this.state.account_holder_country,
                account_holder_iban: this.state.account_holder_iban,
                account_holder_bic: this.state.account_holder_bic
            }
        );
    };

    /**
     *
     * @param e
     */
    updateAccountHolderName = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({ account_holder_name: value });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                account_id: this.state.account_id,
                account_holder_name: value,
                account_holder_city: this.state.account_holder_city,
                account_holder_country: this.state.account_holder_country,
                account_holder_iban: this.state.account_holder_iban,
                account_holder_bic: this.state.account_holder_bic
            }
        );
    };

    /**
     *
     * @param e
     */
    updateAccountHolderCity = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({ account_holder_city: value });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                account_id: this.state.account_id,
                account_holder_name: this.state.account_holder_name,
                account_holder_city: value,
                account_holder_country: this.state.account_holder_country,
                account_holder_iban: this.state.account_holder_iban,
                account_holder_bic: this.state.account_holder_bic
            }
        );
    };

    /**
     *
     * @param e
     */
    updateAccountHolderCountry = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({ account_holder_country: value });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                account_id: this.state.account_id,
                account_holder_name: this.state.account_holder_name,
                account_holder_city: this.state.account_holder_city,
                account_holder_country: value,
                account_holder_iban: this.state.account_holder_iban,
                account_holder_bic: this.state.account_holder_bic
            }
        );
    };

    /**
     *
     * @param e
     */
    updateAccountHolderIban = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({ account_holder_iban: value });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                account_id: this.state.account_id,
                account_holder_name: this.state.account_holder_name,
                account_holder_city: this.state.account_holder_city,
                account_holder_country: this.state.account_holder_country,
                account_holder_iban: value,
                account_holder_bic: this.state.account_holder_bic
            }
        );
    };

    /**
     *
     * @param e
     */
    updateAccountHolderBic = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({ account_holder_bic: value });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                account_id: this.state.account_id,
                account_holder_name: this.state.account_holder_name,
                account_holder_city: this.state.account_holder_city,
                account_holder_country: this.state.account_holder_country,
                account_holder_iban: this.state.account_holder_iban,
                account_holder_bic: value
            }
        );
    };

    render() {
        const inputId = 'DirectBankTransferInput';

        return (
            <div block="DirectBankTransfer">
                <div block="DirectBankTransfer" elem="Form" id={ DIRECT_BANK_TRANSFER_CONTAINER_ID }>
                    { renderInputWithLabel(
                        inputId,
                        'directbanktransfer-account-id',
                        __('Account ID'),
                        this.updateAccountId
                    ) }

                    { renderInputWithLabel(
                        inputId,
                        'directbanktransfer-account-name',
                        __('Account holder name'),
                        this.updateAccountHolderName
                    ) }

                    { renderInputWithLabel(
                        inputId,
                        'directbanktransfer-account-city',
                        __('Account holder city'),
                        this.updateAccountHolderCity
                    ) }

                    { renderInputWithLabel(
                        inputId,
                        'directbanktransfer-account-country',
                        __('Account holder country'),
                        this.updateAccountHolderCountry
                    ) }

                    { renderInputWithLabel(
                        inputId,
                        'directbanktransfer-account-number',
                        __('Bank account number'),
                        this.updateAccountHolderIban,
                        true,
                        'text',
                        __('Bank account number e.g NL02ABNA0123456789')
                    ) }

                    { renderInputWithLabel(
                        inputId,
                        'directbanktransfer-account-bic',
                        __('Date of Birth'),
                        this.updateAccountHolderBic
                    ) }
                </div>
            </div>
        );
    }
}

export default DirectBankTransferComponent;
