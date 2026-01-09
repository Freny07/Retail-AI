import axios from "axios";

export const getInsight = async (payload) => {
  const response = await axios.post(
    process.env.PYTHON_AI_URL + "/generate-insight",
    payload
  );

  return response.data;
};
