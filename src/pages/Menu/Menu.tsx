import { ChangeEvent, useEffect, useState } from 'react';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { ProductProps } from '../../types/ProductTypes';
import { API_URL } from '../../services/API';
import Headling from '../../components/headling/Headling';
import Search from '../../components/search/Search';
import MenuList from './menuList/MenuList';

export function Menu() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<ProductProps[]>(`${API_URL}/products`, {
        params: {
          name
        }
      });
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setIsLoading(false);
      return;
    }
  };

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };


  return <>
    <div className={styles['head']}>
      <Headling>Меню</Headling>
      <Search placeholder='Введите блюдо или состав' onChange={updateFilter} />
    </div>
    <div>
      {error && <>{error}</>}
      {!isLoading && products.length > 0 && <MenuList products={products} />}
      {isLoading && <>Загружаем продукты...</>}
      {!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
    </div>
  </>;
}

export default Menu;