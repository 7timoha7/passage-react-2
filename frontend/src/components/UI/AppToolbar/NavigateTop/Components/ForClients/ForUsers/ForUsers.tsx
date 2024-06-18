import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import styled from 'styled-components';

interface Props {
  close?: () => void;
}

const MenuItem = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 6px;
`;

const SubMenu = styled.div<{ $isOpen: boolean }>`
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.5s ease;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
`;

const ForUsers: React.FC<Props> = ({ close }) => {
  const navigate = useNavigate();
  const isMobileMenu = useMediaQuery('(min-width: 1200px)');
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);

  const handleMenuClick = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleSubMenuClick = (menuItem: string) => {
    setActiveMenuItem(menuItem === activeMenuItem ? null : menuItem);
  };

  const onClickLocation = (pathToLocation: string) => {
    if (close) close();
    navigate(pathToLocation);
  };

  return (
    <>
      {isMobileMenu ? (
        <nav>
          <ul className="topmenu">
            <li>
              <a href="#">КЛИЕНТАМ</a>
              <ul style={{ marginTop: '1px' }} className="submenu">
                <li>
                  <a href="#" onClick={() => navigate('/delivery')} className="submenu-link">
                    ДОСТАВКА
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => navigate('/installment')} className="submenu-link">
                    РАССРОЧКА
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => navigate('/warranty')} className="submenu-link">
                    ГАРАНТИЯ
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => navigate('/designers')} className="submenu-link">
                    ДИЗАЙНЕРАМ
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      ) : (
        <div style={{ color: '#ffffff' }}>
          <MenuItem $isActive={isSubMenuOpen} onClick={handleMenuClick}>
            <span>КЛИЕНТАМ</span>
            {isSubMenuOpen ? <ExpandMore /> : <ChevronRight />}
          </MenuItem>
          <SubMenu $isOpen={isSubMenuOpen}>
            <MenuItem $isActive={activeMenuItem === 'delivery'} onClick={() => handleSubMenuClick('delivery')}>
              <span onClick={() => onClickLocation('/delivery')}>ДОСТАВКА</span>
            </MenuItem>
            <MenuItem $isActive={activeMenuItem === 'installment'} onClick={() => handleSubMenuClick('installment')}>
              <span onClick={() => onClickLocation('/installment')}>РАССРОЧКА</span>
            </MenuItem>
            <MenuItem $isActive={activeMenuItem === 'warranty'} onClick={() => handleSubMenuClick('warranty')}>
              <span onClick={() => onClickLocation('/warranty')}>ГАРАНТИЯ</span>
            </MenuItem>
            <MenuItem $isActive={activeMenuItem === 'designers'} onClick={() => handleSubMenuClick('designers')}>
              <span onClick={() => onClickLocation('/designers')}>ДИЗАЙНЕРАМ</span>
            </MenuItem>
          </SubMenu>
        </div>
      )}
    </>
  );
};

export default ForUsers;
