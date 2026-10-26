
"use strict";

window.CyberData = {
  courses: [
    {
      id: "windows",
      title: "Windows Server",
      icon: "🪟",
      level: "Débutant",
      description: "Active Directory, DNS, DHCP, GPO et partages.",
      lessons: [
        {
          title: "Active Directory",
          content: "AD DS centralise les utilisateurs, groupes, ordinateurs et ressources d'un domaine Windows.\n\nÀ retenir : domaine, contrôleur de domaine, unité d'organisation et groupe de sécurité.",
          task: "Explique pourquoi une entreprise peut organiser ses comptes dans des unités d'organisation distinctes."
        },
        {
          title: "Utilisateurs et groupes",
          content: "Les utilisateurs représentent les identités. Les groupes facilitent l'attribution des permissions.\n\nPrivilégie l'attribution des droits à des groupes plutôt qu'à une longue liste de comptes individuels.",
          task: "Propose une organisation de groupes pour les équipes Clients et Techniciens."
        },
        {
          title: "DNS et DHCP",
          content: "DNS résout les noms. DHCP distribue les paramètres IP aux clients : adresse, masque, passerelle et souvent DNS.",
          task: "Décris trois vérifications à effectuer lorsqu'un poste ne résout plus les noms."
        },
        {
          title: "GPO et permissions",
          content: "Les stratégies de groupe appliquent des configurations. Les permissions NTFS et les droits de partage déterminent les accès aux fichiers.",
          task: "Explique pourquoi il faut tester les droits avec un compte standard."
        }
      ]
    },
    {
      id: "linux",
      title: "Debian et Linux",
      icon: "🐧",
      level: "Débutant",
      description: "Commandes, permissions, services et journaux.",
      lessons: [
        {
          title: "Commandes essentielles",
          content: "pwd affiche le répertoire courant, ls liste les fichiers et cd change de répertoire.\n\nip addr affiche les interfaces réseau. ip route affiche les routes connues.",
          task: "Explique la différence entre ip addr et ip route."
        },
        {
          title: "Utilisateurs et permissions",
          content: "Les permissions Linux distinguent le propriétaire, le groupe et les autres utilisateurs. Les comptes privilégiés doivent être limités.",
          task: "Pourquoi éviter de travailler systématiquement avec le compte root ?"
        },
        {
          title: "Services systemd",
          content: "systemctl permet d'inspecter et de gérer les services systemd. journalctl aide à consulter les journaux associés.",
          task: "Établis une liste de vérifications pour un service qui ne démarre plus."
        },
        {
          title: "Mises à jour et maintenance",
          content: "Une maintenance comprend l'analyse des mises à jour, la sauvegarde, la planification, les tests et la vérification après intervention.",
          task: "Décris les précautions à prendre avant une mise à jour d'un serveur."
        }
      ]
    },
    {
      id: "network",
      title: "Réseaux TCP/IP",
      icon: "🌐",
      level: "Débutant",
      description: "IPv4, CIDR, VLAN, routage, DNS et DHCP.",
      lessons: [
        {
          title: "Adressage IPv4",
          content: "Une adresse IPv4 contient 32 bits. Le préfixe CIDR indique combien de bits identifient le réseau.",
          task: "Pour 192.168.10.25/24, indique l'adresse réseau et le masque."
        },
        {
          title: "Sous-réseaux",
          content: "Le masque sépare la partie réseau de la partie hôte. La taille d'un sous-réseau dépend de son préfixe.",
          task: "Explique pourquoi un réseau /26 possède moins d'adresses qu'un /24."
        },
        {
          title: "VLAN et commutation",
          content: "Un VLAN sépare logiquement des domaines de niveau 2. La communication entre VLAN nécessite un mécanisme de routage.",
          task: "Propose deux VLAN pour séparer les postes clients des techniciens."
        },
        {
          title: "Routage et diagnostic",
          content: "Un routeur achemine les paquets entre réseaux. Une passerelle par défaut sert aux destinations qui ne correspondent pas aux routes plus spécifiques.",
          task: "Cite les vérifications utiles lorsqu'un poste ne joint pas un autre réseau."
        }
      ]
    },
    {
      id: "security",
      title: "Cybersécurité défensive",
      icon: "🛡️",
      level: "Intermédiaire",
      description: "Durcissement, droits, pare-feu et réponse aux incidents.",
      lessons: [
        {
          title: "Moindre privilège",
          content: "Chaque compte doit disposer uniquement des permissions nécessaires. Les comptes administratifs doivent être protégés et utilisés avec discernement.",
          task: "Propose deux mesures pour réduire les privilèges excessifs."
        },
        {
          title: "Pare-feu et filtrage",
          content: "Un pare-feu applique des règles sur les flux réseau. Il faut comprendre les sources, destinations, ports, protocoles et besoins métier.",
          task: "Pourquoi une règle qui autorise tous les flux est-elle difficile à sécuriser ?"
        },
        {
          title: "Journaux et incidents",
          content: "Les journaux aident à reconstituer une chronologie. Il faut préserver les informations utiles, documenter les actions et suivre les procédures de l'organisation.",
          task: "Quels éléments noter lors de la découverte d'un incident ?"
        },
        {
          title: "Sauvegardes et continuité",
          content: "Une sauvegarde n'est utile que si elle est disponible et restaurable. La protection des copies et les tests de restauration font partie de la stratégie.",
          task: "Explique pourquoi un test de restauration est indispensable."
        }
      ]
    },
    {
      id: "virtualization",
      title: "Virtualisation",
      icon: "🖥️",
      level: "Intermédiaire",
      description: "Machines virtuelles, ressources, réseaux et sauvegardes.",
      lessons: [
        {
          title: "Hyperviseurs et machines virtuelles",
          content: "Un hyperviseur fournit des ressources virtuelles aux systèmes invités. Le dimensionnement doit tenir compte de la capacité de l'hôte.",
          task: "Quels problèmes peuvent apparaître si toutes les VM consomment trop de mémoire ?"
        },
        {
          title: "Réseaux virtuels",
          content: "Les commutateurs virtuels relient les VM à d'autres VM, à l'hôte ou à un réseau physique selon leur configuration.",
          task: "Dessine la circulation du trafic entre une VM cliente et un serveur."
        },
        {
          title: "Stockage et sauvegardes",
          content: "Un snapshot permet de revenir à un état précédent dans certaines conditions, mais il ne remplace pas une sauvegarde indépendante.",
          task: "Propose une stratégie de sauvegarde pour deux VM importantes."
        },
        {
          title: "Capacité et disponibilité",
          content: "La supervision des ressources et la documentation des dépendances permettent d'anticiper les problèmes de capacité.",
          task: "Cite les indicateurs à surveiller sur un hôte de virtualisation."
        }
      ]
    },
    {
      id: "docker",
      title: "Docker et conteneurs",
      icon: "🐳",
      level: "Intermédiaire",
      description: "Images, conteneurs, ports, volumes et diagnostic.",
      lessons: [
        {
          title: "Images et conteneurs",
          content: "Une image sert de modèle pour créer un conteneur. Un conteneur exécute un processus isolé selon sa configuration.",
          task: "Explique la différence entre une image et un conteneur."
        },
        {
          title: "Ports et volumes",
          content: "Les ports publiés rendent un service accessible depuis un autre réseau. Les volumes permettent de conserver des données au-delà du cycle de vie d'un conteneur.",
          task: "Pourquoi faut-il prévoir un volume pour une application qui conserve des données ?"
        },
        {
          title: "Journaux et état",
          content: "L'état, les journaux, les ports et les montages permettent de diagnostiquer un conteneur indisponible.",
          task: "Établis un ordre de vérification pour un service Docker qui ne répond plus."
        },
        {
          title: "Maintenance des conteneurs",
          content: "Les mises à jour nécessitent de vérifier la compatibilité, les données persistantes, les variables de configuration et la procédure de retour arrière.",
          task: "Pourquoi sauvegarder les données avant de recréer un conteneur ?"
        }
      ]
    },
    {
      id: "monitoring",
      title: "Supervision IT",
      icon: "📈",
      level: "Intermédiaire",
      description: "Disponibilité, métriques, alertes et compte rendu.",
      lessons: [
        {
          title: "Indicateurs utiles",
          content: "CPU, mémoire, espace disque, disponibilité et latence donnent des indications sur la santé d'un système.",
          task: "Quels indicateurs surveiller sur un serveur de fichiers ?"
        },
        {
          title: "Alertes et seuils",
          content: "Des seuils adaptés et des durées de confirmation permettent de réduire les alertes inutiles.",
          task: "Pourquoi une utilisation CPU élevée pendant quelques secondes n'indique-t-elle pas toujours une panne ?"
        },
        {
          title: "Corrélation des événements",
          content: "Comparer les métriques et journaux sur une même période aide à comprendre la chronologie d'un incident.",
          task: "Explique comment rapprocher une alerte disque et les journaux d'un service."
        },
        {
          title: "Rapport d'intervention",
          content: "Un rapport indique le symptôme, l'impact, les contrôles réalisés, les constatations confirmées, la résolution et les actions de prévention.",
          task: "Rédige un bref compte rendu pour une indisponibilité fictive."
        }
      ]
    }
  ],

  missions: [
    {
      id: "mission-ad",
      title: "Créer un compte de domaine",
      category: "Windows Server",
      difficulty: "Débutant",
      xp: 50,
      description: "Préparer un compte de test avec des droits adaptés.",
      steps: [
        "Identifier l'unité d'organisation prévue.",
        "Créer un compte de test avec un nom explicite.",
        "Associer le compte au groupe adapté.",
        "Vérifier les permissions avec un compte standard.",
        "Documenter le résultat et les contrôles réalisés."
      ]
    },
    {
      id: "mission-dns",
      title: "Résoudre un incident DNS",
      category: "Réseau",
      difficulty: "Intermédiaire",
      xp: 65,
      description: "Le poste accède à une adresse IP mais ne résout plus les noms.",
      steps: [
        "Vérifier l'adresse IP, le masque et la passerelle.",
        "Identifier le serveur DNS configuré.",
        "Comparer la connectivité IP et la résolution de noms.",
        "Examiner les enregistrements et journaux disponibles.",
        "Documenter la cause uniquement si elle est confirmée."
      ]
    },
    {
      id: "mission-dhcp",
      title: "Diagnostiquer un incident DHCP",
      category: "Réseau",
      difficulty: "Intermédiaire",
      xp: 65,
      description: "Un poste ne reçoit pas la configuration réseau attendue.",
      steps: [
        "Vérifier le lien réseau et le VLAN du poste.",
        "Examiner l'adresse, le masque et la passerelle reçus.",
        "Contrôler l'étendue DHCP et les baux disponibles.",
        "Vérifier un éventuel relais DHCP et les journaux.",
        "Rédiger une conclusion et les prochaines vérifications."
      ]
    },
    {
      id: "mission-backup",
      title: "Valider une restauration",
      category: "Sécurité",
      difficulty: "Avancé",
      xp: 90,
      description: "Vérifier qu'une sauvegarde peut réellement être restaurée.",
      steps: [
        "Identifier la sauvegarde attendue et sa date.",
        "Contrôler le résultat du dernier job.",
        "Restaurer un fichier de test dans un emplacement séparé.",
        "Vérifier l'intégrité et l'accessibilité du fichier restauré.",
        "Documenter le résultat et les mesures correctives éventuelles."
      ]
    },
    {
      id: "mission-linux",
      title: "Service Linux indisponible",
      category: "Linux",
      difficulty: "Intermédiaire",
      xp: 60,
      description: "Un service fictif ne démarre plus après un redémarrage.",
      steps: [
        "Consulter l'état du service.",
        "Examiner les journaux autour de l'heure de l'incident.",
        "Contrôler la configuration et les permissions.",
        "Vérifier les dépendances et l'espace disque.",
        "Documenter une correction proposée et son risque."
      ]
    },
    {
      id: "mission-docker",
      title: "Conteneur applicatif indisponible",
      category: "Docker",
      difficulty: "Avancé",
      xp: 85,
      description: "Un service conteneurisé fictif ne répond plus.",
      steps: [
        "Examiner l'état du conteneur simulé.",
        "Lire les événements et journaux affichés.",
        "Vérifier les ports et le réseau simulés.",
        "Contrôler les volumes et paramètres de configuration.",
        "Proposer une correction et une vérification après intervention."
      ]
    },
    {
      id: "mission-vlan",
      title: "Concevoir une segmentation VLAN",
      category: "Réseau",
      difficulty: "Avancé",
      xp: 90,
      description: "Séparer logiquement les postes clients et techniciens.",
      steps: [
        "Décrire les besoins et les flux autorisés.",
        "Choisir les identifiants VLAN.",
        "Proposer un plan d'adressage IP.",
        "Définir le besoin de routage entre les VLAN.",
        "Prévoir des tests de connectivité et de filtrage."
      ]
    },
    {
      id: "mission-monitor",
      title: "Analyser une alerte de supervision",
      category: "Supervision",
      difficulty: "Intermédiaire",
      xp: 70,
      description: "Une métrique fictive indique une charge anormale.",
      steps: [
        "Vérifier la durée et l'évolution de l'alerte.",
        "Comparer CPU, mémoire et espace disque.",
        "Consulter les événements autour de l'incident.",
        "Estimer l'impact sur le service.",
        "Rédiger les constatations et les actions à suivre."
      ]
    }
  ],

  questions: [
    {
      q: "Quel service gère les identités d'un domaine Windows ?",
      answers: ["DHCP", "AD DS", "NAT", "NTP"],
      correct: 1,
      explanation: "AD DS centralise les identités et ressources d'un domaine."
    },
    {
      q: "Quel service distribue automatiquement les paramètres IP ?",
      answers: ["DNS", "SSH", "DHCP", "SNMP"],
      correct: 2,
      explanation: "DHCP distribue l'adresse IP et d'autres paramètres réseau."
    },
    {
      q: "À quoi sert principalement DNS ?",
      answers: ["À résoudre des noms", "À créer des utilisateurs", "À chiffrer un disque", "À sauvegarder une VM"],
      correct: 0,
      explanation: "DNS permet notamment de résoudre les noms en informations réseau."
    },
    {
      q: "Que représente un préfixe IPv4 /24 ?",
      answers: ["24 hôtes", "24 bits réseau", "24 VLAN", "24 routeurs"],
      correct: 1,
      explanation: "Un /24 signifie que 24 bits sont consacrés au préfixe réseau."
    },
    {
      q: "Quelle commande Linux affiche les interfaces et leurs adresses IP ?",
      answers: ["ip addr", "mkdir", "whoami", "shutdown"],
      correct: 0,
      explanation: "ip addr affiche les interfaces réseau et leurs adresses."
    },
    {
      q: "Quel principe limite les permissions d'un compte ?",
      answers: ["Compte partagé", "Administrateur partout", "Moindre privilège", "Désactivation des mises à jour"],
      correct: 2,
      explanation: "Le moindre privilège limite les droits au besoin réel."
    },
    {
      q: "Un snapshot remplace-t-il une sauvegarde indépendante ?",
      answers: ["Toujours", "Non", "Uniquement sous Linux", "Uniquement en production"],
      correct: 1,
      explanation: "Un snapshot peut dépendre de l'environnement et du stockage d'origine."
    },
    {
      q: "Quel équipement achemine les paquets entre réseaux IP ?",
      answers: ["Clavier", "Routeur", "Écran", "Imprimante"],
      correct: 1,
      explanation: "Un routeur achemine les paquets entre différents réseaux."
    },
    {
      q: "Quel outil permet de consulter les journaux systemd ?",
      answers: ["journalctl", "mkdir", "format", "cd"],
      correct: 0,
      explanation: "journalctl affiche les journaux du système."
    },
    {
      q: "Quel est l'intérêt principal d'un volume Docker ?",
      answers: ["Conserver les données", "Remplacer DNS", "Créer un VLAN", "Remplacer le pare-feu"],
      correct: 0,
      explanation: "Les volumes conservent les données au-delà du cycle de vie d'un conteneur."
    },
    {
      q: "Quel est le rôle d'un pare-feu ?",
      answers: ["Créer des comptes", "Filtrer les flux réseau", "Attribuer automatiquement les IP", "Remplacer les sauvegardes"],
      correct: 1,
      explanation: "Un pare-feu autorise ou bloque les flux selon des règles."
    },
    {
      q: "Que signifie RTO ?",
      answers: ["Objectif de temps de rétablissement", "Adresse du routeur", "Type de VLAN", "Journal DNS"],
      correct: 0,
      explanation: "Le RTO est l'objectif de durée de rétablissement d'un service."
    },
    {
      q: "Quel protocole permet une administration distante sécurisée ?",
      answers: ["FTP non chiffré", "SSH", "Telnet", "HTTP seul"],
      correct: 1,
      explanation: "SSH fournit notamment un accès distant chiffré."
    },
    {
      q: "Quel est l'intérêt d'un VLAN ?",
      answers: ["Segmenter logiquement le réseau", "Augmenter la RAM", "Remplacer tous les routeurs", "Créer une sauvegarde"],
      correct: 0,
      explanation: "Un VLAN sépare logiquement des domaines de niveau 2."
    },
    {
      q: "Que faire avant une modification importante en production ?",
      answers: ["Ne rien vérifier", "Supprimer les journaux", "Évaluer l'impact et préparer un retour arrière", "Désactiver les sauvegardes"],
      correct: 2,
      explanation: "Il faut anticiper l'impact, protéger les données et prévoir une restauration ou un retour arrière."
    }
  ],

  servers: [
    { id: "srv-ad", name: "SRV-AD01", role: "AD DS / DNS", ip: "192.168.10.10", cpu: 24, ram: 47, disk: 39, status: "ok" },
    { id: "srv-files", name: "SRV-FICHIERS", role: "Partages réseau", ip: "192.168.10.20", cpu: 36, ram: 62, disk: 71, status: "ok" },
    { id: "srv-debian", name: "DEBIAN-DOCKER", role: "Services conteneurisés", ip: "192.168.10.30", cpu: 79, ram: 84, disk: 66, status: "warning" },
    { id: "srv-app", name: "APP-TEST", role: "Application pédagogique", ip: "192.168.10.40", cpu: 0, ram: 0, disk: 0, status: "down" }
  ],

  dockerServices: [
    { id: "web", name: "web-demo", image: "nginx:stable", port: "8080 → 80", status: "running", volume: "web-data", note: "Service web de démonstration." },
    { id: "monitor", name: "monitor-demo", image: "monitoring-demo:1.0", port: "9090 → 9090", status: "running", volume: "monitor-data", note: "Métriques fictives de supervision." },
    { id: "app", name: "app-demo", image: "app-demo:1.0", port: "3000 → 3000", status: "stopped", volume: "app-data", note: "Application pédagogique arrêtée." }
  ],

  securityScenarios: [
    {
      id: "access",
      title: "Compte avec des privilèges excessifs",
      category: "Gestion des accès",
      description: "Un compte de test dispose de droits administratifs alors qu'il doit uniquement consulter des fichiers.",
      options: [
        "Conserver les droits pour éviter toute interruption.",
        "Confirmer le besoin, réduire les droits au strict nécessaire et tester l'accès.",
        "Partager le compte administrateur avec toute l'équipe."
      ],
      correct: 1,
      explanation: "Il faut confirmer le besoin métier, appliquer le moindre privilège et vérifier que les tâches prévues restent possibles."
    },
    {
      id: "logs",
      title: "Événement de sécurité inhabituel",
      category: "Analyse d'incident",
      description: "Des événements de connexion inhabituels apparaissent dans les journaux d'un système de test.",
      options: [
        "Supprimer les journaux pour réduire le bruit.",
        "Ignorer les événements sans vérification.",
        "Préserver les journaux, établir une chronologie et suivre la procédure d'incident."
      ],
      correct: 2,
      explanation: "La préservation des informations et la documentation de la chronologie facilitent une analyse défensive."
    },
    {
      id: "firewall",
      title: "Règle de pare-feu trop permissive",
      category: "Filtrage réseau",
      description: "Une règle de laboratoire autorise de nombreux flux qui ne sont pas nécessaires au service.",
      options: [
        "Identifier les flux métier nécessaires, restreindre la règle et tester les accès attendus.",
        "Autoriser tous les flux entrants.",
        "Désactiver définitivement le pare-feu."
      ],
      correct: 0,
      explanation: "Le filtrage doit correspondre aux flux nécessaires et être validé par des tests contrôlés."
    }
  ],

  dockerIncidents: [
    {
      id: "port",
      title: "Port inaccessible",
      description: "Le conteneur est indiqué comme démarré, mais le service ne répond pas sur le port attendu.",
      checks: ["Vérifier l'état du conteneur.", "Contrôler le port publié et le port interne.", "Examiner les journaux simulés.", "Vérifier le réseau et le service applicatif."]
    },
    {
      id: "volume",
      title: "Données manquantes",
      description: "Après la recréation d'un conteneur fictif, des données semblent absentes.",
      checks: ["Identifier le volume attendu.", "Vérifier le montage configuré.", "Contrôler le chemin utilisé par l'application.", "Prévoir une restauration contrôlée depuis une sauvegarde."]
    },
    {
      id: "restart",
      title: "Conteneur en redémarrage",
      description: "Le service simulé redémarre de manière répétée.",
      checks: ["Consulter les journaux.", "Examiner la configuration et les variables.", "Contrôler les dépendances et ressources.", "Documenter la cause après confirmation."]
    }
  ]
};
