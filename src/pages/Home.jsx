import React from 'react';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import axios from 'axios';
import qs from 'qs';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { SearchContext } from '../App';
import { setCategotyId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
// import { set } from 'lodash';

const Home = () => {
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  // const { categoryId, sort, currentPage } = useSelector(selectFilter);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategotyId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const fetchPizzas = () => {
    setIsLoading(true);
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://62d6a13a51e6e8f06f0ecb04.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  //Если был первый рендер, то проверяем URL-параметры и созраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty == params.sortProperty);
      console.log(params);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  //Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
      console.log(queryString);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        {/* <Sort value={sortType} onClickSort={(i) => setSort(i)} /> */}
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
