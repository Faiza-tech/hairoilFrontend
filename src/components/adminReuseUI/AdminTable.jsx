

import "./AdminTable.css";

const AdminTable = ({ columns, children, }) => {

  
  return (

    <div className="admin-table-wrapper">

      <table className="admin-table">

        <thead>

          <tr>

            {columns.map((col, index) => (

              <th key={index}>
                {col}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {children}

        </tbody>

      </table>

    </div>
  );
};

export default AdminTable;

