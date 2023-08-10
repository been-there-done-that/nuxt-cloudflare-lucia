/// <reference types="lucia-auth" />
declare namespace Lucia {
  type Auth = import("./utils/auth.js").Auth;
  type UserAttributes = {
    email: string;
  };
  type DatabaseUserAttributes = {
		username: string;
    email?: string
	};
  type DatabaseSessionAttributes = {};

}
