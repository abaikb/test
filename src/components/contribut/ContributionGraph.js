import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const ContributionGraph = () => {
  const [contributions, setContributions] = useState([]);
  const [selectedContribution, setSelectedContribution] = useState(null);

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
          title={`Дата: ${formatDate(date)}\nКоличество вкладов: ${contributions}`}
          style={{ backgroundColor: color }}
          onClick={() => handleContributionClick(day)}
        />
      );
    });
  };

  const handleContributionClick = (contribution) => {
    setSelectedContribution(contribution);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  };

  const renderModal = () => {
    if (!selectedContribution) {
      return null;
    }

    const { date, contributions } = selectedContribution;

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={() => setSelectedContribution(null)}>
            &times;
          </span>
          <p>{contributions} contributions </p>
          <p> {formatDate(date)}</p>
          
        </div>
      </div>
    );
  };

  return (
    <div className="contribution-graph">
      {renderContributions()}
      {renderModal()}
    </div>
  );
};

export default ContributionGraph;
