import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export const fetchEquipment = () => API.get('/equipment');
export const addEquipment = (newEquipment) => API.post('/equipment', newEquipment);
export const deleteEquipment = (id) => API.delete(`/equipment/${id}`);

