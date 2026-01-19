# Timeleft Back Office

This project was bootstrapped with next.js

## Getting Started

You need `node@20+`to run this project.
After cloning the project run

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project is also running on the world-wide-web at this url: https://timeleft-backoffice.nterol.deno.net/ _(Deployed via Deno Deploy)_

You can also launch tests locally by using:

- `npm run test` for unit tests
- `npm run test:e2e` for end to end tests

## Navigation and strategy

You should navigate to `/events` to really check on the application.
The app will fetch the events JSON server-side from the given URL and set its result in cache. Filtering, sorting and pagination happen client-side via search-params update.

I tried to use page `params` and `searchParams` so that everything would happen server side, but this led to a very poor UX where the whole page would reload on every filter/sorting picking.

Clicking on the `ID` cells of the events table will open the `events/[eventID]` page. The modal only appear on Client Side as it is not possible to call the `showModal` method of the `<dialog>` HTML Element. But all the modals content is generated at build time via `generateStaticParams`.

## Stack

This project uses [Next.js](https://nextjs.org/docs) for routing and SSR/SSG, with the App Router

It uses [Tailwind](https://tailwindcss.com/) for styling, [Class Variant Authority (cva)](https://cva.style/docs) for combining variants in components and some [Shadcn](https://ui.shadcn.com/docs) components

Search Params are handled with [nuqs](https://nuqs.dev/). No other state management library was needed for this exercice.

Testing is handled with [Playwright](https://playwright.dev/) for end to end tests and [Jest](https://jestjs.io/) for unit tests _(because Vitest kept on crashing)_.

We're also using Github actions to add unit and e2e tests to the CI.

## Further development

Further develoment would includes adding more e2e/unit tests.

Also, on a real project, most of the events processing would actually happen on a remote server. But it is also possible to set up a custom server on Next that would handle these operations via query params, or directlly by using `server actions`.
