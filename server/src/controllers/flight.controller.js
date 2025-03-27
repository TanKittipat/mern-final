import { flightModel } from "../models/flight.model.js";

// Create a new flight
export const createFlight = async (req, res) => {
  try {
    const {
      flightName,
      departurePort,
      destinationPort,
      departureTime,
      destinationTime,
    } = req.body;
    if (
      !flightName ||
      !departurePort ||
      !destinationPort ||
      !departureTime ||
      !destinationTime
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields!" });
    }
    const flight = new flightModel(req.body);
    const savedFlight = await flight.save();
    res.status(201).json(savedFlight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all flights
export const getAllFlights = async (req, res) => {
  try {
    const flights = await flightModel.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single flight by ID
export const getFlightById = async (req, res) => {
  try {
    if (req.params.id) {
      return res.status(400).json({ message: "Please provide flight Id!" });
    }
    const flight = await flightModel.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a flight by ID
export const updateFlight = async (req, res) => {
  try {
    if (req.params.id) {
      return res.status(400).json({ message: "Please provide flight Id!" });
    }
    const flight = await flightModel.findById(req.params.id);
    res.status(200).json(updatedFlight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a flight by ID
export const deleteFlight = async (req, res) => {
  try {
    const deletedFlight = await flightModel.findByIdAndDelete(req.params.id);
    if (!deletedFlight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
