# Science Learning Center

A growing activity library. Visual Challenges is its first collection, rather than the identity of the whole center.

## First collection

15 supplied classroom posters, five each for grades 6, 7, and 8, preserved byte-for-byte from `science-teks-grades-6-8-images.zip`. Each has a grade, selected TEKS expectation, four answer choices, teacher explanation, and transfer question. Original production prompts remain in [teacher-key.md](activities/visual-challenges/teacher-key.md). No new images were generated for this installation because the archive already contained the complete first set.

The activity supports grade/challenge selection, an evidence response before checking, answer explanations, transfer questions, poster download, and printing. Responses stay only in memory for the open page; there are no accounts or response submissions. Teacher answers are available in the client files, so this is a practice activity, not a secure assessment.

## Preview

Run `python3 -m http.server 4182` from this directory, then open `http://localhost:4182`. The pages also work directly from disk. There are no external fonts, scripts, or runtime services.

## Add activities

Add future activities in their own `activities/<name>/` directories and add their entries to the home page. Keep the center navigation and broad inquiry introduction. Do not add unbuilt activities as if they were available.

## Sources

The supplied teacher key records TEKS alignment and links to the Texas Education Agency source. Challenges introduce or review selected portions of expectations; they are not a complete curriculum. Data and explanations are adapted from the supplied key. Illustrations are simplified and not scale drawings.
