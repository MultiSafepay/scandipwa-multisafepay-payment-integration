/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package multisafepay-integration
 * @link https://github.com/MultiSafepay/scandipwa-multisafepay-payment-integration
 *
 */
/* eslint-disable fp/no-let */

/**
 * @param {String} block
 * @param {Boolean} isRequired
 * @param {String} id
 * @param {String} label
 * @namespace MultiSafepay/Util/Form/renderLabel
 */
export const renderLabel = (block, isRequired, id, label) => {
    return (
        <label
            block={block}
            elem="Label"
            required={isRequired}
            htmlFor={id}
        >
            {label}
        </label>
    );
};

/**
 * @param {String} block
 * @param {String} id
 * @param {String} label
 * @param  onChange
 * @param {Boolean} isRequired
 * @param {String} type
 * @param {String} placeholder
 * @namespace MultiSafepay/Util/Form/renderInput
 */
export const renderInputWithLabel = (
    block,
    id,
    label,
    onChange,
    isRequired = true,
    type = "text",
    placeholder = "",
) => {
    return (
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
};
