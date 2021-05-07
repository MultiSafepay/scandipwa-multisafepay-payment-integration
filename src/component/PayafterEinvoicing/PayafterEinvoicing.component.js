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
import { PAYAFTER_EINVOICING_CONTAINER_ID } from './PayafterEinvoicing.config';

import './PayafterEinvoicing.style';

/** @namespace ScandipwaMultisafepayPaymentIntegration/Component/PayafterEinvoicing/Component/PayafterEinvoicingComponent */
export class PayafterEinvoicingComponent extends PureComponent {
    static propTypes = {
        selectedPaymentCode: PropTypes.string.isRequired,
        onPaymentMethodSelect: PropTypes.func.isRequired
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    componentDidMount() {
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({
            date_of_birth: '',
            account_number: ''
        });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                date_of_birth: '',
                account_number: ''
            }
        );
    }

    /**
     *
     * @param e
     */
    updateDateOfBirth = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({ date_of_birth: value });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                date_of_birth: value,
                account_number: this.state.account_number
            }
        );
    };

    /**
     *
     * @param e
     */
    updateAccountNumber = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({ account_number: value });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                date_of_birth: this.state.date_of_birth,
                account_number: value
            }
        );
    };

    render() {
        const inputId = 'PayafterEinvoicingInput';

        return (
            <div block="PayafterEinvoicing">
                <div block="PayafterEinvoicing" elem="Form" id={ PAYAFTER_EINVOICING_CONTAINER_ID }>
                    { renderInputWithLabel(
                        inputId,
                        'payafter-einvoicing-date-of-birth',
                        __('Date of Birth'),
                        this.updateDateOfBirth,
                        true,
                        'text',
                        __('dd-mm-yyyy')
                    ) }

                    { renderInputWithLabel(
                        inputId,
                        'payafter-einvoicing-account-number',
                        __('Account Number'),
                        this.updateAccountNumber,
                        true,
                        'text',
                        __('Bank account number e.g NL02ABNA0123456789')
                    ) }
                </div>
            </div>
        );
    }
}

export default PayafterEinvoicingComponent;
