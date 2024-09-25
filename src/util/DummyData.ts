import { CardType } from "./Types";

export const DEFAULT_CARDS: CardType[] = [
    // TODAY
    {
        title: "Research DB options for new microservice",
        id: "5",
        column: "today",
    },
    { title: "Postmortem for outage", id: "6", column: "today" },
    { title: "Sync with product on Q3 roadmap", id: "7", column: "today" },
    
    // UPCOMING
    { title: "Look into render bug in dashboard", id: "1", column: "upcoming" },
    { title: "SOX compliance checklist", id: "2", column: "upcoming" },
    { title: "[SPIKE] Migrate to Azure", id: "3", column: "upcoming" },
    { title: "Document Notifications service", id: "4", column: "upcoming" },

    // OPTIONAL
    {
        title: "Refactor context providers to use Zustand",
        id: "8",
        column: "optional",
    },
    { title: "Add logging to daily CRON", id: "9", column: "optional" },
    
];