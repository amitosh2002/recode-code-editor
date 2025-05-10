// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   CartesianGrid,
// //   ResponsiveContainer,
// //   Cell,
// //   LabelList,
// //   LineChart,
// // } from "recharts";
// // import { Legend } from "chart.js";
// // import { Line } from "react-chartjs-2";

// // const DBStatsGraph = () => {
// //   const [stats, setStats] = useState(null);

// //   useEffect(() => {
// //     const fetchStats = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:6001/api/db/cluster-stats");
// //         setStats(response.data);
// //         console.log(response.data);
// //       } catch (err) {
// //         console.error("Failed to fetch DB stats", err);
// //       }
// //     };

// //     fetchStats();
// //   }, []);

// //   const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]; // Unique colors

// //   const data = stats
// //     ? [
// //         { name: "Collections", value: stats.collections || 0 },
// //         { name: "Objects", value: stats.objects || 0 },
// //         {
// //           name: "Data Size (MB)",
// //           value: stats.dataSize ? +(stats.dataSize / (1024 * 1024)).toFixed(2) : 0,
// //         },
// //         {
// //           name: "Storage Size (MB)",
// //           value: stats.storageSize ? +(stats.storageSize / (1024 * 1024)).toFixed(2) : 0,
// //         },
// //       ]
// //     : [];

// //     // ------cluster_stats------
// //     const [collectionData, setCollectionData] = useState([]);

// //   useEffect(() => {
// //     const fetchStats = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:6001/api/db/collection-stats");
// //         const formatted = res.data.map((col) => ({
// //           name: col.name,
// //           sizeMB: +col.sizeMB.toFixed(2), // round for clarity
// //         }));
// //         setCollectionData(formatted);
// //       } catch (err) {
// //         console.error("Failed to fetch collection stats", err);
// //       }
// //     };

// //     fetchStats();
// //   }, []);

// //   return (
// //     <>
    
// //     <div style={{ width: "100%", height: 300 }}>
// //       <ResponsiveContainer>
// //         <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
// //           <XAxis dataKey="name" />
// //           <YAxis />
// //           <Tooltip />
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <Bar dataKey="value" radius={[10, 10, 0, 0]}>
// //             {/* Custom bar colors */}
// //             {data.map((entry, index) => (
// //               <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
// //             ))}
// //             {/* Show value labels on top */}
// //             <LabelList dataKey="value" position="top" />
// //           </Bar>
// //         </BarChart>
// //       </ResponsiveContainer>
// //     </div>
// //      <div style={{ width: "100%", height: 350 }}>
// //       <ResponsiveContainer>
// //         <LineChart data={collectionData} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis dataKey="name" />
// //           <YAxis label={{ value: 'Size (MB)', angle: -90, position: 'insideLeft' }} />
// //           <Tooltip />
// //           <Legend />
// //           <Line type="monotone" dataKey="sizeMB" stroke="#8884d8" activeDot={{ r: 8 }} />
// //         </LineChart>
// //       </ResponsiveContainer>
// //     </div>

// //     </>
// //   );
// // };

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Grid, Paper } from "@mui/material"; // Import MUI components
// import "./Dashboard.scss";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Cell,
//   LabelList,
//   LineChart,
//   Line,
//   Legend,
// } from "recharts";

// const DBStatsGraph = () => {
//   const [stats, setStats] = useState(null);
//   const [collectionData, setCollectionData] = useState([]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get("http://localhost:6001/api/db/cluster-stats");
//         setStats(response.data);
//       } catch (err) {
//         console.error("Failed to fetch DB stats", err);
//       }
//     };
//     fetchStats();
//   }, []);

//   useEffect(() => {
//     const fetchCollectionStats = async () => {
//       try {
//         const res = await axios.get("http://localhost:6001/api/db/collection-stats");
//         const formatted = res.data.map((col) => ({
//           name: col.name,
//           sizeMB: +col.sizeMB.toFixed(2),
//         }));
//         setCollectionData(formatted);
//       } catch (err) {
//         console.error("Failed to fetch collection stats", err);
//       }
//     };
//     fetchCollectionStats();
//   }, []);

//   const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
//   const data = stats
//     ? [
//         { name: "Collections", value: stats.collections || 0 },
//         { name: "Objects", value: stats.objects || 0 },
//         {
//           name: "Data Size (MB)",
//           value: stats.dataSize ? +(stats.dataSize / (1024 * 1024)).toFixed(2) : 0,
//         },
//         {
//           name: "Storage Size (MB)",
//           value: stats.storageSize ? +(stats.storageSize / (1024 * 1024)).toFixed(2) : 0,
//         },
//       ]
//     : [];

//   return (
//     <Grid container spacing={0} justifyContent="center" alignItems="center">
//       <Grid item xs={12} sm={6} md={4}>
//         <Paper elevation={3} style={{ padding: "1rem", background: "#111c2e", borderRadius: "10px" }}>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <CartesianGrid strokeDasharray="3 3" />
//               <Bar dataKey="value" radius={[10, 10, 0, 0]}>
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//                 ))}
//                 <LabelList dataKey="value" position="top" />
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </Paper>
//       </Grid>

//       <Grid item xs={12} sm={6} md={4}>
//         <Paper elevation={3} style={{ padding: "1rem", background: "#111c2e", borderRadius: "10px" }}>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={collectionData} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis label={{ value: "Size (MB)", angle: -90, position: "insideLeft" }} />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="sizeMB" stroke="#82ca9d" activeDot={{ r: 6 }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default DBStatsGraph;


import  { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Paper } from "@mui/material"; // Import MUI components
import "./Dashboard.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
  LineChart,
  Line,
  Legend,
} from "recharts";

const DBStatsGraph = () => {
  const [stats, setStats] = useState(null);
  const [collectionData, setCollectionData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_KEY}/api/db/cluster-stats`);
        setStats(response.data);
      } catch (err) {
        console.error("Failed to fetch DB stats", err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchCollectionStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_KEY}/api/db/collection-stats`);
        const formatted = res.data.map((col) => ({
          name: col.name,
          sizeMB: +col.sizeMB.toFixed(2),
        }));
        setCollectionData(formatted);
      } catch (err) {
        console.error("Failed to fetch collection stats", err);
      }
    };
    fetchCollectionStats();
  }, []);

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
  const data = stats
    ? [
        { name: "Collections", value: stats.collections || 0 },
        { name: "Objects", value: stats.objects || 0 },
        {
          name: "Data Size (MB)",
          value: stats.dataSize ? +(stats.dataSize / (1024 * 1024)).toFixed(2) : 0,
        },
        {
          name: "Storage Size (MB)",
          value: stats.storageSize ? +(stats.storageSize / (1024 * 1024)).toFixed(2) : 0,
        },
      ]
    : [];

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} md={10}>
        <Paper elevation={3} style={{ display:"flex",flexDirection:"row" ,padding: "1rem", background: "#111c2e", borderRadius: "10px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
                <LabelList dataKey="value" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={10}>
        <Paper elevation={3} style={{ padding: "1rem", background: "#111c2e", borderRadius: "10px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={collectionData} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: "Size (MB)", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sizeMB" stroke="#82ca9d" activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DBStatsGraph;
