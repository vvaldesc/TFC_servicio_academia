import { defineConfig } from 'astro/config';
import db from "@astrojs/db";

import webVitals from "@astrojs/web-vitals";

// https://astro.build/config
export default defineConfig({
  output: 'server'
  //adapter: nodejs(),
  ,

  integrations: [db(), webVitals()]
});