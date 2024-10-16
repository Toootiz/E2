import React, { useState, useEffect } from 'react';
import { useDataProvider } from 'react-admin';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircularProgress } from '@mui/material'; // Opcional: para mostrar un loader mientras se cargan los datos.
import { useTheme } from '@mui/material/styles';

 // Opcional: para mostrar un loader mientras se cargan los datos.



const MyBarChart = () => {
  const dataProvider = useDataProvider();  // Hook para acceder al dataProvider
  const [data, setData] = useState([]);    // Estado para almacenar los datos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const theme = useTheme();

  useEffect(() => {
    // Llamada a la API para obtener la lista de 'Donaciones'
    dataProvider.getList('donations', {
      sort: { field: 'name', order: 'ASC' },
      pagination: { page: 1, perPage: 10 }, // Ajusta la paginación según sea necesario
    })
    .then((response) => {
      // Almacena los datos en el estado
      setData(response.data);
      setLoading(false); // Detenemos el indicador de carga
    })
    .catch((error) => {
      console.error(error);
      setLoading(false); // Si hay un error, detenemos el indicador de carga
    });
  }, [dataProvider]);

  // Si los datos están cargando, mostramos un indicador de carga
  if (loading) {
    return <CircularProgress />;
  }
  const axisColor = theme.palette.mode === 'dark' ? 'white' : 'black';

return (
  <ResponsiveContainer width="100%" height={600}>
    <BarChart data={data} layout='vertical'>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" dataKey="amount" stroke={axisColor}/>
      <YAxis type="category"dataKey="name" width={150} stroke={axisColor}/>
      <Tooltip itemStyle={{backgroundColor: 'white', color: 'black'}}/>
      <Legend />
      <Bar dataKey="amount" fill="#00D7C9" label="Cantidad"/>
    </BarChart>
  </ResponsiveContainer>
);}

export default MyBarChart;