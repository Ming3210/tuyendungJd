import axios from "axios"


export const getDetailCandidate = async (userId) => {
    try {
        const res = await axios.get(`http://localhost:8080/users/${userId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching candidate details:", error);
        throw error;
    }
};

