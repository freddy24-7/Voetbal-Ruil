import * as dotenv from 'dotenv'
import * as mysql from 'mysql2/promise'
import * as path from 'path'

dotenv.config({path: path.resolve(__dirname, '../../.env')})

const mockShoes = [
  {title: 'Nike Jr. Mercurial - Maat 33', province: 'Noord-Holland', size: '33', image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=400&h=300&fit=crop'},
  {title: 'Adidas Predator Edge - Maat 35', province: 'Zuid-Holland', size: '35', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'},
  {title: 'Puma Future Z - Maat 31', province: 'Utrecht', size: '31', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop'},
  {title: 'Nike Phantom GT - Maat 34', province: 'Gelderland', size: '34', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=300&fit=crop'},
  {title: 'Adidas X Speedflow - Maat 36', province: 'Noord-Brabant', size: '36', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop'},
  {title: 'Nike Tiempo Legend - Maat 32', province: 'Overijssel', size: '32', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=300&fit=crop'},
  {title: 'Puma Ultra 1.4 - Maat 30', province: 'Friesland', size: '30', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop'},
  {title: 'Adidas Copa Sense - Maat 33', province: 'Limburg', size: '33', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=300&fit=crop'},
  {title: 'Nike Jr. Vapor 15 - Maat 35', province: 'Groningen', size: '35', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop'},
  {title: 'Adidas Predator Accuracy - Maat 34', province: 'Zeeland', size: '34', image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400&h=300&fit=crop'},
  {title: 'Nike Mercurial Superfly - Maat 37', province: 'Noord-Holland', size: '37', image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=300&fit=crop'},
  {title: 'Puma King Platinum - Maat 32', province: 'Flevoland', size: '32', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop'},
]

async function seed() {
  const conn = await mysql.createConnection(process.env.DB_URL!)

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS shoe (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      size VARCHAR(10) NOT NULL,
      province VARCHAR(100) NOT NULL,
      image VARCHAR(500)
    )
  `)
  console.log('Table ready.')

  await conn.execute('DELETE FROM shoe')
  console.log('Existing rows cleared.')

  for (const shoe of mockShoes) {
    await conn.execute(
      'INSERT INTO shoe (title, size, province, image) VALUES (?, ?, ?, ?)',
      [shoe.title, shoe.size, shoe.province, shoe.image],
    )
  }
  console.log(`Seeded ${mockShoes.length} shoes.`)

  await conn.end()
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
