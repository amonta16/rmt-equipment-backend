import axios from 'axios';

const API = axios.create({
  baseURL: 'https://rmt-equipment-backend-production.up.railway.app',
});

export const fetchEquipment = () => API.get('/equipment');
export const addEquipment = (newEquipment) => API.post('/equipment', newEquipment);
export const deleteEquipment = (id) => API.delete(`/equipment/${id}`);

