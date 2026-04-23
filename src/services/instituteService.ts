import client from '../api/client';

export const getInstitutes = async (userId: string) => {
  try {
    const response = await client.get(
      `/uir/users/${userId}/institutes-roles-list`,
    );
    console.log('Institutes API response:', response.data);

    return response.data;
  } catch (error: any) {
    console.log('Institutes API Error:', error.response?.data || error.message);
    throw error;
  }
};
