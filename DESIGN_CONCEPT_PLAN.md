# Wedding Website Design Concept Plan

## Purpose

This file fixes the high-level design concept for the wedding website before further implementation.
We will use it as the main visual/narrative reference and уточнять each section step by step.

## Core Principles

- Functional structure of the site stays the same.
- Existing blocks stay the same:
  1. hero / invitation
  2. event details
  3. questionnaire
  4. FAQ
- Personalized links and guest questionnaire logic do not change.
- Mobile-first full-screen scrolling stays the same.
- Scroll behavior should feel like scene-by-scene storytelling, similar to TikTok / stories.
- The site should feel like a visual narrative, not a standard landing page.

## Narrative Concept

The website should tell a short story about Stepan and Elizaveta through a sequence of scenes.

Narrative arc:

1. The guest opens the site and sees two cameras.
2. On the next scroll, each camera produces a photo card, like a Polaroid.
3. One photo is labeled `Степан`, the other `Елизавета`.
4. On the next scroll, stage curtains close.
5. On the next scroll, stage curtains open.
6. Behind the curtains, the present-day photo of the couple appears together with the wedding invitation message.
7. On the next scroll, the event details scene appears:
   - date
   - gathering time
   - countdown
   - location
   - route / how to get there
8. The countdown should be represented as a 3D clock object.
9. On the next scroll, the 3D clock grows and its hand spins quickly.
10. The clock is swept upward, revealing the questionnaire scene.
11. On the next scroll, the FAQ scene appears.

## Scene Structure

### Scene 1. Cameras

Goal:
- establish the beginning of the story
- introduce two separate lives before the couple is shown together

Content:
- two cameras
- cameras are placed with a small distance between them
- minimal or no text

Visual role:
- intrigue
- object-based storytelling

Approved direction:
- camera reference is provided by the user
- local reference files:
  - [camera-reference-closed.png](/Users/windof/Documents/New%20project/public/images/references/camera-reference-closed.png)
  - [camera-reference-ejecting.png](/Users/windof/Documents/New%20project/public/images/references/camera-reference-ejecting.png)
- cameras should appear as object-heroes, not as flat icons
- they should sit apart from one another, not merged into a single centered mass
- labels are not shown on the camera scene itself

Animation:
- user scrolls downward
- each camera begins to produce a photo smoothly, like a Polaroid coming out

Open questions:
- exact spatial composition of the two cameras
- whether cameras are perfectly frontal or slightly angled inward
- whether there is any supporting surface beneath them or they float in a staged space

### Scene 2. Polaroids

Goal:
- reveal child/past identity of each person

Content:
- photo card from first camera: `Степан`
- photo card from second camera: `Елизавета`

Animation:
- photos eject from cameras smoothly like Polaroids
- after the photos appear, the cameras move upward and leave the frame
- two photo cards remain centered on the page
- each photo card contains the matching childhood photo and signed name

Approved direction:
- end state of the scene: only two centered Polaroids remain visible
- the cameras should not remain as background decoration after the ejection sequence
- local Polaroid reference:
  - [polaroid-reference.png](/Users/windof/Documents/New%20project/public/images/references/polaroid-reference.png)
- Polaroids are slightly tilted rather than perfectly straight
- names are written by hand
- the two photos overlap slightly rather than sitting fully separated

Open questions:
- exact angle of the Polaroids
- how much paper texture / realism is needed

### Scene 3. Curtains Close

Goal:
- mark transition between past and present

Content:
- theatrical curtain animation

Animation:
- curtains close across the screen

Approved direction:
- local curtain references:
  - [curtain-reference-open.png](/Users/windof/Documents/New%20project/public/images/references/curtain-reference-open.png)
  - [curtain-reference-closed.png](/Users/windof/Documents/New%20project/public/images/references/curtain-reference-closed.png)
- after the Polaroid scene, curtains close over the frame
- this is a true scene transition, not a decorative background effect

Open questions:
- exact timing and weight of the closing motion

### Scene 4. Curtains Open -> Invitation Hero

Goal:
- reveal the present
- establish the emotional center of the website

Content:
- current photo of the couple
- invitation line to the guests
- names of the couple

Animation:
- curtains open and reveal the hero beneath

Approved direction:
- the same curtain system that closes in Scene 3 opens here
- when curtains open, they reveal the current-day couple photo and the wedding invitation hero
- the reveal happens immediately after the closed-curtain moment, not as a separate unrelated screen

Open questions:
- exact composition of text over / around photo
- how theatrical vs restrained the reveal should be

### Scene 5. Event Details

Goal:
- move from emotional reveal to practical event information

Content:
- date
- gathering time
- countdown
- location
- route guidance

Key object:
- 3D clock as the countdown centerpiece

Open questions:
- how much text is visible at once on mobile
- exact information hierarchy

### Scene 6. Clock Transition -> Questionnaire

Goal:
- create a kinetic transition into the guest action step

Content:
- 3D clock enlarges
- clock hand spins aggressively
- clock wipes or flies upward
- questionnaire appears underneath

Open questions:
- whether the clock should break scale, blur, distort, or just sweep away
- how dramatic this transition should be

### Scene 7. Questionnaire

Goal:
- keep the story feeling alive while switching to utility

Content:
- same questionnaire logic as now
- guest selection buttons
- form for alcohol preferences

Requirement:
- must stay easy to use
- must not become overly decorative at the expense of clarity

### Scene 8. FAQ

Goal:
- close the experience calmly

Content:
- FAQ as now

Requirement:
- stylistically consistent with the earlier scenes
- less theatrical than the first half of the experience

## Visual System To Define Later

### Approved high-level visual language

- Materials:
  - silk
  - pearl / mother-of-pearl
- Palette:
  - creamy white as the main base
  - deep burgundy for buttons and accent elements
- Typography:
  - primary display font: `Prata`
- Light:
  - soft neutral light

### Still to define later

- exact burgundy tone
- background treatment
- texture usage
- whether any gold is allowed at all, or whether the whole direction should stay strictly silk + pearl + burgundy
- motion language

## 3D System To Define Later

3D objects currently planned:

- cameras
- 3D clock

Possible supporting 3D or simulated 3D elements:

- curtain depth / folds
- floating particles / dust
- paper card depth
- lens reflections

All 3D references will be discussed separately per object.

## Implementation Order

We should implement this concept in the following order:

1. Freeze the narrative scene list.
2. Define visual language at a high level:
   - materials
   - color
   - typography
   - light
3. Define Scene 1 in detail:
   - camera references
   - composition
   - animation behavior
4. Define Scene 2 in detail:
   - Polaroid behavior
   - labeling
   - paper style
5. Define Scenes 3-4 in detail:
   - curtain material
   - reveal timing
   - hero composition
6. Define Scene 5:
   - event details layout
   - 3D clock reference
7. Define Scene 6:
   - transition mechanics from clock to questionnaire
8. Define Scene 7:
   - utility-first styling rules for the questionnaire
9. Define Scene 8:
   - FAQ presentation rules
10. Only after that, implement the scenes in order.

## Working Rule

Do not continue with ad hoc visual tweaks.
Each next design move should be attached to one specific scene and one specific approved concept decision.
