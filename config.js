/* ============================================================
   CONFIG.JS — edite aqui nomes, textos, opções e cores.
   Nomes vazios ("") funcionam normalmente: o site some com
   o trecho em vez de mostrar "undefined".
   ============================================================ */
window.CONVITE_CONFIG = {
  // ---------- Nomes (opcionais) ----------
  nomeVisitante: "",   // ex.: "Maria"
  nomeAutor: "",       // ex.: "João" (quem convida)

  // ---------- Título e capa ----------
  tituloSite: "Um Convite Fora do Roteiro",
  capa: {
    selo: "Edição especial · tiragem de um exemplar",
    titulo: "Um Convite Fora do Roteiro",
    subtitulo: "Um romance em sete capítulos curtos, com leve suspeita de fisioterapia.",
    detalhe: "Com ilustrações anatômicas e nenhuma contraindicação",
    botao: "Abrir minha história"
  },

  // ---------- Capítulo 1 ----------
  capitulo1: {
    titulo: "Capítulo um: a ideia",
    paragrafos: [
      "Eu poderia ter mandado um simples “bora sair?”. Seria rápido, eficiente e totalmente sem graça.",
      "Mas aí lembrei que você lê romance, e romance que se preze nunca começa com mensagem de duas palavras. Resolvi caprichar um pouquinho. Só um pouquinho, juro, o resto foi o entusiasmo.",
      "Então senta aí, pega um café imaginário e vê se a autora acertou a mão no primeiro capítulo."
    ],
    botao: "Virar a página"
  },

  // ---------- Fisioterapia do romance ----------
  fisio: {
    titulo: "Capítulo dois: avaliação inicial",
    intro: "Tudo abaixo é ficção e carinho. Nenhum dado clínico foi coletado, só alguns palpites meus.",
    cartoes: [
      { icone: "lupa", titulo: "Anamnese", texto: "Queixa principal do autor: ficar pensando em um jeito de te convidar que não soasse como formulário." },
      { icone: "articulacao", titulo: "Mobilidade", texto: "Amplitude de movimento ótima para sair da rotina e conhecer um lugar novo. Sem contraindicação de café." },
      { icone: "postura", titulo: "Postura", texto: "Tentando manter a pose de quem está tranquilo. Resultado: coluna reta, joelho tremendo." },
      { icone: "batimento", titulo: "Frequência cardíaca", texto: "Medição ficcional. Costuma subir quando a conversa fica boa, e o aparelho é meio dramático." },
      { icone: "prancheta", titulo: "Prognóstico", texto: "Favorável a uma boa conversa, algumas risadas e um final de noite que ninguém queria encerrar. Depende da autora do próximo capítulo: você." }
    ],
    botao: "Continuar a leitura"
  },

  // ---------- Teste ----------
  teste: {
    titulo: "Capítulo três: o teste mais cientificamente duvidoso do romance",
    intro: "Três perguntas, zero validade científica, nenhuma resposta guardada em lugar nenhum.",
    perguntas: [
      {
        pergunta: "Qual seria o cenário ideal para o nosso primeiro capítulo?",
        opcoes: [
          { id: "cafe", texto: "Uma cafeteria aconchegante" },
          { id: "passeio", texto: "Um passeio sem roteiro" },
          { id: "comida", texto: "Um lugar com comida boa e conversa melhor ainda" }
        ]
      },
      {
        pergunta: "Qual clichê literário você aceitaria viver?",
        opcoes: [
          { id: "noite", texto: "O encontro de uma hora que dura a noite inteira" },
          { id: "provoca", texto: "Duas pessoas que começam se provocando e acabam rindo de tudo" },
          { id: "celular", texto: "A conversa tão boa que ninguém lembra do celular" }
        ]
      },
      {
        pergunta: "Qual é o tratamento recomendado para uma semana cansativa?",
        opcoes: [
          { id: "conversa", texto: "Uma boa conversa" },
          { id: "comidaGostosa", texto: "Uma comida gostosa" },
          { id: "historias", texto: "Um passeio que renda boas histórias" }
        ]
      }
    ],
    // Resultado: junta uma frase por resposta. Tudo fictício.
    resultadoTitulo: "Laudo ficcional, sem valor médico nem astrológico",
    resultadoFrases: {
      cafe: "Cenário prescrito: mesa perto da janela, uma bebida quente e nenhum relógio à vista.",
      passeio: "Cenário prescrito: caminhada sem destino fixo, com paradas para qualquer coisa que pareça interessante.",
      comida: "Cenário prescrito: um lugar onde o prato chega rápido e a conversa não quer terminar.",
      noite: "Clichê aprovado: “era só uma hora” e, de repente, o lugar já está fechando.",
      provoca: "Clichê aprovado: provocação leve no início e risada compartilhada no final.",
      celular: "Clichê aprovado: o celular virou um objeto distante, esquecido no bolso.",
      conversa: "Receita para a semana: uma dose generosa de boa conversa, sem prazo de validade.",
      comidaGostosa: "Receita para a semana: comida gostosa, preferencialmente dividida.",
      historias: "Receita para a semana: um passeio que dê assunto para o resto do mês."
    },
    resultadoFinal: "Conclusão: resultado inconclusivo, mas muito simpático. Recomenda-se uma segunda avaliação, presencial.",
    refazer: "Refazer o teste",
    continuar: "Seguir para a carta"
  },

  // ---------- Carta ----------
  carta: {
    titulo: "Capítulo quatro: a carta",
    dica: "Toque no envelope para abrir",
    fecharRotulo: "Fechar a carta",
    corpo: [
      "Algumas histórias começam sem avisar. Ninguém sabe direito o que vem depois e, mesmo assim, dá vontade de virar a página.",
      "Eu gosto de te ver contar o que lê, e me peguei curioso para saber o que você acharia de um capítulo fora do papel.",
      "Sem pressa e sem cobrança. Se parecer boa ideia pra você, o próximo capítulo está logo ali."
    ],
    assinatura: "Do autor, com um pouco de nervosismo",
    botao: "Ir para o convite"
  },

  // ---------- Convite principal ----------
  convite: {
    titulo: "Capítulo cinco: o convite",
    texto: [
      "Agora, falando sério por alguns segundos: eu queria te chamar pra sair.",
      "Sem roteiro perfeito, sem expectativa gigante e sem transformar isso num grande acontecimento. Só a chance de passar um tempo com você, conversar, rir e descobrir como seria esse capítulo fora da tela.",
      "Dia e horário a gente combina depois, do jeito que for melhor pra você."
    ],
    botaoAceito: "Aceito esse capítulo",
    botaoDetalhes: "Quero escolher os detalhes",
    botaoDepois: "Prefiro deixar pra outro momento",
    detalhesTitulo: "Escolha o que combina mais com você",
    detalhesNota: "Escolher aqui não marca nada: data, horário e local a gente combina juntos.",
    opcoes: [
      { id: "cafe", titulo: "Café e conversa", texto: "Calmo, com tempo para papo." },
      { id: "cinema", titulo: "Cinema e comida depois", texto: "Um filme e uma boa análise dele no jantar." },
      { id: "passeio", titulo: "Passeio tranquilo", texto: "Andar, olhar a cidade e ver no que dá." },
      { id: "surpresa", titulo: "Encontro surpresa, com combinado", texto: "Eu proponho, você opina e veta o que quiser antes." },
      { id: "outro", titulo: "Outro programa", texto: "Tem uma ideia melhor? Escreve abaixo." }
    ],
    campoOutroRotulo: "Sua sugestão (opcional)",
    campoOutroPlaceholder: "Ex.: livraria e sorvete",
    botaoConfirmarDetalhes: "Ver minhas escolhas",
    avisoSemEscolha: "Escolha uma opção ou, se preferir, volte e aceite sem detalhes.",
    botaoVoltar: "Voltar"
  },

  // ---------- Encerramento ----------
  final: {
    aceito: {
      titulo: "Capítulo seis: o próximo capítulo",
      comemoracao: "Combinado!",
      texto: [
        "Pronto. A parte mais difícil foi criar o site. Agora falta escolher o cenário, decidir o lanche e descobrir se a química funciona tão bem fora da literatura.",
        "Quando quiser, me avisa por onde preferir e a gente marca. Prometo ter um plano B e um guarda-chuva."
      ]
    },
    detalhes: {
      titulo: "Capítulo seis: a sinopse do encontro",
      intro: "Suas escolhas, como numa contracapa:",
      rotuloPrograma: "Programa",
      rotuloSugestao: "Sua sugestão",
      rotuloData: "Data e horário",
      valorData: "a combinar, juntos",
      texto: [
        "Anotado. Ainda dá pra mudar qualquer coisa: o rascunho é seu.",
        "Depois me conta como quer seguir e a gente fecha o resto."
      ],
      botaoRevisar: "Rever escolhas"
    },
    depois: {
      titulo: "Capítulo seis: ponto e vírgula",
      texto: [
        "Tudo bem, sem problema nenhum. Obrigado por ter lido até aqui, de coração.",
        "Todo livro merece ser retomado no tempo certo, e este fica na estante sem cobrança."
      ]
    },
    curiosidadeBotao: "Revelar uma última curiosidade",
    curiosidade: "Curiosidade: na maioria dos romances, o casal só se fala no capítulo três. Aqui a gente já adiantou o enredo.",
    reiniciar: "Ler de novo desde a capa"
  },

  // ---------- Clichês (extra) ----------
  cliches: {
    titulo: "Clichês que a gente perdoa",
    dica: "Toque em cada cartão",
    itens: [
      "A chuva que começa justo na hora de ir embora.",
      "O livro emprestado que nunca volta, de propósito.",
      "A conversa de cinco minutos que vira duas horas.",
      "O “só mais um capítulo” às três da manhã."
    ]
  },

  // ---------- Cores ----------
  cores: {
    papel: "#f4ead7",
    papelClaro: "#fbf5e9",
    vinho: "#6f1d2b",
    rosa: "#c98a96",
    marrom: "#6b4f3f",
    tinta: "#3a2a22"
  }
};
