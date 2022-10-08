<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/GlintonLiao/questopia">
    <img src="./public/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Questopia</h2>

  <p align="center">
    3D Room · Online Portfolio · Personal Website
    <br />
    <a href="https://questopia.vercel.app/">View Live</a>

  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

After working as an architect for two years, I decided to switch my career path. The project is the 3D visualization of my room, mainly consist of two part: my current projects as a programmer, and my past as an architect.

## Tech Stacks

+ HTML & CSS
+ TypeScript
+ Three.js
  + GLSL/Shader
  + Blender
  + Tweakpane
  + normalize-wheel
+ Vite
  + plugin-glsl
+ Vercel
  
### Reference

If you want to build your own projects using same settings as mine, you can reference to [threejs-template-typescript](https://github.com/GlintonLiao/threejs-template-typescript), click "Use this template".

## Key Concepts

### Modeling

+ #### Performance Enhancement
  
+ #### Texture Map

  In this project, objects returned from notion are complex and have many restrictions. For example

### Structures

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

We need to export a handler function:

```javascript
// api/xx.js
export default async function handler(req, res) {
  ...
  return res.json("Success");
}
```

When we call api like this:

```javascript
const res = fetch('api/xx');
```

the handler function will be called.

### Dark Mode

### Context Hook

Because we have a gallery page using dynamic routing:

```javascript
<Link href="/gallery">
  <button>
    ...
  </button>
</Link>
```

and we cannot pass props using `<Link />`, so we need to use either third-party state management tools like redux, or the native context API of React.

to use context api, in `context/` folder, we can create a context provider:

```javascript
import { createContext } from "react";
import React, { useState } from "react";
export const Context = createContext();

function ContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  return (
    <Context.Provider value={[posts, setPosts]}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
```

and warp the root component with the provider:

```javascript
// _app.js
function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
        <Component {...pageProps} />
    </ContextProvider>
  );
}
```

and in each page, we can access context and update context:

```javascript
// /pages/gallery.js
const Gallery = () => {
  const [posts, setPosts] = useContext(Context);
  console.log(posts);
  setPosts(...);
}
```

### Layout

By setting different flex direction, we can easily achieve such effect:

<img width="500" alt="flex img" src="https://user-images.githubusercontent.com/37015336/186587949-e3c7f679-d1e4-4089-b8cf-fcc677a33e53.png">

## Run on Your Local Machine

First, clone the project source code from your terminal:

```bash
git clone git@github.com:GlintonLiao/questopia.git
cd questopia
```

Second, install the dependencies:

```sh
pnpm install
```

And run the development server:

```bash
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

You can start editing the page by modifying `main.ts`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy the Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Import project from Github repository
2. Set environment variables such as `NOTION_API_KEY` and `DATABASE_NAME`
3. Set custom domain name
