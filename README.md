# Türkiye API Kit

Türkiye'deki kamu kurumları ve açık veri kaynakları (TCMB, NVİ, E-Devlet vb.) için standartlaştırılmış, TypeScript tabanlı bir API entegrasyon kütüphanesi.

## Özellikler

- **Tip Güvenliği**: Tüm API yanıtları TypeScript arayüzleri ile tanımlanmıştır.
- **Sıfır Bağımlılık**: Dış paket bağımlılığı olmadan hafif ve hızlı.
- **Modern**: ES Modules ve Fetch API tabanlı.

## Kullanım

### TCMB Döviz Kurları
TCMB günlük döviz kurlarını çekmek için:

```typescript
import { getExchangeRates } from 'turkiye-api-kit';

const rates = await getExchangeRates();
const usd = rates.find(r => r.code === 'USD');
console.log(`USD Alış: ${usd?.buying} TL`);
```

### NVİ TC Kimlik No Doğrulama
MERNİS sistemi üzerinden kimlik doğrulamak için:

```typescript
import { verifyTCKimlik } from 'turkiye-api-kit';

const isValid = await verifyTCKimlik({
  tcKimlikNo: 10000000000,
  ad: 'AHMET',
  soyad: 'YILMAZ',
  dogumYili: 1990
});

console.log(isValid ? 'Doğrulandı' : 'Hatalı Bilgi');
```

### İl ve İlçe Listesi
```typescript
import { getCities } from 'turkiye-api-kit';

const cities = await getCities();
```

## Klasör Yapısı

- `src/apis/`: Her bir kurum veya servis için ayrı bir TypeScript dosyası.
- `src/index.ts`: Tüm entegrasyonların dışa aktarıldığı ana giriş noktası.

## Katkıda Bulunma Rehberi (Contribution Guide)

Dış geliştiricilerin yeni API entegrasyonları eklemesini çok isteriz! İşte adım adım süreç:

1.  **Yeni Bir API Dosyası Oluşturun**: `src/apis/` klasörü altında ilgili servisi temsil eden bir dosya oluşturun.
2.  **Tipleri Tanımlayın**: API'den dönecek veriler için `interface` veya `type` tanımlarını yapın.
3.  **Fonksiyonu Gerçekleştirin**: `fetch` kullanarak veriyi çekip tipine uygun şekilde döndüren asenkron fonksiyonu yazın.
4.  **Dışa Aktarın**: Yazdığınız fonksiyonu `src/index.ts` dosyasında export edin.

Katkılarınız için şimdiden teşekkürler! 🚀
