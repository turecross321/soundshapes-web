import {TokenType} from "../enums/token.type";

export interface TokenResponse {
  id: string;
  creationDate: string;
  expiryDate: string;
  tokenType: TokenType;
}
