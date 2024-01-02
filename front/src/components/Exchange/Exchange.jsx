import { Select, TextField, FormControl, MenuItem, Card } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import {
  WalletsDataContext,
  WalletsDataDispatchContext,
} from '../../WalletsDataContext';
import { EditNote, Close, Done, Refresh } from '@mui/icons-material';
import { getRates } from '../../utils/fetch';
import styles from './Exchange.module.css';

function Exchange() {
  const [currency, setCurrency] = useState('USD');
  const [edit, setEdit] = useState(false);
  const [fieldValue, setFieldValue] = useState('');
  const { ethToUsd, ethToEur } = useContext(WalletsDataContext);
  const dispatch = useContext(WalletsDataDispatchContext);
  const currencyMap = {
    USD: { value: ethToUsd, action: 'UPDATE_EXCHANGE_ETHUSD' },
    EUR: { value: ethToEur, action: 'UPDATE_EXCHANGE_ETHEUR' },
  };

  useEffect(() => {}, [ethToUsd, ethToEur]);
  return (
    <>
      <Card className={styles['card']}>
        <div>
          <p>Exchange Rates</p>
          <div
            className={styles['form-display']}
          >
            <div className={styles['form-width']}>
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
          </div>

          {edit ? (
            <>
              <div className={styles['button-display']}>
                <div
                  onClick={() => {
                    if (fieldValue === '') {
                        setEdit(false);
                        return
                    }
                    dispatch({
                      type: currencyMap[currency].action,
                      payload: fieldValue,
                    });
                    setEdit(false);
                  }}
                >
                  <Done />
                </div>
                <div
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  <Close />
                </div>
                <div
                  onClick={async () => {
                    const rates = await getRates();
                    dispatch({
                      type: 'UPDATE_EXCHANGE_ETHUSD',
                      payload: rates.USD,
                    });
                    dispatch({
                      type: 'UPDATE_EXCHANGE_ETHEUR',
                      payload: rates.EUR,
                    });
                    setEdit(false);
                  }}
                >
                  <Refresh />
                </div>
              </div>
              <TextField
                inputProps={{ style: { textAlign: 'center' } }}
                className={styles['text-field']}
                onChange={(e) => {
                  if (
                    new RegExp(/^[+]?([.]\d+|\d+[.]?\d*)$/).test(e.target.value)
                  ) {
                    setFieldValue(e.target.value);
                  }
                }}
                defaultValue={currencyMap[currency].value}
              />
            </>
          ) : (
            <>
              <div className={styles['buttons-align']}>
                <div
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  <EditNote />
                </div>
              </div>
              <p className={styles['text']}>
                {currencyMap[currency].value}
              </p>
            </>
          )}
        </div>
      </Card>
    </>
  );
}

export { Exchange };
