# Dependency Analysis: baserah-patient-app

I have analyzed the `package.json` file and searched the entire codebase for actual usage of each dependency. Below is the list of unused, redundant, or extra packages that can be safely removed to reduce bundle size and maintenance overhead.

## 🔴 Unused Packages (No Imports Found)
These packages are listed in `package.json` but are not imported or used anywhere in the source code (`app/`, `features/`, `components/`, `lib/`, etc.).

| Package | Version | Reason for Removal |
| :--- | :--- | :--- |
| `notifee` | `^0.0.1` | **Duplicate.** The project uses `@notifee/react-native` (v9.1.8) instead. |
| `iconsax-react` | `^0.0.8` | **Duplicate.** This is the web version. The project uses `iconsax-react-native`. |
| `i18n-js` | `^4.5.0` | **Redundant.** The project uses `i18next` and `react-i18next` for translations. |
| `react-native-elements` | `^3.4.3` | **Not used.** No imports found; project likely uses `@rn-primitives` and custom UI components. |
| `expo-apple-pay` | `^0.5.8` | **Not used.** No code imports found. |
| `react-native-tamara-sdk` | `^1.0.10` | **Not used.** No code imports found. |
| `react-native-localize` | `^3.3.0` | **Not used.** Project uses `I18nManager` directly or doesn't need this. |
| `expo-localization` | `~16.1.6` | **Not used.** No code imports found. |
| `react-native-phone-input` | `^1.3.7` | **Redundant.** Project uses `react-native-international-phone-number`. |
| `@supabase/supabase-js` | `^2.49.4` | **Not used.** No imports found. |
| `uuid` | `^11.1.0` | **Not used.** No imports found. |
| `react-native-calendar-strip`| `^2.2.6` | **Not used.** Project uses `react-native-calendars`. |
| `redux-persist-expo-file-system-storage` | `^1.1.6` | **Not used.** Store configuration uses `AsyncStorage`. |

## 🟡 Potentially Redundant / Extra
These are installed but might not be strictly necessary depending on your target platforms or future plans.

- **`react-native-web` / `react-dom`**: These are standard for Expo if you plan to support web, but can be removed if you are targeting **only** mobile.
- **`@rn-primitives`**: There are 16+ primitive packages. While most are used in `components/ui`, some might be extras if that specific UI component (like `Accordion` or `Tooltip`) is never actually rendered in the app pages.

## ✅ Summary of Action
Removing these 13 packages will:
1. **Reduce `node_modules` size.**
2. **Speed up fresh installs (`npm install`).**
3. **Clean up configuration files.**

> [!TIP]
> Would you like me to create a plan to remove these unused packages and verify the app still builds correctly?
