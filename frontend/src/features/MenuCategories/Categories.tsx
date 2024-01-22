import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExpandMore, ChevronRight } from '@mui/icons-material'; // Импорт иконок
import './Categories.css';
import { useNavigate } from 'react-router-dom'; // Импорт стилей

interface Category {
  _id: string;
  name: string;
  ID: string;
  ownerID?: string;
}

interface HierarchicalCategory extends Category {
  subCategories?: HierarchicalCategory[];
}

interface OpenState {
  [categoryId: string]: boolean;
}

interface Props {
  categories: Category[];
  close: () => void;
}

const CategoryWrapper = styled.div`
  max-width: 100%;
`;

const CategoryItem = styled.div<{ $level: number }>`
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  // Отступ от левого края в зависимости от уровня вложенности
  padding: 10px 10px 10px ${(props) => props.$level * 20}px;
  color: #ffffff;

  &:hover {
    background-color: rgba(225, 167, 167, 0.38);
  }
`;

const SubCategoryList = styled.div`
  padding-left: 0;
`;

const IconWrapper = styled.div`
  margin-right: 0;
`;

const Categories: React.FC<Props> = ({ categories, close }) => {
  const [categoryTree, setCategoryTree] = useState<HierarchicalCategory[]>([]);
  const [openState, setOpenState] = useState<OpenState>({});
  const navigate = useNavigate();
  const navigateAndClose = (item: string) => {
    navigate('products/' + item);
    close();
  };

  useEffect(() => {
    const buildCategoryTree = (categories: Category[], parentID?: string): HierarchicalCategory[] => {
      return categories
        .filter((category) => category.ownerID === parentID)
        .map((category) => {
          const subCategories = buildCategoryTree(categories, category.ID);
          return { ...category, subCategories };
        });
    };

    const topLevelCategory = categories.find((category) => category.name === 'Товары');
    const tree = topLevelCategory ? buildCategoryTree(categories, topLevelCategory.ID) : [];
    setCategoryTree(tree);
  }, [categories]);

  const handleCategoryClick = (categoryId: string) => {
    setOpenState((prevOpenState) => ({
      ...prevOpenState,
      [categoryId]: !prevOpenState[categoryId],
    }));
  };

  const renderCategories = (categories: HierarchicalCategory[] | undefined, $level = 0) => {
    if (!categories) {
      return null;
    }

    return (
      <CategoryWrapper>
        {categories.map((category) => (
          <div key={category.ID}>
            {category.subCategories && category.subCategories.length > 0 ? (
              <CategoryItem $level={$level} onClick={() => handleCategoryClick(category.ID)}>
                <IconWrapper>{openState[category.ID] ? <ExpandMore /> : <ChevronRight />}</IconWrapper>
                {category.name}
              </CategoryItem>
            ) : (
              <CategoryItem
                style={{ background: 'rgba(194,145,145,0.71)' }}
                $level={$level + 1}
                onClick={() => navigateAndClose(category.ID)}
              >
                <IconWrapper />
                {category.name}
              </CategoryItem>
            )}
            {openState[category.ID] && category.subCategories && (
              <SubCategoryList>{renderCategories(category.subCategories, $level + 1)}</SubCategoryList>
            )}
          </div>
        ))}
      </CategoryWrapper>
    );
  };

  return <div>{renderCategories(categoryTree)}</div>;
};

export default Categories;
