import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRadio,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { generatePath, Link, useNavigate } from "react-router-dom";
import Admin from "../../../Core/Admin";
import AdminSidebar from "../../../Core/AdminSidebar";
import { Loading } from "../../../Core/Loading";

const AddPayrollDetail = () => {
  const navigate = useNavigate();
  const emp = JSON.parse(localStorage.getItem("Uid"));
  const id = emp[0];
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("*");
  }
  const isUserAuth = async () => {
    const res = await axios
      .get("http://localhost:9000/auth/admin/me/", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (res.status === 401) {
      navigate("*");
    }
  };

  // ! GET Leaves
  const [employee, setEmployee] = useState([{}]);

  useEffect(() => {
    isUserAuth();
  }, []);
  const [formData, setFormData] = useState({
    month: "",
    name: "",
  });
  const { month, name } = formData;
  formData.name = `${emp[1]} ${emp[2]}`;

  console.log(formData);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, //? for key used: name and for value used: value
    }));
  };

  console.log(id);
  const addPayroll = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:9000/auth/employee/payroll/add/${id}`, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => navigate(generatePath(`/auth/admin/payroll/${id}`)));
  };
  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Add Payroll" />
        <MDBContainer fluid className="fadeIn">
          <div className="tab-pane" id="settings">
            <form>
              <MDBRow className="mb-3">
                <div className="col-md-12 col-lg-6 ">
                  <MDBInput
                    id="month"
                    type="date"
                    name="month"
                    value={month}
                    onChange={onChange}
                  />
                </div>
              </MDBRow>

              <button
                className="btn btn-primary"
                onClick={(e) => {
                  addPayroll(e);
                }}
              >
                Add to Payroll
              </button>
            </form>
          </div>
        </MDBContainer>
      </Loading>
    </AdminSidebar>
  );
};

export default AddPayrollDetail;
