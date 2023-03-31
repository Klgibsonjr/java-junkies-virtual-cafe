import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  // function to check if the user is logged in
  loggedIn() {
    // checks to see if there's a saved token and if it's still vaild
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); 
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // function to retrieve token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // function to save user token to localStorage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // function to clear the user token andd profile data from localStorage
  logout() {
    localStorage.removeItem('id_token');
    // reloads the page and resets application's state
    window.location.assign('/');
  }
}

export default new AuthService();
