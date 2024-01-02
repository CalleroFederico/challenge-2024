import { TextField, Button, Card } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { WalletsDataDispatchContext } from '../../WalletsDataContext';
import { getWallets, addWallet } from '../../utils/fetch';
import styles from './AddWallet.module.css';

function AddWallet() {
  const [error, setError] = useState(false);
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useContext(WalletsDataDispatchContext);

  useEffect(() => {
    //Ethereum wallets Only
    const ethRegEx = /^0x[a-fA-F0-9]{40}$/g;
    if (ethRegEx.test(address) || address === '') {
      setError(false);
      setErrorMessage('');
    } else {
      setError(true);
      setErrorMessage('Invalid address');
    }
  }, [address]);

  const handleSubmit = async () => {
    if (error) {
      return;
    }
    await addWallet(address);
    const wallets = await getWallets();
    dispatch({ type: 'UPDATE_WALLETS', payload: wallets });
  };

  return (
    <>
      <Card className={styles['card']}>
        <TextField
          className={styles['text-field']}
          error={error}
          label="Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          helperText={errorMessage}
        />
        <Button
          className={styles['button']}
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
        >
          Add Wallet
        </Button>
      </Card>
    </>
  );
}

export { AddWallet };
