import { NextRequest, NextResponse } from 'next/server';
import { cache, DEFAULT_CACHE_TTL, GAS_DATA_CACHE_KEY } from '@/lib/cache';

// Default Google Apps Script URL
const DEFAULT_GAS_URL =
  'https://script.google.com/macros/s/AKfycbylUhTwKcdq76gjvf5eKGOioVt3GMcFqnRFGzDNrgRHVIp75CUp15rBAYB0bopUHfKuaQ/exec';

interface GasResponse {
  success: boolean;
  data: unknown;
  lastUpdated: number | null;
  source: string;
  cached?: boolean;
  warning?: string;
  error?: string;
}

/**
 * GET /api/gas-data
 * Fetches class schedule data from Google Apps Script
 * 
 * Query Parameters:
 * - url: (optional) Custom Google Apps Script URL
 * - force: (optional) Force refresh cache if set to 'true'
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const gasUrl = searchParams.get('url') || DEFAULT_GAS_URL;
  const forceRefresh = searchParams.get('force') === 'true';

  try {
    // Check cache first (unless force refresh is requested)
    if (!forceRefresh) {
      const cachedResult = cache.get<unknown>(GAS_DATA_CACHE_KEY);
      
      if (cachedResult) {
        const response: GasResponse = {
          success: true,
          data: cachedResult.data,
          lastUpdated: cachedResult.timestamp,
          source: 'google-apps-script',
          cached: true,
        };
        
        return NextResponse.json(response);
      }
    }

    // Fetch fresh data from Google Apps Script
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch(gasUrl, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const timestamp = Date.now();

      // Store in cache
      cache.set(GAS_DATA_CACHE_KEY, data, DEFAULT_CACHE_TTL);

      const result: GasResponse = {
        success: true,
        data,
        lastUpdated: timestamp,
        source: 'google-apps-script',
        cached: false,
      };

      return NextResponse.json(result);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }
  } catch (error) {
    console.error('Error fetching GAS data:', error);

    // If we have stale cache data, return it with an error flag
    const cachedResult = cache.get<unknown>(GAS_DATA_CACHE_KEY);
    
    if (cachedResult) {
      const response: GasResponse = {
        success: true,
        data: cachedResult.data,
        lastUpdated: cachedResult.timestamp,
        source: 'google-apps-script',
        cached: true,
        warning: 'Using cached data due to fetch error',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      
      return NextResponse.json(response);
    }

    // No cache available, return error
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data',
        data: null,
        lastUpdated: null,
        source: 'google-apps-script',
      },
      { status: 500 }
    );
  }
}
