import img1 from '../../frontend/src/assets/images/2.jpeg';

export const ToolBarTopText = {
  color: 'rgb(255,255,255)',
  fontSize: '15px',
  textDecoration: 'none',
  marginRight: '50px',
  ':hover': { color: '#ddbe86' },
};

export const ToolBarStyles = {
  backgroundImage: `url(${img1})`,
  backgroundSize: 'repeat',
  top: 0,
  py: 2.5,
};
export const ToolBarMobileStyles = {
  backgroundImage: `url(${img1})`,
  backgroundSize: 'repeat',
  top: 0,
  py: 1.5,
};

export const FooterStyle = {
  // background: 'linear-gradient(45deg, hsla(210, 100%, 88%, 1) 0%, hsla(210, 79%, 46%, 1) 100%)',
  backgroundImage: `url(${img1})`,
  backgroundSize: 'repeat',
};

export const styleModalCover = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid black',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const styleModalCoverNew = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid black',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  width: '90%',
  maxHeight: '90vh', // Вы можете установить максимальную высоту в виде процента от высоты экрана
  overflowY: 'auto', // Это свойство добавит вертикальную прокрутку при необходимости
};

export const someStyle = {
  boxShadow: '0px 0px 5px 0px rgb(64,64,64)',
};
