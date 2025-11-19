import { Link } from 'react-router-dom';
import { Logo } from './components/Logo';
import './Header.css';

export const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </div>
    </header>
  );
};
