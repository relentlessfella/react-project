import React, { memo } from 'react';

function Categories({value, onChangeCategory}) {
  // const [activeIndex, setActiveIndex] = React.useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
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
