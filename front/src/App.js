import './App.css';
import { AddWallet } from './components/AddWallet';
import { WalletList } from './components/WalletList';
import { Exchange } from './components/Exchange/Exchange';
import { useEffect, useReducer } from 'react';
import {
  WalletsDataContext,
  WalletsDataDispatchContext,
} from './WalletsDataContext';
import { getWallets, getRates } from './utils/fetch';
import GitHubIcon from '@mui/icons-material/GitHub';

function walletsReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_WALLETS': {
      return { ...state, wallets: action.payload };
    }
    case 'UPDATE_EXCHANGE_ETHUSD': {
      return { ...state, ethToUsd: action.payload };
    }
    case 'UPDATE_EXCHANGE_ETHEUR': {
      return { ...state, ethToEur: action.payload };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialWallets = { wallets: [], ethToUsd: 0, ethToEur: 0 };

function App() {
  const [walletsData, dispatch] = useReducer(walletsReducer, initialWallets);

  useEffect(() => {
    (async () => {
      const wallets = await getWallets();
      dispatch({ type: 'UPDATE_WALLETS', payload: wallets });
      const rates = await getRates();
      dispatch({ type: 'UPDATE_EXCHANGE_ETHUSD', payload: rates.USD });
      dispatch({ type: 'UPDATE_EXCHANGE_ETHEUR', payload: rates.EUR });
    })();
  }, []);

  return (
    <>
      <WalletsDataContext.Provider value={walletsData}>
        <WalletsDataDispatchContext.Provider value={dispatch}>
          <div className="App">
            <header className="header">
              <a href="https://www.educative.io/" target="_blank">
                <GitHubIcon />
              </a>
            </header>
            <div className="main">
              <AddWallet />
              <Exchange />
              <WalletList />
            </div>
          </div>
        </WalletsDataDispatchContext.Provider>
      </WalletsDataContext.Provider>
    </>
  );
}

export default App;
export { initialWallets };
