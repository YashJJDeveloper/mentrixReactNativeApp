import client from '../api/client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  email: string;
  username: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginApi = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const cleanPayload = {
    email: payload.email.trim().toLowerCase(),
    password: payload.password.trim(),
  };

  try {
    console.log('LOGIN PAYLOAD:', cleanPayload);

    const response = await client.post('/auth/login', cleanPayload);
    console.log('LOGIN RESPONSE:', response.data);

    return response.data;
  } catch (error: any) {
    console.log('Retrying login after delay...');

    await delay(3000); // ✅ helps iOS + Render cold start

    const retry = await client.post('/auth/login', cleanPayload);
    console.log('RETRY RESPONSE:', retry.data);

    return retry.data;
  }
};
