import { Select, FormControl, MenuItem } from '@mui/material';
import { useContext, useState } from 'react';
import { WalletsDataContext } from '../../WalletsDataContext';
import styles from './Balance.module.css';

function Balance({ balance }) {
  const [currency, setCurrency] = useState('USD');
  const { ethToUsd, ethToEur } = useContext(WalletsDataContext);
  const currencyMap = { USD: ethToUsd, EUR: ethToEur };

  return (
    <>
      <div>
        <div className={styles['form-container']}>
          <FormControl fullWidth>
            <Select
              style={{ textAlign: 'left', backgroundColor: 'white' }}
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'EUR'}>EUR</MenuItem>
            </Select>
          </FormControl>
        </div>
        <p className={styles['text']}>${(balance * currencyMap[currency]).toLocaleString()}</p>
      </div>
    </>
  );
}

export { Balance };
