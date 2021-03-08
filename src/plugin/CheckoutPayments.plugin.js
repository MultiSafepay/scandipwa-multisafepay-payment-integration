
import MultisafepayBasePayment from '../component/BasePayment';
import AfterpayIn3 from '../component/AfterpayIn3';
import Ideal from '../component/Ideal';
import {ADYEN_CC} from "../../../@scandipwa/adyen-graphql/src/plugin/CheckoutPayments.plugin";
import { isMultisafepayPayment, isMultisafepayRecurringPayment } from '../util/Payment';

import CheckoutPayment from 'Component/CheckoutPayment';

export const MULTISAFEPAY_IDEAL_CODE = 'multisafepay_ideal';
export const MULTISAFEPAY_AFTERPAY_CODE = 'multisafepay_afterpay';
export const MULTISAFEPAY_DIRECTBANKTRANSFER_CODE = 'multisafepay_directbanktransfer';
export const MULTISAFEPAY_DIRECTDEBIT_CODE = 'multisafepay_directdebit';
export const MULTISAFEPAY_EINVOICING_CODE = 'multisafepay_einvoicing';
export const MULTISAFEPAY_IN3_CODE = 'multisafepay_in3';
export const MULTISAFEPAY_PAYAFTER_CODE = 'multisafepay_payafter';

export class CheckoutPaymentsPlugin {
    aroundPaymentRenderMap = (originalMember, instance) => ({
        ...originalMember,
        [MULTISAFEPAY_AFTERPAY_CODE]: this.renderAfterpayIn3Payment.bind(instance),
        [MULTISAFEPAY_IN3_CODE]: this.renderAfterpayIn3Payment.bind(instance),
        [MULTISAFEPAY_IDEAL_CODE]: this.renderIdealPayment.bind(instance)
        // [MULTISAFEPAY_DIRECTBANKTRANSFER_CODE]: this.renderDirectBankTransferPayment.bind(instance),
        // [MULTISAFEPAY_DIRECTDEBIT_CODE]: this.renderDirectDebitPayment.bind(instance),
        // [MULTISAFEPAY_PAYAFTER_CODE]: this.renderPayafterEinvoicingPayment.bind(instance),
        // [MULTISAFEPAY_EINVOICING_CODE]: this.renderPayafterEinvoicingPayment.bind(instance)
    });

    /**
     *
     * @returns {JSX.Element}
     */
    renderIdealPayment() {
        const {
            billingAddress,
            totals
        } = this.props;
        // const totals = Object.keys(paymentTotals).length ? paymentTotals : cartTotals;

        return (
            <Ideal
                billingAddress={ billingAddress }
                paymentTotals={ totals }
            />
        );
    }

    /**
     *
     * @returns {JSX.Element}
     */
    renderAfterpayIn3Payment() {
        const {
            billingAddress,
            totals
        } = this.props;
        // const totals = Object.keys(paymentTotals).length ? paymentTotals : cartTotals;

        return (
            <AfterpayIn3
              billingAddress={ billingAddress }
              paymentTotals={ totals }
            />
        );
    }

    // eslint-disable-next-line no-unused-vars
    aroundRenderSelectedPayment = (args, callback = () => {}, instance) => {
        const { selectedPaymentCode } = instance.props;
        const render = instance.paymentRenderMap[selectedPaymentCode];

        if (!render) {
            return null;
        }

        return render(instance.props);
    };

    // eslint-disable-next-line no-unused-vars
    aroundRenderPayment = (args, callback = () => {}, instance) => {
        const { selectPaymentMethod, selectedPaymentCode } = instance.props;
        const method = args[0];
        const { code } = method;
        const isSelected = selectedPaymentCode === code;

        if (isMultisafepayRecurringPayment(code)) {
            return;
        }

        if (isMultisafepayPayment(code)) {

            return (
                <MultisafepayBasePayment
                    key={ code }
                    isSelected={ isSelected }
                    method={ method }
                    onClick={ selectPaymentMethod }
                />
            );
        }

        return (
            <CheckoutPayment
                key={ code }
                isSelected={ isSelected }
                method={ method }
                onClick={ selectPaymentMethod }
            />
        );
    };
}

const {
    aroundPaymentRenderMap,
    aroundRenderPayment,
    aroundRenderSelectedPayment
} = new CheckoutPaymentsPlugin();

export const config = {
    'Component/CheckoutPayments/Component': {
        'member-property': {
            paymentRenderMap: aroundPaymentRenderMap
        },
        'member-function': {
            renderSelectedPayment: aroundRenderSelectedPayment,
            renderPayment: aroundRenderPayment
        }
    }
};

export default config;
