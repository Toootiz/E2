import { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, IconButton  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import '../Css/Donation_Page.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DonationsPage = () => {
    
    const navigate = useNavigate();
    
    const handleDonation = async () => {
        try{
            const response = await axios.post('https://localhost:5001/api/donations/create', {
                name: name,
                email: email,
                phone: phone,
                amount: donationAmount,
                type: donationType,
            });
            console.log(response);
            toast.success('Donación realizada con éxito. Regresando a pagina inicial', { position: "top-center" ,  autoClose: 3000});
            
            setTimeout(() => {
                navigate('/'); // Cambia '/otra-pagina' por la ruta a la que quieras redirigir
            }, 1000);
            
            
            
        }catch(error){
            console.error('Error en la donación',error);
            toast.error('Error al realizar la donación', { position: "top-center",  hideProgressBar: true , autoClose: 3000});
        }
        
        //navigate('/'); // Redirigir al usuario a la página principal después de realizar la donación
    };

    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [donationAmount, setDonationAmount] = useState(''); 
    const [donationType, setDonationType] = useState('');

    const handleGoBack = () => {
        navigate('/');
    }

    return (
        <div id="donations-body">
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
                
            <div className="Donation_box">
                <h2>Donación</h2>
                <div className="inputBx" id="Name-field">
                    <TextField
                        label="Nombre"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        fullWidth
                        InputProps={{
                            
                            style: { color: 'white' },
                        }}
                        InputLabelProps={{
                            style: { color: 'rgba(255, 255, 255, 0.75)', width: '100%', paddingLeft: '25px'}, 
                            sx: {
                                '&.MuiInputLabel-shrink': { 
                                    transform: 'translate(0, -20px) scale(0.80)' 
                                }
                            },
                        }}
                    />
                </div>

                <div className="inputBx" id="Email-field">
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        InputProps={{
                            
                            style: { color: 'white' },
                        }}
                        InputLabelProps={{
                            style: { color: 'rgba(255, 255, 255, 0.75)', width: '100%', paddingLeft: '25px'}, 
                            sx: {
                                '&.MuiInputLabel-shrink': { 
                                    transform: 'translate(0, -20px) scale(0.80)' 
                                }
                            },
                        }}
                    />
                </div>

                <div className="inputBx" id="Phone-field">
                    <TextField
                        label="Telefono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                        InputProps={{
                            
                            style: { color: 'white' },
                        }}
                        InputLabelProps={{
                            style: { color: 'rgba(255, 255, 255, 0.75)', width: '100%', paddingLeft: '25px'}, 
                            sx: {
                                '&.MuiInputLabel-shrink': { 
                                    transform: 'translate(0, -20px) scale(0.80)' 
                                }
                            },
                        }}
                    />
                </div>
                
                <div className="inputBx" id="Amount-field">
                    <TextField
                        label="Cantidad a donar"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        fullWidth
                        InputProps={{
                            style: { color: 'white' },
                        }}
                        InputLabelProps={{
                                style: { color: 'rgba(255, 255, 255, 0.75)', width: '100%', paddingLeft: '25px'}, 
                                sx: {
                                    '&.MuiInputLabel-shrink': { 
                                        transform: 'translate(0, -20px) scale(0.80)' 
                                    }
                                },
                            }}
                    />
                </div>

                <div className="inputBx" id="Type-field">
                <FormControl fullWidth >
                    <InputLabel style={{ color: 'rgba(255, 255, 255, 0.75)' }} >
                        Tipo de donación
                        
                    </InputLabel>
                    <Select
                        value={donationType}
                        onChange={(e) => setDonationType(e.target.value)}
                        style={{ color: 'white', height: '51.6px'}} 
                         // Estilo del select
                    >
                        
                        <MenuItem value="Tarjeta">Tarjeta</MenuItem>
                        <MenuItem value="Efectivo">Efectivo</MenuItem>
                        <MenuItem value="Especie">Especie</MenuItem>

                    </Select>
                </FormControl>
                </div>

                <div className="inputBx">
                        <Button
                            onClick={handleDonation}
                            fullWidth
                            variant="contained"
                            style={{
                                background: 'linear-gradient(45deg, #ff357a, #fff172)',
                                color: '#fff',
                                borderRadius: '40px',
                            }}
                        >
                            Donar
                        </Button>
                        
                    </div>

            </div>
            <ToastContainer />
        </div>
    );


};

export default DonationsPage;