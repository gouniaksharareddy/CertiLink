import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div>
      {/* Top Div */}
      <div className="top-div">
        CertiLink  {/* Update this text as per your project */}
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <Link to="/admin">Home</Link>
        <Link to="/requests">Requests</Link>
        <Link to="/pending">Pending Tasks</Link>
        <Link to="/completed">Completed</Link>
        <Link to="/adminprofile">Profile</Link> {/* Profile link */}
      </div>
    </div>
  );
};

export default Sidebar;
