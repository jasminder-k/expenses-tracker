import React from "react";

const Table = ({ heading, data }) => {
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            {heading.map((head) => (
              <th scope="col">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              {headers.map((head) => (
                <td>{row[head]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
