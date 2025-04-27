import { useEffect, useState } from 'react';
import Spinner from '../shared/Spinner';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import ApiState from '../../infrastructure/enums/ApiState';
import { loadCategories, setActiveCategory } from '../../infrastructure/store/slices/categories-slice';
import { sendCategoryIdToBackend } from '../../infrastructure/store/slices/categories-slice';  // Yeni thunk'i import et

const categoriesWithImages = [
  { id: 1, name: 'Water & Beverage', image: '/images/beverages.jpeg' },
  { id: 2, name: 'Snacks', image: '/images/snacks.jpeg' },
  { id: 3, name: 'Fruits & Vegetables', image: '/images/fruits.jpeg' },
  { id: 4, name: 'Dairy Products', image: '/images/dairy.jpeg' },
  { id: 5, name: 'Bakery Products', image: '/images/bakery.jpeg' },
  { id: 6, name: 'İce Cream', image: '/images/ice.jpeg' },
  { id: 7, name: 'Meat & Poultry', image: '/images/meat.png' },
  { id: 8, name: 'Breakfast Foods', image: '/images/breakfast.jpeg' },
  { id: 9, name: 'Personal Care Products', image: '/images/personal.jpeg' },
  { id: 10, name: 'Cleaning and Household Supplies', image: '/images/home.jpeg' },
  { id: 11, name: 'Pet Products', image: '/images/pet.jpeg' },
];

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.categories.state);
  const categories = useAppSelector((state) => state.categories.data);
  const activeCategory = useAppSelector((state) => state.categories.activeCategory);
  const [searchTerm, setSearchTerm] = useState('');
  console.log('CategoryList is rendered: ', state);

  useEffect(() => {
    if (state === ApiState.Idle) {
      dispatch(loadCategories());
    }
  }, [state, dispatch]);

  const handleCategoryClick = (e: React.MouseEvent, itemId: number | null) => {
    e.preventDefault();
    dispatch(setActiveCategory(itemId));
    if (itemId !== null) {
      dispatch(sendCategoryIdToBackend(itemId)); // Backend'e kategori ID'sini gönder
    }
  };

  const filteredCategories = categoriesWithImages.filter((category) =>
    category.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <aside>
      <h3>Kategoriler</h3>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Kategori ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className='category-grid'>
        {state === ApiState.Pending && <Spinner color='primary' />}
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
            onClick={(e) => handleCategoryClick(e, category.id)}
          >
            <img
              src={category.image}
              alt={category.name}
              className='category-image'
            />
            <div className='category-name'>{category.name}</div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default React.memo(CategoryList);