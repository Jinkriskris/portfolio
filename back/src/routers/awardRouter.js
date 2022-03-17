const { Router } = require("express");
const awardRouter = Router();
const AwardService = require("../services/awardService");

const verifyToken = require("../middlewares/verifyToken");

awardRouter.post("/award/create", verifyToken, async (req, res, next) => {
  try {
    const { user_id, title, description } = req.body;
    const createdData = await AwardService.addAward({
      user_id,
      title,
      description,
    });

    res.status(200).json(createdData);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awards/:id", verifyToken, async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const award = await AwardService.getAward({ user_id });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).json(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awards/:id", verifyToken, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const user_id = req.params.id;
    console.log(req.body);

    const updateData = await AwardService.setAward({
      user_id,
      title,
      description,
    });
    console.log(updateData);
    res.status(200).json(updateData);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awardlist/:user_id", verifyToken, async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const awardList = await AwardService.getAwardList({ user_id });

    if (awardList.errorMessage) {
      throw new Error(awardList.errorMessage);
    }

    res.status(200).json(awardList);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/awards/:id", async function (req, res, next) {
  try {
    const awardId = req.params.id;

    const result = await AwardService.deleteAward({ awardId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = awardRouter;
