import React, { useState } from 'react';
import styles from './Card.module.sass';

function Card({ id, onFavorite, imageUrl, title, price, onPlus, favorited = false }) {
	const [isAdded, setIsAdded] = useState(false);
	const [isFavorite, setIsFavorite] = useState(favorited);

	const onClickPlus = () => {
		onPlus({ title, imageUrl, price });
		setIsAdded(!isAdded);
	};

	const onClickFavorite = () => {
		onFavorite({ id, title, imageUrl, price });
		setIsFavorite(!isFavorite);
	};

	return (
		<div className={styles.card}>
			<div className={styles.favorite} onClick={onClickFavorite}>
				<img src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'} alt="Unliked" />
			</div>
			<img width={133} height={112} src={imageUrl} alt={title} />
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена:</span>
					<b>{price} грн.</b>
				</div>
				<img
					className={styles.plus}
					src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
					alt="Plus"
					onClick={onClickPlus}
				/>
			</div>
		</div>
	);
}

export default Card;
