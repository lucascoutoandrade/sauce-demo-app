export interface UserCredentials {
  username: string;
  password: string;
}

export const standardUserCredentials: UserCredentials = {
  username: 'standard_user',
  password: 'secret_sauce'
};

export const lockedOutUserCredentials: UserCredentials = {
  username: 'locked_out_user',
  password: 'secret_sauce'
};

export const invalidStandardUserCredentials: UserCredentials = {
  username: standardUserCredentials.username,
  password: 'invalid_password'
};

export const problemUserCredentials: UserCredentials = {
  username: 'problem_user',
  password: 'secret_sauce'
};
