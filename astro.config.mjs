import { defineConfig } from 'astro/config';

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: 'server'
  //adapter: nodejs(),
  ,
  integrations: [db()]
});