import React, { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Label } from "recharts";
import { useDataProvider } from "react-admin";
import { Typography } from "@mui/material"; // Importa Typography de MUI para estilizar el texto

const FundraisingProgressWheel = () => {
  const [totalRecaudado, setTotalRecaudado] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataProvider = useDataProvider();
  
  const objetivo = 100000; // Ajusta el objetivo deseado

  // Llamar al Data Provider para obtener las donaciones
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data } = await dataProvider.getList("donations", {
          pagination: { page: 1, perPage: 100 },
          sort: { field: "id", order: "ASC" },
          filter: {}
        });
        
        // Calcular el total de donaciones
        const total = data.reduce((sum, donation) => sum + donation.amount, 0);
        setTotalRecaudado(total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setError("Error fetching donations");
        setLoading(false);
      }
    };

    fetchDonations();
  }, [dataProvider]);

  // Calcular el porcentaje del progreso
  const porcentajeProgreso = Math.min((totalRecaudado / objetivo) * 100, 100); // Asegura que no exceda el 100%

  // Datos para la gráfica
  const chartData = [
    {
      name: "Progreso",
      value: porcentajeProgreso,
      fill: "#8884d8",  // Color de la barra de progreso
    },
    {
      name: "Faltante",
      value: 100 - porcentajeProgreso,  // El porcentaje restante hasta el objetivo
      fill: "#d0d0d0",  // Color del "fondo" o la parte faltante
    }
  ];

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart 
          innerRadius="80%" 
          outerRadius="100%" 
          data={chartData} 
          startAngle={90} 
          endAngle={-270}
        >
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
            cornerRadius={50} // Redondear los bordes de la barra
          />
          <Label
            value={`$${totalRecaudado.toLocaleString()}`} // Formatear el total con separadores de miles
            position="center"
            style={{ fontSize: '20px', fontWeight: 'bold' }} // Estilo del texto
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div style={{ marginTop: "20px" }}>
        <Typography variant="subtitle1" style={{ color: "#8884d8" }}>
          Progreso: ${totalRecaudado.toLocaleString()}
        </Typography>
        <Typography variant="subtitle1" style={{ color: "#d0d0d0" }}>
          Faltante: ${Math.max(0, objetivo - totalRecaudado).toLocaleString()}
        </Typography>
      </div>
    </div>
  );
};

export default FundraisingProgressWheel;
