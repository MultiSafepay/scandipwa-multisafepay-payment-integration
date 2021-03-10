/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package multisafepay-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import Loader from 'Component/Loader';
import { DIRECT_DEBIT_CONTAINER_ID } from './DirectDebit.config';
import './DirectDebit.style';
import { renderInputWithLabel } from '../../util/Form';

/** @namespace MultiSafepay/DirectDebitComponent/Component */
export class DirectDebitComponent extends PureComponent {
    static propTypes = {
        selectedPaymentCode: PropTypes.string.isRequired,
        paymentMethods: PropTypes.any.isRequired,
        onPaymentMethodSelect: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {onPaymentMethodSelect, selectedPaymentCode} = this.props;
        this.setState({
            account_holder_name: '',
            account_holder_iban: '',
            emandate: ''
        });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                account_holder_name: '',
                account_holder_iban: '',
                emandate: ''
            });
    }

    /**
     *
     * @param e
     */
    updateAccountHolderName = (e) => {
        const {value} = e.target;
        const {onPaymentMethodSelect, selectedPaymentCode} = this.props;
        this.setState({account_holder_name: value});

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                account_holder_name: value,
                account_holder_iban: this.state.account_holder_iban,
                emandate: this.state.emandate
            });
    };

    /**
     *
     * @param e
     */
    updateAccountHolderIban = (e) => {
        const {value} = e.target;
        const {onPaymentMethodSelect, selectedPaymentCode} = this.props;
        this.setState({account_holder_iban: value});

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                account_holder_name: this.state.account_holder_name,
                account_holder_iban: value,
                emandate: this.state.emandate
            });
    };

    /**
     *
     * @param e
     */
    updateEmandate = (e) => {
        const {value} = e.target;
        const {onPaymentMethodSelect, selectedPaymentCode} = this.props;
        this.setState({emandate: value});

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                account_holder_name: this.state.account_holder_name,
                account_holder_iban: this.state.account_holder_iban,
                emandate: value
            });
    };

    render() {
        const inputId = "DirectDebitInput";

        return (
            <div block="DirectDebit">
                <div block="DirectDebit" elem="Form" id={ DIRECT_DEBIT_CONTAINER_ID }>
                    { renderInputWithLabel(
                        inputId,
                        "directdebit-account-name",
                        __("Account holder name"),
                        this.updateAccountHolderName
                    ) }

                    { renderInputWithLabel(
                        inputId,
                        "directdebit-account-number",
                        __("Bank account number"),
                        this.updateAccountHolderIban,
                        true,
                        "text",
                        __("Bank account number e.g NL02ABNA0123456789")
                    ) }

                    { renderInputWithLabel(
                        inputId,
                        "directdebit-emandate",
                        __("Emandate"),
                        this.updateEmandate
                    ) }
                </div>
            </div>
        );
    }
}

export default DirectDebitComponent;
