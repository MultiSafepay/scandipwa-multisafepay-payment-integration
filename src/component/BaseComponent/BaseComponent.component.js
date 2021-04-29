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

import CheckoutPayment from 'Component/CheckoutPayment';
import { paymentMethodType } from 'Type/Checkout';

import './BaseComponent.style';

/** @namespace ScandipwaMultisafepayPaymentIntegration/Component/BaseComponent/Component/BaseComponentComponent */
export class BaseComponentComponent extends CheckoutPayment {
    static propTypes = {
        method: paymentMethodType.isRequired,
        onClick: PropTypes.func.isRequired,
        srcImage: PropTypes.string,
        isSelected: PropTypes.bool
    };

    render() {
        const {
            isSelected,
            method: { title },
            srcImage
        } = this.props;

        return (

            <li block="CheckoutPayment MultiSafepay-payment">

                <button
                  block="CheckoutPayment"
                  mods={ { isSelected } }
                  elem="Button"
                  onClick={ this.onClick }
                  type="button"
                >
                    <img
                      block="MultiSafepayLogo"
                      elem="Image"
                      alt={ title }
                      src={ srcImage }
                      itemProp="image"
                    />
                    { title }
                </button>
            </li>
        );
    }
}

export default BaseComponentComponent;
