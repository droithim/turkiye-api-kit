/**
 * TCMB Günlük Döviz Kurları Entegrasyonu.
 */

export interface ExchangeRate {
  code: string;
  name: string;
  buying: number | null;
  selling: number | null;
}

/**
 * TCMB'den bugünün döviz kurlarını çeker ve parse eder.
 * Bağımlılık gerektirmemesi için robust bir regex parser kullanılır.
 */
export async function getExchangeRates(): Promise<ExchangeRate[]> {
  try {
    const response = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml');
    if (!response.ok) {
      throw new Error(`TCMB API hatası: ${response.status}`);
    }

    // TCMB XML is served in ISO-8859-9 (Turkish).
    // We convert it to UTF-8 using TextDecoder.
    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder('iso-8859-9');
    const xmlText = decoder.decode(buffer);

    const rates: ExchangeRate[] = [];
    const currencyRegex = /<Currency\s+.*?CurrencyCode="([A-Z]{3})".*?>(.*?)<\/Currency>/gs;
    let match;

    while ((match = currencyRegex.exec(xmlText)) !== null) {
      const code = match[1];
      const content = match[2];

      const nameMatch = content.match(/<Isim>(.*?)<\/Isim>/);
      const buyingMatch = content.match(/<ForexBuying>(.*?)<\/ForexBuying>/);
      const sellingMatch = content.match(/<ForexSelling>(.*?)<\/ForexSelling>/);

      rates.push({
        code,
        name: nameMatch ? nameMatch[1].trim() : '',
        buying: buyingMatch && buyingMatch[1].trim() !== '' ? parseFloat(buyingMatch[1]) : null,
        selling: sellingMatch && sellingMatch[1].trim() !== '' ? parseFloat(sellingMatch[1]) : null
      });
    }

    return rates;
  } catch (error) {
    console.error('TCMB kurları alınırken hata oluştu:', error);
    throw error;
  }
}
