/**
 * In-memory cache utility for storing fetched data
 * Helps reduce API calls to external services
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class MemoryCache {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  
  /**
   * Get data from cache if it exists and hasn't expired
   */
  get<T>(key: string): { data: T; timestamp: number } | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    // Check if cache has expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return {
      data: entry.data as T,
      timestamp: entry.timestamp,
    };
  }
  
  /**
   * Set data in cache with a TTL (time to live) in milliseconds
   */
  set<T>(key: string, data: T, ttlMs: number): void {
    const now = Date.now();
    
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + ttlMs,
    });
  }
  
  /**
   * Clear a specific cache entry
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }
  
  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }
  
  /**
   * Check if a cache entry exists and is valid
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }
    
    // Check if cache has expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
  
  /**
   * Get cache statistics
   */
  stats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export a singleton instance
export const cache = new MemoryCache();

// Default cache TTL: 5 minutes (300000ms)
export const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

// Cache key for Google Apps Script data
export const GAS_DATA_CACHE_KEY = 'gas-data';
