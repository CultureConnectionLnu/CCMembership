// Team.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Team({ name, allocatedPoints, onAllocationChange, remainingAllocation }) {
  const [value, setValue] = useState(allocatedPoints);

  useEffect(() => {
    setValue(allocatedPoints);
  }, [allocatedPoints]);

  // Calculate the maximum allocation for this team
  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onAllocationChange(name, newValue);
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <input
        type="range"
        min="0"
        max={remainingAllocation}
        value={value}
        onChange={handleSliderChange}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-gray-600">
        <span>0</span>
        <span>{value}</span>
        <span>{remainingAllocation}</span>
      </div>
    </div>
  );
}

Team.propTypes = {
  name: PropTypes.string.isRequired,
  allocatedPoints: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,
  onAllocationChange: PropTypes.func.isRequired,
  remainingAllocation: PropTypes.number.isRequired,
};

export default Team;