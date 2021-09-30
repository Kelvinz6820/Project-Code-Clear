const stats = require("express").Router();
const {
  getAllStats,
  getStat,
  getByDayPieChart,
  getByDayBarChart,
  getByWeekPieChart,
  getByWeekBarChart,
  getByMonthPieChart,
  getByMonthBarChart,
  getByYearPieChart,
  getByYearBarChart,
  getAnnualStats,
  deleteStat,
  updateStat,
} = require("../queries/userStats");

stats.get("/", async (req, res) => {
  try {
    const allStats = await getAllStats();
    if (allStats.code === "ECONNREFUSED") {
      console.log(`Database ${allStats}`);
      throw `Unable to connect to the database`;
    } else {
      res.status(200).json({
        success: true,
        payload: allStats,
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.post("/daily", async (req, res) => {
  try {
    if (req.body.type === "pieChart") {
      const daily = await getByDayPieChart(req.body.date);
      res.status(200).json({
        success: true,
        payload: daily,
      });
    } else {
      const daily = await getByDayBarChart(req.body.date);
      res.status(200).json({
        success: true,
        payload: daily,
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.post("/weekly", async (req, res) => {
  try {
    if (req.body.type === "pieChart") {
      const weekly = await getByWeekPieChart(req.body.date);
      res.status(200).json({
        success: true,
        payload: weekly,
      });
    } else {
      const weekly = await getByWeekBarChart(req.body.date);
      res.status(200).json({
        success: true,
        payload: weekly,
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.post("/monthly", async (req, res) => {
  try {
    if (req.body.type === "pieChart") {
      const monthly = await getByMonthPieChart(req.body.date);
      res.status(200).json({
        success: true,
        payload: monthly,
      });
    } else {
      const monthly = await getByMonthBarChart(req.body.date);
      res.status(200).json({
        success: true,
        payload: monthly,
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.post("/annually", async (req, res) => {
  try {
    if (req.body.type === "pieChart") {
      const yearly = await getByYearPieChart(req.body.date);
      res.status(200).json({
        success: true,
        payload: yearly,
      });
    } else {
      const yearly = await getByYearBarChart(req.body.date);
      res.status(200).json({
        success: true,
        payload: yearly,
      });
    }
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.post("/annual-chart", async (req, res) => {
  try {
    const annual = await getAnnualStats(req.body.date);
    res.status(200).json({
      success: true,
      payload: annual,
    });
  } catch (e) {
    res.status(404).json({
      error: "Error",
      message: e,
    });
  }
});

stats.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const stat = await getStat(id);
    if (stat["id"]) {
      res.json({
        success: true,
        payload: stat,
      });
    } else {
      console.log(`Database error: ${stat}`);
      throw `There is no statistic with the id: ${id}`;
    }
  } catch (e) {
    res.status(404).json({
      error: "Statistic not found",
      message: e,
    });
  }
});

stats.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStat = await deleteStat(id);
    if (deletedStat["id"]) {
      res.status(200).json({
        success: true,
        payload: deletedStat,
      });
    } else {
      console.log(`Database error: ${deletedStat}`);
      throw `There is no statistic to delete with the id: ${id}`;
    }
  } catch (e) {
    res.status(404).json({
      error: "Statistic not deleted",
      message: e,
    });
  }
});

stats.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStat = await updateStat(id, req.body);
    if (updatedStat["id"]) {
      res.status(200).json({
        success: true,
        payload: updatedStat,
      });
    } else {
      console.log(`Database error: ${updatedStat}`);
      throw `There is no statistic to be updated with the id: ${id}`;
    }
  } catch (e) {
    res.status(404).json({
      error: "Statistic not updated",
      message: e,
    });
  }
});

module.exports = stats;
