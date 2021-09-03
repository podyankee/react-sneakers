import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [cartOpened, setCartOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			// fetch('https://60e2719f5a5596001730f3d3.mockapi.io/items')
			// 	.then(res => {
			// 		return res.json();
			// 	})
			// 	.then(json => {
			// 		setItems(json);
			// 	});
			try {
				const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
					axios.get('https://60e2719f5a5596001730f3d3.mockapi.io/items'),
					axios.get('https://60e2719f5a5596001730f3d3.mockapi.io/cart'),
					axios.get('https://60e2719f5a5596001730f3d3.mockapi.io/favorites'),
				]);

				setIsLoading(false);
				setCartItems(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setItems(itemsResponse.data);
			} catch (error) {
				alert('Ошибка при запросе данных :)');
			}
		}
		fetchData();
	}, []);

	const onAddToCart = async obj => {
		try {
			if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
				setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
				await axios.delete(`https://60e2719f5a5596001730f3d3.mockapi.io/cart/${obj.id}`);
			} else {
				setCartItems(prev => [...prev, obj]);
				await axios.post('https://60e2719f5a5596001730f3d3.mockapi.io/cart', obj);
			}
		} catch (error) {
			alert('Ошибка при добавлении в корзину.');
			console.error(error);
		}
	};

	const onRemoveItem = id => {
		try {
			axios.delete(`https://60e2719f5a5596001730f3d3.mockapi.io/cart/${id}`);
			setCartItems(prev => prev.filter(item => item.id !== id));
		} catch (error) {
			alert('Ошибка при удалении из  корзины.');
			console.error(error);
		}
	};

	const onAddToFavorite = async obj => {
		try {
			if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
				axios.delete(`https://60e2719f5a5596001730f3d3.mockapi.io/favorites/${obj.id}`);
				setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
			} else {
				const { data } = await axios.post(
					'https://60e2719f5a5596001730f3d3.mockapi.io/favorites',
					obj,
				);
				setFavorites(prev => [...prev, data]);
			}
		} catch (error) {
			alert('Не удалось добавить в фавориты.');
			console.error(error);
		}
	};

	const onChangeSearchInput = e => {
		setSearchValue(e.target.value);
	};

	const isItemAdded = id => {
		return cartItems.some(obj => Number(obj.id) === Number(id));
	};

	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				favorites,
				isItemAdded,
				onAddToFavorite,
				onAddToCart,
				setCartOpened,
				setCartItems,
			}}>
			<div className="wrapper clear">
				<Drawer
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveItem}
					opened={cartOpened}
				/>

				<Header onClickCart={() => setCartOpened(true)} />
				<Route path="/" exact>
					<Home
						items={items}
						cartItems={cartItems}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						onChangeSearchInput={onChangeSearchInput}
						onAddToFavorite={onAddToFavorite}
						onAddToCart={onAddToCart}
						isLoading={isLoading}
					/>
				</Route>
				<Route path="/favorites" exact>
					<Favorites />
				</Route>
				<Route path="/orders" exact>
					<Orders />
				</Route>
			</div>
		</AppContext.Provider>
	);
}

export default App;
