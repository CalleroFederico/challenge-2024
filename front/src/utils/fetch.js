const getWallets = async () => {
  return fetch('http://157.245.3.7/api/all', {
    method: 'GET',
  }).then((response) => {
    return response.json();
  });
};

const addWallet = async (address) => {
  return fetch('http://157.245.3.7/api/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ address: address }),
  });
};

const toogleFavorite = async (address) => {
  return fetch(`http://157.245.3.7/api/favorite/${address}`, {
    method: 'PATCH',
  });
};

const getRates = async () => {
  return fetch(`http://157.245.3.7/api/rate/ETH/USD,EUR`, {
    method: 'GET',
  }).then((response) => {
    return response.json();
  });
};

export { getWallets, addWallet, toogleFavorite, getRates };
