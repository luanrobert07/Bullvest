const knex = require("../database");

class ExercisesController {
  async index(request, response) {
    const { group } = request.params;

    const exercises = await knex("exercises").where({ group }).orderBy("name");

    return response.json(exercises);
  }

  async show(request, response) {
    const { id } = request.params;

    const exercise = await knex("exercises").where({ id }).first();

    return response.json(exercise);
  }

  async updateXP(request, response) {
    const { id } = request.params;
    const { xp } = request.body;

    await knex("exercises").where({ id }).update({ xp });

    return response.status(204).send();
  }

  async updateAnswers(request, response) {
    const { id } = request.params;
    const { answers } = request.body;

    try {
      // Atualizar o campo `answers` para o exercício com o ID fornecido
      await knex("exercises").where({ id }).update({ answers });

      return response.status(204).send();
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao atualizar as respostas do exercício." });
    }
  }
}

module.exports = ExercisesController;
