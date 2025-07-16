import axios from 'axios';
import { supabase } from '../supabaseClient';



const API = axios.create({
  baseURL: 'https://rmt-equipment-backend-production.up.railway.app',
});

//export const fetchEquipment = () => API.get('/equipment');
export const fetchRenters = async () => {
  const { data, error } = await supabase.from('renters').select('*');
  if (error) throw error;
  return { data };
};
//export const addEquipment = (newEquipment) => API.post('/equipment', newEquipment);
export const addRenter = async (renter) => {
  const { data, error } = await supabase.from('renters').insert([renter]);
  if (error) throw error;
  return data;
};
//export const deleteEquipment = (id) => API.delete(`/equipment/${id}`);
export const deleteRenter = async (id) => {
  const { data, error } = await supabase
    .from('renters')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return data;
};

