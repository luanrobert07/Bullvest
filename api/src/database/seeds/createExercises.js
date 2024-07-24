exports.seed = async function (knex) {
  await knex('exercises').del();
  await knex('exercises').insert([
    {
      name: 'Assunto 1 - Cryptomoedas',
      quantity: 4,
      group: 'Módulo 1',
      demo: 'crypto.gif',
      thumb: 'crypto.png',
      description: 'Criptomoedas são moedas digitais ou virtuais que utilizam criptografia para garantir transações seguras. Diferente das moedas tradicionais, que são emitidas por governos e bancos centrais, as criptomoedas operam de forma descentralizada, geralmente em uma rede chamada blockchain.',
      question: 'O que é Cryptomoedas?',
      image: 'crypto.png',
      title: 'Venha descobrir sobre...',
      xp: 0,
      answers: JSON.stringify([
        { option: 'Moedas digitais ou virtuais que utilizam criptografia para garantir transações seguras.', isCorrect: true },
        { option: 'Moedas emitidas por governos e bancos centrais.', isCorrect: false },
        { option: 'Moedas operando centralizadamente em uma rede blockchain.', isCorrect: false },
        { option: 'Moedas físicas com suporte digital.', isCorrect: false }
      ]),
    },
    {
      name: 'Assunto 2 - Bolsa de Valores',
      quantity: 3,
      group: 'Módulo 1',
      demo: 'crypto.gif',
      thumb: 'crypto.png',
      description: 'A bolsa de valores é uma instituição onde se realizam operações de compra e venda de valores mobiliários, como ações, títulos, commodities e derivativos. Ela desempenha um papel crucial no mercado financeiro, servindo como um mercado organizado para que investidores possam negociar esses ativos de forma transparente e regulamentada.',
      question: 'O que é Bolsa de Valores?',
      image: 'crypto.png',
      title: 'Venha descobrir sobre...',
      xp: 0,
      answers: JSON.stringify([
        { option: 'Instituição para investidores negociarem ativos de forma regulamentada.', isCorrect: true },
        { option: 'Mercado descentralizado para compra de ações.', isCorrect: false },
        { option: 'Sistema de troca de moedas estrangeiras.', isCorrect: false }
      ]),
    },
    {
      name: 'Assunto 3 - Renda Fixa',
      quantity: 3,
      group: 'Módulo 2',
      demo: 'crypto.gif',
      thumb: 'crypto.png',
      description: 'Renda fixa é uma categoria de investimento onde os retornos são previsíveis e geralmente conhecidos no momento da aplicação. Ao investir em produtos de renda fixa, o investidor sabe de antemão quanto receberá de juros e em que prazo, o que oferece maior segurança em comparação com investimentos de renda variável, como ações.',
      question: 'O que é Renda Fixa?',
      image: 'crypto.png',
      title: 'Venha descobrir sobre...',
      xp: 0,
      answers: JSON.stringify([
        { option: 'Investimento com retornos variáveis conforme o mercado financeiro.', isCorrect: false },
        { option: 'Investimento onde os retornos são previsíveis e conhecidos.', isCorrect: true },
        { option: 'Investimento com alta volatilidade e riscos elevados.', isCorrect: false }
      ]),
    },
    {
      name: 'Assunto 4 - Renda Variável',
      quantity: 3,
      group: 'Módulo 3',
      demo: 'crypto.gif',
      thumb: 'crypto.png',
      description: 'Renda variável é uma categoria de investimentos onde os retornos não são previsíveis e podem variar conforme o desempenho do mercado. Diferente da renda fixa, onde o investidor conhece de antemão a remuneração do seu investimento, na renda variável os rendimentos dependem de diversos fatores econômicos e de mercado, o que implica em maior risco e potencial de retorno.',
      question: 'O que é Renda Variável?',
      image: 'crypto.png',
      title: 'Venha descobrir sobre...',
      xp: 0,
      answers: JSON.stringify([
        { option: 'Investimento com retornos previsíveis e conhecidos.', isCorrect: false },
        { option: 'Investimento onde os retornos variam conforme o mercado financeiro.', isCorrect: true },
        { option: 'Investimento com baixa volatilidade e riscos mínimos.', isCorrect: false }
      ]),
    },
    {
      name: 'Assunto 5 - Fundos de Investimentos',
      quantity: 3,
      group: 'Módulo 4',
      demo: 'crypto.gif',
      thumb: 'crypto.png',
      description: 'Fundos de investimentos são veículos financeiros que reúnem recursos de diversos investidores com o objetivo de investir em uma carteira diversificada de ativos, gerida por profissionais especializados. Ao investir em um fundo, os investidores compram cotas, que representam uma fração do total dos ativos do fundo. Os retornos gerados pelos investimentos são distribuídos proporcionalmente entre os cotistas.',
      question: 'O que é Fundo de Investimentos?',
      image: 'crypto.png',
      title: 'Venha descobrir sobre...',
      xp: 0,
      answers: JSON.stringify([
        { option: 'Veículo financeiro para diversificação de investimentos.', isCorrect: true },
        { option: 'Opção de investimento exclusiva para grandes empresas.', isCorrect: false },
        { option: 'Método de investimento com retorno fixo garantido.', isCorrect: false }
      ]),
    },
    {
      name: 'Assunto 6 - Poupança',
      quantity: 3,
      group: 'Módulo 5',
      demo: 'crypto.gif',
      thumb: 'crypto.png',
      description: 'A poupança é uma forma de investimento tradicional e popular no Brasil, conhecida pela sua simplicidade e segurança. Ela é oferecida por bancos e instituições financeiras e é regulamentada pelo Banco Central do Brasil.',
      question: 'O que é Poupança?',
      image: 'crypto.png',
      title: 'Venha descobrir sobre...',
      xp: 0,
      answers: JSON.stringify([
        { option: 'Forma de investimento com alto risco e retorno variável.', isCorrect: false },
        { option: 'Investimento tradicional conhecido pela simplicidade e segurança.', isCorrect: true },
        { option: 'Método de investimento exclusivo para investidores iniciantes.', isCorrect: false }
      ]),
    }
  ]);
};
