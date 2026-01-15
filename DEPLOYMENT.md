# Nginx Deployment Guide

## HashRouter ile Nginx Konfigürasyonu

Bu proje **HashRouter** kullanıyor, bu yüzden nginx konfigürasyonu basit. HashRouter kullanıldığında URL'ler `#/path` formatında olur ve hash kısmı server'a gönderilmez.

## Kurulum Adımları

### 1. Build Alın
```bash
npm run build
```

### 2. Build Dosyalarını Server'a Kopyalayın
```bash
# Örnek: dist klasörünü server'a kopyalayın
scp -r dist/* user@your-server:/var/www/html/
```

### 3. Nginx Konfigürasyonunu Ayarlayın

#### Ubuntu/Debian için:
```bash
sudo nano /etc/nginx/sites-available/your-app
```

Aşağıdaki konfigürasyonu yapıştırın:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # Kendi domain'inizi yazın
    
    root /var/www/html;  # Build edilmiş dosyaların bulunduğu dizin
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # Static dosyalar için cache
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API istekleri için proxy
    location /api {
        proxy_pass http://62.84.178.128:5555;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # HashRouter için: Tüm route'ları index.html'e yönlendir
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 404 hatalarını da index.html'e yönlendir (SPA için)
    error_page 404 /index.html;
}
```

#### SSL/HTTPS için (Let's Encrypt):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 4. Nginx'i Test Edin ve Yeniden Başlatın
```bash
# Konfigürasyonu test et
sudo nginx -t

# Nginx'i yeniden başlat
sudo systemctl restart nginx
```

## Önemli Notlar

1. **HashRouter Kullanımı**: HashRouter kullanıldığında URL'ler `#/path` formatında olur. Hash kısmı server'a gönderilmez, bu yüzden nginx konfigürasyonu basit kalır.

2. **API Proxy**: API istekleri `/api` path'i üzerinden proxy edilir. Backend URL'ini `nginx.conf` dosyasında güncelleyin.

3. **Static Dosyalar**: Static dosyalar (CSS, JS, images) için cache ayarları yapılmıştır.

4. **Gzip Compression**: Gzip compression aktif edilmiştir, bu sayede dosya boyutları küçülür.

## Sorun Giderme

### 404 Hatası Alıyorsanız:
- `try_files $uri $uri/ /index.html;` satırının olduğundan emin olun
- `error_page 404 /index.html;` satırının olduğundan emin olun
- Nginx'i yeniden başlatın: `sudo systemctl restart nginx`

### API İstekleri Çalışmıyorsa:
- Backend URL'ini kontrol edin
- CORS ayarlarını kontrol edin
- Nginx error log'larını kontrol edin: `sudo tail -f /var/log/nginx/error.log`

### Static Dosyalar Yüklenmiyorsa:
- Dosya izinlerini kontrol edin: `sudo chown -R www-data:www-data /var/www/html`
- Nginx'in dosyalara erişim izni olduğundan emin olun

