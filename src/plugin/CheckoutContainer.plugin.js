/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa-multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */
import { CART_TAB } from 'Component/NavigationTabs/NavigationTabs.config';
import CartQuery from 'Query/Cart.query';
import CheckoutQuery from 'Query/Checkout.query';
import {
    BILLING_STEP, DETAILS_STEP, PAYMENT_TOTALS
} from 'Route/Checkout/Checkout.config';
import { CART_TOTALS } from 'Store/Cart/Cart.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { deleteGuestQuoteId, getGuestQuoteId, setGuestQuoteId } from 'Util/Cart';
import { fetchMutation } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import MultisafepayQuery from '../query/Multisafepay.query';
import { isMultisafepayPayment } from '../util/Payment';
import { MULTISAFEPAY_GUEST_CHECKOUT } from './Checkout.plugin';

export class CheckoutContainerPlugin {
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
                        }
                    }
                }
            } = await fetchMutation(CheckoutQuery.getPlaceOrderMutation(guest_cart_id));

            const additionalData = {
                multisafepay_redirect_url,
                multisafepay_payment_errors,
                code
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
    };

    // eslint-disable-next-line no-unused-vars
    aroundSetDetailsStep = (args, callback = () => {}, instance) => {
        const { resetCart, resetGuestCart, setNavigationState } = instance.props;
        const { showErrorNotification } = instance.props;
        const { code, multisafepay_payment_errors, multisafepay_redirect_url } = args[1] || {};

        if (isMultisafepayPayment(code)) {
            if (multisafepay_payment_errors !== '') {
                showErrorNotification(multisafepay_payment_errors);
                instance.setState({ isLoading: false });

                return;
            }

            if (multisafepay_redirect_url !== '') {
                BrowserDatabase.deleteItem(PAYMENT_TOTALS);

                if (isSignedIn()) {
                    resetCart();
                }

                instance.setState({ isLoading: false, paymentTotals: {} });

                // eslint-disable-next-line consistent-return,no-return-assign
                return window.location = multisafepay_redirect_url;
            }
        }

        if (!isSignedIn() && getGuestQuoteId()) {
            deleteGuestQuoteId();
        }

        BrowserDatabase.deleteItem(PAYMENT_TOTALS);

        if (isSignedIn()) {
            resetCart();
        } else {
            if (BrowserDatabase.getItem(MULTISAFEPAY_GUEST_CHECKOUT)) {
                BrowserDatabase.deleteItem(CART_TOTALS);
                fetchMutation(CartQuery.getCreateEmptyCartMutation()).then(
                    ({ createEmptyCart }) => {
                        setGuestQuoteId(createEmptyCart);
                        resetGuestCart();
                    }, (error) => showNotification('error', error[0].message)
                );
            }

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
