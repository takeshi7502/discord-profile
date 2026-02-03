# Discord Profile Card

Một trang web profile card giống Discord được thiết kế với giao diện đẹp mắt và hiệu ứng động. Trang web này tái hiện giao diện profile của Discord với các tính năng như hiển thị avatar, banner, badges, roles, và thông tin kết nối mạng xã hội.

## ✨ Tính năng

- 🎨 Giao diện Discord được tái hiện chi tiết
- 🖼️ Avatar decoration tự động thay đổi
- 🌄 Banner tự động thay đổi theo thời gian
- 🏅 Hiển thị Discord badges (HypeSquad, Active Developer, Nitro, v.v)
- 🎭 Custom roles với màu sắc tùy chỉnh
- 🔗 Tích hợp liên kết mạng xã hội (YouTube, Twitter, GitHub, Discord)
- 🎵 Background music tự động phát
- 💬 Tích hợp Facebook Messenger chat
- 📱 Responsive design

## 🚀 Cài đặt

1. Clone repository:
   ```bash
   git clone <repository-url>
   cd discord-profile
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

Edit the `src/config/index.ts` file to customize your profile.

```typescript
export const CONFIG = {
  name: "Your Name",
  username: "yourusername",
  bio: "Your bio here",
  avatar: "/avatar.png",
  theme: "dark", // 'dark' or 'light'
  colors: {
    primary: "#6366f1",
    secondary: "#8b5cf6",
  },
  socialLinks: {
    discord: "https://discord.gg/yourserver",
    twitter: "https://twitter.com/yourhandle",
    github: "https://github.com/yourusername",
    instagram: "https://instagram.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourprofile",
  },
};
```

## Deployment

### Vercel

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "feat: initial commit"
   git push origin main
   ```

2. Import the project on Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Click "Deploy"

### Netlify

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "feat: initial commit"
   git push origin main
   
