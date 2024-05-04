exports.seed = async function (knex) {
  await knex('exercises').del()
  await knex('exercises').insert([
    {
      name: 'Assunto 1',
      series: 4,
      repetitions: 12,
      group: 'Beginner',
      demo: 'supino_inclinado_com_barra.gif',
      thumb: 'supino_inclinado_com_barra.png',
    },
    {
      name: 'Assunto 2',
      series: 3,
      repetitions: 12,
      group: 'Beginner',
      demo: 'crucifixo_reto.gif',
      thumb: 'crucifixo_reto.png'
    },
    {
      name: 'Assunto 3',
      series: 3,
      repetitions: 12,
      group: 'Skilled',
      demo: 'supino_reto_com_barra.gif',
      thumb: 'supino_reto_com_barra.png'
    },
    {
      name: 'Assunto 4',
      series: 3,
      repetitions: 12,
      group: 'Master',
      demo: 'frances_deitado_com_halteres.gif',
      thumb: 'frances_deitado_com_halteres.png'
    }
  ]);
};