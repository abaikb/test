import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const ContributionGraph = () => {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dpg.gg/test/calendar.json');
      const data = response.data;

      if (typeof data === 'object' && data !== null) {
        const formattedData = Object.entries(data).map(([date, count]) => ({
          date,
          contributions: count
        }));
        setContributions(formattedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderContributions = () => {
    const colors = {
      0: '#EDEDED',
      2: '#ACD5F2',
      3: '#7FA8C9',
      4: '#527BA0',
      30: '#254E77',
    };
  
    if (!Array.isArray(contributions) || contributions.length === 0) {
      return null;
    }
  
    return contributions.map((day, index) => {
      const { date, contributions } = day;
      const color =
        contributions >= 30
          ? colors[30]
          : contributions >= 4
          ? colors[4]
          : contributions >= 3
          ? colors[3]
          : contributions >= 2
          ? colors[2]
          : colors[0];
  
      return (
        <span
          key={index}
          className="contribution-cell"
          title={`Date: ${date}\nContributions: ${contributions}`}
          style={{ backgroundColor: color }}
        />
      );
    });
  };
};

export default ContributionGraph;
