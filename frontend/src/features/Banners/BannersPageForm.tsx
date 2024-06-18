import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import BannersForm from './BannersForm';

const BannersPageForm = () => {
  const [selectedBanner, setSelectedBanner] = useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedBanner(event.target.value);
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Создание баннеров
      </Typography>
      <div style={{ background: 'rgba(0,0,0,0.38)', padding: '10px', borderRadius: '10px' }}>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="banner-select-label">Выберите баннер</InputLabel>
          <Select labelId="banner-select-label" value={selectedBanner} onChange={handleChange} label="Выберите баннер">
            <MenuItem value="top">Верхний баннер</MenuItem>
            <MenuItem value="middle">Средний баннер</MenuItem>
            <MenuItem value="bottom">Нижний баннер</MenuItem>
          </Select>
        </FormControl>

        {selectedBanner === 'top' && <BannersForm typeBanner={'top'} />}
        {selectedBanner === 'middle' && <BannersForm typeBanner={'middle'} />}
        {selectedBanner === 'bottom' && <BannersForm typeBanner={'bottom'} />}
      </div>
    </div>
  );
};

export default BannersPageForm;
