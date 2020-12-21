import AsyncStorage, { AsyncStorageStatic } from '@react-native-community/async-storage';

const APP_STORAGE_PREFIX = '@QT/';

export default class Storage {
  private static instance: Storage;

  protected readonly storage: AsyncStorageStatic;
  private readonly prefix = APP_STORAGE_PREFIX;

  private constructor() {
    this.storage = AsyncStorage;
  }

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }

    return Storage.instance;
  }

  getItem = async (key: string) => {
    return await this.storage.getItem(this.prefix + key);
  };

  setItem = async (key: string, value: string) => {
    return this.storage.setItem(this.prefix + key, value);
  };

  clear = async () => {
    return this.storage.clear();
  };
}
