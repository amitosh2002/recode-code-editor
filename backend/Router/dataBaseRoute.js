import express from "express";  
import mongoose from "mongoose";

const dbRouter = express.Router();
dbRouter.get("/cluster-stats", async (req, res) => {
  try {
    const db = mongoose.connection.db;

    const stats = await db.command({ dbStats: 1 });
    res.json(stats);
  } catch (error) {
    console.error("Error getting MongoDB stats:", error);
    res.status(500).json({ error: "Failed to get stats" });
  }
});


dbRouter.get("/collection-stats", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    const stats = await Promise.all(
      collections.map(async (col) => {
        const colStats = await db.command({ collStats: col.name });
        return {
          name: col.name,
          sizeMB: colStats.size / (1024 * 1024),
        };
      })
    );

    res.json(stats);
  } catch (error) {
    console.error("Error getting collection stats:", error);
    res.status(500).json({ error: "Failed to get collection stats" });
  }
});
export default dbRouter;
