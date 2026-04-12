'use strict';

/* ══════════════════════════════════════════════════════════════════════
   THEME TOGGLE
══════════════════════════════════════════════════════════════════════ */
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let current = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', current);

  const moon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const sun  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;

  function setTheme(t) {
    current = t;
    root.setAttribute('data-theme', t);
    if (toggle) toggle.innerHTML = t === 'dark' ? sun : moon;
  }
  setTheme(current);
  if (toggle) toggle.addEventListener('click', () => setTheme(current === 'dark' ? 'light' : 'dark'));
})();

/* ══════════════════════════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════════════════════════ */
function navigateTo(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
  document.querySelectorAll(`.nav-tab[data-section="${id}"]`).forEach(t => t.classList.add('active'));
}

document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => navigateTo(tab.dataset.section));
});
document.querySelectorAll('[data-go]').forEach(el => {
  el.addEventListener('click', () => navigateTo(el.dataset.go));
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateTo(el.dataset.go); }});
});

/* ══════════════════════════════════════════════════════════════════════
   SDLC EXPLORER — ACCORDION
══════════════════════════════════════════════════════════════════════ */
document.querySelectorAll('[data-expand]').forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = btn.dataset.expand;
    const layer = btn.closest('.sdlc-layer');
    const isOpen = layer.classList.contains('open');
    // Close all first
    document.querySelectorAll('.sdlc-layer').forEach(l => l.classList.remove('open'));
    if (!isOpen) layer.classList.add('open');
  });
});
// Open first by default
document.querySelector('.sdlc-layer')?.classList.add('open');

/* ══════════════════════════════════════════════════════════════════════
   MODELS — PHASE DATA
══════════════════════════════════════════════════════════════════════ */
const phaseData = {
  cascata: {
    color: 'var(--color-blue)',
    phases: {
      c0: {
        num: 'Fase 1',
        title: 'Planejamento',
        desc: 'A fase de planejamento define o escopo do projeto, analisa a viabilidade técnica, econômica e operacional, e produz estimativas de custo, prazo e recursos necessários. É o alicerce de todo o projeto.',
        activities: ['Análise de viabilidade (técnica, econômica, operacional)', 'Definição de escopo e objetivos', 'Estimativas de prazo e custo', 'Identificação de stakeholders'],
        artifact: { label: 'Artefato principal', value: 'Plano de Projeto / Estudo de Viabilidade' }
      },
      c1: {
        num: 'Fase 2',
        title: 'Análise de Requisitos',
        desc: 'Levantamento detalhado e especificação formal de todos os requisitos funcionais e não-funcionais. O documento produzido nesta fase serve de contrato entre cliente e equipe técnica.',
        activities: ['Entrevistas e workshops com usuários', 'Documentação de requisitos funcionais e não-funcionais', 'Revisão e aprovação formal pelo cliente', 'Identificação de restrições técnicas'],
        artifact: { label: 'Artefato principal', value: 'Documento de Especificação de Requisitos (ERS)' }
      },
      c2: {
        num: 'Fase 3',
        title: 'Projeto (Design)',
        desc: 'Tradução dos requisitos em uma arquitetura técnica detalhada. Aqui se definem a estrutura do sistema, o modelo de dados, as interfaces e os componentes que serão implementados.',
        activities: ['Arquitetura do sistema (camadas, módulos)', 'Modelagem de dados (DER, modelo relacional)', 'Design de interfaces (wireframes, protótipos de tela)', 'Especificação de APIs e integrações'],
        artifact: { label: 'Artefato principal', value: 'Documento de Arquitetura / DER / Protótipos' }
      },
      c3: {
        num: 'Fase 4',
        title: 'Implementação',
        desc: 'A codificação propriamente dita. Os desenvolvedores constroem os módulos definidos no design, seguindo padrões de codificação e integrando os componentes do sistema.',
        activities: ['Codificação dos módulos conforme especificação', 'Integração entre componentes', 'Testes unitários pelos próprios desenvolvedores', 'Revisão de código (code review)'],
        artifact: { label: 'Artefato principal', value: 'Código-fonte / Build executável' }
      },
      c4: {
        num: 'Fase 5',
        title: 'Testes e Verificação',
        desc: 'Fase formal de validação e verificação. Testes de integração, sistema e aceitação são executados para garantir que o software atende aos requisitos especificados na fase 2.',
        activities: ['Testes de integração e sistema', 'Testes de aceitação pelo usuário (UAT)', 'Identificação e correção de defeitos', 'Homologação formal pelo cliente'],
        artifact: { label: 'Artefato principal', value: 'Relatório de Testes / Ata de Homologação' }
      },
      c5: {
        num: 'Fase 6',
        title: 'Implantação',
        desc: 'Deploy do sistema em ambiente de produção. Inclui migração de dados, treinamento dos usuários finais e ativação do sistema com suporte intensivo inicial.',
        activities: ['Deploy em ambiente de produção', 'Migração de dados do sistema legado', 'Treinamento de usuários finais', 'Documentação de operação e manuais'],
        artifact: { label: 'Artefato principal', value: 'Sistema em Produção / Manual do Usuário' }
      },
      c6: {
        num: 'Fase 7',
        title: 'Manutenção',
        desc: 'Ciclo contínuo pós-entrega: correção de defeitos encontrados em produção, adaptações a mudanças legais ou de ambiente, e melhorias solicitadas pelos usuários.',
        activities: ['Correção de defeitos (manutenção corretiva)', 'Adaptações a mudanças de ambiente ou legislação', 'Melhorias incrementais (manutenção evolutiva)', 'Monitoramento de performance e disponibilidade'],
        artifact: { label: 'Duração típica', value: 'Meses a anos após a implantação' }
      }
    }
  },
  rad: {
    color: 'var(--color-primary)',
    phases: {
      r0: {
        num: 'Fase 1',
        title: 'Planejamento de Requisitos',
        desc: 'Workshops JRP (Joint Requirements Planning) reúnem usuários-chave, gerentes e desenvolvedores para definir o escopo do sistema, identificar as funções críticas e estabelecer prioridades para as versões.',
        activities: ['Workshop JRP intensivo com todos os stakeholders', 'Levantamento de funções prioritárias por versão', 'Definição do escopo do timebox (60–90 dias)', 'Identificação dos "Ambassador Users" — representantes do negócio'],
        artifact: { label: 'Artefato principal', value: 'Plano de Versões / Backlog inicial de funções' }
      },
      r1: {
        num: 'Fase 2',
        title: 'Design do Usuário (JAD)',
        desc: 'Sessões JAD (Joint Application Design) são conduzidas com usuários ativos que colaboram diretamente na concepção das telas, fluxos e protótipos. O resultado é validado a cada iteração — não apenas ao final.',
        activities: ['Sessões JAD facilitadas pelo SWAT Team', 'Desenvolvimento iterativo de protótipos de interface', 'Feedback imediato do usuário sobre protótipos', 'Refinamento contínuo até aprovação do usuário'],
        artifact: { label: 'Artefato principal', value: 'Protótipos validados / Especificações de tela' }
      },
      r2: {
        num: 'Fase 3',
        title: 'Construção (CASE)',
        desc: 'O SWAT Team utiliza ferramentas CASE (Computer-Aided Software Engineering) para acelerar a geração de código a partir dos protótipos aprovados. A fase de construção e design ocorrem em paralelo, iterando até a aprovação.',
        activities: ['Geração de código com ferramentas CASE', 'Integração com componentes e sistemas legados', 'Testes contínuos durante a construção', 'Iteração entre design e construção até aprovação'],
        artifact: { label: 'Ferramentas', value: 'CASE tools / Geradores de código / IDEs' }
      },
      r3: {
        num: 'Fase 4',
        title: 'Cutover (Transição)',
        desc: 'A fase de transição engloba os testes finais de integração, treinamento dos usuários na versão entregue e implantação em produção. Ao contrário do Cascata, esta é apenas uma versão — o timebox reinicia para V2.',
        activities: ['Testes finais de integração e aceitação', 'Treinamento dos usuários na versão entregue', 'Implantação em produção', 'Início do planejamento para a próxima versão (V2)'],
        artifact: { label: 'Diferencial RAD', value: 'Esta é uma versão — o ciclo recomeça para V2, V3…' }
      }
    }
  },
  scrum: {
    color: 'var(--color-purple)',
    phases: {
      s0: {
        num: 'Artefato — PO',
        title: 'Product Backlog',
        desc: 'Lista ordenada de tudo que é necessário para o produto. É de responsabilidade exclusiva do Product Owner (PO), que prioriza itens com base no valor de negócio. Está em constante evolução ao longo do projeto.',
        activities: ['Criação e refinamento contínuo de User Stories', 'Priorização por valor de negócio (PO)', 'Estimativas de esforço pelo Dev Team', 'Decomposição de épicos em histórias menores'],
        artifact: { label: 'Formato típico', value: 'User Stories: "Como [usuário], quero [função] para [benefício]"' }
      },
      s1: {
        num: 'Cerimônia',
        title: 'Sprint Planning',
        desc: 'Reunião no início de cada Sprint onde o time seleciona itens do Product Backlog para o Sprint Backlog. O Dev Team define como o trabalho será executado, estimando as tarefas necessárias.',
        activities: ['Seleção de histórias para o sprint (capacidade do time)', 'Criação do Sprint Goal — objetivo do sprint', 'Decomposição de histórias em tarefas técnicas', 'Definição de "Pronto" (Definition of Done)'],
        artifact: { label: 'Duração', value: 'Máx. 8 horas para um sprint de 4 semanas (proporcional)' }
      },
      s2: {
        num: 'Coração do Scrum',
        title: 'Sprint (1–4 semanas)',
        desc: 'O timebox central do Scrum. Nenhuma mudança é permitida que coloque o Sprint Goal em risco. O Dev Team se auto-organiza para entregar o incremento acordado. Inclui Daily Scrum, desenvolvimento e testes contínuos.',
        activities: ['Daily Scrum: sincronização diária de 15 minutos', 'Desenvolvimento das histórias selecionadas', 'Testes automatizados e manuais contínuos', 'Atualização do Sprint Backlog e Burndown'],
        artifact: { label: 'Princípio', value: 'Escopo fixo, prazo fixo. Qualidade não é negociável.' }
      },
      s3: {
        num: 'Cerimônia',
        title: 'Sprint Review',
        desc: 'O time demonstra o incremento entregue aos stakeholders. É uma reunião de inspeção e adaptação do Product Backlog — não uma apresentação formal. Stakeholders dão feedback que orienta o próximo sprint.',
        activities: ['Demonstração do incremento funcionando', 'Feedback dos stakeholders e clientes', 'Atualização do Product Backlog conforme feedback', 'Discussão sobre o que foi e o que não foi entregue'],
        artifact: { label: 'Duração', value: 'Máx. 4 horas para um sprint de 4 semanas' }
      },
      s4: {
        num: 'Artefato',
        title: 'Incremento Entregável',
        desc: 'Resultado concreto do sprint: software funcionando, testado e pronto para ser entregue em produção (se o PO decidir). Cada incremento deve atender à Definition of Done definida pelo time.',
        activities: ['Software funcionando e testado', 'Atende à Definition of Done (DoD)', 'Integrado a incrementos anteriores', 'Potencialmente entregável em produção'],
        artifact: { label: 'Conceito-chave', value: 'Não é protótipo — é software potencialmente entregável' }
      },
      s5: {
        num: 'Cerimônia',
        title: 'Retrospectiva',
        desc: 'O Scrum Master facilita uma reunião de melhoria contínua: o time inspeciona seu próprio processo (pessoas, relações, ferramentas) e define ações concretas para o próximo sprint.',
        activities: ['O que foi bem no sprint? (manter)', 'O que pode melhorar? (identificar)', 'Definição de ações concretas para o próximo sprint', 'Revisão das ações da retrospectiva anterior'],
        artifact: { label: 'Duração', value: 'Máx. 3 horas para um sprint de 4 semanas' }
      }
    }
  }
};

/* ══════════════════════════════════════════════════════════════════════
   MODELS — INTERACTION
══════════════════════════════════════════════════════════════════════ */
// Tab switching
document.querySelectorAll('.model-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.model-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    document.querySelectorAll('.model-view').forEach(v => v.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const view = document.getElementById('model-' + tab.dataset.model);
    if (view) view.classList.add('active');
  });
});

// Phase click — show detail
function showDetail(modelKey, phaseKey) {
  const model = phaseData[modelKey];
  const phase = model?.phases[phaseKey];
  if (!phase) return;

  const panel = document.getElementById('detail-' + modelKey);
  if (!panel) return;

  panel.innerHTML = `
    <div class="detail-content" style="--detail-color: ${model.color}">
      <div class="detail-phase-num">${phase.num}</div>
      <h4>${phase.title}</h4>
      <p>${phase.desc}</p>
      <div class="detail-activities">
        ${phase.activities.map(a => `<div class="detail-activity">${a}</div>`).join('')}
      </div>
      <div class="detail-artifact">
        <strong>${phase.artifact.label}</strong>
        ${phase.artifact.value}
      </div>
    </div>`;
}

document.querySelectorAll('.flow-phase[data-phase]').forEach(el => {
  el.addEventListener('click', () => {
    const modelKey = el.dataset.modelKey;
    const phaseKey = el.dataset.phase;

    // Remove active from siblings
    el.closest('.flow-phases')?.querySelectorAll('.flow-phase').forEach(p => p.classList.remove('active'));
    el.classList.add('active');

    showDetail(modelKey, phaseKey);
  });
});

// Auto-select first phase of each model on tab switch
document.querySelectorAll('.model-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const modelKey = tab.dataset.model;
    const firstPhase = document.querySelector(`#phases-${modelKey} .flow-phase[data-phase]`);
    if (firstPhase) {
      firstPhase.click();
    }
  });
});

// Auto-click first phase on load for cascata
setTimeout(() => {
  const first = document.querySelector('#phases-cascata .flow-phase[data-phase]');
  if (first) first.click();
}, 100);

/* ══════════════════════════════════════════════════════════════════════
   COMPARE — FILTER
══════════════════════════════════════════════════════════════════════ */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const col = btn.dataset.col;
    const tbody = document.getElementById('compare-body');
    const table = tbody.closest('table');

    if (col === 'all') {
      table.classList.remove('filter-active');
      tbody.querySelectorAll('td').forEach(td => { td.classList.remove('highlighted', 'dimmed'); });
    } else {
      table.classList.add('filter-active');
      tbody.querySelectorAll('td').forEach(td => {
        td.classList.remove('highlighted', 'dimmed');
        if (td.classList.contains('col-' + col)) td.classList.add('highlighted');
        else if (td.classList.contains('criterion')) {/* keep */}
        else td.classList.add('dimmed');
      });
    }
  });
});

// Row hover — highlight
document.querySelectorAll('.compare-row').forEach(row => {
  row.addEventListener('mouseenter', () => row.style.setProperty('--row-highlight', '1'));
  row.addEventListener('mouseleave', () => row.style.removeProperty('--row-highlight'));
});

/* ══════════════════════════════════════════════════════════════════════
   QUIZ DATA
══════════════════════════════════════════════════════════════════════ */
const QUIZ = [
  {
    tag: 'SDLC',
    question: 'O que significa a sigla SDLC?',
    options: [
      'Software Development Lifecycle',
      'System Design and Logic Configuration',
      'Software Deployment and Launch Control',
      'Structured Data and Logic Cycle'
    ],
    correct: 0,
    feedback: 'SDLC (Software Development Life Cycle) é o conjunto estruturado de fases que organiza a criação de sistemas de software, desde o planejamento até a manutenção.'
  },
  {
    tag: 'Cascata',
    question: 'Qual é a principal característica do Modelo Cascata?',
    options: [
      'Entregas incrementais a cada sprint',
      'Fases sequenciais, onde cada fase deve ser concluída antes da próxima iniciar',
      'Iterações rápidas com participação intensa do usuário',
      'Ausência de documentação formal'
    ],
    correct: 1,
    feedback: 'O Cascata é linear e sequencial: cada fase (planejamento, análise, design…) deve ser formalmente concluída e aprovada antes de avançar. Isso o torna rígido, mas previsível.'
  },
  {
    tag: 'RAD',
    question: 'O que são as sessões JAD no contexto do RAD?',
    options: [
      'Reuniões diárias de 15 minutos para sincronização da equipe',
      'Testes automatizados de aceitação do usuário',
      'Workshops colaborativos onde usuários participam ativamente do design do sistema',
      'Revisões formais de código entre desenvolvedores'
    ],
    correct: 2,
    feedback: 'JAD (Joint Application Design) são sessões facilitadas onde desenvolvedores e usuários colaboram diretamente na concepção do sistema, validando protótipos em tempo real. É uma das grandes inovações do RAD.'
  },
  {
    tag: 'Ágil',
    question: 'Por que o Ágil NÃO é uma metodologia de desenvolvimento?',
    options: [
      'Porque é muito recente para ser considerado metodologia',
      'Porque não possui documentação',
      'Porque é um conjunto de valores e princípios — uma filosofia — não um processo prescritivo',
      'Porque só funciona com times pequenos'
    ],
    correct: 2,
    feedback: 'O Manifesto Ágil (2001) declara valores e princípios, não processos. Scrum, XP e Kanban são os frameworks que operacionalizam esses valores com papéis e cerimônias concretas.'
  },
  {
    tag: 'Scrum',
    question: 'Qual é o papel do Product Owner (PO) no Scrum?',
    options: [
      'Facilitar as cerimônias e remover impedimentos do time',
      'Escrever código e realizar testes junto com o Dev Team',
      'Representar o negócio, definir prioridades do backlog e maximizar o valor do produto',
      'Gerenciar o cronograma e o orçamento do projeto'
    ],
    correct: 2,
    feedback: 'O PO é o dono do Product Backlog — responsável por maximizar o valor do produto, priorizando histórias com base no retorno para o negócio. É a voz do cliente dentro do time.'
  },
  {
    tag: 'Comparativo',
    question: 'Em qual cenário o Modelo Cascata ainda é mais adequado?',
    options: [
      'Startups de tecnologia com produto inovador',
      'Sistemas com requisitos muito voláteis e usuários ativos',
      'Sistemas críticos com requisitos estáveis, como software de controle de voo',
      'Desenvolvimento de aplicativos mobile com entregas frequentes'
    ],
    correct: 2,
    feedback: 'O Cascata é ideal quando os requisitos são estáveis, bem definidos desde o início e o custo de mudança precisa ser mínimo — como em sistemas aeroespaciais, militares ou contratos governamentais regulados.'
  },
  {
    tag: 'RAD',
    question: 'O que é o "timebox" no modelo RAD?',
    options: [
      'Um relatório de tempo gasto por desenvolvedor',
      'Um sprint de 2 semanas do Scrum adaptado para RAD',
      'Um prazo fixo (60–90 dias) dentro do qual uma versão completa do sistema é entregue',
      'Uma ferramenta de gerenciamento de backlog'
    ],
    correct: 2,
    feedback: 'O timebox do RAD é uma janela de tempo fixa (tipicamente 60 a 90 dias) na qual o SWAT Team completa um ciclo design-construção e entrega uma versão funcional. Se o prazo acabar, escopo é cortado — o prazo nunca.'
  },
  {
    tag: 'Scrum',
    question: 'O que acontece na Retrospectiva do Scrum?',
    options: [
      'Demonstração do incremento entregue para os stakeholders',
      'O time inspeciona seu próprio processo e define ações de melhoria para o próximo sprint',
      'Planejamento das histórias para o próximo sprint',
      'Revisão do Product Backlog com o Product Owner'
    ],
    correct: 1,
    feedback: 'A Retrospectiva é a cerimônia de melhoria contínua: o time reflete sobre pessoas, relações e ferramentas — não sobre o produto. O resultado é um conjunto de ações concretas para o próximo sprint.'
  },
  {
    tag: 'SDLC',
    question: 'Qual foi o legado histórico do RAD para as metodologias ágeis?',
    options: [
      'O RAD criou o Manifesto Ágil diretamente em 2001',
      'O RAD introduziu conceitos como timeboxing, prototipação iterativa e envolvimento do usuário, que foram absorvidos pelo Ágil',
      'O RAD substituiu o Ágil em grandes empresas',
      'O RAD não teve influência sobre as metodologias ágeis'
    ],
    correct: 1,
    feedback: 'O RAD (1991) foi uma ponte fundamental: introduziu o timeboxing, as iterações com usuário, os protótipos evolutivos e as equipes multifuncionais — todos conceitos que aparecem nos frameworks ágeis dos anos 2000.'
  },
  {
    tag: 'Comparativo',
    question: 'Qual é a principal diferença no custo de mudança entre Cascata e Ágil?',
    options: [
      'No Cascata, mudanças são baratas pois a documentação é completa',
      'No Ágil, mudanças são caras por envolver refatoração de código',
      'No Cascata, mudanças tardias são caras pois exigem rever fases já concluídas; no Ágil, são esperadas e absorvidas no próximo sprint',
      'Ambos têm o mesmo custo de mudança, dependendo apenas da equipe'
    ],
    correct: 2,
    feedback: 'No Cascata, cada fase gera artefatos aprovados — mudar um requisito pode invalidar design, código e testes. No Ágil, o backlog é dinâmico e mudanças são incorporadas naturalmente no próximo sprint.'
  }
];

/* ══════════════════════════════════════════════════════════════════════
   QUIZ ENGINE
══════════════════════════════════════════════════════════════════════ */
let quizState = { current: 0, score: 0, answered: false };

function renderQuestion() {
  const q = QUIZ[quizState.current];
  const pct = (quizState.current / QUIZ.length) * 100;
  document.getElementById('quiz-progress-fill').style.width = pct + '%';
  document.getElementById('quiz-counter').textContent = `Questão ${quizState.current + 1} de ${QUIZ.length}`;

  const letters = ['A', 'B', 'C', 'D'];
  document.getElementById('quiz-card').innerHTML = `
    <div class="quiz-tag">${q.tag}</div>
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" data-idx="${i}" aria-label="Opção ${letters[i]}: ${opt}">
          <span class="option-letter">${letters[i]}</span>
          <span>${opt}</span>
        </button>`).join('')}
    </div>`;

  document.getElementById('quiz-next').disabled = true;
  quizState.answered = false;

  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.idx)));
  });
}

function handleAnswer(idx) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = QUIZ[quizState.current];
  const options = document.querySelectorAll('.quiz-option');
  options.forEach(b => b.disabled = true);

  const selected = options[idx];
  const correct = options[q.correct];

  if (idx === q.correct) {
    selected.classList.add('correct');
    quizState.score++;
    const fb = createFeedback(true, '✓ Correto!', q.feedback);
    document.getElementById('quiz-card').appendChild(fb);
  } else {
    selected.classList.add('wrong');
    correct.classList.add('correct');
    const fb = createFeedback(false, '✗ Incorreto', `A resposta correta é: <strong>${q.options[q.correct]}</strong>. ${q.feedback}`);
    document.getElementById('quiz-card').appendChild(fb);
  }

  document.getElementById('quiz-next').disabled = false;
}

function createFeedback(isCorrect, title, text) {
  const div = document.createElement('div');
  div.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'wrong');
  div.innerHTML = `<strong>${title}</strong>${text}`;
  return div;
}

document.getElementById('quiz-next')?.addEventListener('click', () => {
  quizState.current++;
  if (quizState.current >= QUIZ.length) {
    showResult();
  } else {
    renderQuestion();
  }
});

function showResult() {
  document.getElementById('quiz-progress-fill').style.width = '100%';
  document.getElementById('quiz-counter').textContent = 'Concluído!';
  document.getElementById('quiz-card').innerHTML = '';
  document.getElementById('quiz-controls').style.display = 'none';

  const result = document.getElementById('quiz-result');
  const score = quizState.score;
  const total = QUIZ.length;
  const pct = Math.round((score / total) * 100);

  let icon, title, msg;
  if (pct >= 90) { icon = '🎓'; title = 'Excelente!'; msg = 'Domínio completo do conteúdo. Você está muito bem preparado para a apresentação.'; }
  else if (pct >= 70) { icon = '👏'; title = 'Muito bom!'; msg = 'Você compreende os conceitos principais. Revise os tópicos em que errou para consolidar.'; }
  else if (pct >= 50) { icon = '📚'; title = 'Bom começo.'; msg = 'Metade do caminho percorrido. Volte ao Explorer e aos Modelos para reforçar os pontos de dúvida.'; }
  else { icon = '🔍'; title = 'Continue estudando.'; msg = 'Explore as seções anteriores — Explorer, Modelos e Comparativo — antes de tentar novamente.'; }

  document.getElementById('result-icon').textContent = icon;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-msg').textContent = msg;
  document.getElementById('result-score').textContent = `${score} / ${total} (${pct}%)`;

  result.hidden = false;
}

document.getElementById('quiz-restart')?.addEventListener('click', () => {
  quizState = { current: 0, score: 0, answered: false };
  document.getElementById('quiz-result').hidden = true;
  document.getElementById('quiz-controls').style.display = '';
  renderQuestion();
});

// Init quiz
renderQuestion();

/* ══════════════════════════════════════════════════════════════════════
   MOBILE NAV — inject below header
══════════════════════════════════════════════════════════════════════ */
if (window.innerWidth <= 768) {
  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  const sections = [['hero','Início'],['explorer','Explorer'],['models','Modelos'],['compare','Comparar'],['quiz','Quiz']];
  sections.forEach(([id, label]) => {
    const btn = document.createElement('button');
    btn.className = 'nav-tab' + (id === 'hero' ? ' active' : '');
    btn.dataset.section = id;
    btn.textContent = label;
    btn.addEventListener('click', () => navigateTo(id));
    mobileNav.appendChild(btn);
  });
  document.querySelector('.header-inner')?.appendChild(mobileNav);
}
