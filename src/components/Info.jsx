import { useContext } from 'react';
import AppContext from '../context';

export const Info = ({ title, image, description }) => {
	const { setCartOpened } = useContext(AppContext);
	return (
		<div className="cartEmpty d-flex align-center justify-center flex-column flex">
			<img className="mb-20" width={120} src={image} alt="Empty cart" />
			<h2>{title}</h2>
			<p className="opacity-6">{description}</p>
			<button onClick={() => setCartOpened(false)} className="greenButton greenButton--left">
				<img src="/img/arrow-left.svg" alt="arrow" />
				Вернуться назад
			</button>
		</div>
	);
};

export default Info;
