import axios from 'axios';
import { supabase } from '../supabaseClient';



const API = axios.create({
  baseURL: 'https://rmt-equipment-backend-production.up.railway.app',
});

//export const fetchEquipment = () => API.get('/equipment');
export const fetchEquipment = async () => {
  const { data, error } = await supabase.from('equipment').select('*');
  if (error) throw error;
  return { data };
};
//export const addEquipment = (newEquipment) => API.post('/equipment', newEquipment);
export const addEquipment = async (equipment) => {
  const { data, error } = await supabase.from('equipment').insert([equipment]);
  if (error) throw error;
  return data;
};
export const deleteEquipment = (id) => API.delete(`/equipment/${id}`);

