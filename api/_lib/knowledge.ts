/**
 * Heaven Furniture Mart knowledge base for the website assistant.
 * Source of truth: docs/Heaven-Furniture-Mart-Company-Brief.pdf.
 * Secondary: current website content (src/data/site.ts, src/data/catalog.ts, pages).
 * Server-side only — never import from client code.
 */
export const KNOWLEDGE = `
# HEAVEN FURNITURE MART — OFFICIAL KNOWLEDGE BASE

## Identity
- Brand: Heaven Furniture Mart (short form: "Heaven")
- Category: Luxury / bespoke furniture & interior styling
- Tagline: "Designed. Crafted. Customized."
- Location: Agrabad Access Road, Chattogram, Bangladesh
- Founded: 2020, by Managing Director Abul Kalam Bhuiyan
- Positioning: One of Chattogram's leading bespoke furniture brands. They design and craft custom furniture — sofas, beds, dining sets, office pieces — built around what a customer actually wants, not pulled off a shelf. The experience is meant to feel like walking into a luxury interior studio, not an online furniture shop.

## Contact (official)
- Phone / WhatsApp: +880 1960-481983
- Email: heavenfurnituremart@gmail.com
- Facebook: facebook.com/HeavenFurnitureMart
- Instagram: instagram.com/heaven_furniture_ltd
- YouTube: youtube.com/@HeavenFurnitureMart
- Google Maps: https://maps.app.goo.gl/XnZzpdkLTNB9jhGP9f
- Google rating shown on the website: 4.8

## What they sell (categories)
- Living Room — sofas, coffee tables, TV units, consoles
- Bedroom — beds, wardrobes, dressing tables, bedside tables
- Dining — dining tables, dining chairs, cabinets
- Office & Study — executive tables, bookshelves, workstations
- Bespoke / Custom — anything built to a customer's own space, size and taste

## Why customers choose Heaven (trust points)
- Free design consultation
- Fully bespoke — built to your space, not mass-produced
- Premium wood & materials, skilled in-house craftsmanship
- Large physical showroom in Chattogram (Agrabad)
- Delivery & installation included
- Easy payment options
- Trusted by hundreds of happy homeowners

## Bespoke process (as described on the website)
- Every piece is made to order: sizes, timber, upholstery and finish are chosen with the customer.
- Customers can bring dimensions, references or a sketch; the team designs around them.
- The free design consultation can start on WhatsApp, by phone, or in the Agrabad showroom.
- The website's "Request a Consultation" form collects name, phone, room type and an optional piece/notes; the team follows up.

## Showroom (from the website)
- Address: Agrabad Access Road, Chattogram, Bangladesh.
- Showroom features listed on the website: Custom Furniture Design; Architectural Wood & Fabric Selection; In-House Interior Consultation; Premium Modern & Classic Living.
- Hours shown on the website: "Open until 9:30 PM" with a note that hours can vary — customers are advised to check live hours on Google Maps before a late visit. Exact daily opening times are NOT specified.
- Visitors can arrange a visit via WhatsApp or get directions via Google Maps.

## Milestones
- 2020 — Founded by Abul Kalam Bhuiyan
- 2021 — Opened the Agrabad showroom
- 2024–2025 — Exhibited at the International Furniture Fair, Chattogram
- 2025 — Became a member of the Chamber of Commerce
- 2026 — Received nationwide BFIOA recognition

## Managing Director quote
"At Heaven Furniture Mart, we believe furniture is more than just function; it is a reflection of lifestyle, taste, and comfort. Every piece we create is designed to bring lasting elegance into the homes of our clients." — Abul Kalam Bhuiyan, Managing Director

## Brand character
Warm, editorial, spacious, confident. Real craftsmanship and real photography. Not cheap, crowded or marketplace-like.

## INFORMATION THAT IS NOT AVAILABLE (do not invent)
- Prices, quotes, discounts or price ranges for any piece
- Product stock / availability
- Delivery timelines, lead times or production times
- Warranty or guarantee terms
- Specific payment plan terms, instalment details, or accepted payment methods (only "easy payment options" is confirmed)
- Exact daily opening hours or closed days
- Specific wood species, fabric brands, dimensions or technical specifications
- Delivery coverage area (whether they deliver outside Chattogram)
- Staff names other than the Managing Director
- Number of employees, revenue, or customer counts beyond "hundreds of happy homeowners"
For any of these, say the information isn't available and suggest contacting the team by phone/WhatsApp (+880 1960-481983) or email.
`.trim()
