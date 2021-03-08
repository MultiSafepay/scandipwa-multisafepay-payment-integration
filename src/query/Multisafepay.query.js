
import { Field } from 'Util/Query';

/**
 * @namespace MultiSafepay/Query/Multisafepay/Query/MultisafepayQuery */
export class MultisafepayQuery {
    restoreQuote(options) {
        return new Field('restoreQuote')
            .addArgument('input', 'RestoreQuoteInput', options);
    }
}

export default new MultisafepayQuery();
