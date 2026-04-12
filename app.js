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
   QUIZ DATA — Foco no RAD
══════════════════════════════════════════════════════════════════════ */
const QUIZ = [
  {
    tag: 'RAD — Origem',
    question: 'Quem criou o modelo RAD e em que ano foi publicado?',
    options: [
      'Kent Beck, em 1999, como base do Extreme Programming',
      'James Martin, em 1991, no livro "Rapid Application Development"',
      'Barry Boehm, em 1986, como evolução do Modelo Espiral',
      'Ken Schwaber, em 1995, junto com o framework Scrum'
    ],
    correct: 1,
    feedback: 'James Martin formalizou o RAD em 1991 no livro homônimo. Martin foi consultor de TI e percebeu que os projetos Cascata entregavam sistemas desatualizados — o RAD nasceu como resposta direta a essa limitação.'
  },
  {
    tag: 'RAD — Contexto histórico',
    question: 'Qual era o principal problema dos projetos de software nos anos 1980 que motivou a criação do RAD?',
    options: [
      'A falta de linguagens de programação orientadas a objetos',
      'O alto custo dos computadores pessoais',
      'Projetos Cascata demoravam tanto que os sistemas entregues já estavam desatualizados',
      'A ausência de banco de dados relacionais nos servidores'
    ],
    correct: 2,
    feedback: 'Nos anos 1980, projetos Cascata típicos levavam 2 a 4 anos. Ao serem entregues, os requisitos de negócio já haviam mudado. Martin chamou isso de "the application backlog" — filas de projetos atrasados e sistemas obsoletos na entrega.'
  },
  {
    tag: 'RAD — Fase 1',
    question: 'O que ocorre na fase de Planejamento de Requisitos do RAD?',
    options: [
      'A equipe codifica protótipos de alta fidelidade sem participação do usuário',
      'Workshops JRP reúnem usuários, gerentes e desenvolvedores para definir escopo e prioridades por versão',
      'O Scrum Master planeja os sprints do próximo trimestre',
      'É produzido o documento ERS completo, como no Cascata'
    ],
    correct: 1,
    feedback: 'No Planejamento de Requisitos do RAD, sessões JRP (Joint Requirements Planning) reúnem todos os stakeholders em workshops intensivos. O objetivo não é especificar tudo, mas priorizar funções críticas e definir o escopo do timebox — diferente do Cascata, que exige especificação completa antes de avançar.'
  },
  {
    tag: 'RAD — JAD',
    question: 'O que significa JAD e qual é seu papel no RAD?',
    options: [
      'Java Application Design — linguagem usada para protótipos rápidos',
      'Joint Application Design — sessões colaborativas onde usuários e desenvolvedores projetam o sistema juntos',
      'Just-in-time Agile Development — técnica de entrega contínua',
      'Joint Automated Deployment — automação de ambientes de teste'
    ],
    correct: 1,
    feedback: 'JAD (Joint Application Design) são sessões estruturadas facilitadas por um especialista onde usuários de negócio e desenvolvedores colaboram diretamente na concepção de telas, fluxos e regras. O usuário valida protótipos em tempo real — não ao final do projeto. Isso reduz drasticamente retrabalho por requisitos mal compreendidos.'
  },
  {
    tag: 'RAD — SWAT Team',
    question: 'O que é um "SWAT Team" no contexto do RAD?',
    options: [
      'Equipe de segurança responsável por auditar o código produzido',
      'Time multifuncional altamente qualificado: desenvolvedores, usuários e especialistas trabalhando em conjunto no timebox',
      'Grupo de testadores que valida o sistema antes da entrega',
      'Comitê de gerentes que aprova as versões do sistema'
    ],
    correct: 1,
    feedback: 'SWAT (Skilled Workers with Advanced Tools) é a equipe central do RAD: pequena (4 a 6 pessoas), multifuncional, com desenvolvedores experientes, usuários representantes e ferramentas CASE. O time permanece dedicado ao projeto pelo período do timebox, sem interrupções externas.'
  },
  {
    tag: 'RAD — Timebox',
    question: 'Qual é a regra fundamental do timebox no RAD?',
    options: [
      'O escopo é fixo e o prazo pode ser estendido se necessário',
      'O prazo é fixo; se o tempo acabar, o escopo é reduzido — funcionalidades menos prioritárias ficam para a próxima versão',
      'O orçamento é fixo, mas prazo e escopo podem variar',
      'O timebox dura exatamente 2 semanas, igual ao sprint do Scrum'
    ],
    correct: 1,
    feedback: 'No RAD, o timebox tem prazo fixo de 60 a 90 dias. Se o tempo esgotar antes de tudo estar pronto, as funcionalidades de menor prioridade são movidas para a próxima versão — nunca se estende o prazo. Essa regra força priorização constante e evita o "scope creep" clássico dos projetos Cascata.'
  },
  {
    tag: 'RAD — Fase 2 e 3',
    question: 'Como as fases de Design do Usuário e Construção se relacionam no RAD?',
    options: [
      'São fases independentes executadas em sequência, sem sobreposição',
      'Ocorrem em paralelo e em ciclos: protótipos são construídos, apresentados ao usuário, refinados e reconstruídos iterativamente',
      'Design é feito por consultores externos; Construção é feita pela equipe interna',
      'Design ocorre uma única vez no início; Construção dura o restante do timebox'
    ],
    correct: 1,
    feedback: 'No coração do RAD, Design e Construção são iterativos e paralelos. O SWAT Team constrói um protótipo, o usuário valida em sessão JAD, o feedback é incorporado imediatamente e um novo protótipo é gerado. Esse ciclo se repete até a aprovação — tornando o resultado muito mais alinhado às necessidades reais.'
  },
  {
    tag: 'RAD — Ferramentas CASE',
    question: 'Qual era o papel das ferramentas CASE no Modelo RAD original de James Martin?',
    options: [
      'Gerenciar sprints e o backlog de funcionalidades da equipe',
      'Acelerar a geração de código a partir de modelos e protótipos, reduzindo o esforço manual de programação',
      'Automatizar os testes de aceitação do usuário no final do timebox',
      'Controlar o versionamento do código durante as iterações'
    ],
    correct: 1,
    feedback: 'CASE (Computer-Aided Software Engineering) era um conjunto de ferramentas que geravam código automaticamente a partir de diagramas e modelos. Martin apostava nelas para viabilizar o timebox de 60 a 90 dias — sem a geração automática de código, a velocidade necessária seria impossível com as equipes da época.'
  },
  {
    tag: 'RAD — Cutover',
    question: 'O que distingue a fase Cutover do RAD da fase de Implantação do Cascata?',
    options: [
      'No RAD, o Cutover é mais longo pois exige documentação extensa antes do go-live',
      'No RAD, o Cutover encerra apenas uma versão — o ciclo recomeça para V2, V3; no Cascata, a Implantação encerra o projeto',
      'No Cascata, a Implantação ocorre sem treinamento de usuários; no RAD, o Cutover inclui treinamento intensivo',
      'Não há distinção — ambas as fases são equivalentes nos dois modelos'
    ],
    correct: 1,
    feedback: 'Essa é uma diferença estrutural fundamental: no Cascata, a Implantação marca o fim do projeto. No RAD, o Cutover encerra apenas uma versão (V1). Após a entrega, a equipe reinicia o timebox para V2, incorporando novos requisitos e feedback. O RAD é multiversion por natureza.'
  },
  {
    tag: 'RAD — Limitações',
    question: 'Qual é uma limitação reconhecida do Modelo RAD?',
    options: [
      'Não permite qualquer tipo de prototipação durante o desenvolvimento',
      'Exige envolvimento intenso e disponibilidade constante do usuário — sem isso, o modelo colapsa',
      'Só funciona com equipes de mais de 20 desenvolvedores',
      'Proíbe o uso de ferramentas visuais ou IDEs modernas'
    ],
    correct: 1,
    feedback: 'O RAD tem uma dependência crítica: o usuário precisa participar ativamente das sessões JAD e estar disponível para validar protótipos regularmente. Se o cliente não tiver tempo ou interesse, as iterações ficam sem feedback real e o timebox perde seu propósito. Projetos com clientes ausentes ou instáveis tendem a falhar com RAD.'
  },
  {
    tag: 'RAD — Legado',
    question: 'Qual conceito do RAD foi diretamente absorvido pelos frameworks ágeis modernos?',
    options: [
      'A geração automática de código por ferramentas CASE',
      'A documentação extensa produzida antes do desenvolvimento',
      'O timebox com entregas parciais, a prototipação iterativa e o envolvimento contínuo do usuário',
      'A divisão do time em equipes separadas de design e construção'
    ],
    correct: 2,
    feedback: 'O legado do RAD para o Ágil é direto e reconhecido: o Scrum herdou o timebox (sprint), a entrega incremental por versões e o envolvimento do usuário (Product Owner). O Manifesto Ágil de 2001 foi assinado por profissionais que conheciam e praticavam RAD, XP e DSDM — todos inspirados no trabalho de Martin.'
  },
  {
    tag: 'RAD vs. outros',
    question: 'Por que o RAD é considerado uma "ponte" entre o Cascata e o Ágil?',
    options: [
      'Porque surgiu exatamente ao mesmo tempo que o Manifesto Ágil',
      'Porque manteve a estrutura documental do Cascata e ignorou a participação do usuário',
      'Porque introduziu iteratividade, prototipação e envolvimento do usuário sem abandonar completamente a estrutura de fases do Cascata',
      'Porque é um framework certificado pela mesma organização que criou o Scrum'
    ],
    correct: 2,
    feedback: 'O RAD ocupa um lugar único na história: manteve fases identificáveis (como o Cascata) mas as tornou iterativas e orientadas ao usuário (como o Ágil). Publicado em 1991, antecedeu o Manifesto Ágil em 10 anos e pavimentou conceitos fundamentais — prova de que a transição para o Ágil não foi uma ruptura, mas uma evolução gradual.'
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
