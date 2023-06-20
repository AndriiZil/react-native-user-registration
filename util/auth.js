import axios from 'axios';

const API_KEY = 'AIzaSyB5MS0kW5jsJ8hYqTSKATsfVFfgBVMq4pE';

export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const payload = { email, password, returnSecureToken: true };

  const { data: { idToken } } = await axios.post(url, payload);

  return idToken;
}

export async function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export async function login(email, password){
  return authenticate('signInWithPassword', email, password);
}
