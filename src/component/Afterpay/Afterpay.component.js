

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Loader from 'Component/Loader';

import { AFTERPAY_CONTAINER_ID } from './Afterpay.config';

import './Afterpay.style';
import {Address, PaymentTotals} from "../../../../@scandipwa/stripe-payments/src/type/Stripe";

/** @namespace MultiSafepay/Afterpay/Component */
export class Afterpay extends PureComponent {
    static propTypes = {
        billingAddress: Address.isRequired,
        paymentTotals: PaymentTotals.isRequired
    };

    state = {
        isLoading: true
    };

    render() {
        const { isLoading } = this.state;

        return (
            <div block="Afterpay">
                <Loader isLoading={ isLoading } />
                <div
                  block="Afterpay"
                  elem="Form"
                  id={ AFTERPAY_CONTAINER_ID }
                />
            </div>
        );
    }
}

export default Afterpay;
