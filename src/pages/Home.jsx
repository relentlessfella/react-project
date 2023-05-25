import React from 'react';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import ItemBlock from '../components/ItemBlock';
import axios from 'axios';
import qs from 'qs';
import Skeleton from '../components/ItemBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { SearchContext } from '../App';
import { setCategotyId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Home = () => {
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
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
  // Фасад для получения данных с API
  const sneakerservice = {
    fetchItems: async (sortType, categoryId, searchValue, currentPage) => {
      const sortBy = sortType.replace('-', '');
      const order = sortType.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      try {
        const response = await axios.get(
          `https://62d6a13a51e6e8f06f0ecb04.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );

        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch sneakers');
      }
    },
  };

  // Использование фасада
  const fetchItems = async () => {
    setIsLoading(true);

    try {
      const sneakers = await sneakerservice.fetchItems(
        sortType,
        categoryId,
        searchValue,
        currentPage,
      );
      setItems(sneakers);
    } catch (error) {
      // Обработка ошибки
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  const sneakers = items.map((obj) => <ItemBlock key={obj.id} {...obj} />);

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

  //Если был первый рендер, то запрашиваем товар
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchItems();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все товары</h2>
      <div className="content__items">{isLoading ? skeletons : sneakers}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
