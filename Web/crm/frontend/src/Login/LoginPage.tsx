import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { TextField, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../Css/LoginPage.css'; // Importar los estilos personalizados

const LoginPage = () => {
    const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
    const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para rastrear si el usuario ha iniciado sesión
    const login = useLogin(); // Hook de react-admin para gestionar el login
    const notify = useNotify(); // Hook de react-admin para mostrar notificaciones
    const navigate = useNavigate(); // Hook para navegar entre rutas

    const handleLogin = () => {
        login({ username, password })
            .then(() => {
                const authString = localStorage.getItem('auth');
                const auth = authString ? JSON.parse(authString) : null; // Obtener la información de autenticación del localStorage
                if (auth) {
                    const userRole = auth.role; // Obtener el rol del usuario
                    setIsLoggedIn(true); // Actualizar el estado de inicio de sesión
                    if (userRole === 'Lector') {
                        navigate('/lec-dashboard'); // Redirigir a la página de lector si el rol es 'Lector'
                    } else if (userRole === 'Administrador') {
                        navigate('/admin-dashboard'); // Redirigir a la página de administrador si el rol es 'Administrador'
                    } else {
                        navigate('/'); // Redirigir a la página principal si no se reconoce el rol
                    }
                } else {
                    notify('Error al obtener la información de usuario', { type: 'warning' });
                }
            })
            .catch(() => {
                notify('Credenciales inválidas', { type: 'warning' }); // Mostrar notificación de error si las credenciales no son válidas
            });
    };

    const handleGoBack = () => {
        navigate('/');
    }

    // Si el usuario ha iniciado sesión, no mostrar los elementos de la página de login
    if (isLoggedIn) {
        return <div className="login-cleanup">Iniciando sesión...</div>; // Limpiar la pantalla o mostrar mensaje temporal
    }

    return (
        <div id="login-body">
            <IconButton
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    color: 'white',
                }}
                onClick={handleGoBack} // Cambiado de onAbort a onClick para manejar la navegación
            >
                <ArrowBackIcon/>
            </IconButton> 
                       
            <div className="ring">
                <i style={{ '--clr': '#755185' }}></i>
                <i style={{ '--clr': '#daa370' }}></i>
                <i style={{ '--clr': '#a23b62' }}></i>
                <div className="login">
                    <h2>Inicio de sesión</h2>
                    <div className="inputBx">
                        <TextField
                            label="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Actualizar el estado del nombre de usuario
                            fullWidth
                            InputProps={{
                                disableUnderline: true,
                                style: { color: 'white' },
                            }}
                            InputLabelProps={{
                                style: { color: 'rgba(255, 255, 255, 0.75)', width: '100%', paddingLeft: '25px', paddingTop: '14px'}, 
                                sx: {
                                    '&.MuiInputLabel-shrink': { 
                                        transform: 'translate(0, -15px) scale(0.80)' 
                                    }
                                },
                            }}
                            variant="standard"
                        />
                    </div>
                    <div className="inputBx">
                        <TextField
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            fullWidth
                            InputProps={{
                                disableUnderline: true,
                                style: { color: 'white' }, 
                            }}
                            InputLabelProps={{
                                style: { color: 'rgba(255, 255, 255, 0.75)', width: '100%', paddingLeft: '25px', paddingTop: '14px'},
                                sx: {
                                    '&.MuiInputLabel-shrink': { 
                                        transform: 'translate(0, -15px) scale(0.80)' 
                                },
                                }
                            }}
                            variant="standard"
                        />
                    </div>
                    <div className="inputBx">
                        <Button
                            onClick={handleLogin}
                            fullWidth
                            variant="contained"
                            style={{
                                background: 'linear-gradient(45deg, #ff357a, #fff172)',
                                color: '#fff',
                                borderRadius: '40px',
                            }}
                        >
                            Iniciar sesión
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
