import { Link } from 'react-router-dom';
import { Logo } from './components/Logo/Logo';
import './Header.css';
import { HeaderProps } from './Header.types';

export const Header = ({ children }: HeaderProps) => {
  return (
    <header>
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {children && <div className="nav-container">{children}</div>}
      </div>
    </header>
  );
};
