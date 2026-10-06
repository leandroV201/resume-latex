import type { Content } from './content.model';
import { TECNOVA3_RESULT_URL } from './facts';

export const PT_BR: Content = {
  meta: {
    title: 'Leandro Campelo | Desenvolvedor de Software Pleno',
    description:
      'Desenvolvedor de Software Pleno em ERP: Java (Spring Boot), Angular, NestJS e microsserviços. Projetos, experiência e currículo em PDF.',
  },
  skipLink: 'Pular para o conteúdo',
  newTab: '(abre em nova aba)',
  nav: {
    label: 'Seções',
    home: 'Início',
    about: 'Sobre',
    experience: 'Experiência',
    projects: 'Projetos',
    skills: 'Habilidades',
    education: 'Formação',
    contact: 'Contato',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
  },
  langSwitch: { label: 'Idioma' },
  theme: { toDark: 'Usar tema escuro', toLight: 'Usar tema claro' },
  months: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  present: 'atual',
  inProgress: 'em andamento',

  hero: {
    role: 'Desenvolvedor de Software Pleno',
    location: 'Teresina, PI',
    intro:
      'Desenvolvo módulos do ERP wCompany 3G em Java (Spring Boot) e Angular na NextCompany. Trabalho com regras fiscais, migração de dados e integrações, e antes criei apps em Flutter para saúde e inclusão.',
    ctaProjects: 'Ver projetos',
    ctaCv: 'Baixar CV (PT-BR)',
    cvOther: 'CV em inglês (PDF)',
  },

  about: {
    title: 'Sobre',
    record: {
      label: 'Resumo profissional',
      role: 'Cargo',
      company: 'Empresa',
      companyNote: 'ERP para diferentes segmentos',
      since: 'Desde',
      project: 'Projeto atual',
      stack: 'Stack do projeto',
      base: 'Base',
      education: 'Formação',
      educationValue: 'Tecnólogo em ADS; pós em IA em andamento',
    },
    paragraphs: [
      'A NextCompany atende negócios bem diferentes, então o trabalho passa por regras variadas: documentos fiscais (NF-e e NFC-e), tributos e SPED, rotinas bancárias e de caixa, vendas externas e até a manipulação de bolsas de nutrição parenteral.',
      'Além dos módulos do ERP, entreguei o portal do cliente para pagamento de faturas com a API da Iugu, por onde hoje passam 100% desses pagamentos, e migrei as bases de 10+ clientes envolvendo Firebird e Oracle.',
      'Dois dos meus projetos foram apps de saúde e inclusão: o Appraxi, validado com fonoaudiólogos, e o Expressa+, validado com psicólogos. Estou cursando pós-graduação em Inteligência Artificial.',
    ],
  },

  experience: {
    title: 'Experiência',
    cta: 'Ver projetos',
    items: {
      nextcompany: {
        title: 'Desenvolvedor de Software Pleno',
        bullets: [
          'wCompany 3G: 3 módulos entregues em Java (Spring Boot) e Angular, em arquitetura de microsserviços.',
          'Fiscal: manutenção, junto com o time, dos módulos de NF-e e NFC-e (incluindo regras de cálculo de tributos) e suporte às obrigações acessórias (SPED).',
          'Migração das bases de 10+ clientes envolvendo Firebird (diversas versões) e Oracle (18 e 21); cada cliente tem sua própria base em servidor dedicado.',
          'Portal do cliente para pagamento de faturas, integrado à API da Iugu: 100% dos pagamentos passam por ele, gerados pelo financeiro ou pelo próprio cliente.',
          'wCRM, o CRM em nuvem da empresa: backend em NestJS com SOLID e Clean Architecture, Kafka, Redis e Docker; frontend em React e TypeScript; relatórios em PostgreSQL (Prisma ORM) e dados fiscais em MongoDB.',
          'Time de 20 pessoas (5 desenvolvedores) com Scrum e Kanban; Docker e Kubernetes nos ambientes da empresa e Qlik para análise de dados.',
        ],
      },
      comunicare: {
        title: 'Desenvolvedor Mobile e Backend',
        bullets: [
          'Desenvolvimento do Appraxi: app em Flutter, backend em Python e reconhecimento de voz com Kaldi.',
        ],
      },
    },
  },

  projects: {
    title: 'Projetos',
    intro: 'O que cada projeto resolve e o que eu fiz nele.',
    stackLabel: 'Tecnologias',
    items: {
      wcompany: {
        org: 'NextCompany',
        role: 'Desenvolvedor',
        status: 'Em andamento',
        summary:
          'Nova geração do ERP da NextCompany, construída em microsserviços: cada rotina de negócio roda como um serviço independente.',
        bullets: [
          'Entreguei 3 módulos até agora, com Java (Spring Boot) no backend e Angular no frontend.',
          'O sistema cobre bancário, vendas, compras, caixa, cargas, vendas externas e manipulação de bolsas de nutrição parenteral.',
        ],
        privateCode: 'Código proprietário, sem repositório público',
        note: {
          text: 'Aprovado no programa TECNOVA 3 Piauí (FAPEPI/MCTI/FINEP).',
          label: 'Ver lista oficial',
          href: TECNOVA3_RESULT_URL,
        },
      },
      appraxi: {
        org: 'Comunicare Solutions',
        role: 'Desenvolvedor Mobile e Backend',
        summary:
          'App de apoio à terapia de pessoas com apraxia da fala, um distúrbio neurológico adquirido que afeta a produção da fala.',
        bullets: [
          'Desenvolvi o app multiplataforma em Flutter (cerca de 8 telas), validado por 2 fonoaudiólogos.',
          'Implementei o backend em Python e integrei reconhecimento de voz com Kaldi, gerando espectrogramas para a análise vocal.',
        ],
        note: {
          text: 'Depois do meu período na empresa, o Appraxi foi aprovado no TECNOVA 3 Piauí.',
          label: 'Ver lista oficial',
          href: TECNOVA3_RESULT_URL,
        },
        linkLabel: 'Site do Appraxi',
      },
      expressa: {
        role: 'Desenvolvedor Mobile e Líder Técnico',
        summary:
          'App Android para inclusão de crianças com necessidades especiais, com interações pensadas para crianças no espectro autista.',
        bullets: [
          'Liderei o desenvolvimento em Flutter em um time de 5 pessoas, organizando backlog e entregas com práticas ágeis.',
          'Validei a usabilidade e a aderência terapêutica do app junto a psicólogos.',
        ],
        linkLabel: 'Código no GitHub',
      },
    },
  },

  skills: {
    title: 'Habilidades',
    groups: {
      backend: 'Backend',
      frontend: 'Frontend e mobile',
      data: 'Bancos de dados e BI',
      architecture: 'Arquitetura e integração',
      auth: 'Autenticação',
      devops: 'DevOps e observabilidade',
      testing: 'Testes e metodologias',
      ai: 'IA',
    },
    terms: {
      Microservices: 'Microsserviços',
      'REST APIs': 'APIs REST',
    },
    languagesTitle: 'Idiomas',
    languages: ['Português (nativo)', 'Inglês (avançado)', 'Espanhol (intermediário)'],
  },

  education: {
    title: 'Formação',
    items: {
      postgrad: {
        course: 'Pós-graduação em Inteligência Artificial',
        detail:
          'Pesquisa em Machine Learning e Deep Learning, comparando regressão, árvores de decisão, redes neurais e Transformers.',
      },
      ads: {
        course: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      },
      ifpi: {
        course: 'Técnico em Informática',
      },
    },
    coursesTitle: 'Cursos',
    courses: [
      'Desenvolvimento Mobile com Flutter (Alura)',
      'Arquitetura Backend com NestJS (Alura)',
      'Java e Spring Boot para APIs REST (Alura)',
    ],
  },

  contact: {
    title: 'Vamos conversar?',
    text: 'O jeito mais rápido de falar comigo é pelo LinkedIn ou por e-mail.',
    email: 'E-mail',
    cvTitle: 'Currículo em PDF',
    cvLangs: { 'pt-BR': 'Português', en: 'Inglês' },
    cvDownload: 'Baixar',
    cvView: 'Visualizar',
  },

  footer: {
    source: 'O site e os PDFs do currículo são gerados a partir do mesmo repositório.',
    sourceLink: 'Ver código',
  },
};
