import axios from "axios";

const API_URL = "/api/goals/";

const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);

  if (response.data) {
    localStorage.setItem("goals", JSON.stringify(response.data));
  }

  return response.data;
};

const getAllGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

const deleteGoal = async (goalID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + goalID, config);

  return response.data;
};

const goalService = {
  createGoal,
  getAllGoals,
  deleteGoal,
};

export default goalService;
