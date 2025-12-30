
export interface Token {
  mint: string;
  name: string;
  symbol: string;
  description?: string;
  image_uri: string;
  market_cap: number;
  twitter?: string;
  website?: string;
  telegram?: string;
  created_timestamp: number;
  raydium_pool?: string;
}

export enum AuditStatus {
  INSTITUTIONAL = 'INSTITUTIONAL_GRADE',
  VERIFIED = 'VERIFIED_METADATA',
  HIGH_RISK = 'HIGH_RISK_ANONYMOUS',
  DANGEROUS = 'MALFORMED_SIGNATURE'
}

export interface SecurityAudit {
  status: AuditStatus;
  statusLabel: string;
  riskScore: number;
  developerReputation: number;
  socialIntegrity: number;
  liquidityProgress: number;
}
