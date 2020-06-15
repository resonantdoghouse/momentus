import React from 'react';

const Quote = (props) => {
  return (
    <div className="quote">
      <p>&ldquo;{props.text}&rdquo;</p>
    </div>
  );
};

export default Quote;
