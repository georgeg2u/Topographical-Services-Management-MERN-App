import {Box, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {PieChart, Pie, Cell, Tooltip} from "recharts";

const COLORS = ["#36B37E", "#4027B6", "#FFBB28", "#B3200E"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export default function PieServicesPrice({services}) {
  const [costGroups, setCostGroups] = useState([]);

  useEffect(() => {
    let lessThan1000 = 0,
      lessThan1500 = 0,
      between1500And2000 = 0,
      moreThan2000 = 0;
    services.forEach(service => {
      if (service.price <1000) return lessThan1000++;
      if (service.price < 1500) return lessThan1500++;
      if (service.price <= 2000) return between1500And2000++;
      moreThan2000++;
    });
    setCostGroups([
      {name: "Sub 1000 Lei", qty: lessThan1000},
      {name: "Sub 1500 Lei", qty: lessThan1500},
      {name: "Între 1500 și 2000 Lei", qty: between1500And2000},
      {name: "Mai mult de 2000 Lei", qty: moreThan2000},
    ]);
  }, [services]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <PieChart width={250} height={250}>
        <Pie
          data={costGroups}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="qty"
        >
          {costGroups.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Stack gap={6}>
        <Typography variant="h6" sx={{color: "#FFFFFF"}}>
          Prețurile serviciilor
        </Typography>
        <Box sx={{display: "flex", gap: 3, flexWrap: "wrap"}}>
          {COLORS.map((color, i) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Box sx={{width: 20, height: 20, background: color}} />
              <Typography variant="body2" sx={{opacity: 0.8, color: "#FFFFFF"}}>
                {costGroups[i]?.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
