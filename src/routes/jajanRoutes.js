import { loginRequired, register, login } from '../controllers/userControllers';
import { getAllCart, addToCart, removeFromCart } from '../controllers/keranjangControllers';

const routes = (app) => {
    app.route('/auth/register')
        .post(register);

    app.route('/login')
        .post(login);

    app.route('/keranjang')
        .post(addToCart)

        .delete(removeFromCart)

        .get(getAllCart)
}

export default routes;