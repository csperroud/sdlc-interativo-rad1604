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
        title: 'Construção Rápida',
        desc: 'O SWAT Team converte os protótipos aprovados nas sessões JAD em código funcional. A construção é iterativa: subequipes produzem módulos em ciclos curtos de duas a três semanas, revisados com os usuários. O resultado percorre a cadeia P1 → P2 → Pn → alfa → beta → Release Candidate, até a aprovação para o Cutover.',
        activities: ['Subequipes constroem módulos em ciclos curtos (2–3 semanas)', 'Integração incremental — sem lacuna de integração ao final', 'Testes contínuos durante cada iteração', 'Usuário valida versão alfa e beta antes do Cutover'],
        artifact: { label: 'Versionamento', value: 'P1 → P2 → Pn (protótipos) → Alfa → Beta → RC → 1.0' }
      },
      r3: {
        num: 'Fase 4',
        title: 'Cutover (Transição)',
        desc: 'A fase de transição engloba os testes finais de aceitação (UAT), migração de dados do sistema legado, treinamento dos usuários e implantação — frequentemente em operação paralela com o sistema antigo (parallel run). Diferente do Cascata, o Cutover encerra apenas um timebox. O ciclo recomeça imediatamente, incorporando o feedback e os requisitos que ficaram de fora.',
        activities: ['Testes de aceitação pelo usuário (UAT)', 'Migração de dados do sistema legado', 'Parallel run: sistema novo e antigo em operação simultânea', 'Treinamento intensivo dos usuários finais'],
        artifact: { label: 'Diferencial RAD', value: 'O Cutover encerra o timebox atual — o próximo timebox começa imediatamente com o aprendizado acumulado' }
      }
    }
  },
  radagil: {
    color: 'var(--color-orange)',
    phases: {
      m0: {
        num: 'Fase 1',
        title: 'Discovery & Escopo',
        desc: 'Versão moderna do Planejamento de Requisitos do RAD clássico. Em vez de workshops JRP de dias, equipes fazem sessões de Discovery curtas para mapear o problema, definir o escopo do primeiro ciclo e priorizar o backlog inicial. O DNA é o mesmo de Martin (1991): usuário no centro, escopo priorizado — não exaustivo.',
        activities: ['Sessões de Discovery com usuários reais (entrevistas, pesquisas)', 'Definição do escopo mínimo para entregar valor', 'Priorização do backlog com base em impacto × esforço', 'Alinhamento de stakeholders sobre o que entra no primeiro ciclo'],
        artifact: { label: 'Herança do RAD', value: 'Planejamento de Requisitos (Martin, 1991) — agora em formato curto de discovery' }
      },
      m1: {
        num: 'Fase 2',
        title: 'Design Colaborativo',
        desc: 'Versão moderna das sessões JAD. Em vez de workshops presenciais longos, designers e devs co-criam protótipos em ferramentas como Figma em tempo real, validando com usuários rapidamente. O princípio de Martin — "usuários não sabem o que querem até ver" — continua sendo a base.',
        activities: ['Wireframes e protótipos de alta fidelidade (Figma, Sketch)', 'Testes de usabilidade com usuários reais em 48–72h', 'Design System compartilhado para acelerar produção', 'Definição de critérios de aceite por funcionalidade'],
        artifact: { label: 'Herança do RAD', value: 'Sessões JAD (Martin, 1991) — agora via ferramentas colaborativas e testes rápidos' }
      },
      m2: {
        num: 'Fase 3',
        title: 'Construção Incremental',
        desc: 'O coração do RAD + Ágil. Em vez de timeboxes de 60–90 dias, a construção acontece em sprints curtos de 1–3 semanas. As ferramentas CASE foram substituídas por frameworks modernos (React, Next.js), plataformas low-code e IAs de código como GitHub Copilot. A velocidade que Martin queria com CASE — agora existe de verdade.',
        activities: ['Desenvolvimento em sprints curtos (1–3 semanas)', 'Testes automatizados escritos junto com o código', 'Code review entre pares (pull requests)', 'Feature flags para liberar funcionalidades gradualmente'],
        artifact: { label: 'Herança do RAD', value: 'Construção iterativa (Martin, 1991) — velocidade que a prototipagem evolutiva prometia, agora entregue por frameworks modernos' }
      },
      m3: {
        num: 'Fase 4',
        title: 'Review & Retrospectiva',
        desc: 'Combina o Cutover do RAD com as cerimônias ágeis. O time demonstra o incremento para stakeholders, coleta feedback real e avalia o que funcionou no processo. Cada ciclo alimenta o próximo — exatamente como o Cutover do RAD clássico alimentava o próximo timebox com o aprendizado do anterior.',
        activities: ['Demo para stakeholders: incremento funcionando em staging ou produção', 'Coleta de feedback quantitativo (analytics, NPS) e qualitativo', 'Retrospectiva interna: o que melhorar no próximo ciclo?', 'Atualização do backlog com novos requisitos e prioridades'],
        artifact: { label: 'Herança do RAD', value: 'Cutover iterativo (Martin, 1991) — agora com retrospectiva estruturada e métricas de produto' }
      },
      m4: {
        num: 'Fase 5',
        title: 'Deploy Contínuo (CI/CD)',
        desc: 'A grande evolução em relação ao RAD clássico. No RAD original, o Cutover era um evento manual e intenso — a equipe parava tudo para migrar, treinar e implantar. Com CI/CD (Integração Contínua / Entrega Contínua), esse processo vira infraestrutura automatizada: cada alteração de código passa por testes automáticos (CI — Continuous Integration), e se aprovada, é publicada em produção sem intervenção manual (CD — Continuous Delivery/Deployment). O pipeline é o caminho automatizado que o código percorre do desenvolvedor ao usuário final: commit → build → testes → staging → produção. O que antes levava semanas de planejamento agora acontece dezenas de vezes por dia, com rollback instantâneo se algo der errado.',
        activities: ['Pipeline de CI/CD: build → teste → deploy automático', 'Monitoramento em tempo real (Datadog, Sentry, New Relic)', 'Rollback instantâneo se métricas piorarem', 'Feature flags para releases graduais e testes A/B'],
        artifact: { label: 'O que mudou vs. RAD clássico', value: 'Deploy virou processo contínuo automatizado — não mais um evento manual de "transição"' }
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
    tag: 'SDLC — Sequência de fases',
    question: 'Qual é a sequência correta das fases do modelo Cascata (Waterfall)?',
    options: [
      'Implementação → Análise de Requisitos → Projeto → Testes → Planejamento → Implantação',
      'Planejamento → Análise de Requisitos → Projeto → Implementação → Testes → Implantação → Manutenção',
      'Planejamento → Projeto → Análise de Requisitos → Implementação → Implantação → Testes',
      'Análise de Requisitos → Planejamento → Implementação → Projeto → Testes → Manutenção'
    ],
    correct: 1,
    feedback: 'No modelo Cascata, as fases seguem uma ordem estritamente sequencial: Planejamento → Análise de Requisitos → Projeto (Design) → Implementação → Testes e Verificação → Implantação → Manutenção. Cada fase precisa estar concluída e aprovada antes que a próxima se inicie — daí o nome "Cascata": o resultado de cada fase desce para a seguinte como uma queda d\'água, sem retorno.'
  },
  {
    tag: 'RAD — Crise do software',
    question: 'Qual crise impulsionou o surgimento do RAD nos anos 1990?',
    options: [
      'A escassez de programadores experientes no mercado de trabalho',
      'A lentidão do modelo Cascata, que entregava sistemas desatualizados e desalinhados com o negócio',
      'A falta de linguagens de programação orientadas a objetos',
      'O alto custo dos servidores e da infraestrutura de TI'
    ],
    correct: 1,
    feedback: 'O RAD surgiu como resposta direta à chamada "crise do software": projetos Cascata demoravam anos, e ao serem entregues, os requisitos do negócio já haviam mudado. Metodologias rígidas dificultavam a resposta a mudanças (Pressman & Maxim, 2021), e o longo intervalo entre requisitos e entrega gerava desalinhamento estrutural.'
  },
  {
    tag: 'RAD — Origem histórica',
    question: 'Quem formalizou o modelo RAD e em que obra?',
    options: [
      'Kent Beck, no livro "Extreme Programming Explained", em 1999',
      'Barry Boehm, no artigo sobre o Modelo Espiral, em 1986',
      'James Martin, no livro "Rapid Application Development", em 1991',
      'Ken Schwaber e Jeff Sutherland, no Manifesto Ágil, em 2001'
    ],
    correct: 2,
    feedback: 'James Martin formalizou o RAD em 1991. Como consultor de TI, Martin percebeu que os projetos Cascata entregavam sistemas já desatualizados — o RAD nasceu como ruptura com essa lógica, propondo ciclos curtos, prototipação e participação ativa do usuário desde o início do desenvolvimento.'
  },
  {
    tag: 'SDLC — Conceito',
    question: 'O que é o SDLC (System Development Life Cycle)?',
    options: [
      'Uma metodologia de desenvolvimento ágil criada nos anos 2000',
      'Um framework equivalente ao Scrum, porém aplicado a sistemas legados',
      'Um conceito descritivo que representa as etapas do ciclo de vida de um sistema — Cascata, RAD e Ágil são formas diferentes de percorrê-lo',
      'Um documento obrigatório produzido antes de qualquer projeto de TI'
    ],
    correct: 2,
    feedback: 'O SDLC não é uma metodologia — é um conceito descritivo. Como explicam os slides da disciplina: "dizer que viajamos por terra não diz se foi de carro, trem ou bicicleta". Cascata, RAD e as abordagens ágeis são formas distintas de percorrer esse mesmo ciclo de vida, cada uma com suas características e contextos de aplicação.'
  },
  {
    tag: 'RAD — Fase 1: Planejamento',
    question: 'O que acontece na primeira fase do RAD — Planejamento de Requisitos?',
    options: [
      'A equipe codifica o sistema completo antes de apresentar qualquer resultado ao cliente',
      'Gerentes, usuários e desenvolvedores definem juntos o escopo, os objetivos e as funções prioritárias do sistema',
      'São produzidos todos os diagramas UML antes de qualquer decisão de negócio',
      'O cliente assina um contrato fixando escopo e prazo imutáveis'
    ],
    correct: 1,
    feedback: 'Na primeira fase do RAD, executivos, gerentes e desenvolvedores se reúnem para identificar objetivos e definir o escopo do sistema. Diferente do Cascata, não se busca especificar tudo — o foco é alinhar prioridades e viabilidade, criando a base para o desenvolvimento iterativo que virá nas próximas fases.'
  },
  {
    tag: 'RAD — Citação de Martin',
    question: 'Segundo James Martin (1991), por que os protótipos produzem resultados superiores à documentação exaustiva?',
    options: [
      'Porque eliminam a necessidade de testes e validação do sistema',
      'Porque os usuários não conseguem articular o que precisam até verem algo funcionando — o protótipo torna o abstrato concreto',
      'Porque protótipos são mais baratos de produzir do que documentos formais',
      'Porque permitem dispensar a participação do usuário no processo de desenvolvimento'
    ],
    correct: 1,
    feedback: 'Martin (1991) argumentou que usuários frequentemente não conseguem articular com precisão o que precisam até verem algo funcionando. Por isso, protótipos produzem "resultados dramaticamente melhores do que fases exaustivas de documentação". Esse insight foi central para o RAD e influenciou toda a geração de abordagens iterativas que viria a seguir.'
  },
  {
    tag: 'RAD — Desenvolvimento em versões',
    question: 'Como o RAD organiza o desenvolvimento de um sistema?',
    options: [
      'Em uma única entrega ao final do projeto, após todos os módulos estarem prontos',
      'Em uma série de versões desenvolvidas sequencialmente, cada uma entregando funcionalidades prioritárias',
      'Em sprints de duas semanas, com retrospectiva ao final de cada ciclo',
      'Em pacotes mensais de requisitos, definidos com antecedência pelo cliente'
    ],
    correct: 1,
    feedback: 'Segundo Dennis, Wixom & Roth (2020), o desenvolvimento em fases do RAD divide o sistema em uma série de versões desenvolvidas sequencialmente. Cada versão entrega funcionalidades prioritárias, permitindo uso e feedback real antes que o sistema esteja completo — princípio que seria herdado diretamente pelos frameworks ágeis.'
  },
  {
    tag: 'Cascata vs. RAD — Requisitos',
    question: 'Como Cascata e RAD diferem no tratamento dos requisitos?',
    options: [
      'No Cascata, requisitos são refinados a cada iteração; no RAD, são definidos integralmente no início',
      'Ambos congelam os requisitos antes de iniciar a codificação',
      'No Cascata, os requisitos são levantados exaustivamente (upfront) e congelados; no RAD, requisitos iniciais essenciais são refinados a cada protótipo',
      'O RAD dispensa completamente o levantamento de requisitos'
    ],
    correct: 2,
    feedback: 'Essa é uma diferença estrutural entre os dois modelos: o Cascata exige o levantamento extenso e o congelamento de requisitos antes de avançar, tentando antecipar tudo. O RAD parte de requisitos essenciais e os refina continuamente a cada protótipo e iteração, reconhecendo que o entendimento evolui com o uso.'
  },
  {
    tag: 'Cascata vs. RAD — Implantação',
    question: 'Como diferem as implantações no Cascata e no RAD?',
    options: [
      'O Cascata faz implantações semanais; o RAD faz uma implantação única ao final',
      'O Cascata realiza implantação incremental por módulos; o RAD faz implantação big-bang',
      'O Cascata faz uma grande implantação (big-bang) ao final do projeto; o RAD implanta de forma incremental, por módulos ou versões',
      'Não há diferença — ambos seguem o mesmo processo de implantação'
    ],
    correct: 2,
    feedback: 'No Cascata, a implantação ocorre uma única vez ao final — um big-bang onde o sistema completo vai a produção após anos de desenvolvimento. No RAD, a implantação é incremental: versões menores e funcionais são entregues ao longo do tempo, permitindo que o usuário já utilize partes do sistema enquanto o restante é desenvolvido.'
  },
  {
    tag: 'RAD — Vantagens',
    question: 'Qual das alternativas representa uma vantagem reconhecida do RAD?',
    options: [
      'Ideal para sistemas críticos e fortemente regulados, como defesa e infraestrutura',
      'Permite congelar o escopo desde o início, evitando mudanças durante o projeto',
      'Versões tangíveis surgem mais rápido, com maior proximidade entre o sistema entregue e a necessidade real do negócio',
      'Dispensa a necessidade de equipes experientes e ferramentas especializadas'
    ],
    correct: 2,
    feedback: 'Entre as vantagens do RAD estão: redução do tempo de desenvolvimento, maior proximidade entre o sistema entregue e a necessidade real, capacidade de incorporar mudanças sem interromper o projeto, e estímulo ao aprendizado organizacional contínuo. Versões tangíveis surgem mais rápido — o que permite validação precoce com usuários reais.'
  },
  {
    tag: 'RAD — Limitações',
    question: 'Em que tipo de projeto o RAD não é adequado?',
    options: [
      'Sistemas administrativos com necessidade de entrega rápida',
      'Portais internos e aplicações corporativas com requisitos flexíveis',
      'Sistemas críticos, fortemente regulados ou de alta complexidade arquitetural',
      'Projetos onde os usuários estão disponíveis e engajados'
    ],
    correct: 2,
    feedback: 'O RAD apresenta limitações importantes: não é adequado para sistemas críticos ou fortemente regulados (como sistemas militares), pois a compressão temporal pode comprometer documentação e padronização. Também exige equipes experientes e usuários disponíveis — sem isso, o modelo perde sua essência iterativa.'
  },
  {
    tag: 'RAD — Fase 2: Design',
    question: 'O que caracteriza a fase de Design do Usuário no RAD?',
    options: [
      'Os desenvolvedores trabalham isolados para criar a arquitetura técnica completa do sistema',
      'Usuários e desenvolvedores colaboram em sessões intensivas para modelar processos e validar protótipos de forma iterativa',
      'O analista produz um documento de design entregue ao cliente para aprovação formal',
      'O foco é exclusivamente na criação do banco de dados, sem envolvimento do usuário'
    ],
    correct: 1,
    feedback: 'Na fase de Design do Usuário, usuários e desenvolvedores trabalham juntos em sessões colaborativas (JRP/JAD) para modelar processos, fluxos e interfaces. Protótipos são criados, apresentados, validados e refinados em ciclos rápidos. Essa interação direta garante que o sistema reflita as necessidades reais — não o que foi documentado meses antes.'
  },
  {
    tag: 'RAD — Fase 3: Construção',
    question: 'Como funciona a fase de Construção no RAD?',
    options: [
      'O código é escrito do zero, sem reutilização de componentes ou ferramentas de geração automática',
      'A construção ocorre uma única vez, após o design estar completamente aprovado',
      'O SWAT Team converte os protótipos em sistema funcional usando ferramentas CASE, com o usuário ainda envolvido para ajustes fináis',
      'Nessa fase, o cliente é excluído do processo até a entrega final'
    ],
    correct: 2,
    feedback: 'Na Construção, o SWAT Team transforma os protótipos validados em um sistema funcional, com o usuário ainda presente para validar os incrementos. O usuário permanece envolvido para identificar ajustes e confirmar que o resultado atende às expectativas. As fases 2 e 3 frequentemente se sobrepõem em ciclos iterativos até a aprovação.'
  },
  {
    tag: 'RAD — Fase 4: Cutover',
    question: 'O que ocorre na fase de Cutover do RAD?',
    options: [
      'É quando os requisitos da próxima versão são levantados do zero, reiniciando o ciclo Cascata',
      'O sistema é colocado em produção, os usuários são treinados e o sistema legado é desativado gradualmente',
      'O cliente assina o termo de aceite e o projeto é encerrado definitivamente',
      'A equipe é dissolvida e a documentação final é entregue ao departamento de TI'
    ],
    correct: 1,
    feedback: 'O Cutover é a fase final de cada versão no RAD: o sistema vai a produção, usuários são treinados e o sistema legado é migrado ou desativado de forma gradual. Diferente do Cascata — onde a implantação encerra o projeto — no RAD o Cutover encerra apenas uma versão. O ciclo recomeça para a versão seguinte, incorporando o feedback e os novos requisitos levantados.'
  }
];

/* ══════════════════════════════════════════════════════════════════════
   QUIZ ENGINE
══════════════════════════════════════════════════════════════════════ */
const QUIZ_SIZE = 10;

function shuffleAndPick(arr, n) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

let activeQuiz = shuffleAndPick(QUIZ, QUIZ_SIZE);
let quizState = { current: 0, score: 0, answered: false };

function renderQuestion() {
  const q = activeQuiz[quizState.current];
  const pct = (quizState.current / activeQuiz.length) * 100;
  document.getElementById('quiz-progress-fill').style.width = pct + '%';
  document.getElementById('quiz-counter').textContent = `Questão ${quizState.current + 1} de ${activeQuiz.length}`;

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
  // scroll to top of quiz card on mobile
  document.getElementById('quiz-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Última pergunta: troca botão
  const isLast = quizState.current === activeQuiz.length - 1;
  const nextBtn = document.getElementById('quiz-next');
  const exitBtn = document.getElementById('quiz-exit');
  nextBtn.textContent = isLast ? 'Ver resultado' : 'Próxima →';
  nextBtn.style.display = '';
  if (exitBtn) exitBtn.style.display = 'none';
  nextBtn.disabled = true;
  quizState.answered = false;

  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.idx)));
  });
}

function handleAnswer(idx) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = activeQuiz[quizState.current];
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
  // inline live score badge
  let badge = document.getElementById('quiz-live-score');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'quiz-live-score';
    badge.style.cssText = 'text-align:right;font-size:0.8rem;color:var(--color-text-muted);margin-top:0.5rem;';
    document.getElementById('quiz-card').appendChild(badge);
  }
  badge.textContent = `Acertos até agora: ${quizState.score} de ${quizState.current + 1}`;

  document.getElementById('quiz-next').disabled = false;
  // Na última questão, após responder, mostra botão Sair também
  if (quizState.current === activeQuiz.length - 1) {
    const exitBtn = document.getElementById('quiz-exit');
    if (exitBtn) exitBtn.style.display = '';
  }
}

function createFeedback(isCorrect, title, text) {
  const div = document.createElement('div');
  div.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'wrong');
  div.innerHTML = `<strong>${title}</strong>${text}`;
  return div;
}

document.getElementById('quiz-next')?.addEventListener('click', () => {
  quizState.current++;
  if (quizState.current >= activeQuiz.length) {
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
  const total = activeQuiz.length;
  const pct = Math.round((score / total) * 100);

  let icon, title, msg;
  if (pct === 100)  { icon = '🏆'; title = 'Perfeito!';          msg = 'Acertou tudo! Domínio completo do conteúdo — você está muito bem preparado para a apresentação.'; }
  else if (pct >= 80) { icon = '🎓'; title = 'Muito bem!';        msg = 'Ótimo desempenho. Revise rapidamente os tópicos em que errou para consolidar o aprendizado.'; }
  else if (pct >= 60) { icon = '👏'; title = 'Bom resultado!';    msg = 'Você compreende os conceitos principais. Vale reforçar os pontos de dúvida nos Modelos, nas Equipes e no Comparativo.'; }
  else if (pct >= 40) { icon = '📚'; title = 'Bom começo.';       msg = 'Metade do caminho. Volte aos Modelos e ao Comparativo antes de tentar novamente.'; }
  else               { icon = '🔍'; title = 'Continue estudando.'; msg = 'Explore as seções anteriores — Modelos, Equipes e Comparativo — antes de tentar de novo.'; }

  document.getElementById('result-icon').textContent = icon;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-msg').textContent = msg;

  // nota 0–10
  const notaNum = score / total * 10;
  const nota = notaNum.toFixed(1);
  const notaColor = notaNum >= 7 ? 'var(--color-teal)' : notaNum >= 5 ? 'var(--color-orange)' : '#e05252';

  // placar destacado
  const scoreEl = document.getElementById('result-score');
  scoreEl.innerHTML = `
    <div style="margin-bottom:1rem">
      <span style="font-size:2.8rem;font-weight:800;color:var(--color-teal);line-height:1">${score}</span>
      <span style="font-size:1.4rem;font-weight:500;color:var(--color-text-muted)"> de ${total} acertos</span>
      <br><span style="font-size:0.9rem;color:var(--color-text-muted)">${pct}% de aproveitamento</span>
    </div>
    <div style="border-top:1px solid var(--color-border);padding-top:1rem;margin-top:0.5rem">
      <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--color-text-muted);margin-bottom:0.25rem">Nota final</div>
      <span style="font-size:3.5rem;font-weight:900;color:${notaColor};line-height:1">${nota}</span>
      <span style="font-size:1.2rem;color:var(--color-text-muted)"> / 10</span>
    </div>
  `;

  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

document.getElementById('quiz-restart')?.addEventListener('click', () => {
  activeQuiz = shuffleAndPick(QUIZ, QUIZ_SIZE);
  quizState = { current: 0, score: 0, answered: false };
  document.getElementById('quiz-result').hidden = true;
  document.getElementById('quiz-controls').style.display = '';
  const exitBtn = document.getElementById('quiz-exit');
  if (exitBtn) exitBtn.style.display = 'none';
  renderQuestion();
});

// Init quiz
renderQuestion();

/* ══════════════════════════════════════════════════════════════════════
   MOBILE NAV — inject below header
══════════════════════════════════════════════════════════════════════ */
if (window.innerWidth <= 768) {
  const mobileNavWrapper = document.createElement('div');
  mobileNavWrapper.className = 'mobile-nav-wrapper';
  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  const sections = [['hero','Início'],['models','Modelos'],['compare','Comparar'],['versioning','Versioning'],['quiz','Quiz'],['glossario','Glossário'],['memes','Memes']];
  sections.forEach(([id, label]) => {
    const btn = document.createElement('button');
    btn.className = 'nav-tab' + (id === 'hero' ? ' active' : '');
    btn.dataset.section = id;
    btn.textContent = label;
    btn.addEventListener('click', () => navigateTo(id));
    mobileNav.appendChild(btn);
  });
  mobileNavWrapper.appendChild(mobileNav);
  document.querySelector('.header-inner')?.appendChild(mobileNavWrapper);
}

/* ══════════════════════════════════════════════════════════════════════
   NAV SCROLL HINT — hide fade/arrow when scrolled to end
══════════════════════════════════════════════════════════════════════ */
(function () {
  const wrapper = document.querySelector('.nav-scroll-wrapper');
  const nav = document.querySelector('.nav-tabs');
  if (!wrapper || !nav) return;

  function checkScroll() {
    const hasOverflow = nav.scrollWidth > nav.clientWidth + 4;
    const atEnd = nav.scrollLeft + nav.clientWidth >= nav.scrollWidth - 4;
    wrapper.classList.toggle('no-overflow', !hasOverflow);
    wrapper.classList.toggle('at-end', hasOverflow && atEnd);
  }

  nav.addEventListener('scroll', checkScroll, { passive: true });
  // Run on load and on resize
  checkScroll();
  window.addEventListener('resize', checkScroll);
})();
