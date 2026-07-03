# Architecture Notes

## Runtime boundaries

The application has one server-rendered entry route and a client-side portfolio shell. The shell owns navigation because moving between zones is part of the game metaphor and should not require network requests. Each content-heavy zone is an isolated component, while `lib/portfolio-data.ts` is the typed source of truth for project, skill, timeline, achievement, and quest content.

The `EnergyCore` canvas is dynamically imported with server-side rendering disabled. It is decorative and marked `aria-hidden`, so application meaning never depends on WebGL. Geometry is deliberately low-poly, the canvas DPR is capped, and reduced-motion mode stops continuous transforms and lowers particle count.

## State model

Ephemeral state includes the active filter, open dialog, selected skill node, selected timeline stop, NPC response, form state, and mini-game sequence. Device-local state includes:

- boot sequence completion;
- active zone and visited zones;
- day/night and weather mode;
- hidden achievement unlock state.

No contact details or form content are persisted. The contact workflow copies a user-authored briefing locally and directs the visitor to the explicit LinkedIn channel; the site does not silently transmit data to a third party.

## Interaction model

The persistent bottom command bar supports pointer and keyboard navigation. Keys `1` through `5` select zones. Every icon-only control has an accessible name and hover tooltip. Dialogs use Radix primitives for focus containment and Escape handling.

The visual language uses angular panels, restrained glass surfaces, actual 3D geometry, grid telemetry, and four functional accent colors. Page sections remain unframed; cards are reserved for repeated mission, achievement, and tool records.

## Deployment model

vinext compiles the Next-compatible application through Vite. The Sites adapter validates `.openai/hosting.json`, then the Cloudflare plugin emits the worker and static client output. Production versions are saved against an exact source commit before deployment.
