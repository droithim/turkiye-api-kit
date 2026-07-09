# Türkiye API Kit

Türkiye'deki kamu kurumları ve açık veri kaynakları (TCMB, E-Devlet, Belediye Açık Veri Portalları vb.) için standartlaştırılmış, TypeScript tabanlı bir API entegrasyon kütüphanesi.

## Neden Bu Proje?

Türkiye merkezli uygulamalar geliştirirken farklı kurumların API'lerini (veya API sunmayan ancak veri sağlayan servislerini) entegre etmek çoğu zaman zahmetli ve tekrarlayıcı bir iştir. Bu proje, bu süreçleri kolaylaştırmayı, tip güvenliği (type-safety) sağlamayı ve topluluk tarafından geliştirilen ortak bir havuz oluşturmayı hedefler.

## Başlangıç

```typescript
import { getCities, getDistricts } from 'turkiye-api-kit';

const cities = await getCities();
console.log(cities);
```

## Klasör Yapısı

- `src/apis/`: Her bir kurum veya servis için ayrı bir TypeScript dosyası.
- `src/index.ts`: Tüm entegrasyonların dışa aktarıldığı ana giriş noktası.

## Katkıda Bulunma Rehberi (Contribution Guide)

Dış geliştiricilerin yeni API entegrasyonları eklemesini çok isteriz! İşte adım adım süreç:

1.  **Yeni Bir API Dosyası Oluşturun**: `src/apis/` klasörü altında ilgili servisi temsil eden bir dosya oluşturun (örneğin: `tcmb.ts`).
2.  **Tipleri Tanımlayın**: API'den dönecek veriler için `interface` veya `type` tanımlarını yapın.
3.  **Fonksiyonu Gerçekleştirin**: `fetch` veya benzeri bir yöntemle veriyi çekip tipine uygun şekilde döndüren asenkron fonksiyonu yazın.
4.  **Dışa Aktarın**: Yazdığınız fonksiyonu `src/index.ts` dosyasında export edin.
5.  **Belgeleyin**: Eklediğiniz servisin kullanımını bu README dosyasına ekleyin.

Katkılarınız için şimdiden teşekkürler! 🚀
