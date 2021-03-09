
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import Loader from 'Component/Loader';
import { AFTERPAY_CONTAINER_ID } from './AfterpayIn3.config';
import './AfterpayIn3.style';

/** @namespace MultiSafepay/AfterpayIn3/Component */
export class AfterpayIn3 extends PureComponent {
    static propTypes = {
        selectedPaymentCode: PropTypes.any.isRequired,
        paymentMethods: PropTypes.any.isRequired,
        onPaymentMethodSelect: PropTypes.func.isRequired,
        selectPaymentMethod: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.state = {
            date_of_birth: '',
            gender: '',
        }

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                date_of_birth: '',
                gender: '',
            });
    }

    /**
     *
     * @returns {JSX.Element}
     */
    renderDateOfBirth() {
        return (
            <div>
                <input
                    block="AfterpayIn3Select"
                    type="text"
                    id="afterpayin3-date-of-birth"
                    name="afterpayin3-date-of-birth"
                    title={ __('Date of Birth') }
                    placeholder={ __('dd-mm-yyyy') }
                    required={ true }
                    onChange={ this.updateDateOfBirth }
                />
            </div>
        );
    }

    /**
     *
     * @returns {JSX.Element}
     */
    renderGenders() {
        const genders =[
            {
                "code": "mr",
                "label": 'Mr.'
            },
            {
                "code": "mrs",
                "label": 'Mrs.'
            },
            {
                "code": "miss",
                "label": 'Miss'
            }
        ];

        return (
            <div>
                <select
                    block="AfterpayIn3Select"
                    elem="Select"
                    name="gender"
                    onChange={ this.updateGender }
                >
                    { this.renderPlaceholder() }
                    { genders.map(this.renderGenderOption) }
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
            <option value="" label={ __('Choose your gender...') } />
        );
    }

    /**
     *
     * @param e
     */
    updateGender = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({ gender: value });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                gender: value,
                date_of_birth: this.state.date_of_birth
            });
    };

    /**
     *
     * @param e
     */
    updateDateOfBirth = (e) => {
        const { value } = e.target;
        const { onPaymentMethodSelect, selectedPaymentCode } = this.props;
        this.setState({ date_of_birth: value });

        onPaymentMethodSelect(
            selectedPaymentCode,
            {
                date_of_birth: value,
                gender: this.state.gender
            });
    };

    /**
     *
     * @param item
     * @returns {JSX.Element}
     */
    renderGenderOption = (item) => {
        const { code, label } = item;

        return (
            <option
                key={ 'gender_' + code }
                id={ 'gender_' + code }
                value={ code }
            >
                { label }
            </option>
        );
    };

    render() {
        return (
            <div block="AfterpayIn3">
                <div block="AfterpayIn3" elem="Form" id={ AFTERPAY_CONTAINER_ID }>
                    { this.renderDateOfBirth() }
                    { this.renderGenders() }
                </div>
            </div>
        );
    }
}

export default AfterpayIn3;
