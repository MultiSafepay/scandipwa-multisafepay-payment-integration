
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import Loader from 'Component/Loader';
import { IDEAL_CONTAINER_ID } from './Ideal.config';
import './Ideal.style';

/** @namespace MultiSafepay/Ideal/Component */
export class Ideal extends PureComponent {
    static propTypes = {
        paymentData: PropTypes.any.isRequired,
        paymentMethods: PropTypes.any.isRequired,
        onPaymentMethodSelect: PropTypes.func.isRequired,
        selectPaymentMethod: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { onPaymentMethodSelect, paymentData } = this.props;
        const { code } = paymentData;

        onPaymentMethodSelect(
            code,
            {
                issuer_id: 'xxx'
            });
    }

    renderIssuers() {
        const { paymentData } = this.props;
        const { multisafepay_available_issuers } = paymentData;

        return (
            <div>
                <select
                    block="IdealSelect"
                    elem="Select"
                    name="issuerid"
                    onChange={ this.onChange }
                >
                    { this.renderPlaceholder() }
                    { multisafepay_available_issuers.map(this.renderIssuerOption) }
                </select>
            </div>
        );
    }

    /**
     *
     * @returns {JSX.Element}
     */
    renderPlaceholder() {
        return (
            <option value="" label={ __('Choose your bank...') } />
        );
    }

    /**
     *
     * @param e
     */
    onChange = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, paymentData } = this.props;
        const { code } = paymentData;

        onPaymentMethodSelect(
            code,
            {
                issuer_id: value
            });
    };

    /**
     *
     * @param item
     * @returns {JSX.Element}
     */
    renderIssuerOption = (item) => {
        const { code, description } = item;

        return (
            <option
                key={ 'issuer_' + code }
                id={ 'issuer_' + code }
                value={ code }
            >
                { description }
            </option>
        );
    };

    render() {
        return (
            <div block="Ideal">
                <div block="Ideal" elem="Form" id={ IDEAL_CONTAINER_ID }>
                    { this.renderIssuers() }
                </div>
            </div>
        );
    }
}

export default Ideal;
