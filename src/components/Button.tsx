import React from 'react';

interface IButton{
  text: string;
  onPress: () => void;
  className?: string;
}

function Button({ text, onPress, className }: IButton) {
  return (
    <button type="button" className={`standard-button ${className}`} onClick={onPress}>
      <p className="standard-text">
        {text}
      </p>
    </button>
  );
}

export default Button;
