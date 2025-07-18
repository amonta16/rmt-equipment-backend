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

export const updateRenter = async (renter) => {
  const { data, error } = await supabase
    .from('renters')
    .update({
      name: renter.name,
      equipment: renter.equipment,
      email: renter.email,
      phone: renter.phone,
      notes: renter.notes,
    })
    .eq('id', renter.id)

    if (error) {
      console.error('Error updating renter:', error);
      throw error;
    }

    return data;
};

