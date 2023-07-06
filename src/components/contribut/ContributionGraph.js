import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const ContributionGraph = () => {
  const [contributions, setContributions] = useState([]);
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [isHovered, setIsHovered] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dpg.gg/test/calendar.json");
      const data = response.data;

      if (typeof data === "object" && data !== null) {
        const formattedData = Object.entries(data).map(([date, count]) => ({
          date,
          contributions: count,
        }));
        setContributions(formattedData);
        setIsHovered(new Array(formattedData.length).fill(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderContributions = () => {
    const colors = {
      0: "#EDEDED",
      2: "#ACD5F2",
      3: "#7FA8C9",
      4: "#527BA0",
      30: "#254E77",
    };

    if (!Array.isArray(contributions) || contributions.length === 0) {
      return null;
    }

    const sortedContributions = contributions.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    const currentDate = new Date();
    const currentDateOffset = 50 * 7;

    return sortedContributions.map((day, index) => {
      const { date, contributions } = day;
      const cellDate = new Date(date);
      const daysDiff = Math.floor(
        (currentDate - cellDate) / (1000 * 60 * 60 * 24)
      );
      const columnIndex = Math.max(currentDateOffset - daysDiff, 0);
      const rowIndex = cellDate.getDay();

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
          title={`Дата: ${formatDate(
            date
          )}\nКоличество вкладов: ${contributions}`}
          style={{
            backgroundColor: color,
            gridColumn: columnIndex + 1,
            gridRow: rowIndex + 1,
          }}
          onMouseEnter={() => handleContributionHover(true, index)}
          onMouseLeave={() => handleContributionHover(false, index)}
        >
          {contributions > 0 && <span></span>}
          {isHovered[index] && (
            <div className="modal">
              <div className="modal-content">
                <p className="count">{contributions} contributions</p>
                <p className="date">{formatDate(date)}</p>
              </div>
            </div>
          )}
        </span>
      );
    });
  };

  const handleContributionHover = (isHovered, index) => {
    setIsHovered((prevState) => {
      const newState = [...prevState];
      newState[index] = isHovered;
      return newState;
    });
  };

  const handleContributionClick = (contribution) => {
    setSelectedContribution(contribution);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("ru-RU", options);
  };

  const renderModal = () => {
    if (!selectedContribution) {
      return null;
    }

    const { date, contributions } = selectedContribution;

    return (
      <div className="modal">
        <div className="modal-content">
          <div>{contributions} contributions</div>
          <div>{formatDate(date)}</div>
          <span
            className="close-button"
            onClick={() => setSelectedContribution(null)}
          >
            &times;
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="contribution-graph">
      {renderContributions()}
      {renderModal()}
      <div className="box_primary">
        <div>Меньше</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="84"
          height="20"
          viewBox="0 0 84 15"
          fill="none"
        >
          <path d="M15.9054 0H0.904877V15H15.9054V0Z" fill="#EDEDED" />
          <path d="M32.9059 0H17.9054V15H32.9059V0Z" fill="#ACD5F2" />
          <path d="M49.9064 0H34.906V15H49.9064V0Z" fill="#7FA8C9" />
          <path d="M66.907 0H51.9065V15H66.907V0Z" fill="#527BA0" />
          <path d="M83.9075 0H68.907V15H83.9075V0Z" fill="#254E77" />
        </svg>
        <div>Больше</div>
      </div>
    </div>
  );
};

export default ContributionGraph;
