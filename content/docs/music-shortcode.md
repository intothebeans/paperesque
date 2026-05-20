---
title: "Music Shortcode"
date: 2025-09-15T17:13:37-04:00
draft: false
tags: [shortcodes, music, markdown]
---

> [!NOTE]+
> Curly braces are omitted in the examples below to prevent rendering issues. Please include them in your actual usage.

## Basic Usage

```markdown
< music >
X:1
T:Rondo in Blue Beard. RH.376
R:Rondeau
S:Rev.R.Harrison's MS,c1815,Cumbria
N:There was an unnecessary quaver rest at the end. PJH.
O:England
A:North-West - Temple Sowerby
Z:vmp.Simon Wilson. Review PJH, 2008.
M:2/4
L:1/8
Q:1/4=100
B:Village Music project, Harrison, Rev. R.
K:A minor
E|Ae ed|d/c/B/c/ AA|Bc de|d/c/B/c/ AE|!
Ae ed|d/c/B/c/ AA|Bc de|Ac Az|!
e2 za|e2 za|ed cB|Aa ae|!
ae' e'd'|d'/c'/b/c'/ aa|bc' d'e'|d'/c'/b/c'/ aa|!
Ae ed|d/c/B/c/ AA|ed cB|AA A|]
< /music >
```

**Renders**

{{< music >}}
X:1
T:Rondo in Blue Beard. RH.376
R:Rondeau
S:Rev.R.Harrison's MS,c1815,Cumbria
O:England
A:North-West - Temple Sowerby
Z:vmp.Simon Wilson. Review PJH, 2008.
M:2/4
L:1/8
Q:1/4=100
B:Village Music project, Harrison, Rev. R.
K:A minor
E|Ae ed|d/c/B/c/ AA|Bc de|d/c/B/c/ AE|!
Ae ed|d/c/B/c/ AA|Bc de|Ac Az|!
e2 za|e2 za|ed cB|Aa ae|!
ae' e'd'|d'/c'/b/c'/ aa|bc' d'e'|d'/c'/b/c'/ aa|!
Ae ed|d/c/B/c/ AA|ed cB|AA A|]
{{< /music >}}

## With Audio Playback

```markdown
< music >
X: 2
T: Marriage May Become A Curse
R: polka
M: 2/4
L: 1/8
K: Dmaj
|:B|AB/A/ F/G/A/F/|BB AF/A/|Bc/d/ cd/e/|d/e/f/g/ ea|
AB/A/ FG/A/|BB A2|A/B/c/d/ B/c/d/e/|fe d:|
|:A|fa/f/ ed/c/|de c2|B/c/d/e/ c/d/e/f/|d/e/f/g/ e2|
[1 ff e2|dd cd/c/|Bd/B/ ce/c/|dc d:|
[2 AB/A/ FG/A/|BB A2|AB/c/ de|fe d||
< /music >
```

**Renders**

{{< music audio="true" >}}
X: 2
T: Marriage May Become A Curse
R: polka
M: 2/4
L: 1/8
K: Dmaj
|:B|AB/A/ F/G/A/F/|BB AF/A/|Bc/d/ cd/e/|d/e/f/g/ ea|
AB/A/ FG/A/|BB A2|A/B/c/d/ B/c/d/e/|fe d:|
|:A|fa/f/ ed/c/|de c2|B/c/d/e/ c/d/e/f/|d/e/f/g/ e2|
[1 ff e2|dd cd/c/|Bd/B/ ce/c/|dc d:|
[2 AB/A/ FG/A/|BB A2|AB/c/ de|fe d||
{{< /music >}}

## Custom Options

```markdown
< music id="my-tune" audio="true" download="true" lazy="false" >
X: 1
T: Custom Tune
M: 4/4
L: 1/8
K: G
D | G2 G2 GABc | d4 d2 cB | A2 A2 ABcd | e4 e2 dc |
B2 B2 Bcde | f4 f2 ed | c2 c2 cdef | g6 |]
< /music >
```

## Parameters

- `id` (default: "score") - Unique identifier for the music element
- `audio` (default: false) - Enable audio playback controls
- `download` (default: false) - Show MIDI download option
- `lazy` (default: true) - Enable lazy loading (loads when scrolled into view)
- `abcOptions` (default: null) - Custom ABCjs options as JSON

## Advanced Configuration

For pages with multiple music elements, you can disable lazy loading for better UX:

```markdown
<!-- First music loads immediately -->

< music lazy="false" >
X: 1
T: Introduction
...
< /music >

<!-- Subsequent music loads on scroll (default) -->

< music >
X: 2
T: Main Theme
...
< /music >
```

## Resources

- [ABCjs Documentation](https://abcjs.net/ "ABCjs Library")
- [ABC Notation Overview](https://abcnotation.com/wiki/abc:standard:v2.1 "ABC Notation Standard")
