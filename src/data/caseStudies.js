// Case-study content for the full project pages (#/work/<slug>).
// Screens come from local builds on demo copies of each database, or from the
// live Everyday Crackers admin with customer details blurred.

const P = import.meta.env.BASE_URL + 'assets/images/projects/'
const img = (path, caption, extra = {}) => ({ src: `${P}${path}.webp`, thumb: `${P}${path}.thumb.webp`, caption, ...extra })
const tall = { tall: true }

export const CASE_STUDIES = {
  'everyday-crackers': {
    slug: 'everyday-crackers',
    title: 'Everyday Crackers',
    tagline: 'A Laravel commerce platform rebuilt clean-room: race-safe stock, courier integration, page-level staff permissions, and a scoped API an AI agent sells through.',
    category: 'Full-stack',
    status: 'live',
    statusNote: 'Live. Final testing of the Nuigent agent integration is under way.',
    live: 'https://everydaycrackers.com',
    role: 'Solo Full-Stack Developer, and the owner of the business',
    stack: ['Laravel 12', 'PHP 8.2', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'Steadfast API', 'Google Apps Script', 'REST API'],
    hero: img('edc/admin-dashboard', 'The admin: operational numbers, the review queue and low stock per colour.'),
    glance: [
      { value: 'Live', label: 'everydaycrackers.com' },
      { value: '20', label: 'admin modules' },
      { value: '11', label: 'per-module staff permissions' },
      { value: 'Clean', label: 'provenance audit: no legacy code tokens' },
    ],
    problem:
      'My shop ran on a site derived from a licensed commercial codebase, so I could not safely change it, and it was quietly losing money. A product with one unit in stock could be ordered five times over, the courier\'s delivery updates never reached the system, and the colour a customer chose disappeared between cart and order.',
    built:
      'I rebuilt the whole store clean-room on Laravel 12: new schema, new models, new admin, new storefront, carrying across only the shop\'s own business data. A provenance-audit command scans the codebase to prove no third-party code came along. Then I fixed what the old system had been hiding, and connected the shop to Nuigent, the AI agent that sells for it on Facebook and Instagram.',
    outcome:
      'The store is live. Checkout takes stock with a conditional decrement, so two shoppers racing for the last unit cannot both win. Courier statuses arrive through an authenticated webhook backed by an hourly sync. Messenger sales made by the AI agent now take stock on the website itself, and survive the website being briefly down.',
    architecture:
      'The shop owns the stock and the money; the agent owns the conversation. Everything between them goes through one narrow, scoped API, so the AI side can be wrong without being dangerous.',
    sections: [
      {
        id: 'checkout',
        title: 'Checkout that cannot oversell',
        intro:
          'The bug that started the rebuild: nothing checked stock in the cart or at checkout, so one unit could be sold five times. Fixing it properly meant treating the last unit as a contested resource rather than a number to read and then write.',
        points: [
          'Stock is taken with a conditional decrement, so two shoppers racing for the last unit cannot both win',
          'The losing order rolls back in full rather than half-creating and leaving an orphan',
          'Stock is held per colour, so a product can be in stock while the requested colour is not',
          'Delivery is priced by zone at the server, never trusted from the form',
          'Phone verification gates order creation when the shop has SMS credit',
          'Gapless order and invoice numbering, so a missing number means something',
        ],
        shots: [
          img('edc/shopper-checkout', 'Checkout: guest by default, delivery priced by zone, verification before the order exists.', {
            notes: [
              { x: 17, y: 27, text: 'Free-delivery threshold is computed from the cart subtotal on the server, not from anything the form sends.' },
              { x: 15, y: 56, text: 'Guest checkout by default. One tick promotes the order to an account, so there is no separate signup flow to maintain.' },
              { x: 28, y: 69, text: 'District and thana are inferred from the typed address, and the copy invites a correction rather than asserting it is right.' },
              { x: 71, y: 58, text: 'Coupons are validated server-side against usage limit and expiry before the total moves.' },
              { x: 62, y: 67, text: 'Delivery is its own line, resolved from the chosen zone, so the total can always be explained.' },
              { x: 19, y: 94, text: 'Three delivery zones. A zone can be switched off without losing its price, so turning it back on restores what was there.' },
            ],
          }),
          img('edc/shopper-cart-drawer', 'Cart drawer: AJAX add with no page reload, and the colour carried on the line.', {
            notes: [
              { x: 40, y: 12, text: 'Free-delivery progress, so the shopper is told the exact gap rather than a vague nudge.' },
              { x: 30, y: 24, text: 'The chosen colour rides on the order item, which is what the old system dropped between cart and order.' },
              { x: 44, y: 55, text: 'Upsell drawn from the live catalogue, not a hardcoded list that rots.' },
            ],
          }),
          img('edc/shopper-order-success', 'Confirmation: the order number, the lines with their colours, and where to go next.'),
          img('edc/shopper-invoice', 'Server-rendered PDF invoice: gapless number, amount in words, and the accept-on-delivery terms.'),
        ],
      },
      {
        id: 'catalogue',
        title: 'A product model built for variants',
        intro:
          'A colour is not a label on a product, it is a stock line with its own SKU, price and photo. Getting that right in the schema is what makes the storefront, the admin and the courier slip all agree on which thing was sold.',
        points: [
          'Per-colour variants: own stock, SKU, price override and image',
          'Low-stock threshold per product, falling back to a shop-wide default',
          'SEO fields per product: slug, page title and meta description with length guidance',
          'Warranty cover and a per-product return window, surfaced on the product page',
          'Categories nest one level, and a parent holding children cannot hold products itself',
          'Media split into gallery images and full-width description panels, so a tall panel never lands in the Facebook preview',
        ],
        shots: [
          img('edc/live-product-edit', 'The product editor: every field the catalogue model supports, on one screen.', tall),
          img('edc/live-products', 'Product list: price, discount and stock broken down by colour.'),
          img('edc/shopper-product', 'The same model as the customer meets it: colour required, stock shown per colour.'),
          img('edc/live-categories', 'Category tree, with the rule that a parent with children cannot hold products.', tall),
        ],
      },
      {
        id: 'orders',
        title: 'Order pipeline and courier integration',
        intro:
          'An order moves through review, dispatch and delivery, and the delivery status has to arrive without anyone refreshing anything. On the old site that webhook had been failing silently for months.',
        points: [
          'Review queue: an order is accepted or rejected before stock and courier work begin',
          'Courier webhook authenticated with a secret compared using hash_equals, not string equality',
          'The old webhook sat behind CSRF and returned 419 to every callback, so no status ever arrived',
          'An hourly sync backstops the webhook, because a webhook you cannot replay is a single point of failure',
          'Manual, POS-style order entry for sales taken by phone',
          'Public order tracking by order number plus phone, with no account and no session',
        ],
        shots: [
          img('edc/admin-dashboard', 'Dashboard: the operational numbers, and what is waiting for a decision.', {
            notes: [
              { x: 21, y: 16, text: 'Revenue counts paid orders only, so a pile of unpaid cash-on-delivery orders cannot flatter the figure.' },
              { x: 29, y: 26, text: 'Orders waiting for a decision, linked straight into the review queue.' },
              { x: 45, y: 46, text: 'Fourteen days of revenue: short enough to show this week, long enough to show a trend.' },
              { x: 85, y: 50, text: 'Order mix by status, and how many captured carts became orders.' },
              { x: 80, y: 88, text: 'Low stock per colour, because a product can read in stock while the colour someone wants is gone.' },
            ],
          }),
          img('edc/admin-orders-new', 'Review queue: nothing reaches the pipeline until someone accepts it.'),
          img('edc/live-orders', 'Order management: payment state and delivery state tracked separately.'),
          img('edc/live-courier', 'Courier portal: consignments, balance and bulk status sync against the Steadfast API.'),
          img('edc/admin-order-create', 'Manual order entry with live product search, for orders taken by phone.'),
          img('edc/live-track', 'Public tracking: order number plus phone, no account required.'),
        ],
      },
      {
        id: 'inventory',
        title: 'Inventory, landed cost and reporting',
        intro:
          'Margin is only honest if the cost side is real. Stock arrives as a consignment with its own cost, and every cart is captured whether or not it became an order.',
        points: [
          'Stock-in consignments record supplier, lines, units and landed cost',
          'Every cart is persisted as a lead, so an abandoned checkout is still a contactable customer',
          'Sales, product, inventory and customer reports over any date range',
          'CSV and PDF export from the same report definitions',
        ],
        shots: [
          img('edc/live-stock-in', 'Stock in: what arrived, from whom, and what it actually cost.'),
          img('edc/live-cart-leads', 'Cart leads: carts captured whether or not they converted.'),
          img('edc/admin-reports', 'Reports with date ranges and CSV or PDF export.'),
        ],
      },
      {
        id: 'access',
        title: 'Access control and audit trail',
        intro:
          'A shop with staff needs to answer two questions: who can open this page, and who changed this record. Both are enforced server-side, not hidden in the UI.',
        points: [
          'Eleven permission modules toggled per staff account',
          'Deactivated accounts are refused at sign-in, a hole the old system left open',
          'Every back-office action is written to an activity log against the person who did it',
          'The log is filterable by module, so an audit question has a short answer',
        ],
        shots: [
          img('edc/live-staff', 'Staff accounts with per-module access, not a single admin flag.'),
          img('edc/live-activity', 'Activity log: every change attributed and filterable.', tall),
        ],
      },
      {
        id: 'integrations',
        title: 'Integration surface',
        intro:
          'The shop is not an island: an AI agent sells through it, a spreadsheet mirrors it, a courier reports into it and an SMS gateway speaks for it. Each of those is a boundary that has to fail safely.',
        points: [
          'A REST API scoped to the catalogue: it cannot reach orders, customers, staff or settings, and can never publish a product',
          'Token issue and revoke from the admin, with last-used tracking so a dead integration is visible',
          'Google Sheets sync through Apps Script for price, inventory and order mirrors',
          'Website chat handed to the AI agent, switched on from settings',
          'Switches state their real consequence: turning on phone verification without SMS credit would block every order, and the page says so',
        ],
        shots: [
          img('edc/live-api-token', 'The integration token and, in plain words, the blast radius it is limited to.'),
          img('edc/live-settings', 'Settings: payment, sheet sync, chat, verification and delivery zones.', tall),
        ],
      },
    ],
    decisions: [
      { title: 'Clean-room, and provable', body: 'Rebuilding was not enough; I had to be able to show it. edc:provenance-audit scans every source file for banned tokens and the legacy naming convention, and exits non-zero if anything is found.' },
      { title: 'Stock taken where it is sold', body: 'A Messenger sale used to lower a Google Sheet and never reach the site. The agent now takes stock through the site\'s own StockService, and queues the sale to replay every five minutes if the shared host is down.' },
      { title: 'A narrow API instead of database access', body: 'The AI agent gets a token scoped to the catalogue, a staff account holding 3 of 11 modules, and nothing else. If the agent is ever wrong, the blast radius is small.' },
      { title: 'Honest switches', body: 'Turning on phone verification without an SMS gateway would block every order, so the settings page says exactly that, and a delivery zone switched off keeps its charge for when it comes back.' },
    ],
    note: 'Screens marked "live" are from the production admin with customer names, phone numbers, tracking codes and private URLs blurred. Dashboard, order-queue, manual-order and report screens come from a local copy with seeded demo orders.',
  },

  savoria: {
    slug: 'savoria',
    title: 'Savoria',
    tagline: 'A multi-restaurant SaaS platform: point of sale, live floor plan, kitchen display, recipe costing and a public storefront for every restaurant on one install.',
    category: 'Laravel',
    status: 'built',
    statusNote: 'Built and working. Not deployed publicly.',
    github: 'https://github.com/nahid864/restaurant-management-system',
    role: 'Solo Full-Stack Developer',
    stack: ['Laravel 10', 'PHP 8.1', 'MySQL', 'Blade', 'Alpine.js', 'Multi-tenant'],
    hero: img('savoria/roles/waiter/floor-tables', 'Live floor plan, signed in as a waiter.'),
    glance: [
      { value: '5', label: 'fixed roles' },
      { value: '66', label: 'pages walked as every role' },
      { value: '53 / 13 / 6 / 3', label: 'pages open to owner / manager / waiter / cook' },
      { value: '1', label: 'place the tenant is ever set' },
    ],
    problem:
      'Restaurant software is usually sold one install per restaurant, and the tenant boundary is whatever each query remembers to add. Inside a restaurant, the people using it should see only what their job needs: a manager who can see the day\'s takings can also see what is missing from them, and a cook has no reason to see a price.',
    built:
      'One Laravel platform that hosts many restaurants. Every operational row carries a restaurant_id; reads are narrowed by a global scope and writes stamped automatically, so a model opts in once at the top of the class. The tenant is resolved exactly once per request, from the URL slug, the signed-in person\'s restaurant, or the restaurant a super admin has explicitly entered. Five roles are fixed in code and enforced three times over.',
    outcome:
      'A working platform covering point of sale, till shifts with counted-drawer variance, a live floor plan with courses, table moves and joins, a kitchen display, reservations and a walk-in queue, inventory with an append-only stock ledger, recipe costing, reports, and a public storefront per restaurant. A smoke test walks every GET route as every role, so a page added next month is covered the day it is added.',
    rolesTitle: 'Who sees what',
    rolesIntro: 'I signed in as each of the five roles and opened every page in the app, 66 in all. The grid and the screens below are what each role actually got, not what the documentation says it should get.',
    access: {
      roles: ['Super admin', 'Owner', 'Manager', 'Waiter', 'Cook'],
      rows: [
        ['Platform: restaurants, plans, subscriptions, admins', ['yes', 'no', 'no', 'no', 'no']],
        ['Dashboard, reports and history', ['enter', 'yes', 'no', 'no', 'no']],
        ['Menu, categories and recipe costing', ['enter', 'yes', 'no', 'no', 'no']],
        ['Ingredients, purchases, suppliers, stock ledger', ['enter', 'yes', 'no', 'no', 'no']],
        ['Staff, tables and settings', ['enter', 'yes', 'no', 'no', 'no']],
        ['Customers, orders, online desk, reservations', ['enter', 'yes', 'no', 'no', 'no']],
        ['Expenses', ['enter', 'yes', 'record', 'no', 'no']],
        ['Point of sale and till shifts', ['no', 'yes', 'yes', 'no', 'no']],
        ['Floor plan, table orders, bills, the queue', ['no', 'yes', 'yes', 'yes', 'no']],
        ['Kitchen display', ['no', 'yes', 'yes', 'no', 'yes']],
        ['Public storefront', ['yes', 'yes', 'yes', 'yes', 'yes']],
      ],
      legend: {
        yes: 'Full access',
        record: 'Can add, not review',
        enter: 'Only after explicitly entering a restaurant',
        no: 'Refused (403) or redirected',
      },
    },
    roles: [
      {
        key: 'super-admin',
        name: 'Super admin',
        pages: 10,
        summary: 'Runs the platform, not a restaurant. Creates restaurants, sets plans and subscription terms, manages platform administrators and reads activity across every tenant.',
        can: ['Create and suspend restaurants', 'Set plans, prices and subscription terms', 'See orders and revenue per tenant', 'Enter a restaurant deliberately to act inside it'],
        cannot: ['Land inside a restaurant by accident: restaurant pages send it to the tenant list', 'Cancel a restaurant\'s orders, even after entering it'],
        shots: [
          img('savoria/roles/super-admin/platform-dashboard', 'Platform dashboard across every restaurant.'),
          img('savoria/roles/super-admin/platform-restaurants', 'Tenants: every restaurant on the install.'),
          img('savoria/roles/super-admin/platform-restaurants-storefront', 'One tenant: status, plan, orders and revenue, with an explicit "Enter this restaurant".'),
          img('savoria/roles/super-admin/platform-plans', 'Subscription plans and their limits.'),
          img('savoria/roles/super-admin/platform-subscriptions', 'Subscription terms per restaurant.'),
          img('savoria/roles/super-admin/platform-activity', 'Activity across every tenant.'),
        ],
      },
      {
        key: 'owner',
        name: 'Owner',
        pages: 53,
        summary: 'Everything inside one restaurant: the numbers, the menu and its costing, stock, staff, settings, and every service screen.',
        can: ['Read sales, profit, item and service reports', 'Cost every dish from its ingredients, per size', 'Receive purchases into an append-only stock ledger', 'Manage staff, tables, settings and the online desk'],
        cannot: ['See or change any other restaurant', 'Edit a purchase once it is received: the edit page redirects to a read-only record'],
        shots: [
          img('savoria/roles/owner/manage-dashboard', 'Today at a glance: revenue, orders, average order, gross profit.'),
          img('savoria/roles/owner/manage-reports-profit', 'Profit and loss against recipe cost.'),
          img('savoria/roles/owner/manage-reports-sales', 'Sales by period.'),
          img('savoria/roles/owner/manage-recipes-menuItem-edit', 'Recipe costing: ingredients per portion, cost to make and margin, per size.'),
          img('savoria/roles/owner/manage-ledger', 'Append-only stock ledger: every movement is a new row.'),
          img('savoria/roles/owner/manage-purchases-purchase', 'A received purchase order: stock and average costs updated, record locked.'),
          img('savoria/roles/owner/manage-online', 'Online order desk.'),
          img('savoria/roles/owner/manage-reservations', 'Reservations.'),
          img('savoria/roles/owner/manage-staff', 'Staff and their roles.'),
          img('savoria/roles/owner/manage-settings', 'VAT, service charge, storefront and payment switches.'),
          img('savoria/roles/owner/manage-activity', 'History for this restaurant only.'),
        ],
      },
      {
        key: 'manager',
        name: 'Manager',
        pages: 13,
        summary: 'Runs the shift: the till, the floor and the kitchen. Deliberately no reports, no totals and no history. A manager who could see the day\'s takings could also see what was missing from them.',
        can: ['Take orders at the point of sale', 'Open a till with a float, read an X report, close with a counted drawer', 'Record a daily expense', 'Work the floor and the kitchen display'],
        cannot: ['See reports, totals or aggregates of any kind', 'Review or edit expenses after recording them', 'Cancel an order'],
        shots: [
          img('savoria/roles/manager/pos', 'Point of sale: signed-in managers land here.'),
          img('savoria/roles/manager/pos-till', 'The till: taken, cash, card and what the drawer should hold, then a counted close.'),
          img('savoria/roles/manager/pos-till-session', 'A till session and its recorded variance.'),
          img('savoria/roles/manager/pos-expense', 'Record an expense: add-only, dated in the restaurant\'s own calendar.'),
          img('savoria/roles/manager/pos-orders', 'Open orders at the till.'),
        ],
      },
      {
        key: 'waiter',
        name: 'Waiter',
        pages: 6,
        summary: 'The floor and nothing else: seat a party, take the order at the table, fire courses, and hand over the bill.',
        can: ['Seat and order in one motion', 'Hold a course and fire it when the table is ready', 'Move a party or join two tables onto one bill', 'Send a dish back, manage the walk-in queue'],
        cannot: ['Use the till or take payment', 'See the kitchen display, reports or any setting'],
        shots: [
          img('savoria/roles/waiter/floor-tables', 'Floor plan: Occupied is written by the open bill, not by hand.'),
          img('savoria/roles/waiter/floor-order-table', 'Ordering at table T01.'),
          img('savoria/roles/waiter/floor-bill-order', 'A running bill, as the waiter sees it.', {
            notes: [
              { x: 32, y: 35, text: 'A held course is on the bill and paid for like any other. It is simply not the kitchen\'s problem until the waiter calls it.' },
              { x: 69, y: 35, text: 'Send back a single dish without voiding the bill or re-keying the order.' },
              { x: 65, y: 67, text: 'Fire the course when the table is ready, and the kitchen display gets it at that moment.' },
              { x: 26, y: 81, text: 'Move a party to another table: the bill travels with the people, not the furniture.' },
              { x: 53, y: 81, text: 'Join two tables onto one bill. The absorbed bill keeps its number and is marked joined, so nothing vanishes from the history.' },
            ],
          }),
          img('savoria/roles/waiter/floor-waitlist', 'The walk-in queue with quoted waits.'),
        ],
      },
      {
        key: 'cook',
        name: 'Cook',
        pages: 3,
        summary: 'The kitchen display only. Tickets, per-dish state and waiting timers, and never a price anywhere.',
        can: ['See incoming tickets and move each dish through its states', 'See how long each ticket has waited'],
        cannot: ['See any price, bill or total', 'Open any other screen'],
        shots: [img('savoria/roles/cook/kitchen', 'Kitchen display, signed in as a cook.')],
      },
    ],
    sections: [
      {
        id: 'guests',
        title: 'What guests see',
        intro: 'Each restaurant gets its own public storefront at its slug. The slug is the only tenant key a stranger ever sees.',
        points: ['Menu with categories and variants', 'Cart, checkout and order tracking', 'Table reservations with live availability', 'bKash, Nagad or cash on delivery, per restaurant'],
        shots: [
          img('savoria/storefront-menu', 'The Savoria storefront: its public menu at /savoria.'),
          img('savoria/storefront-reserve', 'Reservation request.'),
        ],
      },
    ],
    decisions: [
      { title: 'The restaurant is the mother key', body: 'Scoping is something a model opts into once, through a trait that adds a global scope and stamps restaurant_id on create, rather than something every query must remember.' },
      { title: 'Identity and credentials are separate tables', body: 'users holds who someone is; user_logins holds how they get in. A staff record outlives its login, and nothing that reads a profile can ever leak a password hash.' },
      { title: 'Roles enforced three times', body: 'Route middleware, deny-by-default capability gates, and @can in the views. A smoke test enumerates the router itself and walks every GET route as every role.' },
      { title: 'Plans that actually bind', body: 'A plan\'s limits are enforced where they bite, such as the table count, and a lapsed restaurant is refused at sign-in with a reason, rather than letting staff in to fail on the next screen.' },
      { title: 'MySQL in tests, on purpose', body: 'The stock ledger relies on SELECT ... FOR UPDATE, which SQLite does not enforce, so the test suite runs on MySQL.' },
    ],
    note: 'Screens are from a local build on a demo copy of the seeded database. Every "who sees what" screen was captured signed in as that role.',
  },

  medicore: {
    slug: 'medicore',
    title: 'MediCore',
    tagline: 'A hospital platform where the pharmacy, the consultation desk and the wards share one stock ledger and one bill per patient.',
    category: 'Laravel',
    status: 'built',
    statusNote: 'Built and working. Not deployed publicly.',
    role: 'Solo Full-Stack Developer',
    stack: ['Laravel 10', 'PHP 8.1', 'MySQL', 'Blade', 'AdminLTE', 'Spatie Permission'],
    hero: img('medicore/wards-board', 'Bed board: occupancy by ward, days admitted and the outstanding balance.', {
      notes: [
        { x: 25, y: 13, text: 'Occupancy is counted from the admissions themselves, so the board cannot disagree with the ward.' },
        { x: 35, y: 30, text: 'What the current inpatients owe, in one figure, read from the ledger rather than stored.' },
        { x: 79, y: 31, text: 'Patients past their expected discharge date, named. This is the list the ward actually chases.' },
        { x: 33, y: 39, text: 'Five bed states, including cleaning and maintenance, so a bed is not offered before it is ready.' },
        { x: 26, y: 57, text: 'Each occupied bed shows the patient, the consultant and the day count of the stay.' },
      ],
    }),
    glance: [
      { value: '3', label: 'halves: pharmacy, OPD, wards' },
      { value: '1', label: 'balance per patient' },
      { value: '11', label: 'staff roles, 47 permissions' },
      { value: 'FEFO', label: 'first-expiry-first-out picking' },
    ],
    problem:
      'Pharmacy stock is not a number. It is a set of batches with different expiry dates, and treating it as a number is how expired medicine reaches a patient. A hospital also needs one bill per patient across the pharmacy counter, the consultation desk and the ward, not three separate debts that nobody can reconcile.',
    built:
      'A Laravel 10 platform built around four decisions: stock is a batch with its own expiry, picked first-expiry-first-out; bed occupancy and appointment slots are settled by the database, not by application checks; a business runs only the features it switched on; and a patient balance is read from the ledger, never stored. All business logic lives in services; controllers only validate and delegate.',
    outcome:
      'Three working halves joined by prescriptions and a shared stock ledger: a pharmacy with batch and expiry control, doctor appointments with live slot grids and a queue board, and inpatient wards with a bed board, drug chart and a running bill. One payment can settle several debts at once. Invoice and MRN numbers are gapless and lock-based.',
    sections: [
      {
        id: 'pharmacy',
        title: 'Pharmacy',
        intro: 'Dispensing is batch-aware: the counter picks the batch that expires first, and every movement lands in the stock ledger.',
        points: ['Stock kept as batches, each with its own expiry', 'Expiry watch and low-stock lists', 'Goods received against purchase orders', 'Physical count reconciliation'],
        shots: [
          img('medicore/pos', 'Pharmacy counter.'),
          img('medicore/stock-batches', 'Stock as batches, not a single number.'),
          img('medicore/stock-expiry', 'Expiry watch.'),
        ],
      },
      {
        id: 'opd',
        title: 'Outpatients',
        intro: 'Appointments run on a slot grid where the database, not the application, refuses a double booking.',
        points: ['Doctor schedules and time off', 'Live queue board for the consultation desk', 'Prescriptions that flow straight to the pharmacy', 'Duplicate-patient check at registration'],
        shots: [
          img('medicore/appointments-slots', 'Appointment slot grid.'),
          img('medicore/appointments-queue', 'Live consultation queue.'),
          img('medicore/prescriptions', 'Prescriptions.'),
          img('medicore/patients', 'Patient records.'),
        ],
      },
      {
        id: 'wards',
        title: 'Inpatients and billing',
        intro: 'Admitted patients build up a running bill, and every charge, from ward, pharmacy or consultation, lands in one balance.',
        points: ['Bed board with occupancy per ward', 'Admissions, bed transfers, drug chart and nursing notes', 'One balance per patient, read from the ledger', 'A single payment split across several debts'],
        shots: [
          img('medicore/wards-board', 'Bed board.'),
          img('medicore/admissions', 'Admissions with a running bill.'),
          img('medicore/billing', 'Patient balances.'),
        ],
      },
      {
        id: 'platform',
        title: 'One install, many shapes',
        intro: 'A single pharmacy shop and a full hospital run on the same code; each business switches on only the modules it uses.',
        points: ['Per-business feature switches', '11 roles, from doctor and nurse to pharmacist and cashier, on 47 permissions','Audit log of every change', 'AdminLTE served locally, so the interface works on an unreliable connection'],
        shots: [
          img('medicore/dashboard', 'Dashboard across pharmacy, OPD and wards.'),
          img('medicore/businesses', 'Feature switches per business.'),
          img('medicore/audit', 'Audit log.'),
        ],
      },
    ],
    decisions: [
      { title: 'A balance is read, never stored', body: 'Patient balances are computed from the ledger, so they cannot drift from the charges and payments behind them.' },
      { title: 'Let the database say no', body: 'Double-booked slots and double-occupied beds are refused by constraints and locks, which hold under concurrency where application checks do not.' },
      { title: 'Gapless numbering', body: 'Invoice and MRN numbers come from lock-based document sequences, because auditors ask about gaps.' },
    ],
    note: 'Screens are from a local build on a demo copy of the seeded database; patient phone numbers are replaced with dummy values.',
  },

  bloomsberry: {
    slug: 'bloomsberry',
    title: 'Bloomsberry POS',
    tagline: 'Back-of-house software for a Pan-Asian café: counter POS, kitchen display, recipe costing and Foodpanda reconciliation.',
    category: 'Laravel',
    status: 'built',
    statusNote: 'Built and working. Not deployed publicly.',
    role: 'Solo Full-Stack Developer',
    stack: ['Laravel 10', 'PHP 8.1', 'MySQL', 'Blade', 'Alpine.js'],
    hero: img('pos/pos', 'Counter point of sale.'),
    glance: [
      { value: '3', label: 'fixed roles' },
      { value: '4', label: 'payment methods, split in one bill' },
      { value: '80mm', label: 'thermal receipts' },
      { value: '1', label: 'Foodpanda import, reversible' },
    ],
    problem:
      'A café in Dhanmondi needed to know what each dish actually costs, what Foodpanda really pays after commission, and to let the counter manager take money without seeing the day\'s totals.',
    built:
      'A single-restaurant system: counter POS with split payment (cash, bKash, Nagad, card), VAT, service charge and 80mm receipts; a kitchen display with no prices; ingredients with unit conversion feeding an append-only stock ledger; per-dish recipes for true food cost; and a Foodpanda importer that reads the partner-portal export, reconciles commission and can roll back a bad import.',
    outcome:
      'Owner, manager and cook roles enforced by route middleware, deny-by-default gates and the views, with a test that walks the router itself. Managers run the till but see no reports or totals; cooks see tickets and never a price. This was the groundwork I later generalised into Savoria.',
    sections: [
      {
        id: 'service',
        title: 'Service',
        intro: 'The counter and the kitchen, built for speed during a rush.',
        points: ['Split payment across cash, bKash, Nagad and card', 'Discounts, VAT and service charge', 'Kitchen tickets move New, Preparing, Ready, with waiting timers', 'Cooks never see a price'],
        shots: [img('pos/pos', 'Counter POS.'), img('pos/kitchen', 'Kitchen display.'), img('pos/dashboard', "Owner dashboard.")],
      },
      {
        id: 'costing',
        title: 'Costing and stock',
        intro: 'Every dish has a recipe, so the owner sees real food cost and margin rather than a guess.',
        points: ['Per-dish and per-size recipes', 'Ingredients with unit conversion', 'Purchases, wastage and an append-only ledger', 'Profit and loss against recipe cost'],
        shots: [img('pos/recipes', 'Recipes.'), img('pos/ledger', 'Stock ledger.'), img('pos/purchases', 'Purchases.'), img('pos/reports-profit', 'Profit and loss.')],
      },
      {
        id: 'foodpanda',
        title: 'Foodpanda reconciliation',
        intro: 'Delivery sales come in from the partner-portal export, commission is reconciled, and a bad import can be rolled back.',
        points: ['Import from the partner-portal export', 'Map Foodpanda item names to the local menu', 'Commission reconciled per batch', 'Roll back a bad import'],
        shots: [img('pos/foodpanda', 'Foodpanda imports.'), img('pos/foodpanda-mappings', 'Item mappings.'), img('pos/orders', 'Order history.')],
      },
    ],
    decisions: [
      { title: 'Totals are a privilege', body: 'The manager role can take money but sees no aggregates, which removes the easiest way to hide a shortfall.' },
      { title: 'Imports must be reversible', body: 'A partner export can be wrong, so every Foodpanda import is a batch that can be rolled back cleanly.' },
    ],
    note: 'Screens are from a local build on a demo copy of the seeded database.',
  },

  nuigent: {
    slug: 'nuigent',
    title: 'Nuigent',
    tagline: 'A multi-tenant AI agent platform that runs the customer-facing work of a real shop: replies, orders, posts and campaigns, with a human gate on every outgoing action.',
    category: 'AI',
    status: 'building',
    statusNote: 'Live for Everyday Crackers.BD, 24/7. The interface is still being polished.',
    live: 'https://agent.nuigent.xyz/',
    role: 'Solo Developer: architecture, agents, infrastructure',
    stack: ['Python', 'FastAPI', 'Groq', 'Google Gemini', 'Meta Graph API', 'SQLite', 'Docker', 'Cloudflare Tunnel'],
    hero: img('nuigent/landing', 'Public landing page at agent.nuigent.xyz.'),
    glance: [
      { value: '6', label: 'models in the reply ensemble' },
      { value: '478', label: 'automated tests' },
      { value: '24/7', label: 'live for a real shop' },
      { value: '1', label: 'human gate on every outgoing action' },
    ],
    problem:
      'A one-person shop cannot answer every DM, cost every product, write every post and run every campaign by hand, and most AI tools either drift off-brand or send things you would never send.',
    built:
      'Agents that reply to Facebook and Instagram DMs and comments in the owner\'s voice, in Bangla or English, take orders, write and schedule content, render posters and promo videos, and run phased marketing campaigns. Replies come from a six-model ensemble (five Groq models plus Gemini) with a judge that merges or picks the best, so it rides through rate limits. A customer\'s photo is matched to the product by image embedding, not by a sentence about it.',
    outcome:
      'It runs the customer-facing operation of Everyday Crackers.BD on a dedicated machine behind a Cloudflare tunnel. Messenger sales take stock on the shop website directly, queued and replayed if the site is down. Multi-tenancy is enforced by a test that reads the source and fails the build on any unscoped query.',
    architecture:
      'Nuigent is the front desk; Everyday Crackers is the shop behind it. The agent holds a token scoped to the catalogue and nothing else, and a sale it takes on Messenger is written to the shop, not to a spreadsheet it hopes someone reconciles later.',
    sections: [
      {
        id: 'agent',
        title: 'What the agent does',
        intro: 'One agent handles the front desk: messages, comments, orders and posts, all in the brand\'s voice.',
        points: ['Replies in seconds, in Bangla or English, from real prices and product facts', 'Captures and confirms orders, then takes stock on the shop', 'Generates branded posters, captions and promo videos', 'Schedules and publishes to Facebook and Instagram'],
        shots: [
          img('nuigent/landing-2', 'A Bangla enquiry answered and the order captured.'),
          img('nuigent/landing-3', 'The work the agents take on.'),
        ],
      },
    ],
    decisions: [
      { title: 'A human gate by default', body: 'Every outgoing action can wait in a review queue; approve, edit or reject is one shared service, and the agent learns from the edits.' },
      { title: 'Ensemble over a single model', body: 'Six models answer in parallel and a judge merges them, which absorbs rate limits and bad single answers.' },
      { title: 'Tenancy you cannot forget', body: 'An AST test parses the codebase and fails the build if a scoped query is missing its business_id; per-business credentials are Fernet-encrypted in the database.' },
      { title: 'Pictures compared to pictures', body: 'Product photos become 512-number fingerprints. On the shop\'s own photos the same product from an unseen angle scored about 0.86; a different product about 0.54.' },
    ],
    note: 'Public pages only. Dashboard screens are behind a login and are being prepared with customer data removed.',
  },
}

export const CASE_STUDY_ORDER = ['everyday-crackers', 'nuigent', 'savoria', 'medicore', 'bloomsberry']
