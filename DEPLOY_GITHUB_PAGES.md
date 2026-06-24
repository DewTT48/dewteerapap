# Deploy to GitHub Pages

คู่มือนี้ใช้สำหรับ publish landing page นี้ขึ้น GitHub Pages แบบง่ายที่สุด โดยยังไม่ต้องมี domain และไม่ต้องใช้ Vercel

## วิธีที่แนะนำที่สุด

สร้าง repository ชื่อ:

```txt
<github-username>.github.io
```

ตัวอย่าง:

```txt
dewteerapap.github.io
```

ข้อดีคือ URL จะสั้นและอยู่ที่ root:

```txt
https://<github-username>.github.io
```

ถ้าใช้ repo ชื่ออื่น เว็บยัง deploy ได้ แต่ URL จะเป็น:

```txt
https://<github-username>.github.io/<repo-name>/
```

โปรเจกต์นี้ตั้งค่าให้รองรับทั้งสองแบบแล้ว

## ขั้นตอนบนเครื่อง

1. เปิด Terminal ที่ folder นี้:

```bash
cd "/Users/dewteerapap/Documents/Codex Space"
```

2. ทดสอบ build:

```bash
npm run build
```

ถ้าผ่าน จะได้ folder `out`

3. เริ่ม Git repo:

```bash
git init
git add .
git commit -m "Initial Dew landing page"
```

4. เพิ่ม remote ของ GitHub:

```bash
git branch -M main
git remote add origin https://github.com/<github-username>/<repo-name>.git
git push -u origin main
```

## ขั้นตอนบน GitHub

1. เข้า repository บน GitHub
2. ไปที่ `Settings`
3. ไปที่ `Pages`
4. ตรง `Build and deployment`
5. เลือก `Source` เป็น `GitHub Actions`
6. กลับไปที่ tab `Actions`
7. รอ workflow `Deploy to GitHub Pages` ทำงานเสร็จ

เมื่อสำเร็จ GitHub จะให้ URL ของเว็บในหน้า `Actions` หรือ `Settings > Pages`

## หลังจากแก้เว็บครั้งต่อไป

ใช้คำสั่ง:

```bash
git add .
git commit -m "Update landing page"
git push
```

GitHub Actions จะ build และ publish ให้เอง
