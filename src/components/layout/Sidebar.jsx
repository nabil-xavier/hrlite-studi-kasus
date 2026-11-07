import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 border-r p-4">
      <nav className="space-y-2">
        <Link to="/employee" className="block">
          Employees
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
