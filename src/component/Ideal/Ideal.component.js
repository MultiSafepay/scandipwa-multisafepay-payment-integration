/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa-multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { renderLabel } from '../../util/Form';
import { IDEAL_CONTAINER_ID } from './Ideal.config';

import './Ideal.style';

/** @namespace ScandipwaMultisafepayPaymentIntegration/Component/Ideal/Component/IdealComponent */
export class IdealComponent extends PureComponent {
    static propTypes = {
        paymentData: PropTypes.objectOf(PropTypes.shape).isRequired,
        onPaymentMethodSelect: PropTypes.func.isRequired
    };

    /**
     *
     * @returns {Ideal}
     */
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    componentDidMount() {
        const { onPaymentMethodSelect, paymentData } = this.props;
        const { code } = paymentData;

        onPaymentMethodSelect(
            code,
            {
                issuer_id: 'xxx'
            }
        );

        return this;
    }

    /**
     *
     * @returns {JSX.Element}
     */
    renderIssuers() {
        const { paymentData } = this.props;
        const { multisafepay_available_issuers } = paymentData;
        const id = 'ideal-issuers';
        const label = __('Choose Bank');
        const block = 'IdealSelect';

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
            }
        );

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
              key={ `issuer_${ code}` }
              id={ `issuer_${ code}` }
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

export default IdealComponent;
