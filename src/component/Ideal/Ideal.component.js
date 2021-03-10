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
import { IDEAL_CONTAINER_ID } from './Ideal.config';
import './Ideal.style';
import { renderLabel } from '../../util/Form';

/** @namespace MultiSafepay/Ideal/Component */
export class Ideal extends PureComponent {
    static propTypes = {
        paymentData: PropTypes.any.isRequired,
        paymentMethods: PropTypes.any.isRequired,
        onPaymentMethodSelect: PropTypes.func.isRequired,
        selectPaymentMethod: PropTypes.func.isRequired
    };

    /**
     *
     * @returns {Ideal}
     */
    componentDidMount() {
        const { onPaymentMethodSelect, paymentData } = this.props;
        const { code } = paymentData;

        onPaymentMethodSelect(
            code,
            {
                issuer_id: 'xxx'
            });

        return this;
    }

    /**
     *
     * @returns {JSX.Element}
     */
    renderIssuers() {
        const { paymentData } = this.props;
        const { multisafepay_available_issuers } = paymentData;
        const id = "ideal-issuers",
            label = __('Choose Bank'),
            block = "IdealSelect";

        return (
            <div>
                { renderLabel(block, true, id, label) }
                <select
                    block={ block }
                    elem="Select"
                    name="issuerid"
                    id={ id }
                    onChange={ this.onChange }
                >
                    <option value="" label={ __('Choose your bank...') } />
                    { multisafepay_available_issuers.map(this.renderIssuerOption) }
                </select>
            </div>
        );
    }

    /**
     *
     * @param e
     * @returns {MultiSafepay/Ideal/Component}
     */
    onChange = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, paymentData } = this.props;
        const { code } = paymentData;

        onPaymentMethodSelect(
            code,
            {
                issuer_id: value
            });

        return this;
    };

    /**
     *
     * @param item
     * @returns {JSX.Element}
     */
    renderIssuerOption = (item) => {
        const { code, description } = item;

        return (
            <option
                key={ 'issuer_' + code }
                id={ 'issuer_' + code }
                value={ code }
            >
                { description }
            </option>
        );
    };

    /**
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div block="Ideal">
                <div block="Ideal" elem="Form" id={ IDEAL_CONTAINER_ID }>
                    { this.renderIssuers() }
                </div>
            </div>
        );
    }
}

export default Ideal;
