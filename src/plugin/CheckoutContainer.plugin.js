
import { CART_TAB } from 'Component/NavigationTabs/NavigationTabs.config';
import CheckoutQuery from 'Query/Checkout.query';
import { DETAILS_STEP, PAYMENT_TOTALS } from 'Route/Checkout/Checkout.config';
import { getGuestQuoteId } from 'Util/Cart';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { fetchMutation } from 'Util/Request';

export class CheckoutContainerPlugin {
    // aroundComponentDidUpdate = (args, callback = () => {}, instance) => {
    //     const { isProcessed = false, incrementId } = instance.props;
    //     const { checkoutStep } = instance.state;
    //
    //     if (isProcessed && checkoutStep !== DETAILS_STEP) {
    //         instance.setState({
    //             isLoading: false,
    //             paymentTotals: {},
    //             checkoutStep: DETAILS_STEP,
    //             orderID: incrementId
    //         });
    //     }
    // };

    // eslint-disable-next-line no-unused-vars
    aroundSavePaymentMethodAndPlaceOrder = async (args, callback = () => {}, instance) => {
        const { paymentMethod: { code, additional_data } } = args[0];
        const guest_cart_id = !isSignedIn() ? getGuestQuoteId() : '';

        try {
            await fetchMutation(CheckoutQuery.getSetPaymentMethodOnCartMutation({
                guest_cart_id,
                payment_method: {
                    code, [code]: additional_data
                }
            }));

            const {
                placeOrder: {
                    order: {
                        order_id,
                        multisafepay_payment_url: {
                            payment_url: multisafepay_redirect_url,
                            error: multisafepay_payment_errors
                        },
                    }
                }
            } = await fetchMutation(CheckoutQuery.getPlaceOrderMutation(guest_cart_id));

            const additionalData = {
                multisafepay_redirect_url,
                multisafepay_payment_errors,
                code,
            };

            instance.setDetailsStep(order_id, additionalData);
        } catch (e) {
            instance._handleError(e);
        }
    };

    /**
     *
     * @param args
     * @param callback
     * @param instance
     * @returns {*}
     */
    aroundSetDetailsStep = (args, callback = () => {}, instance) => {
        const { resetCart, resetGuestCart, setNavigationState } = instance.props;
        const { showErrorNotification } = instance.props;
        const { code, multisafepay_payment_errors, multisafepay_redirect_url } = args[1] || {};

        if (code && (code.includes('multisafepay_') || code === 'multisafepay')) {
            if (multisafepay_payment_errors !== "") {
                showErrorNotification(multisafepay_payment_errors);
                instance.setState({ isLoading: false });

                return;
            }

            if (multisafepay_redirect_url !== "") {
                if (!isSignedIn()) {
                    BrowserDatabase.deleteItem(getGuestQuoteId());
                }

                BrowserDatabase.deleteItem(PAYMENT_TOTALS);
                if (isSignedIn()) {
                    resetCart();
                } else {
                    resetGuestCart();
                }

                instance.setState({isLoading: false, paymentTotals: {}});

                return window.location = multisafepay_redirect_url;
            }
        }

        if (!isSignedIn()) {
            BrowserDatabase.deleteItem(getGuestQuoteId());
        }

        BrowserDatabase.deleteItem(PAYMENT_TOTALS);

        if (isSignedIn()) {
            resetCart();
        } else {
            resetGuestCart();
        }

        instance.setState({
            isLoading: false,
            paymentTotals: {},
            checkoutStep: DETAILS_STEP,
            orderID: args[0]
        });

        setNavigationState({
            name: CART_TAB
        });
    };
}

const {
    aroundSavePaymentMethodAndPlaceOrder,
    aroundSetDetailsStep
    // aroundComponentDidUpdate
} = new CheckoutContainerPlugin();

export const config = {
    'Route/Checkout/Container': {
        'member-function': {
            savePaymentMethodAndPlaceOrder: aroundSavePaymentMethodAndPlaceOrder,
            setDetailsStep: aroundSetDetailsStep
            // componentDidUpdate: aroundComponentDidUpdate
        }
    }
};

export default config;
