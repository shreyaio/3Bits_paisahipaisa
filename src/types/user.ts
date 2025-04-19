
export type VerificationStatus = "basic" | "pending" | "verified" | "none";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
  verificationStatus: VerificationStatus;
  completionPercentage: number;
}