import React from "react";




export default function Results({ result, handleErrorClick }) {

  
  return (
    <div className="Results">
      {result.length === 0 
      
      ? (

        <div>
          <h2>Results</h2>
          <div style={{ marginTop: "20vh" }}>
             <h3>Congrats! You have no errors.</h3>
             <h3>You are a great coder!</h3>
          </div>
        </div>

      ) : (

        <div>
          <h2>Results</h2>
          <div className="enside">
            <ol>
              {result
                ? result.map((item, id) => {
                    return (
                    <li key={id}
                    data-column={item.column} 
                    data-line={item.line} 
                    data-end-line={item.endLine}
                    data-end-column={item.endColumn}
                    onClick={handleErrorClick}
                    >
                        {item.endColumn ? (
                        <span>Error on line {item.line}, columns {item.column} - {item.endColumn}</span>
                        ) : (
                        <span>Error on line {item.line}, column {item.column}</span>
                        )}
                        <br/>
                        <span>Severity level of {item.severity}</span>
                        <p>{item.message}</p>
                    </li>
                    );
                  })
                : null}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
