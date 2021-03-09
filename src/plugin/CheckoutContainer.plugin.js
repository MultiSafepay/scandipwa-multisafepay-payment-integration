
import { CART_TAB } from 'Component/NavigationTabs/NavigationTabs.config';
import CheckoutQuery from 'Query/Checkout.query';
import MultisafepayQuery from '../query/Multisafepay.query';
import {BILLING_STEP, DETAILS_STEP, PAYMENT_TOTALS} from 'Route/Checkout/Checkout.config';
import { getGuestQuoteId } from 'Util/Cart';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { fetchMutation, fetchQuery } from 'Util/Request';
import { isMultisafepayPayment } from '../util/Payment';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';


export class CheckoutContainerPlugin {

    // eslint-disable-next-line no-unused-vars
    aroundSavePaymentMethodAndPlaceOrder = async (args, callback = () => {}, instance) => {
        const { paymentMethod: { code, additional_data } } = args[0];
        const guest_cart_id = !isSignedIn() ? getGuestQuoteId() : '';

        try {
            console.log(additional_data);

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

    // eslint-disable-next-line no-unused-vars
    aroundSaveAddressInformation = async (args, callback = () => {}, instance) => {
        const { updateShippingPrice } = instance.props;
        const { shipping_address } = args[0];

        instance.setState({
            isLoading: true,
            shippingAddress: shipping_address
        });

        if (!isSignedIn()) {
            if (!await instance.createUserOrSaveGuest()) {
                instance.setState({ isLoading: false });
                return;
            }
        }

        fetchMutation(MultisafepayQuery.getSaveAddressInformation(
            instance.prepareAddressInformation(args[0]),
            getGuestQuoteId()
        )).then(
            ({ saveAddressInformation: data }) => {
                const { payment_methods, totals } = data;

                updateShippingPrice(totals);

                BrowserDatabase.setItem(
                    totals,
                    PAYMENT_TOTALS,
                    ONE_MONTH_IN_SECONDS
                );

                instance.setState({
                    isLoading: false,
                    paymentMethods: payment_methods,
                    checkoutStep: BILLING_STEP,
                    paymentTotals: totals
                });
            },
            instance._handleError
        );

        // const queryData = await fetchQuery(
        //     MultisafepayQuery.getPaymentMethodsWithAdditionalMeta(getGuestQuoteId())
        // );
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

        if (isMultisafepayPayment(code)) {
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
    aroundSetDetailsStep,
    aroundSaveAddressInformation
} = new CheckoutContainerPlugin();

export const config = {
    'Route/Checkout/Container': {
        'member-function': {
            savePaymentMethodAndPlaceOrder: aroundSavePaymentMethodAndPlaceOrder,
            setDetailsStep: aroundSetDetailsStep,
            saveAddressInformation: aroundSaveAddressInformation
        }
    }
};

export default config;
