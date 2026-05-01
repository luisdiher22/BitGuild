export enum UserClass {
  BACKEND_WARRIOR   = "BACKEND_WARRIOR",
  FRONTEND_MAGE     = "FRONTEND_MAGE",
  DEVOPS_ENGINEER   = "DEVOPS_ENGINEER",
  FULLSTACK_ROGUE   = "FULLSTACK_ROGUE",
  ML_ALCHEMIST      = "ML_ALCHEMIST",
  SYSTEM_ARCHITECT  = "SYSTEM_ARCHITECT",
  SECURITY_SENTINEL = "SECURITY_SENTINEL",
  WANDERER          = "WANDERER",
}

export const CLASS_META: Record<
  UserClass,
  { label: string; description: string; sprite: string }
> = {
  [UserClass.BACKEND_WARRIOR]: {
    label: "Backend Warrior",
    description:
      "Wields databases and APIs with precision. The backbone of every high-performing guild.",
    sprite: "/sprites/backend-warrior.png",
  },
  [UserClass.FRONTEND_MAGE]: {
    label: "Frontend Mage",
    description:
      "Conjures interfaces that feel like magic. Turns complex logic into elegant experiences.",
    sprite: "/sprites/frontend-mage.png",
  },
  [UserClass.DEVOPS_ENGINEER]: {
    label: "DevOps Engineer",
    description:
      "Keeps the castle running. Infrastructure, deployments, and reliability are your domain.",
    sprite: "/sprites/devops-engineer.png",
  },
  [UserClass.FULLSTACK_ROGUE]: {
    label: "Full-Stack Rogue",
    description:
      "Nimble across the entire stack. You move fast and build where others hesitate.",
    sprite: "/sprites/fullstack-rogue.png",
  },
  [UserClass.ML_ALCHEMIST]: {
    label: "ML Alchemist",
    description:
      "Transmutes raw data into insight. Training models and finding patterns is your craft.",
    sprite: "/sprites/ml-alchemist.png",
  },
  [UserClass.SYSTEM_ARCHITECT]: {
    label: "System Architect",
    description:
      "Designs the foundations others build on. Scalability, reliability, and clarity are your standards.",
    sprite: "/sprites/system-architect.png",
  },
  [UserClass.SECURITY_SENTINEL]: {
    label: "Security Sentinel",
    description:
      "Guards the walls. Vulnerabilities are puzzles you solve before attackers find them.",
    sprite: "/sprites/security-sentinel.png",
  },
  [UserClass.WANDERER]: {
    label: "Wanderer",
    description:
      "You spot the gaps others miss. You can't fill the Backend slot, but you can define the quest that makes it worth filling.",
    sprite: "/sprites/wanderer.png",
  },
};
