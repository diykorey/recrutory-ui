# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`recrutory-ui` (internal module name `kandidatoApp`) is an AngularJS 1.2 single-page recruiting
app scaffolded from `generator-angular 0.9.2` in 2015. Two mirrored domains — **vacancies** and
**candidates** — each with a dashboard (card grid) and a list (table) view, plus a shared right-hand
side panel with four tabs: Main / Flow / Suggestions / Notes.

## Commands

The 2015 toolchain is grunt 0.4 + Ruby Compass + PhantomJS + Bower, with `engines.node: >=0.10.0`.
None of it installs on a current Node. Before assuming a command works, read this section.

| Command | Reality |
|---|---|
| `bower install` | Needed for `bower_components/`; `bower.json` mixes Angular 1.2.16 (core/route/resource/touch) with 1.3.15 (aria/animate/sanitize) and `angular-material 0.8.3`, which requires 1.3.x. Unsupported combination. |
| `grunt serve` | Dev server on :9000 (compass → autoprefixer → connect + livereload). Requires Ruby Compass. |
| `grunt build` | usemin pipeline → `dist/` (concat → ngmin → cdnify → cssmin → uglify → filerev → htmlmin). |
| `grunt test` / `npm test` | Broken independent of install. See below. |
| `grunt` (default) | Runs `newer:jshint`, but `Gruntfile.js` has no `jshint` block in `initConfig`. |

### Tests

There is no working test command, and **no way to run a single test**. `test/` holds two untouched
Yeoman stubs, broken three separate ways:

1. `test/karma.conf.js:26` globs `app/scripts/**/*.js`; source lives in `app/app/`. No app code
   loads, so `module('kandidatoApp')` throws in both specs.
2. ngMaterial / ngAnimate / ngAria / ngSanitize are absent from the karma `files` list, so the
   module could not bootstrap even with the right glob.
3. `test/spec/controllers/main.js:20` asserts `scope.awesomeThings` — scaffold left over from the
   generator. `MainCtrl` never sets it.

Wiring up tests means replacing the config and specs, not repairing them.

### If you need to actually run the app

The `chore/revive-ui` branch carries a working modern setup: dart-sass instead of Compass, a
zero-dependency `mock-server.js` that serves the app **and** answers `/recrutory/*` with in-memory
data, Angular unified at 1.3.15, and `npm start` on port 9000. Check that branch out rather than
reviving the Grunt pipeline on this one.

## Architecture

### Route → empty stub → template declares the real controller

This indirection is the single most important thing to know, and the easiest way to edit the wrong
file. `routeProvider.js:5` maps `/dashboard` to `vacancyDashboardCtrl` — which is an empty function
(`app/app/controllers/vacancy/vacancyDashboardController.js:10`). The logic is in `vacancyCtrl`,
attached one layer down by the view: `app/app/views/vacancyDashboard.html:1`.

`vacancyDashboardCtrl`, `candidateDashboardCtrl`, `candidateListCtrl`, `addVacancyCtrl`,
`addCvCtrl`, `addCandidate`, and `notesController` are all deliberately empty. Essentially all
behavior lives in two files:

- `app/app/controllers/vacancy/vacancyController.js` (~440 lines)
- `app/app/controllers/candidate/candidateController.js` (~460 lines)

### Components are scope-inheriting shells

The eight directives under `app/app/components/` (`vacancy|candidate` × `Card|SideMain|SideFlow|SideSuggestions`)
are seven-line `templateUrl` includes with **no isolate scope** — they read `$scope` straight from
`vacancyCtrl`/`candidateCtrl`. Changing behavior means changing the controller; the directive files
almost never need touching. Only `app/app/shared/tagList` declares a scope (`tags: '='`).

### Tab data loading

Each side-panel tab fetches on selection via `$scope.$watch('selectedIndex', ...)`
(`vacancyController.js:364`, `candidateController.js:364`): index 1 = flow, 2 = suggestions,
3 = notes. Adding a tab means extending that watcher, not the template alone.

### `index.html` is a hand-maintained script manifest

There is no module bundler. Every source file is listed as a `<script>` tag in `app/index.html`
(lines 89–132), grouped by comment banner and ordered by dependency. **A new controller, directive,
or factory does nothing until it is added there.** The `<!-- build:js -->` / `<!-- bower:js -->`
markers are consumed by usemin and wiredep — keep new tags inside the right block.

### API layer

`app/app/factory/apidatafactory.js` is the only HTTP code — `queryGet` / `queryPost` /
`queryDelete`, all relative to a single `apiURL` constant at line 6. That constant is the only place
the backend is configured. It currently points at `http://recrutory-web-dev.cloudapp.net:8080/recrutory/`,
a dead Azure host, so nothing loads data on this branch.

Note that error callbacks only `$log.error` and return `undefined` — a failed request silently
assigns `undefined` to the target scope property and leaves `$rootScope.loader` /
`$rootScope.updateProcess` stuck true. Expect blank views rather than error messages.

API surface (grep `ApiDataFactory` for exact URLs): vacancies, candidates, tags, `workflow/*`
("flow" = candidate↔vacancy pipeline), `comment/*` (notes), suggestions
(`findAvailable` / `findRecommended`), and `candidate/findFieldTypes` which feeds the
mass-autocomplete on candidate custom fields. Backend contract: <http://recrutory-swagger.azurewebsites.net/>.

### Routing gotcha

`routeProvider.js:33` declares `otherwise({redirectTo: '/'})` but there is no `.when('/')`. The app
root self-redirects and renders nothing — this is not a broken build. Open `#/dashboard`
(vacancies) or `#/candidateDashboard` (candidates). `views/main.html` and `views/about.html` are
not routed at all.

### Styles

`app/assets/styles/main.scss` imports bootstrap-sass then 16 local partials. Compiled by Compass to
`.tmp/` during `grunt serve` — the checked-in tree has no `main.css`.

## Conventions in this codebase

- No explicit DI annotations on controllers or directives; minification safety depends on `ngmin`
  in `grunt build`. Adding `['$scope', ..., function(...)]` form is safe and preferred for new code.
- `_` (underscore) and the `kandidatoApp` module var are implicit globals, as is `isEmpty` from
  `app/app/utils.js`.
- `.jshintrc` (2-space indent, single quotes, `eqeqeq`, `strict`, `undef`) contradicts essentially
  every existing source file, and no Grunt task enforces it. Match surrounding file style.
- Vacancy and candidate controllers are largely parallel copy-paste (tags, notes, quickAction).
  They have diverged on suggestions: `vacancyController.js:395` exposes `getSuggestions(page, availablePage, type)`
  as a function incrementing its page counter *before* the request; `candidateController.js:315`
  exposes `getSuggestions.{suggested,available}` as an object incrementing *after*. Changes to one
  side usually need a deliberate decision about the other.
