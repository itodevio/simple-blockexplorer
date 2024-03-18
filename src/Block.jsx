import getAlchemy from './alchemy';
import { useCallback, useEffect, useState } from 'react';

import './Block.css';
import { useNavigate, useParams } from "react-router-dom";

const alchemy = getAlchemy();

function Block() {
  const [loading, setLoading] = useState(true);
  const [block, setBlock] = useState();

  const { blockHash } = useParams();

  const navigate = useNavigate();

  const fetchInitialData = useCallback(async () => {
    console.log({blockHash})
    const block = await alchemy.core.getBlockWithTransactions(blockHash);

    setBlock(block);
    setLoading(false);
  }, [blockHash]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"/>
      </div>
    )
  }

  return (
    <div className="Block">
      <h2>Block {blockHash} Transactions</h2>
      <table className="transactions">
        <tr>
          <th>Hash</th>
          <th>From</th>
          <th>To</th>
          <th>Gas</th>
          <th>Value</th>
        </tr>
        {block.transactions.map(transaction => (
          <tr onClick={() => navigate(`/transactions/${transaction.hash}`)}>
            <td>{transaction.hash.slice(0, 20)}...</td>
            <td>{transaction.from}</td>
            {console.log(transaction)}
            <td>{transaction.to}</td>
            <td>{parseInt(transaction.gasPrice._hex)}</td>
            <td>{parseInt(transaction.value._hex)}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Block;
