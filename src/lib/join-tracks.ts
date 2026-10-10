export type JoinTrack = "sport" | "health" | "solidarity" | "innovation";

export type JoinPrefill = {
  track?: JoinTrack;
};

type Option = {
  value: string;
  key: string;
};

export type JoinTrackConfig = {
  titleKey: string;
  subKey: string;
  questionKey: string;
  defaultRole: string;
  defaultCollaboration: string[];
  orgTypes: Option[];
  focusAreas: Option[];
  collaboration: Option[];
};

export const JOIN_TRACKS: Record<JoinTrack, JoinTrackConfig> = {
  sport: {
    titleKey: "part.1",
    subKey: "join.track.sport.sub",
    questionKey: "join.track.sport.q",
    defaultRole: "organization",
    defaultCollaboration: ["directory", "events"],
    orgTypes: [
      { value: "club", key: "join.org.sport.club" },
      { value: "league", key: "join.org.sport.league" },
      { value: "school", key: "join.org.sport.school" },
      { value: "team", key: "join.org.sport.team" },
      { value: "athlete", key: "join.org.sport.athlete" },
      { value: "coach", key: "join.org.sport.coach" },
      { value: "facility", key: "join.org.sport.facility" },
      { value: "sponsor", key: "join.org.sport.sponsor" },
      { value: "ngo", key: "join.org.sport.ngo" },
      { value: "other", key: "form.other" },
    ],
    focusAreas: [
      { value: "football", key: "join.focus.sport.football" },
      { value: "futsal", key: "join.focus.sport.futsal" },
      { value: "basketball", key: "join.focus.sport.basketball" },
      { value: "volleyball", key: "join.focus.sport.volleyball" },
      { value: "handball", key: "join.focus.sport.handball" },
      { value: "martial_arts", key: "join.focus.sport.martial_arts" },
      { value: "athletics", key: "join.focus.sport.athletics" },
      { value: "swimming", key: "join.focus.sport.swimming" },
      { value: "esports", key: "join.focus.sport.esports" },
      { value: "youth", key: "join.focus.sport.youth" },
      { value: "inclusive", key: "join.focus.sport.inclusive" },
      { value: "women", key: "join.focus.sport.women" },
    ],
    collaboration: [
      { value: "directory", key: "join.collab.directory" },
      { value: "events", key: "join.collab.events" },
      { value: "sponsors", key: "join.collab.sponsors" },
      { value: "volunteers", key: "join.collab.volunteers" },
      { value: "facilities", key: "join.collab.facilities" },
      { value: "cross_border", key: "join.collab.cross_border" },
      { value: "training", key: "join.collab.training" },
      { value: "community", key: "join.collab.community" },
    ],
  },
  health: {
    titleKey: "part.2",
    subKey: "join.track.health.sub",
    questionKey: "join.track.health.q",
    defaultRole: "organization",
    defaultCollaboration: ["directory", "information"],
    orgTypes: [
      { value: "hospital", key: "join.org.health.hospital" },
      { value: "clinic", key: "join.org.health.clinic" },
      { value: "health_center", key: "join.org.health.center" },
      { value: "association", key: "join.org.health.association" },
      { value: "professional", key: "join.org.health.professional" },
      { value: "mental_health", key: "join.org.health.mental" },
      { value: "public_health", key: "join.org.health.public" },
      { value: "ngo", key: "join.org.health.ngo" },
      { value: "pharmacy", key: "join.org.health.pharmacy" },
      { value: "other", key: "form.other" },
    ],
    focusAreas: [
      { value: "primary", key: "join.focus.health.primary" },
      { value: "pediatrics", key: "join.focus.health.pediatrics" },
      { value: "mental", key: "join.focus.health.mental" },
      { value: "dental", key: "join.focus.health.dental" },
      { value: "nursing", key: "join.focus.health.nursing" },
      { value: "rehab", key: "join.focus.health.rehab" },
      { value: "prevention", key: "join.focus.health.prevention" },
      { value: "maternal", key: "join.focus.health.maternal" },
      { value: "elderly", key: "join.focus.health.elderly" },
      { value: "emergency", key: "join.focus.health.emergency" },
      { value: "telehealth", key: "join.focus.health.telehealth" },
    ],
    collaboration: [
      { value: "directory", key: "join.collab.directory" },
      { value: "information", key: "join.collab.information" },
      { value: "events", key: "join.collab.events" },
      { value: "prevention", key: "join.collab.prevention" },
      { value: "cross_border", key: "join.collab.cross_border" },
      { value: "network", key: "join.collab.network" },
      { value: "community", key: "join.collab.community" },
    ],
  },
  solidarity: {
    titleKey: "part.3",
    subKey: "join.track.solidarity.sub",
    questionKey: "join.track.solidarity.q",
    defaultRole: "organization",
    defaultCollaboration: ["visibility", "volunteers"],
    orgTypes: [
      { value: "foundation", key: "join.org.solidarity.foundation" },
      { value: "ngo", key: "join.org.solidarity.ngo" },
      { value: "volunteers", key: "join.org.solidarity.volunteers" },
      { value: "project", key: "join.org.solidarity.project" },
      { value: "religious", key: "join.org.solidarity.religious" },
      { value: "cooperative", key: "join.org.solidarity.cooperative" },
      { value: "neighborhood", key: "join.org.solidarity.neighborhood" },
      { value: "other", key: "form.other" },
    ],
    focusAreas: [
      { value: "food", key: "join.focus.solidarity.food" },
      { value: "education", key: "join.focus.solidarity.education" },
      { value: "housing", key: "join.focus.solidarity.housing" },
      { value: "environment", key: "join.focus.solidarity.environment" },
      { value: "gender", key: "join.focus.solidarity.gender" },
      { value: "children", key: "join.focus.solidarity.children" },
      { value: "elderly", key: "join.focus.solidarity.elderly" },
      { value: "disability", key: "join.focus.solidarity.disability" },
      { value: "migrants", key: "join.focus.solidarity.migrants" },
      { value: "animals", key: "join.focus.solidarity.animals" },
      { value: "culture", key: "join.focus.solidarity.culture" },
    ],
    collaboration: [
      { value: "visibility", key: "join.collab.visibility" },
      { value: "volunteers", key: "join.collab.volunteers" },
      { value: "events", key: "join.collab.events" },
      { value: "cross_border", key: "join.collab.cross_border" },
      { value: "partnerships", key: "join.collab.partnerships" },
      { value: "resources", key: "join.collab.resources" },
      { value: "community", key: "join.collab.community" },
    ],
  },
  innovation: {
    titleKey: "part.4",
    subKey: "join.track.innovation.sub",
    questionKey: "join.track.innovation.q",
    defaultRole: "university",
    defaultCollaboration: ["directory", "events", "students"],
    orgTypes: [
      { value: "university", key: "join.org.innovation.university" },
      { value: "bootcamp", key: "join.org.innovation.bootcamp" },
      { value: "school", key: "join.org.innovation.school" },
      { value: "meetup", key: "join.org.innovation.meetup" },
      { value: "coworking", key: "join.org.innovation.coworking" },
      { value: "incubator", key: "join.org.innovation.incubator" },
      { value: "tech_company", key: "join.org.innovation.tech_company" },
      { value: "research", key: "join.org.innovation.research" },
      { value: "student_club", key: "join.org.innovation.student_club" },
      { value: "government", key: "join.org.innovation.government" },
      { value: "other", key: "form.other" },
    ],
    focusAreas: [
      { value: "software", key: "join.focus.innovation.software" },
      { value: "ai", key: "join.focus.innovation.ai" },
      { value: "blockchain", key: "join.focus.innovation.blockchain" },
      { value: "startups", key: "join.focus.innovation.startups" },
      { value: "hardware", key: "join.focus.innovation.hardware" },
      { value: "design", key: "join.focus.innovation.design" },
      { value: "data", key: "join.focus.innovation.data" },
      { value: "education", key: "join.focus.innovation.education" },
      { value: "research", key: "join.focus.innovation.research" },
      { value: "open_source", key: "join.focus.innovation.open_source" },
      { value: "entrepreneurship", key: "join.focus.innovation.entrepreneurship" },
    ],
    collaboration: [
      { value: "directory", key: "join.collab.directory" },
      { value: "events", key: "join.collab.events" },
      { value: "students", key: "join.collab.students" },
      { value: "mentors", key: "join.collab.mentors" },
      { value: "cross_border", key: "join.collab.cross_border" },
      { value: "demo_day", key: "join.collab.demo_day" },
      { value: "talent", key: "join.collab.talent" },
      { value: "funding", key: "join.collab.funding" },
    ],
  },
};

export const JOIN_CITY_OPTIONS = [
  { value: "pi", key: "city.pi.b" },
  { value: "foz", key: "city.foz.b" },
  { value: "cde", key: "city.cde.b" },
  { value: "region", key: "join.city.region" },
  { value: "other", key: "form.other" },
] as const;
