# Deployment Checklist

Use this checklist before deploying the portfolio.

- [ ] Confirm the site content is ready for production.
- [ ] Confirm the projects page placeholder is intentional for this release.
- [ ] Run `npm install` if dependencies changed.
- [ ] Run `npm run lint` and fix any reported issues.
- [ ] Run `npm run build` and confirm the production build succeeds.
- [ ] Check that images, links, and navigation work locally.
- [ ] Verify any required environment variables are set in Vercel.
- [ ] Confirm Vercel is only auto-deploying the `master` branch.
- [ ] Merge or push the final release commit to `master`.
