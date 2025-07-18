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
//export const deleteEquipment = (id) => API.delete(`/equipment/${id}`);
export const deleteEquipment = async (id) => {
  const { data, error } = await supabase
    .from('equipment')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return data;
};

export const updateEquipment = async (item) => {
  const { data, error } = await supabase
    .from('equipment')
    .update({
      status: item.status,
      renter: item.renter,
      rented_date: item.rented_date,
      return_date: item.return_date,
    })
    .eq('id', item.id)

    if (error) {
      console.error('Error updating renter:', error);
      throw error;
    }

    return data;
};

