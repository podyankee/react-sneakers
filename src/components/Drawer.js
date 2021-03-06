import { useState } from 'react';
import Info from './Info';

import { useCart } from '../hooks/useCart';
import axios from 'axios';

// test

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
	const { cartItems, setCartItems, totalPrice } = useCart();
	const [orderId, setOrderId] = useState(null);
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post('https://60e2719f5a5596001730f3d3.mockapi.io/orders', {
				items: cartItems,
			});
			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]);
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete('https://60e2719f5a5596001730f3d3.mockapi.io/cart/' + item.id);
				await delay(1000);
			}
		} catch {
			alert('Не удалось создать заказ :(');
		}
		setIsLoading(false);
	};

	return (
		<div className="overlay">
			<div className="drawer d-flex">
				<h2 className="mb-30 d-flex justify-between align-center">
					Корзина
					<img
						onClick={onClose}
						className="removeBtn cu-p"
						src="/img/btn-remove.svg"
						alt="Remove"
					/>
				</h2>

				{items.length > 0 ? (
					<div className="d-flex flex-column flex">
						<div className="items">
							{items.map(obj => (
								<div key={obj.id} className="cartItem d-flex align-center mb-20">
									<div
										style={{ backgroundImage: `url(${obj.imageUrl})` }}
										className="cartItemImg"></div>
									<div className="mr-20 flex">
										<p className="mb-5">{obj.title}</p>
										<b>{obj.price} грн.</b>
									</div>
									<img
										onClick={() => onRemove(obj.id)}
										className="removeBtn"
										src="/img/btn-remove.svg"
										alt="Remove"
									/>
								</div>
							))}
						</div>
						<div className="cartTotalBlock">
							<ul>
								<li className="d-flex">
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} грн.</b>
								</li>
								<li className="d-flex">
									<span>Налог 5% :</span>
									<div></div>
									<b>{((totalPrice / 100) * 5).toFixed(2)} грн.</b>
								</li>
							</ul>
							<button disabled={isLoading} onClick={onClickOrder} className="greenButton">
								Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
						}
						image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
					/>
				)}
			</div>
		</div>
	);
}

export default Drawer;
