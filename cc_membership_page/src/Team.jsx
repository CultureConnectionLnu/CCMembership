import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Team({ name, allocatedVotes, onVoteChange, remainingVotes }) {
  const [value, setValue] = useState(allocatedVotes);

  useEffect(() => {
    setValue(allocatedVotes);
  }, [allocatedVotes]);

  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onVoteChange(name, newValue);
  };

  // Calculate the maximum votes this slider can allow
  const maxSlider = remainingVotes;

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <input
        type="range"
        min="0"
        max={maxSlider}
        value={value}
        onChange={handleSliderChange}
        className="w-full"
        aria-labelledby={`slider-${name}`}
        aria-valuemin="0"
        aria-valuemax={maxSlider}
        aria-valuenow={value}
        aria-valuetext={`Allocated ${value} votes to ${name}`}
      />
      <div className="flex justify-between text-sm text-gray-600">
        <span>0</span>
        <span>{value}</span>
        <span>{maxSlider}</span>
      </div>
    </div>
  );
}

Team.propTypes = {
  name: PropTypes.string.isRequired,
  allocatedVotes: PropTypes.number.isRequired,
  onVoteChange: PropTypes.func.isRequired,
  remainingVotes: PropTypes.number.isRequired,
};

export default Team;