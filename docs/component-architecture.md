# Heaven Furniture Mart — Component Architecture

## Page

HomePage

---

# Components

## Layout

- Navbar
- Footer
- SectionContainer

---

## Hero

HeroSection

Possible subcomponents:

- HeroContent
- HeroMedia
- HeroCTA

---

## Brand

BrandIntroSection

---

## Collections

CollectionsSection

Components:

- CollectionCard
- CollectionGrid

---

## Bespoke

BespokeSection

Components:

- BespokeProcess
- ProcessStep

---

## Trust

WhyChooseSection

Components:

- TrustItem

---

## Visual Story

CraftsmanshipSection

Components:

- ImageReveal
- ImageGallery

---

## Social Proof

QuoteSection

MilestonesSection

---

## Conversion

FinalCTASection

---

# Reusable Components

Create reusable components for:

- SectionHeading
- EyebrowText
- PrimaryButton
- SecondaryButton
- ImageReveal
- AnimatedText
- GoldDivider
- ProcessStep

---

# Important Architecture Rule

Do not create unnecessary components.

A component should exist when:

- It is reused
- It has meaningful logic
- It improves maintainability

Avoid creating tiny components for every simple div.
