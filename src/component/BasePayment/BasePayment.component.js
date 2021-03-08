
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { paymentMethodType } from 'Type/Checkout';

import './BasePayment.style';

/** @namespace MultiSafepay/Component/BasePayment/Component */
export class BasePayment extends PureComponent {
    static propTypes = {
        method: paymentMethodType.isRequired,
        onClick: PropTypes.func.isRequired,
        isSelected: PropTypes.bool
    };

    static defaultProps = {
        isSelected: false
    };

    onClick = () => {
        const {
            onClick,
            method
        } = this.props;

        onClick(method);
    };

    render() {
        const {
            isSelected,
            method: { title, multisafepay_additional_data }
        } = this.props;
        const {image: src } = multisafepay_additional_data;

        return (
            <li block="CheckoutPayment">
                <button
                    block="CheckoutPayment"
                    mods={ { isSelected } }
                    elem="Button"
                    onClick={ this.onClick }
                    type="button"
                >
                    { title }
                    <img
                        style={ { width: '15%', float: 'left' } }
                        alt={ title }
                        src={ src }
                        itemProp="image"
                    />
                </button>
            </li>
        );
    }
}

export default BasePayment;
