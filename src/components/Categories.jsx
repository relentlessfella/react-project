import React, { memo } from 'react';

function Categories({ value, onChangeCategory }) {
  const categories = ['Все', 'Мужские', 'Женские', 'Для детей'];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={categoryName}
              className={value === index ? 'active' : ''}
              onClick={() => onChangeCategory(index)}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(Categories);
