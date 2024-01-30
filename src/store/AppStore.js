import { makeAutoObservable } from "mobx";

export default class AppStore {
  constructor() {
    this._isLoading = false;
    this._isAuth = false;
    this._isOpen = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setLoading(bool) {
    this._isLoading = bool;
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setIsOpen(bool) {
    this._isOpen = bool;
  }

  get loading() {
    return this._isLoading;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get isOpen() {
    return this._isOpen;
  }
}
