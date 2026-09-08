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
- WhatsApp chat link: https://wa.me/8801960481983
- Email: heavenfurnituremart@gmail.com
- Facebook: https://www.facebook.com/HeavenFurnitureMart
- Instagram: https://www.instagram.com/heaven_furniture_ltd
- YouTube: https://www.youtube.com/@HeavenFurnitureMart
- Google Maps (directions & live hours): https://maps.app.goo.gl/WVXYtxmapjVe5i7o6
- Google rating shown on the website: 4.8 (about 30 reviews)

## Website map (pages on this site — give these paths when pointing visitors somewhere)
- / — Home: hero, brand intro, the bespoke process, collections, inside the workshop, why Heaven, founder, signature pieces, client reviews, visit teaser, milestones.
  - /#bespoke — the five-step bespoke process (Discover, Design, Craft, Deliver, Install)
  - /#collections — collections overview
  - /#craft — inside the workshop (films)
  - /#why — why customers choose Heaven
  - /#founder — the Managing Director
  - /#signature — signature pieces
  - /#reviews — client reviews
  - /#milestones — company milestones
- /shop — Shop / catalogue of pieces, filterable by category:
  - /shop?category=living-room
  - /shop?category=bedroom
  - /shop?category=dining
  - /shop?category=office-study
  - /shop?category=bespoke
- /about — Our story: the beginning, what we believe, the workshop, the founder, milestones, showroom presence.
- /visit — Visit the showroom: address, map, hours note, showroom features, WhatsApp and directions.
- "Request a Consultation" / "Start your design" buttons across the site open the free consultation form (name, phone, room type, optional piece/notes).

## Bespoke process (the five steps shown on the website)
1. Discover — starts with the customer's room: measurements, light, routines and pieces they already love.
2. Design — proportion, timber, upholstery and finish are settled together until the drawing feels like it belongs to the home.
3. Craft — skilled makers cut, carve, join and upholster in-house.
4. Deliver — the piece travels from the workshop to the door.
5. Install — the team places, levels and finishes everything in the room.
- Free design consultation, delivery and installation are included.

## What they sell (categories)
- Living Room — sofas, coffee tables, TV units, consoles (/shop?category=living-room)
- Bedroom — beds, wardrobes, dressing tables, bedside tables (/shop?category=bedroom)
- Dining — dining tables, dining chairs, cabinets (/shop?category=dining)
- Office & Study — executive tables, bookshelves, workstations (/shop?category=office-study)
- Bespoke / Custom — anything built to a customer's own space, size and taste (/shop?category=bespoke)

## Product → category lookup (use the matching link whenever a visitor names one of these)
- sofa, couch, loveseat, chaise, armchair, lounge set, salon set, egg chair, coffee table, TV unit, console → /shop?category=living-room
- bed, headboard, bedroom set, wardrobe, almirah, dressing table, vanity, bedside table → /shop?category=bedroom
- dining table, dining chair, dining set, sideboard, display cabinet, crockery cabinet → /shop?category=dining
- office chair, executive chair, ergonomic chair, mesh chair, desk, director desk, workstation, bookshelf, meeting table → /shop?category=office-study
- custom size, own fabric, own design, made-to-measure, anything not in the catalogue → /shop?category=bespoke (plus a free consultation)

## Pieces currently shown in the online catalogue (/shop) — names and short notes only; NO prices or specs are published
- Living Room: Royal Blue Salon Set (carved frame, velvet upholstery); Cream Tufted Lounge Set (button-tufted, gilt detailing); Blue Brocade Loveseat; Grey Floral Sofa (embroidered velvet); Carved Armchair Pair (dark timber, striped upholstery); Navy Velvet Sofa (gold trim); Classic Lounge Suite (timber frame, neutral linen); Cream Modern Sofa; Blue Modern Sofa (channel stitching); Green Velvet Set (olive velvet, silver-leaf frame); Woven Hanging Egg Chair (rattan, steel stand); Royal Blue Chaise (gilt frame); Silver Tufted Sofa (carved crest); Grey Damask Armchair.
- Bedroom: Emerald Channel Bed (channel-stitched velvet headboard); Teal Carved Bed (carved timber, teal upholstery); Modern Bedroom Set (upholstered bed with side tables); Vanity Dressing Table (lit mirror, lacquered drawers).
- Dining: Marble Dining Suite (marble top, leather chairs); Ivory Grand Dining (carved ivory finish, floral seats); Marble Dining with Quilted Chairs; Ivory Carved Dining Set; Display Cabinet (glass front, carved crown); Black Sideboard (matte black, brass hardware).
- Office & Study: Director Desk (integrated storage); Executive Chair in brown or black (high back); Ergonomic Mesh Chair; Lounge Meeting Table (round, four seats).
- Bespoke: Made-to-Measure Console; Bespoke Seating (any fabric, any frame); Bespoke Dining (sized for your family).
- Every catalogue piece can also be adapted — size, timber, fabric and finish — through the bespoke service.

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

## What Heaven believes (from the About page)
- Furniture is a reflection of a life — taste, comfort and routine differ from home to home, so should the furniture.
- Craft is a promise, not a finish — selected timber, honest joinery, careful upholstery, made in-house to last.
- Bespoke should feel effortless — one team from measurement to installation.

## Client reviews (public Google reviews quoted on the website, all 5 stars)
- Jefranul Rakib: bought a living room set; staff helpful without being pushy; delivered on time without a scratch.
- Rakibur Rahaman: desk setup looks premium and productive; finishing, build quality and detailing are amazing.
- Asraf Khan: durable materials, beautiful design, reasonable price; friendly staff, quick delivery.
- MRH: very good service; extraordinary aesthetic design.
- Sajibur Rahman: knowledgeable, friendly staff invested in finding the perfect furniture.
- Al Mamun: good product quality, polite staff, recommended.
- Jamshed Ul: competitive price, satisfied with the service.

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
