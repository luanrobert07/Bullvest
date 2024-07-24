const { Router } = require("express");

const ExercisesController = require("../controllers/ExercisesController");

const exercisesRoutes = Router();

const exercisesController = new ExercisesController();

exercisesRoutes.get("/bygroup/:group", exercisesController.index);
exercisesRoutes.get("/:id", exercisesController.show);
exercisesRoutes.put('/exercise/:id/xp', exercisesController.updateXP);
exercisesRoutes.put('/exercise/:id/answers', exercisesController.updateAnswers); // Nova rota para atualizar as respostas

module.exports = exercisesRoutes;