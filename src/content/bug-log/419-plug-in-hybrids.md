---
title: "419 plug-in hybrids, filed as electric"
summary: "Nothing errored. The numbers looked plausible. They were wrong for 419 cars."
date: 2026-09-25
project: carinfo
draft: true
---

<!--
  DRAFT for Aly to review. Written only from what's already public: the CarInfo
  case study, the audit script in the repo, and the resume. Check every
  sentence, add what only you know (how you noticed, how long it took), then
  set draft: false to publish.
-->

CarInfo values used cars from a 28,000-vehicle EPA dataset with NHTSA safety
data merged in. A group of plug-in hybrids came out 60 to 70 percent below
what they were worth.

Nothing failed. The import ran clean, every record had a value, and the values
were in a believable range. That is the dangerous kind of bug: a confident,
wrong number.

## The check

I stopped asking whether the import had run and started asking whether its
output made sense. A battery-only car has two tells: it goes a long way on a
charge, and it has no gas engine. So the audit takes every record tagged
electric and asks both questions.

```js
// PHEV misclassification
const electric = cars.filter((c) => c.engine?.fuelType === 'electric');
const shortRange = electric.filter((c) => {
  const r = c.epa?.rangeMiles ?? 0;
  return r > 0 && r < 50;
});
const withDisp = shortRange.filter(
  (c) => c.engine?.displacement && c.engine.displacement >= 1.5
);
```

An "electric" car with under 50 miles of range and a 1.5-litre engine is not
electric. The check found 419 of them.

## The cause

The import tagged those plug-in hybrids as electric, and the valuation model
then priced them as electric cars. The fix went in at the import, where the
label is decided, rather than as a patch on the valuations downstream.

## What stayed

The check is still in the repo as an audit script, so it can run again after
any future import. The same idea runs through the rest of CarInfo: every field
says whether it is verified, curated, or estimated, because a research tool
that shows a wrong number without saying so is worse than one that shows
nothing.
