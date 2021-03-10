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
import CheckoutPayment from 'Component/CheckoutPayment'
import './BaseComponent.style';

import { paymentMethodType } from 'Type/Checkout';

/** @namespace Component/CheckoutPayment/Component */
export class BaseComponent extends CheckoutPayment {
    static propTypes = {
        method: paymentMethodType.isRequired,
        onClick: PropTypes.func.isRequired,
        srcImage: PropTypes.string,
        isSelected: PropTypes.bool
    };

    render() {
        const {
            isSelected,
            method: { title, code },
            srcImage
        } = this.props;

        return (

            <li block="CheckoutPayment">
                <img
                    block="MultiSafepayLogo"
                    elem="Image"
                    alt={ title }
                    src={ srcImage }
                    itemProp="image"
                />
                <button
                  block="CheckoutPayment"
                  mods={ { isSelected } }
                  elem="Button"
                  onClick={ this.onClick }
                  type="button"
                >
                    { title }
                </button>
            </li>
        );
    }
}

export default BaseComponent;
