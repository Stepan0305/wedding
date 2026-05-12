# Wedding Website Project Plan

## How we use this file

- This is the main working plan for the project.
- We will keep major stages here, discuss them one by one, and update statuses as we go.
- For each stage, we can add notes, decisions, links, and open questions.

## Project Goal

Build a beautiful wedding invitation website with animations, personalized guest links, photos, venue information, route guidance, rules, and a guest questionnaire with alcohol preferences. The site should later be deployed to hosting and connected to a custom domain.

## Status legend

- `[todo]` not started
- `[in-progress]` currently discussing or implementing
- `[done]` completed
- `[blocked]` waiting for external input or decision

---

## 1. Vision and Requirements
Status: `[done]`

Goal:
- Define the final scope of the website and the guest experience.

Notes:
- Initial idea: elegant wedding website with strong visual design and animations.
- Must include names, photos, map, route information, rules, personalized links, and alcohol questionnaire.
- We should also decide whether RSVP is included together with the alcohol form.
- Couple names: Stepan and Elizaveta.
- Wedding date: 2026-09-20.
- Primary site language: Russian.
- Preferred style: modern and ceremonial.
- Desired balance: the site should be both emotional and informative.
- Attendance confirmation is not required in the form because guests who cannot attend will notify personally.
- One personalized link can belong to a family or group of guests.
- A family/group invitation can contain multiple named questionnaires under one shared link.
- Guests should be able to return later and edit their responses.
- A free-form comment field is needed.
- No response deadline needs to be shown on the site.

Open questions:
- None at this stage.

Progress notes:
- 2026-05-09: Created the initial project plan file.
- 2026-05-09: Fixed the core concept: Stepan and Elizaveta, Russian-language website, modern and ceremonial tone, with equal emphasis on atmosphere and practical guest information.
- 2026-05-11: Confirmed the required site sections. All proposed sections are needed except the photo gallery.
- 2026-05-11: Defined the guest flow: a shared personalized link may represent a family or small guest group, each person gets their own questionnaire, answers can be edited later, and attendance confirmation is omitted from the form.
- 2026-05-11: Finalized the questionnaire scope: guest name is prefilled, alcohol preference is required, and any extra details can be written in a free-form comment. Separate dietary fields are not needed.
- 2026-05-11: Confirmed alcohol options for the questionnaire: no alcohol, champagne, wine, strong alcohol, cocktails, and no preference.
- 2026-05-11: Confirmed that the site will be Russian-only. Guest/group composition will be predefined from a provided table and loaded into the database during implementation. Guests cannot add new people themselves.
- 2026-05-11: Confirmed strict invitation control: all guest groups are defined only by the user in advance, with no plus-one support.

---

## 2. Content Collection
Status: `[todo]`

Goal:
- Gather all text, media, and event details needed for the website.

Notes:
- Names of the couple.
- Wedding date and time.
- Venue name and address.
- Route and parking details.
- Rules, wishes, dress code, and any guest instructions.
- Photos for the hero section and gallery.
- Guest list for personalized invitations.
- Development can start before final content is ready.
- Until real content is provided, we will use placeholder text and temporary content blocks, then replace them later.

Open questions:
- Final copywriting style.
- Number and quality of photos available.
- Whether there is a schedule/timeline for the day.

Progress notes:
- 2026-05-11: Agreed that exact event data can be provided later. During design and development we will use default placeholder content and replace it in a later content pass.

---

## 3. Design Direction
Status: `[todo]`

Goal:
- Define the visual language and interaction style of the website.

Notes:
- Choose mood, palette, typography, spacing, and animation character.
- Decide whether the design should feel classic, modern, editorial, romantic, minimal, cinematic, or another direction.
- Mobile-first design is important because many guests will open the site on their phones.
- Confirmed base colors:
  - primary color: `#bd1616`
  - background color: `#EDEBD7`
- Theme colors should be extracted into a dedicated theme file/config so they can be easily changed later during the project.
- Preferred visual direction: effectful, ceremonial, and premium rather than restrained minimalism.
- Animations should feel expensive and polished, with noticeable motion language.
- We should consider selective 3D effects and relevant libraries if they improve the emotional impact without harming performance or usability.

Open questions:
- Design references and inspiration.

Progress notes:
- 2026-05-11: Confirmed that the design should feel effectful and ceremonial, with polished premium animations and possible selective 3D presentation.
- 2026-05-11: Confirmed initial color direction with a deep red primary (`#bd1616`) and a warm light background (`#EDEBD7`). Also agreed that theme colors must be centralized in a separate file/config for easy iteration.
- 2026-05-11: Confirmed the emotional tone as romantic and airy rather than strict or severe.

---

## 4. Information Architecture
Status: `[done]`

Goal:
- Decide the structure of the site and the order of sections.

Notes:
- Likely one-page invitation site with a personalized flow.
- There will be no separate public landing page.
- Possible sections: hero, story, event details, gallery, location, how to get there, rules, RSVP/questionnaire.
- Decide whether the questionnaire lives on the same page or a separate step.
- Confirmed sections:
  - hero section with names, date, and visual atmosphere
  - greeting / short message to guests
  - emotional story or "we are waiting for you" block
  - event details: date, time, venue
  - map and route guidance
  - wedding day timeline
  - dress code / rules / wishes
  - personalized guest questionnaire
  - RSVP and alcohol preferences
- Photo gallery is not needed.
- Confirmed page order:
  1. hero section
  2. greeting to guests
  3. emotional story / atmosphere block
  4. event details
  5. wedding day timeline
  6. map and route guidance
  7. dress code / rules / wishes
  8. personalized questionnaire block

Open questions:
- None at this stage.

Progress notes:
- 2026-05-11: Confirmed a one-page invitation flow with emotional sections first, then practical information, then the personalized guest questionnaire.
- 2026-05-11: Confirmed that the project does not need a separate public homepage; the website exists only as personalized invitation pages plus an admin view.

---

## 5. Technical Architecture
Status: `[done]`

Goal:
- Choose the technology stack and data model.

Notes:
- Candidate stack: Next.js + Tailwind CSS + Framer Motion + Supabase.
- Need a way to store guests, tokens, and questionnaire answers.
- Need personalized invitation URLs.
- Confirmed frontend/application framework: `Next.js`.
- Main reason for choosing Next.js over plain React: convenient dynamic routes for personalized links and simple built-in server capabilities without a separate heavy backend.
- Hosting will be on the user's own server rather than a managed platform.
- Deployment is expected to be done through SSH access to the user's server when implementation is ready.
- The backend/data side is expected to stay intentionally small.
- The data model will likely be centered around a single main table for invitation groups / guests / questionnaire responses.
- Confirmed database choice: `SQLite`.
- SQLite is preferred here because the project is small, self-hosted, and does not need heavy database infrastructure.
- Confirmed data model direction: use two tables instead of one.
- `invitation_groups` will store the shared invitation link/token and group-level metadata.
- `guests` will store one row per guest with their questionnaire data.
- Working schema for `invitation_groups`:
  - `id`
  - `token`
  - `title`
  - `created_at`
  - `updated_at`
- Working schema for `guests`:
  - `id`
  - `group_id`
  - `name`
  - `sort_order`
  - `alcohol_preferences`
  - `comment`
  - `is_submitted`
  - `submitted_at`
  - `updated_at`
- Admin functionality is required, but only in a narrow format.
- The admin area should be a page with a table of guests and their submitted answers.
- No admin-side editing is required in the first version.
- No broader content-management features are required in the first version.
- The admin page should also include an alcohol preference summary, aggregated by option, so it is easy to see how many selections each drink type received.
- Route structure should stay minimal.
- There is no separate public homepage route.
- Main application routes:
  - invitation page route for a personalized group token
  - admin page route behind a secret path

Open questions:
- None at this stage.

Progress notes:
- 2026-05-11: Confirmed `Next.js` as the application framework.
- 2026-05-11: Confirmed that deployment should target the user's own hosting/server over SSH instead of a managed platform.
- 2026-05-11: Confirmed `SQLite` as the database for the self-hosted setup.
- 2026-05-11: Confirmed a two-table structure: invitation links belong to groups, and questionnaire data belongs to individual guests.
- 2026-05-11: Confirmed that guest alcohol preferences should be stored as a JSON array in the `guests` table.
- 2026-05-11: Confirmed the working field set for both `invitation_groups` and `guests`.
- 2026-05-11: Confirmed that the project needs a lightweight admin page with a guest-answer table and alcohol-preference aggregation, but no editing tools.
- 2026-05-11: Confirmed that the admin page will not use formal authentication in the first version and will instead live behind a non-public secret URL known only to the user.
- 2026-05-11: Confirmed that the app should expose only two user-facing routes: personalized invitation pages and the secret admin page.

---

## 6. Guest Personalization
Status: `[todo]`

Goal:
- Design the personalized invitation system.

Notes:
- Each guest should receive a unique URL.
- Safer to use a token-based link instead of plain names in the URL.
- Page should greet the guest by name and load their record.
- One tokenized link may map to a family or guest group rather than a single person.
- The page heading can contain multiple guest names.
- Guest/group records will be prepared in advance from a source table provided later by the user.
- Guests will not be allowed to add new people to an invitation link.

Open questions:
- Exact wording and display rules for multiple names in the heading.

---

## 7. Questionnaire and RSVP Logic
Status: `[todo]`

Goal:
- Define what guests can submit and how responses are stored.

Notes:
- Alcohol preferences are required.
- RSVP can likely be combined into the same form.
- Possible fields: attendance, alcohol preference, dietary restrictions, comments.
- Attendance confirmation is intentionally excluded from the form.
- One invitation link may contain several individual questionnaires, one per guest.
- Guests should be able to revisit the link and edit previously submitted answers.
- A free-text comment field is required.
- Final questionnaire structure per guest:
  - guest name shown as predefined identity
  - alcohol preferences
  - free-form comment
- Alcohol preference options:
  - no alcohol
  - champagne
  - wine
  - strong alcohol
  - cocktails
  - no preference
- Dietary restrictions will not be a separate field; guests can mention them in the comment if needed.
- Alcohol preferences should support multiple selections.
- In storage, alcohol preferences should be represented as a JSON array rather than a comma-separated string.

Open questions:
- Exact field labels.

Progress notes:
- 2026-05-11: Confirmed that alcohol preferences may contain multiple selected options and should be stored as a JSON array.

---

## 8. Map and Logistics
Status: `[todo]`

Goal:
- Prepare location details and route guidance.

Notes:
- Add map embed and clear address.
- Add route instructions and parking/transfers if needed.
- Add external navigation buttons.

Open questions:
- Preferred map provider.
- Whether accommodation or transport info is needed.

---

## 9. Development and Implementation
Status: `[in-progress]`

Goal:
- Build the actual website and connect the data flow.

Notes:
- Set up project scaffold.
- Build UI sections.
- Add animations.
- Connect personalized routes.
- Connect guest form submission.
- Proposed implementation order:
  1. scaffold the `Next.js` project
  2. configure theme, colors, and the base design system
  3. build the invitation page as a static visual prototype
  4. add animations and, if appropriate, selective 3D effects
  5. connect `SQLite` and define the schema
  6. implement personalized invitation loading by token
  7. implement guest questionnaire submission and editing
  8. build the admin page with the guest table and alcohol summary
  9. test and prepare deployment to the server

Open questions:
- None at this stage.

Progress notes:
- 2026-05-11: Confirmed the implementation sequence, excluding a separate guest import feature from the first version.
- 2026-05-11: Scaffolded the `Next.js` application, moved it into the project root, created the initial invitation/admin route structure, centralized theme variables in a dedicated theme file, and built the first placeholder invitation prototype.
- 2026-05-11: Completed the first visual refinement pass for the invitation page: stronger hero composition, richer section styling, decorative motion via CSS, and more polished guest response cards.
- 2026-05-11: Replaced mock invitation storage with a real `SQLite` layer using Node's built-in `node:sqlite`, added schema initialization and demo seed data, and switched invitation/admin reads to the database-backed repository.

---

## 10. Testing and QA
Status: `[todo]`

Goal:
- Verify the site works well on real devices and with real guest scenarios.

Notes:
- Test mobile layouts carefully.
- Test personalized links.
- Test form submission and repeated visits.
- Test performance of images and animations.

Open questions:
- Which devices/browsers matter most for your guests.

---

## 11. Deployment and Domain
Status: `[todo]`

Goal:
- Publish the site and connect it to the final domain.

Notes:
- Choose hosting.
- Configure production environment variables.
- Connect domain and HTTPS.

Open questions:
- Whether the domain is already purchased.
- Whether email sending is needed later.

---

## 12. Launch and Follow-up
Status: `[todo]`

Goal:
- Prepare for guest distribution and post-launch support.

Notes:
- Generate guest links.
- Send invitations.
- Monitor incoming responses.
- Make final content adjustments if needed.

Open questions:
- How links will be distributed: messenger, email, printed QR, other.

---

## Decisions Log

- 2026-05-09: We agreed to start with a high-level plan in Markdown and use it as the shared project tracker.
- 2026-05-09: The website tone should combine modern visual design, ceremonial feeling, emotional presentation, and practical guest guidance.
- 2026-05-11: Color management should be centralized from the beginning so the visual theme can be tuned without refactoring the UI.
- 2026-05-11: If the git diff grows beyond 10 changed files or more than 2000 changed lines, I should commit and push at the end of the turn.

## Working Notes

- Add quick notes here anytime during discussions.
