
import "./AdminCard.css";

const AdminCard = ({
  title,
  value,
}) => {

  return (

    <div className="admin-card">

      <h3>{title}</h3>

      <h1 className="admin-card-value">{value}</h1>

    </div>
  );
};

export default AdminCard;