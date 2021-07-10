import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [cartOpened, setCartOpened] = useState(false);

	useEffect(() => {
		// fetch('https://60e2719f5a5596001730f3d3.mockapi.io/items')
		// 	.then(res => {
		// 		return res.json();
		// 	})
		// 	.then(json => {
		// 		setItems(json);
		// 	});
		axios.get('https://60e2719f5a5596001730f3d3.mockapi.io/items').then(res => {
			setItems(res.data);
		});
		axios.get('https://60e2719f5a5596001730f3d3.mockapi.io/cart').then(res => {
			setCartItems(res.data);
		});
		axios.get('https://60e2719f5a5596001730f3d3.mockapi.io/favorites').then(res => {
			setFavorites(res.data);
		});
	}, []);

	const onAddToCart = obj => {
		axios.post('https://60e2719f5a5596001730f3d3.mockapi.io/cart', obj);
		setCartItems(prev => [...prev, obj]);
	};
	const onRemoveItem = id => {
		axios.delete(`https://60e2719f5a5596001730f3d3.mockapi.io/cart/${id}`);
		setCartItems(prev => prev.filter(item => item.id !== id));
	};
	const onAddToFavorite = async obj => {
		try {
			if (favorites.find(favObj => favObj.id === obj.id)) {
				axios.delete(`https://60e2719f5a5596001730f3d3.mockapi.io/favorites/${obj.id}`);
				// setFavorites(prev => prev.filter(item => item.id !== obj.id));
			} else {
				const { data } = await axios.post(
					'https://60e2719f5a5596001730f3d3.mockapi.io/favorites',
					obj,
				);
				setFavorites(prev => [...prev, data]);
			}
		} catch (error) {
			alert('Не удалось добавить в фавориты.');
		}
	};

	const onChangeSearchInput = e => {
		setSearchValue(e.target.value);
	};

	return (
		<div className="wrapper clear">
			{cartOpened && (
				<Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
			)}
			<Header onClickCart={() => setCartOpened(true)} />
			<Route path="/" exact>
				<Home
					items={items}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					onChangeSearchInput={onChangeSearchInput}
					onAddToFavorite={onAddToFavorite}
					onAddToCart={onAddToCart}
				/>
			</Route>
			<Route path="/favorites" exact>
				<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
			</Route>
		</div>
	);
}

export default App;
