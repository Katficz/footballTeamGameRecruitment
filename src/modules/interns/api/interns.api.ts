import axios from "axios";
import { AxiosResponse } from "axios";

const baseBackendUrl = "https://reqres.in/api";

async function fetchInterns(
  page: number
): Promise<InternsListApiResponse | null> {
  let response: AxiosResponse | null = null;

  try {
    response = await axios.get(`${baseBackendUrl}/users`, {
      params: {
        page,
      },
    });
  } catch (fetchInternsError) {
    console.error(fetchInternsError);
  }

  if (!response) return null;
  return response.data;
}

async function fetchInternById(id: number): Promise<Intern | null> {
  let response: AxiosResponse | null = null;

  try {
    response = await axios.get(`${baseBackendUrl}/users/${id}`);
  } catch (fetchInternsError) {
    console.error(fetchInternsError);
  }

  if (!response) return null;
  return response.data.data;
}

async function deleteInternById(id: string): Promise<true | false> {
  let response: AxiosResponse | null = null;

  try {
    response = await axios.delete(`${baseBackendUrl}/users/${id}`);
  } catch (fetchInternsError) {
    console.error(fetchInternsError);
  }

  if (!response) return false;
  return response.status === 204;
}

async function addNewIntern(newIntern: Intern): Promise<Intern | null> {
  let response: AxiosResponse | null = null;

  try {
    response = await axios.post(`${baseBackendUrl}/users`, newIntern);
  } catch (fetchInternsError) {
    console.error(fetchInternsError);
  }

  if (!response) return null;
  return response.data;
}

async function updateIntern(newIntern: Intern): Promise<Intern | null> {
  let response: AxiosResponse | null = null;

  try {
    response = await axios.put(
      `${baseBackendUrl}/users${newIntern.id}`,
      newIntern
    );
  } catch (fetchInternsError) {
    console.error(fetchInternsError);
  }

  if (!response) return null;
  return response.data;
}

export {
  fetchInterns,
  fetchInternById,
  deleteInternById,
  addNewIntern,
  updateIntern,
};
