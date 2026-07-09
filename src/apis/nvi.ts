/**
 * NVİ TC Kimlik No Doğrulama (KPSPublic) API Entegrasyonu.
 */

export interface TCKimlikVerifyRequest {
  tcKimlikNo: number;
  ad: string;
  soyad: string;
  dogumYili: number;
}

/**
 * MERNİS SOAP servisi üzerinden T.C. Kimlik Numarası doğrular.
 * @param data Doğrulanacak bilgiler (TC No, Ad, Soyad, Doğum Yılı)
 * @returns Doğrulama sonucu (true/false)
 */
export async function verifyTCKimlik(data: TCKimlikVerifyRequest): Promise<boolean> {
  const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
      <TCKimlikNo>${data.tcKimlikNo}</TCKimlikNo>
      <Ad>${data.ad.toLocaleUpperCase('tr-TR')}</Ad>
      <Soyad>${data.soyad.toLocaleUpperCase('tr-TR')}</Soyad>
      <DogumYili>${data.dogumYili}</DogumYili>
    </TCKimlikNoDogrula>
  </soap:Body>
</soap:Envelope>`;

  try {
    const response = await fetch('https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tckimlik.nvi.gov.tr/WS/TCKimlikNoDogrula'
      },
      body: soapEnvelope
    });

    if (!response.ok) {
      throw new Error(`NVİ API hatası: ${response.status}`);
    }

    const xmlText = await response.text();
    return xmlText.includes('<TCKimlikNoDogrulaResult>true</TCKimlikNoDogrulaResult>');
  } catch (error) {
    console.error('TC Kimlik doğrulama sırasında hata oluştu:', error);
    return false;
  }
}
