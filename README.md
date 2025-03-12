Spotify的基础克隆版，具备上传音乐/专辑、播放和实时聊天功能的音乐网站。
技术栈：React、TailwindCSS、ShadcnUI、Zustand、Clerk、Express、Cloudinary、MongoDB、Socket.IO
采用Express框架搭建后端，负责基于RESTful的路由和业务逻辑处理；使用MongoDB存储音乐URL、聊天记录和账户信
息；使用Cloudinary作为图片托管；采用Clerk提供用户验证服务。
使用Vite作为脚手架，TypeScript作为编程语言，React实现各种Hooks，ShadcnUI搭建界面，Zustand进行全局状态管
理。
利用Socket.io实现多账户同时登录时的实时聊天功能。
