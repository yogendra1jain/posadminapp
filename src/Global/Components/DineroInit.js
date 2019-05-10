import Dinero from 'dinero.js';

const DineroInit = (amount, currency, precision) => (
    Dinero({amount:  parseInt(amount) || 0, currency: currency || 'USD', precision: precision || 2})
)

export default DineroInit;