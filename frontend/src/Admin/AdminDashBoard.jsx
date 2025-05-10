import { useDispatch, useSelector } from "react-redux";
import {  Outlet, NavLink } from "react-router-dom";
import  { useEffect, useState } from "react";
import "./Dashboard.scss";
// import DBStatsGraph from "../DBStatsGraph";
import { GrDocumentStore, GrServerCluster } from "react-icons/gr";
import { PiExamBold } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import axios from "axios";
import "./Dashboard.scss";
import { fetchAllUsers } from "../Redux/Actions/usersActions";
import { fetchAllTests } from "../Redux/Actions/testActions";
import { MdDataUsage } from "react-icons/md";
import { FaDatabase } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { SiVitest } from "react-icons/si";
import { Button } from "@mui/material";
// import AdminRightPanel from "./AdminRightPanel";
const Dashboard = () => {
  const [stats, setStats] = useState({
    collections: 0,
    objects: 0,
    dataSize: 0,
    storageSize: 0,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllTests())
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_KEY}/api/db/cluster-stats`);
        const data = response?.data;

        setStats({
          collections: data?.collections || 0,
          objects: data?.objects || 0,
          dataSize: data?.dataSize ? +(data?.dataSize / (1024 * 1024)).toFixed(2) : 0,
          storageSize: data?.storageSize ? +(data?.storageSize / (1024 * 1024)).toFixed(2) : 0,
        });
      } catch (err) {
        console.error("Failed to fetch DB stats", err);
      }
    };

    fetchStats();
  }, [dispatch]);
   const userList = useSelector((state) => state.userReducer?.userList);
   const allTests = useSelector((state) => state.testReducer?.allTests);
    const userDetails =
       useSelector((state) => state.userReducer.userDetails) || ``;
  return (
    <div className="dashboard-container">
      <div className="top-stats">
        <div className="card"><GrServerCluster color="white" size={26}/>Total Collections <span>{stats.collections}</span></div>
        <div className="card"><GrDocumentStore color="white" size={26}/>Total Documents <span>{stats.objects}</span></div>
        <div className="card"><FaDatabase color="white" size={26} />Data Size <span>{stats.dataSize} MB</span></div>
        <div className="card"><MdDataUsage color="white" size={26}/>Storage Size <span>{stats.storageSize} MB</span></div>
      </div>
      <div className="top-stats" style={{ marginTop: "20px" }}>
        <div className="card"><SiVitest  color="white" size={26} />Total Questions <span>{stats.collections}</span></div>
        <div className="card"><FiUsers  color="white" size={26}/>Total User <span>{userList?.length}</span></div>
        <div className="card"><PiExamBold color="white" size={26}/>Total Test <span>{allTests?.length}</span></div>
        <div className="card"><RiAdminFill color="white" size={26}/> Account Type <span>{userDetails?.role?.toUpperCase()}</span></div>
      </div>

      {/* Keep the rest of the dashboard as you had before */}
      {/* ... */}
      <div className="middle-section">
       
        <div className="quick-access">
          <div className="grid"style={{display:"flex", flexDirection:"row",gap:"150px", width:" 100%", height:"100%"}}>
            <div className="box-container" style={{display:"flex",justifyContent:"center" ,alignItems:"center" ,padding:"5px",marginTop:"5rem"}}> {/* New container for the text boxes */}
                <NavLink to="/admin">
                
              <Button className="box text-box">Home</Button>
                </NavLink>
                        <NavLink to="questionForm">

                
              <Button className="box text-box">Question Form</Button>
                </NavLink>
                <NavLink to="userlist">

              <Button className="box text-box">Candidates</Button>
                </NavLink>
                       <NavLink to="questionList">
               

              <Button className="box text-box">Question Control</Button>
                </NavLink>
                       <NavLink to="test_validation">
               

              <Button className="box text-box">Test Control</Button>
                </NavLink>
            </div>
            <div className="box graph-box">
              {/* <DBStatsGraph /> */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;