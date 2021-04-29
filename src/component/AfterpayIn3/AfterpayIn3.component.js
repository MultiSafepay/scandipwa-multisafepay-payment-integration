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

import { renderInputWithLabel, renderLabel } from '../../util/Form';
import { AFTERPAY_CONTAINER_ID } from './AfterpayIn3.config';

import './AfterpayIn3.style';

/** @namespace ScandipwaMultisafepayPaymentIntegration/Component/AfterpayIn3/Component/AfterpayIn3Component */
export class AfterpayIn3Component extends PureComponent {
    static propTypes = {
        selectedPaymentCode: PropTypes.string.isRequired,
        onPaymentMethodSelect: PropTypes.func.isRequired
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    componentDidMount() {
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({
            date_of_birth: '',
            gender: ''
        });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                date_of_birth: '',
                gender: ''
            }
        );
    }

    /**
     *
     * @returns {JSX.Element}
     */
    renderGenders() {
        const genders = [
            {
                code: 'mr',
                label: __('Mr.')
            },
            {
                code: 'mrs',
                label: __('Mrs.')
            },
            {
                code: 'miss',
                label: __('Miss')
            }
        ];

        const id = 'afterpayin3-genders';
        const label = __('Gender');
        const block = 'AfterpayIn3Select';

        return (
            <div block={ block }>
                { renderLabel(block, true, id, label) }

                <select
                  block={ block }
                  elem="Select"
                  id={ id }
                  name="gender"
                  onChange={ this.updateGender }
                >
                    { this.renderPlaceholder() }
                    { genders.map(this.renderGenderOption) }
                </select>
            </div>
        );
    }

    /**
     *
     * @returns {JSX.Element}
     */
    renderPlaceholder() {
        return (
            <option value="xxx" label={ __('Choose your gender...') } />
        );
    }

    /**
     *
     * @param e
     */
    updateGender = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({ gender: value });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                gender: value,
                date_of_birth: this.state.date_of_birth
            }
        );
    };

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
                gender: this.state.gender
            }
        );
    };

    /**
     *
     * @param item
     * @returns {JSX.Element}
     */
    renderGenderOption = (item) => {
        const { code, label } = item;

        return (
            <option
              key={ `gender_${ code}` }
              id={ `gender_${ code}` }
              value={ code }
            >
                { label }
            </option>
        );
    };

    render() {
        const inputId = 'AfterpayIn3Input';

        return (
            <div block="AfterpayIn3">
                <div block="AfterpayIn3" elem="Form" id={ AFTERPAY_CONTAINER_ID }>
                    { renderInputWithLabel(
                        inputId,
                        'afterpayin3-date-of-birth',
                        __('Date of Birth'),
                        this.updateDateOfBirth,
                        true,
                        'text',
                        __('dd-mm-yyyy')
                    ) }

                    { this.renderGenders() }
                </div>
            </div>
        );
    }
}

export default AfterpayIn3Component;
