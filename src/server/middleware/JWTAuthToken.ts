import * as jose from 'jose';

export class JWTAuthToken {
  private secretAdmin: Uint8Array;
  private secret: Uint8Array;
  private jwt: string;

  constructor() {
    this.secretAdmin = new TextEncoder().encode("netsinxadmin_15");
    this.secret = new TextEncoder().encode("userxtoken");
  }

  async signJWT(isAdmin: boolean): Promise<string> {
    if (isAdmin) {
      this.jwt = await new jose.SignJWT({'username': 'netsinx_15', 'admin': true, iss: 'netsinx_15'})
      .setProtectedHeader({alg: 'HS512'})
      .setExpirationTime("2h")
      .setIssuedAt()
      .setIssuer("netsinx_15")
      .sign(this.secretAdmin);
  
      return this.jwt;
    } else {
      this.jwt = await new jose.SignJWT({'admin': false})
      .setProtectedHeader({alg: 'HS512'})
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(this.secret);
  
      return this.jwt;
    }
  }

  async verifyAdmin(token: string): Promise<boolean> {
    try {
      await jose.jwtVerify(token, this.secretAdmin, {'issuer': 'netsinx_15', algorithms: ['HS512']});

      return true;
    } catch(err) {
      return false;
    }
  }

  async verifyUser(token: string): Promise<boolean> {
    try {
      await jose.jwtVerify(token, this.secret, {algorithms: ['HS512']});
  
      return true;
    } catch (err) {
      return false;
    }
  }
}