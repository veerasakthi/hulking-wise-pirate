// @ts-check
const path = require('path');

/**
 * asyncCatch
 * - Use to catch error in common, to avoid try and catch 
 *
 * @param {any} asyncfn Function
 * @return {any} 
 */
function asyncCatch(asyncfn) {
    return (req, res, next) => {
        asyncfn(req, res, next).catch(next);
    }
}

/**
 * transaction
 * - Open transaction and close transaction for service
 *
 * @param {any} serviceFn Function
 * @return {any} 
 */
function transaction(serviceFn) {

    return async (req, next) => {

        let result;

        try {

            // TODO create connection if required
            
            // excute service
            result = await serviceFn(req);

        }
        catch(err){

            // TODO rollback transaction if required
            
            // handle to common error handler
            next(err);
        }
        finally {

            // TODO close connection if required

        }

        return result;
    }
}


module.exports = {
    asyncCatch,
    transaction
};

