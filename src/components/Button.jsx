// Button.js
import React from "react";
// Import FontAwesomeIcon and the spinner icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Button = ({ onClick, value, disabled, loading }) => {
    return (
        <button 
            className="btn" 
            onClick={onClick} 
            disabled={disabled} // Set disabled attribute based on props
        >
            {loading ? (
                <>
                    
                    <FontAwesomeIcon icon={faSpinner} spin  className="spin"/> {/* Spinner icon */}
                    
                </>
            ) : (
                value
            )}
        </button>
    );
};

export default Button;
