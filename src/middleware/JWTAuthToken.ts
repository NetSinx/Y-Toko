import * as jose from 'jose';

export class JWTAuthToken {
  private secretAdmin: Uint8Array;
  private secret: Uint8Array;
  private jwt: string;

  constructor() {
    this.secretAdmin = new TextEncoder().encode("netsinxadmin_15");
    this.secret = new TextEncoder().encode("userxtoken");
  }

  async signJWT(isAdmin: {isAdmin: boolean}): Promise<string> {
    if (isAdmin) {
      this.jwt = await new jose.SignJWT({'username': 'netsinx_15', 'admin': true, iss: 'netsinx_15', iat: Date.now() / 1000 + 2})
      .setExpirationTime(Date.now() / 1000 + 2)
      .setIssuedAt(Date.now())
      .setIssuer("netsinx_15")
      .sign(this.secretAdmin);
  
      return this.jwt;
    } else {
      this.jwt = await new jose.SignJWT({iat: Date.now() / 1000 + 2})
      .setExpirationTime(Date.now() / 1000 + 2)
      .setIssuedAt(Date.now())
      .sign(this.secret);
  
      return this.jwt;
    }
  }
}