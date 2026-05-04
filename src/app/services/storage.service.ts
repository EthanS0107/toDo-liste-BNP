import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Sauvegarde une donnée dans le localStorage

  setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`[StorageService] Erreur lors de la sauvegarde pour la clé "${key}":`, error);
    }
  }

  // Récupère une donnée du localStorage

  getItem<T>(key: string): T | null {
    try {
      const rawValue = localStorage.getItem(key);
      if (!rawValue) return null;
      return JSON.parse(rawValue) as T;
    } catch (error) {
      console.error(`[StorageService] Erreur lors de la lecture pour la clé "${key}":`, error);
      return null;
    }
  }

  // Supprime une donnée du localStorage

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }


  // Vérifie si une clé existe dans le localStorage

  hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
