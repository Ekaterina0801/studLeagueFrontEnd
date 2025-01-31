import ReactDOM from 'react-dom';
import "./style.css";

const SuccessMessage = ({ message }) => {
  return ReactDOM.createPortal(
    <div className="success-message">
      {message}
    </div>,
    document.body 
  );
};

export default SuccessMessage;
