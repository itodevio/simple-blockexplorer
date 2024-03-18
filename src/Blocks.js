import getAlchemy from './alchemy';
import { useCallback, useEffect, useState } from 'react';

import './Blocks.css';
import { useNavigate } from "react-router-dom";

const alchemy = getAlchemy();

function Blocks() {
  const [loading, setLoading] = useState(true);
  const [blocks, setBlocks] = useState([]);
  const [blockHash, setBlockHash] = useState('');

  const navigate = useNavigate();

  const fetchInitialData = useCallback(async () => {
    const latest = await alchemy.core.getBlockNumber();

    const latest20BlockNumbers = Array.from({ length: 20 }, (_, i) => latest - i);

    setBlocks(await Promise.all(latest20BlockNumbers.map(blockNumber => alchemy.core.getBlock(blockNumber))));
    setLoading(false);
  }, []);

  const onChange = e => {
    let rawBlockHash = e.target.value.replace(/ /g, '').replace(/0x/g, '');

    setBlockHash(`0x${rawBlockHash}`);
  }

  const searchBlock = e => {
    e.preventDefault();

    navigate(`/blocks/${blockHash}`);
  }

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
    <div className="Blocks">
      <form
        className="block-search" 
        onSubmit={searchBlock}
      >
        <input
          value={blockHash}
          onChange={onChange}
          placeholder="Search for a block by its hash"
        />
        <button>Search Block</button>
      </form>
      <h2>Last 20 blocks</h2>
      <table className="blocks">
        <thead>
          <tr>
            <th>Number</th>
            <th>Hash</th>
            <th>Mined At</th>
            <th>Transactions</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map(block => (
            <tr key={block.hash} onClick={() => navigate(`/blocks/${block.hash}`)}>
              <td>{block.number}</td>
              <td>{block.hash.slice(0, 20)}...</td>
              <td>{new Date(block.timestamp * 1000).toLocaleString()}</td>
              <td>{block.transactions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Blocks;
