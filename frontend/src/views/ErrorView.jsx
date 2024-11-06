import React from 'react';

const ErrorView = ({ error, children }) => {
  return (
    <div className="container text-center py-5">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
      <div>
        <button className="btn btn-secondary mt-3" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
      {children}
    </div>
  );
};

export default ErrorView;