import React, {useState, useEffect} from 'react';

const Rank = ({ name, entries }) => {
  const [emoji, setEmoji] = useState('');
  useEffect(() => {
    const generateEmoji = async () => {
      try {
        const response = await fetch(`https://1fl19h066b.execute-api.us-east-1.amazonaws.com/rank?rank=${entries}`);
        const result = await response.json();
        setEmoji(result.input)
      } catch (err) {
        console.error('Error fetching emoji', err)
      }
    }
    generateEmoji()
  }, [entries])
  
  return (
    <div>
      <div className='white f3'>
        {`${emoji} ${name}, your current entry count is...`}
      </div>
      <div className='white f1'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;