import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { RichText } from './src/components/assistant/RichText'
const samples = [
  'Browse bedroom pieces at /shop?category=bedroom, or see the process at /#bespoke.',
  'Call +880 1960-481983 or email heavenfurnituremart@gmail.com. WhatsApp: https://wa.me/8801960481983',
  'Instagram: instagram.com/heaven_furniture_ltd (Facebook: https://www.facebook.com/HeavenFurnitureMart).',
  'Directions: https://maps.app.goo.gl/XnZzpdkLTNB9jhGP9f. Not allowed: https://evil.example.com/x and sofa / bed.',
  'Visit us: /visit',
]
for (const s of samples) console.log(renderToStaticMarkup(<MemoryRouter><RichText text={s} /></MemoryRouter>), '\n')
