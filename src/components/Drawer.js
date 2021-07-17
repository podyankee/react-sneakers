function Drawer({ onClose, onRemove, items = [] }) {
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
									<b>21 498 грн.</b>
								</li>
								<li className="d-flex">
									<span>Налог 5% :</span>
									<div></div>
									<b>1074 грн.</b>
								</li>
							</ul>
							<button className="greenButton">
								Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
							</button>
						</div>
					</div>
				) : (
					<div className="cartEmpty d-flex align-center justify-center flex-column flex">
						<img
							className="mb-20"
							height={120}
							width={120}
							src="/img/empty-cart.jpg"
							alt="Empty cart"
						/>
						<h2>Корзина пустая</h2>
						<p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
						<button onClick={onClose} className="greenButton greenButton--left">
							<img src="/img/arrow-left.svg" alt="arrow" />
							Вернуться назад
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Drawer;
