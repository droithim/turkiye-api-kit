export interface City {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

/**
 * Türkiye İl ve İlçe bilgilerini getiren basit bir API örneği.
 * Veri kaynağı simülasyon amaçlıdır.
 */
export async function getCities(): Promise<City[]> {
  // Örnek statik veri
  return [
    { id: 1, name: 'Adana' },
    { id: 6, name: 'Ankara' },
    { id: 34, name: 'İstanbul' },
    { id: 35, name: 'İzmir' }
  ];
}

export async function getDistricts(cityId: number): Promise<District[]> {
  const districts: Record<number, District[]> = {
    34: [{ id: 1, name: 'Kadıköy' }, { id: 2, name: 'Beşiktaş' }],
    6: [{ id: 3, name: 'Çankaya' }, { id: 4, name: 'Keçiören' }]
  };
  return districts[cityId] || [];
}
