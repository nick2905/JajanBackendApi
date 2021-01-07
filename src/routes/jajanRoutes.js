import {
    loginRequired,
    register,
    login,
    addCreditCard
} from '../controllers/userControllers';
import {
    getAllCart,
    addToCart,
    removeFromCart
} from '../controllers/keranjangControllers';
import {
    createPayment,
    getAllPayment,
    getOnePayment
} from '../controllers/paymentControllers';

const routes = (app) => {
    app.route('/auth/register')
        .post(register);

    app.route('/login')
        .post(login);

    app.route('/keranjang')
        .post(addToCart)

        .delete(removeFromCart)

        .get(getAllCart)

    app.route('/payment/:idUser')
        .post(createPayment)
        .get(getAllPayment)

    app.route('/payment/detail/:idPayment')
        .get(getOnePayment)

}

export default routes;