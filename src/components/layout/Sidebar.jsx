import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-full border-b md:w-64 md:border-b-0 md:border-r">
      <nav className="flex gap-2 p-4 md:flex-col">
        <Link
          to="/employee"
          className={`rounded-md px-4 py-2 transition-colors ${
            location.pathname.startsWith("/employee")
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          Employee
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
