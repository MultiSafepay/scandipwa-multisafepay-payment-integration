

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Loader from 'Component/Loader';

import { AFTERPAY_CONTAINER_ID } from './AfterpayIn3.config';

import './AfterpayIn3.style';
import {Address, PaymentTotals} from "../../../../@scandipwa/stripe-payments/src/type/Stripe";

/** @namespace MultiSafepay/AfterpayIn3/Component */
export class AfterpayIn3 extends PureComponent {
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
            <div block="AfterpayIn3">
                <Loader isLoading={ isLoading } />
                <div
                  block="AfterpayIn3"
                  elem="Form"
                  id={ AFTERPAY_CONTAINER_ID }
                />
            </div>
        );
    }
}

export default AfterpayIn3;
