import {TokenType} from "../enums/token.type";

export interface TokenResponse {
  id: string;
  creationDate: Date;
  expiryDate: Date;
  tokenType: TokenType;
}
