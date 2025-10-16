export interface OccupationalRisk {
  id: string;
  name: string;
  category: "physical" | "chemical" | "biological" | "ergonomic" | "accident";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  preventiveMeasures: string;
  affectedEmployees: string[];
  companies: string[];
  lastAssessment: string;
  nextAssessment: string;
  status: "active" | "controlled" | "eliminated";
}
