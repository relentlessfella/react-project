import './scss/app.scss';
import Header from './components/Header';
import React from 'react';
import NotFound from './components/NotFoundBlock';
import Cart from './pages/Cart';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { counterSlice } from './redux/slices/filterSlice';
import { increment, decrement, incrementByAmount } from './redux/slices/filterSlice';
import { store } from './redux/store';
import { useSelector, useDispatch } from 'react-redux';

export const SearchContext = React.createContext();
function App() {
  const [searchValue, setSearchValue] = React.useState('');
  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* <button type="submit" onClick={() => dispatch(increment())}>
              increment button
            </button>
            <div>{count}</div>
            <button type="submit" onClick={() => dispatch(decrement())}>
              decrement button
            </button> */}
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
