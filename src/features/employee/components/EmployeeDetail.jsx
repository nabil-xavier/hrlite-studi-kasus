import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const { id } = useParams();

  useEffect(() => {}, [id]);

  return <div>Employee Detail</div>;
};

export default EmployeeDetail;
