/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa-multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */

/**
 * @param {String} block
 * @param {Boolean} isRequired
 * @param {String} id
 * @param {String} label
 * @namespace ScandipwaMultisafepayPaymentIntegration/Util/Form/renderLabel */
export const renderLabel = (block, isRequired, id, label) => (
        <label
          block={ block }
          elem="Label"
          required={ isRequired }
          htmlFor={ id }
        >
            { label }
        </label>
);

/**
 * @param {String} block
 * @param {String} id
 * @param {String} label
 * @param  onChange
 * @param {Boolean} isRequired
 * @param {String} type
 * @param {String} placeholder
 * @namespace ScandipwaMultisafepayPaymentIntegration/Util/Form/renderInputWithLabel */
export const renderInputWithLabel = (
    block,
    id,
    label,
    onChange,
    isRequired = true,
    type = 'text',
    placeholder = '',
) => (
        <div block={ block }>
            { renderLabel(block, isRequired, id, label) }

            <input
              block={ block }
              type={ type }
              id={ id }
              name={ id }
              title={ label }
              required={ isRequired }
              placeholder={ placeholder }
              onChange={ onChange }
            />
        </div>
);
