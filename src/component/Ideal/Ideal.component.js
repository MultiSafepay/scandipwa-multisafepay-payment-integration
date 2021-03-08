
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Loader from 'Component/Loader';

import { IDEAL_CONTAINER_ID } from './Ideal.config';

import './Ideal.style';
import {Address, PaymentTotals} from "../../../../@scandipwa/stripe-payments/src/type/Stripe";

/** @namespace MultiSafepay/Ideal/Component */
export class Ideal extends PureComponent {
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
            <div block="Ideal">
                <Loader isLoading={ isLoading } />
                <div
                  block="Ideal"
                  elem="Form"
                  id={ IDEAL_CONTAINER_ID }
                />
            </div>
        );
    }
}

export default Ideal;
