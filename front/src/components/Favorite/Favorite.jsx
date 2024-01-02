import { Rating } from '@mui/material';
import { toogleFavorite, getWallets } from '../../utils/fetch';
import { WalletsDataDispatchContext } from '../../WalletsDataContext';
import { useContext } from 'react';

function Favorite({ isFavorite, address }) {
  const dispatch = useContext(WalletsDataDispatchContext);
  return (
    <>
      <Rating
        onClick={async () => {
          await toogleFavorite(address);
          const wallets = await getWallets();
          dispatch({ type: 'UPDATE_WALLETS', payload: wallets });
        }}
        value={isFavorite ? 1 : 0}
        max={1}
      />
    </>
  );
}

export { Favorite };
