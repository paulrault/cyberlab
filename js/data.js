
"use strict";

window.CyberData = {
  courses: [
    {
      id: "windows-server",
      icon: "🖥️",
      level: "Débutant",
      title: "Windows Server et Active Directory",
      description: "Administrer un domaine, les comptes, les groupes et les stratégies de sécurité.",
      lessons: [
        {
          title: "Comprendre Active Directory",
          content: "Active Directory centralise les identités, les ordinateurs et les ressources d'un domaine. Les unités d'organisation permettent de structurer les objets et de déléguer certaines tâches.",
          task: "Propose une arborescence avec les OU Utilisateurs, Techniciens et Ordinateurs."
        },
        {
          title: "Comptes et groupes",
          content: "Les groupes de sécurité simplifient l'attribution des droits. Il faut appliquer le principe du moindre privilège et éviter les comptes administrateurs utilisés au quotidien.",
          task: "Imagine un groupe permettant à une équipe d'accéder à un dossier partagé sans donner de droits administrateur."
        },
        {
          title: "GPO et durcissement",
          content: "Les stratégies de groupe permettent de gérer des paramètres de sécurité, des règles de mot de passe et des restrictions sur les postes du domaine.",
          task: "Cite trois paramètres qu'une GPO de sécurité pourrait appliquer."
        }
      ]
    },
    {
      id: "debian",
      icon: "🐧",
      level: "Débutant",
      title: "Administration Debian",
      description: "Utilisateurs, services, mises à jour, journaux et permissions Linux.",
      lessons: [
        {
          title: "Comptes et permissions",
          content: "Linux utilise des utilisateurs, des groupes et des permissions de lecture, écriture et exécution. Les droits doivent être adaptés au besoin réel.",
          task: "Explique pourquoi un dossier contenant des sauvegardes ne doit pas être accessible en écriture à tous."
        },
        {
          title: "Services et journaux",
          content: "Les services sont gérés par systemd sur les systèmes courants. Les journaux aident à comprendre les démarrages, les erreurs et les événements système.",
          task: "Explique ce que tu vérifierais si un service ne démarre plus."
        }
      ]
    },
    {
      id: "networking",
      icon: "🌐",
      level: "Débutant",
      title: "Réseaux TCP/IP",
      description: "Adressage IPv4, masques, passerelles, DNS, DHCP et segmentation.",
      lessons: [
        {
          title: "Adressage IPv4",
          content: "Une adresse IPv4 identifie une interface sur un réseau. Le masque ou le préfixe CIDR définit la partie réseau et la partie hôte.",
          task: "Pour 192.168.10.25/24, indique le réseau et la passerelle possible."
        },
        {
          title: "DNS et DHCP",
          content: "DNS associe des noms à des informations telles que des adresses IP. DHCP fournit automatiquement des paramètres réseau aux clients.",
          task: "Un poste reçoit une adresse 169.254.x.x. Quelles vérifications effectues-tu ?"
        }
      ]
    },
    {
      id: "firewall",
      icon: "🧱",
      level: "Intermédiaire",
      title: "Pare-feu et segmentation",
      description: "Filtrage, VLAN, règles entrantes et sortantes et accès d'administration.",
      lessons: [
        {
          title: "Règles de filtrage",
          content: "Une règle de pare-feu doit définir une source, une destination, un protocole, un port et une action. Une politique restrictive réduit les communications inutiles.",
          task: "Propose une règle autorisant uniquement un poste d'administration à accéder à l'interface de gestion d'un serveur."
        },
        {
          title: "Segmentation réseau",
          content: "Séparer les postes utilisateurs, les serveurs et l'administration limite la propagation d'un incident et facilite le contrôle des flux.",
          task: "Explique pourquoi les postes utilisateurs ne devraient pas tous administrer directement les serveurs."
        }
      ]
    },
    {
      id: "backup",
      icon: "💾",
      level: "Intermédiaire",
      title: "Sauvegarde et restauration",
      description: "Stratégie de sauvegarde, rétention, copie hors ligne et tests de restauration.",
      lessons: [
        {
          title: "Concevoir une sauvegarde",
          content: "Une sauvegarde doit être protégée contre les accès non autorisés et les suppressions. Une stratégie doit prévoir plusieurs copies, des supports distincts et des tests de restauration.",
          task: "Propose une stratégie pour protéger les fichiers importants d'une PME contre une panne et un rançongiciel."
        },
        {
          title: "Tester la restauration",
          content: "Une sauvegarde n'est utile que si les données peuvent être restaurées dans un délai acceptable. Les tests doivent être documentés et réalisés dans un environnement adapté.",
          task: "Liste les contrôles à effectuer après une restauration de fichiers."
        }
      ]
    },
    {
      id: "cybersecurity",
      icon: "🛡️",
      level: "Intermédiaire",
      title: "Cybersécurité défensive",
      description: "Confidentialité, intégrité, disponibilité, incidents et mesures de protection.",
      lessons: [
        {
          title: "Principes fondamentaux",
          content: "La confidentialité limite l'accès aux personnes autorisées, l'intégrité protège contre les modifications non légitimes et la disponibilité garantit l'accès aux services nécessaires.",
          task: "Associe une mesure de protection à chacun de ces trois objectifs."
        },
        {
          title: "Réponse à incident",
          content: "Face à un incident, il faut alerter les responsables, préserver les éléments utiles, limiter les risques selon les procédures et documenter les actions. Les décisions doivent être adaptées à la situation.",
          task: "Un poste présente un comportement inhabituel. Donne les premières actions prudentes à effectuer."
        }
      ]
    },
    {
      id: "docker",
      icon: "🐳",
      level: "Intermédiaire",
      title: "Docker et services",
      description: "Conteneurs, images, volumes, ports et surveillance de services.",
      lessons: [
        {
          title: "Images et conteneurs",
          content: "Une image sert de modèle à un conteneur. Un conteneur exécute une application isolée. Les volumes peuvent conserver des données au-delà du cycle de vie du conteneur.",
          task: "Explique la différence entre une image, un conteneur et un volume."
        },
        {
          title: "Exposition des ports",
          content: "Un port publié peut rendre un service accessible depuis d'autres machines. Il faut limiter les ports exposés et protéger les interfaces d'administration.",
          task: "Quels risques poses-tu si une interface d'administration est exposée sans restriction ?"
        }
      ]
    }
  ],

  missions: [
    {
      id: "mission-ad",
      category: "Windows Server",
      difficulty: "Débutant",
      xp: 50,
      title: "Organiser Active Directory",
      description: "Concevoir une arborescence claire pour une PME fictive.",
      steps: [
        "Créer des OU distinctes pour les utilisateurs et les ordinateurs.",
        "Séparer les comptes utilisateurs et les comptes d'administration.",
        "Définir des groupes selon les besoins d'accès.",
        "Documenter les choix et le principe du moindre privilège."
      ]
    },
    {
      id: "mission-dns",
      category: "Réseau",
      difficulty: "Débutant",
      xp: 40,
      title: "Diagnostiquer un problème DNS",
      description: "Un poste joint le réseau mais ne résout plus les noms internes.",
      steps: [
        "Vérifier la configuration IP du poste.",
        "Contrôler l'adresse du serveur DNS configuré.",
        "Comparer la résolution d'un nom interne et d'une adresse IP.",
        "Documenter le diagnostic sans modifier de service sans autorisation."
      ]
    },
    {
      id: "mission-vlan",
      category: "Réseau",
      difficulty: "Intermédiaire",
      xp: 60,
      title: "Préparer une segmentation VLAN",
      description: "Séparer les utilisateurs, les serveurs et l'administration.",
      steps: [
        "Définir les besoins de chaque zone.",
        "Proposer un plan d'adressage distinct.",
        "Lister les flux qui doivent être autorisés.",
        "Prévoir des tests de connectivité et de filtrage."
      ]
    },
    {
      id: "mission-firewall",
      category: "Cybersécurité",
      difficulty: "Intermédiaire",
      xp: 70,
      title: "Réduire les flux autorisés",
      description: "Établir des règles de filtrage adaptées à une petite entreprise.",
      steps: [
        "Identifier les services réellement nécessaires.",
        "Définir les sources et destinations légitimes.",
        "Refuser les flux inutiles.",
        "Prévoir une procédure de validation et de retour arrière."
      ]
    },
    {
      id: "mission-backup",
      category: "Sauvegarde",
      difficulty: "Intermédiaire",
      xp: 70,
      title: "Plan de sauvegarde d'une PME",
      description: "Préparer une stratégie de sauvegarde documentée.",
      steps: [
        "Identifier les données critiques.",
        "Définir fréquence, rétention et emplacement des copies.",
        "Protéger les accès aux sauvegardes.",
        "Planifier un test de restauration et consigner le résultat."
      ]
    },
    {
      id: "mission-logs",
      category: "Cybersécurité",
      difficulty: "Intermédiaire",
      xp: 70,
      title: "Analyser des journaux fictifs",
      description: "Repérer des événements inhabituels dans un jeu de journaux pédagogique.",
      steps: [
        "Relever les événements et leurs horaires.",
        "Comparer les événements aux activités attendues.",
        "Identifier les éléments nécessitant une vérification.",
        "Rédiger une synthèse factuelle sans accuser une personne sans preuve."
      ]
    },
    {
      id: "mission-patching",
      category: "Sécurité",
      difficulty: "Intermédiaire",
      xp: 60,
      title: "Préparer une campagne de mises à jour",
      description: "Réduire les risques liés aux systèmes non corrigés.",
      steps: [
        "Inventorier les systèmes et versions.",
        "Évaluer les priorités et les dépendances.",
        "Tester les mises à jour dans un environnement adapté.",
        "Prévoir sauvegarde, fenêtre de maintenance et vérifications."
      ]
    },
    {
      id: "mission-docker",
      category: "Docker",
      difficulty: "Intermédiaire",
      xp: 60,
      title: "Sécuriser un service conteneurisé",
      description: "Examiner la configuration d'un service fictif.",
      steps: [
        "Identifier les ports publiés.",
        "Examiner les données persistantes et leurs permissions.",
        "Réduire les privilèges et les accès inutiles.",
        "Définir une procédure de mise à jour et de sauvegarde."
      ]
    },
    {
      id: "mission-incident",
      category: "Cybersécurité",
      difficulty: "Avancé",
      xp: 100,
      title: "Gérer un incident de sécurité",
      description: "Structurer la prise en charge d'une alerte fictive.",
      steps: [
        "Recueillir les faits et l'heure de détection.",
        "Alerter les interlocuteurs prévus par la procédure.",
        "Limiter les risques selon les consignes de l'organisation.",
        "Préserver les éléments utiles et rédiger un compte rendu."
      ]
    },
    {
      id: "mission-restoration",
      category: "Sauvegarde",
      difficulty: "Avancé",
      xp: 90,
      title: "Préparer une reprise après incident",
      description: "Établir un plan de remise en service d'un serveur fictif.",
      steps: [
        "Identifier les services prioritaires.",
        "Vérifier les sauvegardes disponibles.",
        "Définir un ordre de restauration et les dépendances.",
        "Valider les services et documenter les résultats."
      ]
    },
    {
      id: "mission-accounts",
      category: "Windows Server",
      difficulty: "Intermédiaire",
      xp: 60,
      title: "Réviser les droits d'accès",
      description: "Réduire les autorisations excessives dans une organisation fictive.",
      steps: [
        "Lister les ressources et les groupes.",
        "Comparer les droits aux besoins professionnels.",
        "Supprimer les accès devenus inutiles après validation.",
        "Documenter les modifications et les responsables."
      ]
    },
    {
      id: "mission-documentation",
      category: "Documentation",
      difficulty: "Débutant",
      xp: 40,
      title: "Rédiger une fiche d'exploitation",
      description: "Produire une documentation utile pour l'équipe informatique.",
      steps: [
        "Décrire le rôle du service.",
        "Noter les dépendances et les accès autorisés.",
        "Documenter les vérifications courantes.",
        "Ajouter les procédures d'escalade et de restauration."
      ]
    }
  ],

  questions: [
    {
      q: "Quel est le rôle principal de DNS ?",
      answers: [
        "Attribuer automatiquement une adresse IP",
        "Associer des noms à des informations réseau",
        "Chiffrer tous les fichiers du poste",
        "Remplacer le pare-feu"
      ],
      correct: 1,
      explanation: "DNS permet notamment de résoudre des noms de domaine ou des noms internes en informations réseau."
    },
    {
      q: "Quel principe consiste à donner uniquement les droits nécessaires ?",
      answers: [
        "Le moindre privilège",
        "La disponibilité maximale",
        "La réplication systématique",
        "Le partage anonyme"
      ],
      correct: 0,
      explanation: "Le moindre privilège limite les droits à ce qui est nécessaire pour accomplir une tâche."
    },
    {
      q: "Quel est l'objectif d'une restauration de sauvegarde testée ?",
      answers: [
        "Augmenter la taille du disque",
        "Prouver que les données peuvent être récupérées",
        "Désactiver les journaux",
        "Supprimer les comptes utilisateurs"
      ],
      correct: 1,
      explanation: "Un test permet de vérifier que les données sont récupérables et que la procédure fonctionne."
    },
    {
      q: "À quoi sert une règle de pare-feu ?",
      answers: [
        "Définir quels flux réseau sont autorisés ou refusés",
        "Remplacer les mises à jour",
        "Créer des sauvegardes automatiquement dans tous les cas",
        "Attribuer des noms aux utilisateurs"
      ],
      correct: 0,
      explanation: "Le pare-feu applique une politique de filtrage aux communications réseau."
    },
    {
      q: "Quel élément permet de conserver des données de conteneur au-delà de son cycle de vie ?",
      answers: [
        "Un volume persistant",
        "Une adresse MAC seule",
        "Un port DNS",
        "Une règle GPO"
      ],
      correct: 0,
      explanation: "Un volume Docker permet de conserver les données indépendamment du conteneur."
    },
    {
      q: "Que faire en premier face à une alerte de sécurité crédible ?",
      answers: [
        "Supprimer tous les journaux",
        "Suivre la procédure d'incident et alerter les personnes responsables",
        "Publier les données de l'entreprise",
        "Désactiver définitivement toutes les sauvegardes"
      ],
      correct: 1,
      explanation: "Il faut appliquer la procédure prévue, alerter les responsables et préserver les éléments utiles."
    },
    {
      q: "Quel service distribue automatiquement une configuration IP ?",
      answers: ["DNS", "DHCP", "HTTP", "SSH"],
      correct: 1,
      explanation: "DHCP peut fournir une adresse IP, un masque, une passerelle et des serveurs DNS."
    },
    {
      q: "Pourquoi appliquer les mises à jour de sécurité ?",
      answers: [
        "Pour corriger des vulnérabilités connues",
        "Pour rendre tous les services publics",
        "Pour supprimer les comptes de secours",
        "Pour empêcher les sauvegardes"
      ],
      correct: 0,
      explanation: "Les correctifs réduisent l'exposition aux vulnérabilités connues. Ils doivent être testés et déployés de manière maîtrisée."
    },
    {
      q: "Quel élément est utile pour reconstituer une chronologie d'incident ?",
      answers: [
        "Les journaux horodatés",
        "Le fond d'écran",
        "La couleur du boîtier",
        "Le nom du fabricant du clavier"
      ],
      correct: 0,
      explanation: "Les journaux horodatés peuvent aider à reconstruire une chronologie, à condition de vérifier leur fiabilité et leur contexte."
    },
    {
      q: "Pourquoi séparer le réseau d'administration du réseau utilisateur ?",
      answers: [
        "Pour réduire les accès directs aux interfaces sensibles",
        "Pour empêcher toute sauvegarde",
        "Pour rendre tous les comptes administrateurs",
        "Pour supprimer le besoin de mots de passe"
      ],
      correct: 0,
      explanation: "La segmentation réduit les possibilités d'accès aux équipements sensibles et facilite le contrôle des flux."
    },
    {
      q: "Quel objectif relève de la disponibilité ?",
      answers: [
        "Un service reste accessible aux utilisateurs autorisés",
        "Toutes les données sont publiques",
        "Les fichiers peuvent être modifiés par n'importe qui",
        "Les journaux sont supprimés immédiatement"
      ],
      correct: 0,
      explanation: "La disponibilité vise à maintenir l'accès aux services et aux données lorsque cela est nécessaire."
    },
    {
      q: "Pourquoi documenter une intervention informatique ?",
      answers: [
        "Pour conserver la trace des actions et faciliter la maintenance",
        "Pour éviter tous les tests",
        "Pour partager tous les mots de passe",
        "Pour remplacer la supervision"
      ],
      correct: 0,
      explanation: "Une documentation précise facilite le suivi, le dépannage et la transmission des connaissances."
    }
  ],

  securityScenarios: [
    {
      id: "bts-cyber-01",
      category: "Sujet BTS — Hameçonnage",
      title: "Sujet 1 — Courriel suspect dans une PME",
      description: "Une salariée reçoit un courriel qui semble provenir du service informatique. Le message demande de saisir ses identifiants sur un site inhabituel. Le responsable vous demande de proposer une réponse adaptée.",
      options: [
        "Cliquer sur le lien pour vérifier si la page fonctionne",
        "Ne pas saisir les identifiants, signaler le message selon la procédure et conserver les informations utiles",
        "Transférer le message à tous les collègues",
        "Supprimer les journaux de messagerie"
      ],
      correct: 1,
      explanation: "Il faut éviter le lien, signaler le message et préserver les éléments utiles. Si des identifiants ont déjà été saisis, prévenir rapidement les responsables pour appliquer la procédure de sécurisation du compte."
    },
    {
      id: "bts-cyber-02",
      category: "Sujet BTS — Droits d'accès",
      title: "Sujet 2 — Accès excessifs à un dossier partagé",
      description: "Lors d'un audit interne, vous constatez que tous les utilisateurs peuvent modifier un dossier contenant des documents confidentiels. Le responsable métier confirme que seuls trois membres du service doivent pouvoir modifier les fichiers.",
      options: [
        "Conserver les droits actuels pour éviter toute interruption",
        "Rendre le dossier accessible à tous en lecture et écriture",
        "Vérifier les besoins, définir les groupes autorisés, ajuster les permissions après validation et tester les accès",
        "Supprimer le dossier immédiatement"
      ],
      correct: 2,
      explanation: "Il faut appliquer le moindre privilège, valider les besoins avec le responsable, modifier les droits de manière maîtrisée et vérifier le résultat."
    },
    {
      id: "bts-cyber-03",
      category: "Sujet BTS — Sauvegardes",
      title: "Sujet 3 — Sauvegardes non vérifiées",
      description: "Une PME effectue une copie quotidienne de ses fichiers sur un partage réseau. Aucun test de restauration n'a été réalisé depuis plusieurs mois. Vous devez identifier une amélioration prioritaire.",
      options: [
        "Vérifier les journaux et réaliser un test de restauration contrôlé, puis améliorer la protection et la diversité des copies",
        "Supprimer les anciennes copies sans contrôle",
        "Donner à tous les utilisateurs le droit de supprimer les sauvegardes",
        "Considérer la sauvegarde comme fiable puisqu'une tâche est planifiée"
      ],
      correct: 0,
      explanation: "Une tâche planifiée ne prouve pas qu'une restauration est possible. Il faut contrôler les résultats, tester la restauration et protéger les copies contre les suppressions ou compromissions."
    },
    {
      id: "bts-cyber-04",
      category: "Sujet BTS — Incident",
      title: "Sujet 4 — Activité anormale sur un serveur",
      description: "L'outil de supervision signale une activité inhabituelle sur un serveur de fichiers. Vous n'avez pas encore confirmé s'il s'agit d'un incident de sécurité. Quelle approche est la plus adaptée ?",
      options: [
        "Effacer les journaux afin de libérer de l'espace",
        "Accuser immédiatement un utilisateur",
        "Ignorer l'alerte tant que le serveur répond",
        "Vérifier les éléments disponibles, noter les horaires, prévenir les responsables et suivre la procédure d'incident"
      ],
      correct: 3,
      explanation: "Il faut vérifier les faits, conserver les éléments pertinents et appliquer la procédure. Les mesures de confinement dépendent du contexte et des consignes de l'organisation."
    },
    {
      id: "bts-cyber-05",
      category: "Sujet BTS — Pare-feu",
      title: "Sujet 5 — Interface d'administration exposée",
      description: "Une interface d'administration de serveur est accessible depuis un réseau qui n'a pas besoin de la gérer. Vous devez proposer une mesure de réduction du risque.",
      options: [
        "Autoriser l'accès depuis toutes les adresses",
        "Restreindre l'accès aux postes ou au réseau d'administration autorisés et vérifier les règles de filtrage",
        "Désactiver les mises à jour",
        "Partager le compte administrateur avec tous les salariés"
      ],
      correct: 1,
      explanation: "L'accès d'administration doit être limité aux sources nécessaires, avec une authentification adaptée, une journalisation et une vérification régulière des règles."
    },
    {
      id: "bts-cyber-06",
      category: "Sujet BTS — Mises à jour",
      title: "Sujet 6 — Serveur non corrigé",
      description: "L'inventaire montre qu'un serveur utilise une version qui ne reçoit plus de correctifs de sécurité. Le service est important pour l'entreprise. Quelle démarche convient ?",
      options: [
        "Le laisser fonctionner sans évaluation",
        "Le déconnecter définitivement sans prévenir personne",
        "Évaluer le risque, vérifier les dépendances, préparer une migration ou mise à niveau, tester et prévoir un retour arrière",
        "Désactiver la supervision"
      ],
      correct: 2,
      explanation: "La remédiation doit être planifiée et documentée : évaluation du risque, compatibilité, tests, sauvegarde, fenêtre de maintenance et validation."
    }
  ],

  servers: [
    {
      id: "srv-ad",
      name: "SRV-AD01",
      role: "Active Directory / DNS",
      ip: "192.168.10.10",
      status: "ok",
      cpu: 24,
      ram: 48,
      disk: 42
    },
    {
      id: "srv-files",
      name: "SRV-FICHIERS",
      role: "Partages réseau",
      ip: "192.168.10.20",
      status: "ok",
      cpu: 31,
      ram: 55,
      disk: 76
    },
    {
      id: "srv-monitor",
      name: "SRV-MONITOR",
      role: "Supervision",
      ip: "192.168.10.30",
      status: "warning",
      cpu: 78,
      ram: 69,
      disk: 61
    },
    {
      id: "srv-backup",
      name: "SRV-BACKUP",
      role: "Sauvegardes",
      ip: "192.168.10.40",
      status: "down",
      cpu: 0,
      ram: 0,
      disk: 0
    }
  ],

  dockerServices: [
    {
      id: "dozzle",
      name: "Dozzle",
      image: "amir20/dozzle:latest",
      port: "8888",
      volume: "docker.sock",
      status: "running",
      note: "Consultation des journaux de conteneurs — simulation uniquement."
    },
    {
      id: "uptime-kuma",
      name: "Uptime Kuma",
      image: "louislam/uptime-kuma:1",
      port: "3001",
      volume: "uptime-data",
      status: "running",
      note: "Surveillance de disponibilité — simulation uniquement."
    },
    {
      id: "prometheus",
      name: "Prometheus",
      image: "prom/prometheus:latest",
      port: "9090",
      volume: "prometheus-data",
      status: "stopped",
      note: "Collecte de métriques — simulation uniquement."
    },
    {
      id: "grafana",
      name: "Grafana",
      image: "grafana/grafana:latest",
      port: "3000",
      volume: "grafana-data",
      status: "running",
      note: "Visualisation de métriques — simulation uniquement."
    },
    {
      id: "glpi",
      name: "GLPI",
      image: "glpi/glpi:latest",
      port: "8080",
      volume: "glpi-data",
      status: "stopped",
      note: "Gestion de parc et tickets — simulation uniquement."
    }
  ],

  dockerIncidents: [
    {
      id: "docker-port",
      title: "Un service web ne répond plus",
      description: "Le conteneur semble actif, mais l'application n'est pas accessible depuis le navigateur.",
      checks: [
        "Vérifier l'état du conteneur.",
        "Vérifier le port publié et le port d'écoute de l'application.",
        "Consulter les journaux du service.",
        "Vérifier les règles de filtrage et les dépendances."
      ]
    },
    {
      id: "docker-volume",
      title: "Les données disparaissent après recréation",
      description: "Les paramètres de l'application sont perdus lorsqu'un conteneur est recréé.",
      checks: [
        "Vérifier si les données sont stockées dans un volume persistant.",
        "Contrôler le chemin de montage.",
        "Vérifier les permissions sur le répertoire.",
        "Préparer une sauvegarde et tester une restauration."
      ]
    },
    {
      id: "docker-logs",
      title: "Redémarrages répétés",
      description: "Un service simulé redémarre fréquemment et son état devient instable.",
      checks: [
        "Consulter les journaux horodatés.",
        "Vérifier les variables de configuration.",
        "Contrôler les dépendances et les ressources disponibles.",
        "Documenter le diagnostic avant toute modification."
      ]
    },
    {
      id: "docker-security",
      title: "Port d'administration trop exposé",
      description: "Un service fictif publie un port de gestion qui ne devrait être accessible que par l'équipe informatique.",
      checks: [
        "Identifier le port et les interfaces d'écoute.",
        "Définir les sources qui ont réellement besoin d'accéder au service.",
        "Restreindre l'exposition dans la configuration prévue.",
        "Vérifier le résultat et documenter la modification."
      ]
    }
  ]
};
