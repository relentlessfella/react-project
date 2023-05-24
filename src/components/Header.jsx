import logoSvg from '../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import Search from './Search';

function Header() {
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>Nurgali & Ramazan</h1>
              <p>Clothing shop</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>520 ₽</span>
            <div className="button__delimiter"></div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.33333 16.3334C7.06971 16.3334 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3334 6.33333 16.3334Z"
                stroke="#1C1B1B"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.3333 16.3334C15.0697 16.3334 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3334 14.3333 16.3334Z"
                stroke="#1C1B1B"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.77984 5.00002H16.3332L15.2132 10.5934C15.1522 10.9003 14.9852 11.176 14.7415 11.3722C14.4977 11.5684 14.1927 11.6727 13.8798 11.6667H6.83317C6.50763 11.6694 6.19232 11.553 5.94671 11.3393C5.70109 11.1256 5.54215 10.8295 5.49984 10.5067L4.4865 2.82669C4.44448 2.50618 4.28745 2.21185 4.04464 1.99847C3.80182 1.78508 3.48976 1.66718 3.1665 1.66669H1.6665"
                stroke="#1C1B1B"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span>3</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
