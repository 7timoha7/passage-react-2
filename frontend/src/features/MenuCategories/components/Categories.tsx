import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectFetchAllCategoriesLoading } from '../menuCategoriesSlice';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Box } from '@mui/material';

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

interface ActiveState {
  [categoryId: string]: boolean;
}

interface Props {
  categories: Category[];
  close: () => void;
}

const CategoryWrapper = styled.div`
  max-width: 100%;
`;

const CategoryItem = styled.div<{ $level: number; $isActive: boolean }>`
  cursor: pointer;
  transition: background-color 0.4s ease;
  display: flex;
  align-items: center;
  padding: 5px 5px 5px ${(props) => props.$level * 10}px;
  color: #0c0c0c;
  background-color: ${({ $isActive }) => ($isActive ? '#eaeaea' : 'transparent')};

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? '#eaeaea' : 'rgba(145, 145, 145, 0.58)')};
  }
`;

const SpecialCategoryItem = styled(CategoryItem)``;

const SubCategoryList = styled.div<{ $isOpen: boolean; $opacity: number }>`
  padding-left: 0;
  overflow: hidden;
  transition: max-height 0.7s ease, transform 0.7s ease, opacity 0.7s ease;
  opacity: ${({ $opacity }) => $opacity};
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
`;

const IconWrapper = styled.div`
  margin-right: 0;
`;

const Categories: React.FC<Props> = ({ categories, close }) => {
  const [categoryTree, setCategoryTree] = useState<HierarchicalCategory[]>([]);
  const [openState, setOpenState] = useState<OpenState>({});
  const [subCategoriesOpacity, setSubCategoriesOpacity] = useState<number>(1);
  const [activeState, setActiveState] = useState<ActiveState>({});
  const navigate = useNavigate();
  const loading = useAppSelector(selectFetchAllCategoriesLoading);

  useEffect(() => {
    const buildCategoryTree = (categories: Category[], parentID?: string): HierarchicalCategory[] => {
      const sortedCategories = categories
        .filter((category) => category.ownerID === parentID)
        .slice()
        .sort((a, b) => {
          // Проверяем есть ли у категории подкатегории
          const aHasSubcategories = categories.some((cat) => cat.ownerID === a.ID);
          const bHasSubcategories = categories.some((cat) => cat.ownerID === b.ID);

          // Сортировка по наличию подкатегорий: те с подкатегориями идут выше
          if (aHasSubcategories && !bHasSubcategories) return -1;
          if (!aHasSubcategories && bHasSubcategories) return 1;

          // Сортировка по RAK в начале названия
          const searchString = 'RAK';
          const aStartsWithSearch = a.name.toLowerCase().startsWith(searchString.toLowerCase());
          const bStartsWithSearch = b.name.toLowerCase().startsWith(searchString.toLowerCase());

          if (aStartsWithSearch && !bStartsWithSearch) return -1;
          if (!aStartsWithSearch && bStartsWithSearch) return 1;

          // Если обе строки начинаются с поисковой строки или не содержат ее,
          // тогда сравниваем их с помощью localeCompare для алфавитной сортировки
          return a.name.localeCompare(b.name);
        });

      return sortedCategories.map((category) => {
        const subCategories = buildCategoryTree(categories, category.ID);
        return { ...category, subCategories };
      });
    };

    const topLevelCategory = categories.find((category) => category.name === 'Товары' || category.name === 'товары');

    const tree = topLevelCategory ? buildCategoryTree(categories, topLevelCategory.ID) : [];
    setCategoryTree(tree);
  }, [categories]);

  const handleCategoryClick = (categoryId: string, ownerID?: string) => {
    setOpenState((prevOpenState) => {
      const updatedOpenState: OpenState = { ...prevOpenState, [categoryId]: !prevOpenState[categoryId] };

      if (ownerID) {
        Object.keys(prevOpenState).forEach((id) => {
          if (prevOpenState[id] && id !== categoryId && categories.find((cat) => cat.ID === id)?.ownerID === ownerID) {
            updatedOpenState[id] = false;
          }
        });
      }

      return updatedOpenState;
    });

    setActiveState((prevState) => {
      const newState: ActiveState = {};
      // При клике на категорию, сначала делаем все категории на этом уровне неактивными
      Object.keys(prevState).forEach((id) => {
        if (categories.find((cat) => cat.ID === id)?.ownerID === ownerID) {
          newState[id] = false;
        }
      });
      // Затем активируем текущую категорию
      newState[categoryId] = !prevState[categoryId];
      return newState;
    });

    setSubCategoriesOpacity(0);
    setTimeout(() => setSubCategoriesOpacity(1), 50);
  };

  const navigateAndClose = (item: string) => {
    navigate('products/' + item);
    close();
  };

  const renderCategories = (categories: HierarchicalCategory[] | undefined, $level = 0) => {
    if (!categories) {
      return null;
    }

    return (
      <CategoryWrapper>
        {loading ? (
          <Spinner />
        ) : (
          <Box sx={{ background: 'rgba(255,255,255,0.89)' }}>
            {categories.map((category) => (
              <div key={category.ID}>
                {category.subCategories && category.subCategories.length > 0 ? (
                  <CategoryItem
                    $level={$level}
                    $isActive={activeState[category.ID]}
                    onClick={() => handleCategoryClick(category.ID, category.ownerID)}
                  >
                    <IconWrapper>
                      {openState[category.ID] ? <ExpandMore sx={{ color: '#a96a04' }} /> : <ChevronRight />}
                    </IconWrapper>
                    <span
                      style={{
                        color: openState[category.ID] ? '#a96a04' : '#0c0c0c',
                        fontWeight: openState[category.ID] ? 'bold' : 'normal',
                      }}
                    >
                      {category.name}
                    </span>
                  </CategoryItem>
                ) : (
                  <SpecialCategoryItem
                    $level={$level + 1}
                    $isActive={activeState[category.ID]}
                    onClick={() => navigateAndClose(category.ID)}
                  >
                    <IconWrapper />
                    {category.name}
                  </SpecialCategoryItem>
                )}
                {openState[category.ID] && category.subCategories && (
                  <SubCategoryList $isOpen={openState[category.ID]} $opacity={subCategoriesOpacity}>
                    {renderCategories(category.subCategories, $level + 1)}
                  </SubCategoryList>
                )}
              </div>
            ))}
          </Box>
        )}
      </CategoryWrapper>
    );
  };

  return <div>{renderCategories(categoryTree)}</div>;
};

export default Categories;
