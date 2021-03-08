
import Afterpay from '../component/Afterpay';

export const AFTERPAY_CODE = 'multisafepay_afterpay';

export class CheckoutPaymentsPlugin {
    aroundPaymentRenderMap = (originalMember, instance) => ({
        ...originalMember,
        [AFTERPAY_CODE]: this.renderAfterpayPayment.bind(instance)
    });

    renderAfterpayPayment() {
        const {
            billingAddress,
            totals
        } = this.props;
        // const totals = Object.keys(paymentTotals).length ? paymentTotals : cartTotals;

        return (
            <Afterpay
              billingAddress={ billingAddress }
              paymentTotals={ totals }
            />
        );
    }
}

const {
    aroundPaymentRenderMap
} = new CheckoutPaymentsPlugin();

export const config = {
    'Component/CheckoutPayments/Component': {
        'member-property': {
            paymentRenderMap: aroundPaymentRenderMap
        }
    }
};

export default config;
