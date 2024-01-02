import { useContext, useEffect } from 'react';
import { WalletsDataContext } from '../../WalletsDataContext';
import { DisplayWallet } from '../DisplayWallet';
import { Button, ButtonGroup } from '@mui/material';
import { useState } from 'react';
import styles from './WalletList.module.css';

function WalletList() {
  const wallets = useContext(WalletsDataContext);
  const [walletListing, setWalletListing] = useState('all');

  useEffect(() => {}, [wallets]);

  const sortObject = {
    favoriteFirst: () => {
      return wallets.wallets
        .filter((wallet) => {
          return wallet.favorite;
        })
        .concat(
          wallets.wallets.filter((wallet) => {
            return !wallet.favorite;
          }),
        )
        .map((wallet) => {
          return <DisplayWallet {...wallet} />;
        });
    },
    all: () => {
      return wallets.wallets.map((wallet) => {
        return <DisplayWallet {...wallet} />;
      });
    },
    favoriteOnly: () => {
      return wallets.wallets
        .filter((wallet) => {
          return wallet.favorite;
        })
        .map((wallet) => {
          return <DisplayWallet {...wallet} />;
        });
    },
  };

  return (
    <>
      <div className={styles['list']}>
        <div className={styles['sort']}>
          <p className={styles['text']}>Sort:</p>
          <ButtonGroup>
            <Button
              variant="contained"
              onClick={() => {
                setWalletListing('favoriteFirst');
              }}
            >
              Favorite First
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setWalletListing('all');
              }}
            >
              All
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setWalletListing('favoriteOnly');
              }}
            >
              Favorite Only
            </Button>
          </ButtonGroup>
        </div>
        <>{walletListing && sortObject[walletListing]()}</>
      </div>
    </>
  );
}

export { WalletList };
