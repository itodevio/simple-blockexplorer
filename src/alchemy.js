import { Alchemy, Network } from "alchemy-sdk";

let alchemy;

const getAlchemy = () => {
  if (alchemy) return alchemy;

  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  
  alchemy = new Alchemy(settings);
  return alchemy
};

export default getAlchemy;
 