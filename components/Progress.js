import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Progress = ({ currentPage, pages }) => {
  const percentage = Math.round((currentPage / pages) * 100, 2);
  return (
    <div className="progress-body">
      <div className="progress-bar">
        <CircularProgressbarWithChildren value={percentage} />
      </div>
      <div className="progress-percentage">
        <p className="percent-complete">{`${percentage}%`}</p>
        <p className="completed">Completed</p>
      </div>
    </div>
  );
};

export default Progress;
