# Understood

A personal reference of coding problems, my own solutions, and the reasoning behind them.

This isn't a problem-a-day tracker. Each entry captures a problem worked through properly: the brute force approach first, a written explanation of why it works and what it costs, and (once built) an optimised solution for comparison. Every solution is my own, worked through untimed, with a record of what tripped me up and what clicked.

## Why this exists

Cramming algorithm practice in the days before an interview builds fragile knowledge that falls apart under pressure. This is the opposite: working through problems early, slowly, and repeatedly enough that the reasoning is genuinely mine, not memorised.

## How I use AI

I work out every solution myself. Claude sets the challenges, gives hints when I'm stuck, and reviews my code, but the reasoning and the solutions are mine.

Claude also builds the site itself, turning my solutions and explain-back notes into pages. The goal of this project is to get better at problem-solving, not at building Next.js pages, so that's where I put my own effort.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- CSS Modules
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for self-hosted Inter, matching the design tokens used across my [portfolio site](https://kerryclements.com)

## Structure

Each problem lives at `/problems/[problem-name]`, containing:

- The original problem statement, with a link to its source
- My own solution, with a complexity write-up
- My explain-back notes on how I reasoned through it
- A second solution, for comparison

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Deployment

Deployed via [Netlify](https://netlify.com).
