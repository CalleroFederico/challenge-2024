import { AgeWarning } from '../AgeWarning/AgeWarning';
import { Favorite } from '../Favorite/Favorite';
import { Balance } from '../Balance/Balance';
import { Card } from '@mui/material';
import styles from './DisplayWallet.module.css';

function DisplayWallet({ address, favorite, balance, old }) {
  return (
    <>
      <div className={styles['container']}>
        {old && <AgeWarning />}
        <Card
          variant="outlined"
          className={styles[old ? 'card-warning' : 'card']}
        >
          <div className={styles['flex']}>
            <p className={styles['text']}>{address}</p>
            <Favorite address={address} isFavorite={favorite} />
          </div>
          <Balance balance={balance} />
        </Card>
      </div>
    </>
  );
}

export { DisplayWallet };
