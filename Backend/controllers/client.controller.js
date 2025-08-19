import Client from "../models/CarDetail.js";

export const addClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json({ message: "Client saved", client });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
