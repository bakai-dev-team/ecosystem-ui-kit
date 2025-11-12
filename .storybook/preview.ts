import type { Preview } from '@storybook/react-vite'
import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";
import "../src/shared/assets/styles/styles.scss"
setupIonicReact();


export const parameters = {
  darkMode: {
    current: "light",
  },
};
