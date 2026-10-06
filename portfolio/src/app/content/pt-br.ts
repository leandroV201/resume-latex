import type { Content } from './content.model';
import { TECNOVA3_RESULT_URL } from './facts';

export const PT_BR: Content = {
  meta: {
    title: 'Leandro Campelo · Desenvolvedor de Software Pleno',
    description:
      'Desenvolvedor de Software Pleno em ERP: Java (Spring Boot), Angular, NestJS e microsserviços. Projetos, experiência e currículo em PDF.',
  },
  skipLink: 'Pular para o conteúdo',
  nav: {
    label: 'Seções',
    about: 'Sobre',
    projects: 'Projetos',
    experience: 'Experiência',
    skills: 'Habilidades',
    education: 'Formação',
    contact: 'Contato',
  },
  langSwitch: { label: 'Idioma' },
  months: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  present: 'atual',
  inProgress: 'em andamento',

  hero: {
    role: 'Desenvolvedor de Software Pleno',
    location: 'Teresina, PI',
    paragraphs: [
      'Trabalho na NextCompany, empresa de ERP que atende diferentes segmentos do mercado. Hoje desenvolvo módulos do wCompany 3G, a nova geração do ERP, em Java (Spring Boot) e Angular, com arquitetura de microsserviços.',
      'Como o ERP atende negócios bem diferentes, o trabalho passa por regras variadas: documentos fiscais (NF-e e NFC-e), tributos e SPED, rotinas bancárias e de caixa, vendas externas e até a manipulação de bolsas de nutrição parenteral.',
      'Antes disso, desenvolvi apps em Flutter para saúde e inclusão. Estou cursando pós-graduação em Inteligência Artificial.',
    ],
    cvPrimary: 'Currículo em português',
    cvSecondary: 'Currículo em inglês',
    pdf: 'PDF',
  },

  projects: {
    title: 'Projetos',
    intro: 'O contexto de cada projeto e o que fiz nele, com mais detalhes do que cabem no currículo.',
    stackLabel: 'Tecnologias',
    items: {
      wcompany: {
        role: 'NextCompany · Desenvolvedor',
        status: 'Em andamento',
        summary:
          'Nova geração do ERP da NextCompany, construída em microsserviços: cada rotina de negócio roda como um serviço independente.',
        bullets: [
          'Já entreguei 3 módulos, com Java (Spring Boot) no backend e Angular no frontend. O sistema cobre bancário, vendas, compras, caixa, cargas, vendas externas e manipulação de bolsas de nutrição parenteral.',
          'Código proprietário, por isso não há repositório público.',
        ],
        note: {
          text: 'O projeto foi aprovado no programa TECNOVA 3 Piauí (FAPEPI/MCTI/FINEP).',
          label: 'Ver lista oficial de aprovados',
          href: TECNOVA3_RESULT_URL,
        },
      },
      appraxi: {
        role: 'Comunicare Solutions · Desenvolvedor Mobile e Backend',
        summary:
          'App de apoio à terapia de pessoas com apraxia da fala, um distúrbio neurológico adquirido que afeta a produção da fala.',
        bullets: [
          'Desenvolvi o app multiplataforma em Flutter, com atenção a acessibilidade e usabilidade, e validei as funcionalidades com profissionais de saúde.',
          'Implementei serviços de backend em Python para integração e processamento dos dados do app.',
          'Integrei modelos de reconhecimento de voz com Kaldi em Linux (Ubuntu) e gerei espectrogramas para apoiar a análise vocal feita com fonoaudiólogos.',
        ],
        note: {
          text: 'Depois do meu período na empresa, o Appraxi foi aprovado no programa TECNOVA 3 Piauí (FAPEPI/MCTI/FINEP).',
          label: 'Ver lista oficial de aprovados',
          href: TECNOVA3_RESULT_URL,
        },
        linkLabel: 'Site do Appraxi',
      },
      expressa: {
        role: 'Desenvolvedor Mobile e Líder Técnico',
        summary:
          'App Android para inclusão de crianças com necessidades especiais, com interações pensadas para crianças no espectro autista.',
        bullets: [
          'Liderei o desenvolvimento em Flutter e organizei backlog, tarefas e entregas do time com práticas ágeis.',
          'Validei a usabilidade e a aderência terapêutica do app junto a psicólogos.',
        ],
        linkLabel: 'Código no GitHub',
      },
    },
  },

  experience: {
    title: 'Experiência',
    items: {
      nextcompany: {
        title: 'Desenvolvedor de Software Pleno',
        bullets: [
          'wCompany 3G: 3 módulos entregues em Java (Spring Boot) e Angular, em arquitetura de microsserviços.',
          'Fiscal: manutenção, junto com o time, dos módulos de NF-e e NFC-e (incluindo regras de cálculo de tributos) e suporte às obrigações acessórias (SPED).',
          'Migração de bases de clientes envolvendo Firebird (diversas versões) e Oracle (18 e 21); cada cliente tem sua própria base em servidor dedicado.',
          'Portal do cliente para pagamento de faturas, integrado à API de pagamentos da Iugu.',
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
    title: 'Contato',
    text: 'O jeito mais rápido de falar comigo é por e-mail ou pelo LinkedIn.',
    email: 'E-mail',
  },

  footer: {
    source: 'Este site e os PDFs do currículo são gerados a partir do mesmo repositório.',
    sourceLink: 'Ver código',
  },
};
