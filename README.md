# SlientTalkUI — SlientTalk mobile app

**Context.** Part of **SlientTalk**: end users learn vocabulary, practice, and **translate sign language** using the device camera; the app talks to the **Python inference** service over **WebSockets** and to the **.NET AuthService** over **HTTPS**.

**What this repo is.** An **Expo** (React Native) app with: screens for home, translate (camera + streaming frames), dictionary/collections, practice, onboarding, auth, profile (plans/account). Uses **react-native-vision-camera**, **Socket.IO client**, **Axios**, and optional 3D (**three** / expo-gl) where used.

**How it works.** The translate flow captures frames, sends them as Socket.IO `frame` payloads to the inference server, listens for `prediction`, and builds on-screen text. Login and paid features use the backend API with **Bearer** tokens. **Important:** socket base URL is configured in `services/socket.ts` (replace dev/ngrok with your inference host).

**Run locally.**

```bash
npm install
npx expo start
```

Use Android/iOS emulator, device, or `npx expo start --web` per Expo docs. Grant camera (and any audio) permissions your build requires.
