const https = require('https');
const fs = require('fs');
const path = require('path');

const cards = [
  { src: 'ar00', dst: '00-fool' },
  { src: 'ar01', dst: '01-magician' },
  { src: 'ar02', dst: '02-high-priestess' },
  { src: 'ar03', dst: '03-empress' },
  { src: 'ar04', dst: '04-emperor' },
  { src: 'ar05', dst: '05-hierophant' },
  { src: 'ar06', dst: '06-lovers' },
  { src: 'ar07', dst: '07-chariot' },
  { src: 'ar08', dst: '08-strength' },
  { src: 'ar09', dst: '09-hermit' },
  { src: 'ar10', dst: '10-wheel-of-fortune' },
  { src: 'ar11', dst: '11-justice' },
  { src: 'ar12', dst: '12-hanged-man' },
  { src: 'ar13', dst: '13-death' },
  { src: 'ar14', dst: '14-temperance' },
  { src: 'ar15', dst: '15-devil' },
  { src: 'ar16', dst: '16-tower' },
  { src: 'ar17', dst: '17-star' },
  { src: 'ar18', dst: '18-moon' },
  { src: 'ar19', dst: '19-sun' },
  { src: 'ar20', dst: '20-judgement' },
  { src: 'ar21', dst: '21-world' },
  { src: 'wa01', dst: '22-ace-wands' },
  { src: 'wa02', dst: '23-two-wands' },
  { src: 'wa03', dst: '24-three-wands' },
  { src: 'wa04', dst: '25-four-wands' },
  { src: 'wa05', dst: '26-five-wands' },
  { src: 'wa06', dst: '27-six-wands' },
  { src: 'wa07', dst: '28-seven-wands' },
  { src: 'wa08', dst: '29-eight-wands' },
  { src: 'wa09', dst: '30-nine-wands' },
  { src: 'wa10', dst: '31-ten-wands' },
  { src: 'wapa', dst: '32-page-wands' },
  { src: 'wakn', dst: '33-knight-wands' },
  { src: 'waqu', dst: '34-queen-wands' },
  { src: 'waki', dst: '35-king-wands' },
  { src: 'cu01', dst: '36-ace-cups' },
  { src: 'cu02', dst: '37-two-cups' },
  { src: 'cu03', dst: '38-three-cups' },
  { src: 'cu04', dst: '39-four-cups' },
  { src: 'cu05', dst: '40-five-cups' },
  { src: 'cu06', dst: '41-six-cups' },
  { src: 'cu07', dst: '42-seven-cups' },
  { src: 'cu08', dst: '43-eight-cups' },
  { src: 'cu09', dst: '44-nine-cups' },
  { src: 'cu10', dst: '45-ten-cups' },
  { src: 'cupa', dst: '46-page-cups' },
  { src: 'cukn', dst: '47-knight-cups' },
  { src: 'cuqu', dst: '48-queen-cups' },
  { src: 'cuki', dst: '49-king-cups' },
  { src: 'sw01', dst: '50-ace-swords' },
  { src: 'sw02', dst: '51-two-swords' },
  { src: 'sw03', dst: '52-three-swords' },
  { src: 'sw04', dst: '53-four-swords' },
  { src: 'sw05', dst: '54-five-swords' },
  { src: 'sw06', dst: '55-six-swords' },
  { src: 'sw07', dst: '56-seven-swords' },
  { src: 'sw08', dst: '57-eight-swords' },
  { src: 'sw09', dst: '58-nine-swords' },
  { src: 'sw10', dst: '59-ten-swords' },
  { src: 'swpa', dst: '60-page-swords' },
  { src: 'swkn', dst: '61-knight-swords' },
  { src: 'swqu', dst: '62-queen-swords' },
  { src: 'swki', dst: '63-king-swords' },
  { src: 'pe01', dst: '64-ace-pentacles' },
  { src: 'pe02', dst: '65-two-pentacles' },
  { src: 'pe03', dst: '66-three-pentacles' },
  { src: 'pe04', dst: '67-four-pentacles' },
  { src: 'pe05', dst: '68-five-pentacles' },
  { src: 'pe06', dst: '69-six-pentacles' },
  { src: 'pe07', dst: '70-seven-pentacles' },
  { src: 'pe08', dst: '71-eight-pentacles' },
  { src: 'pe09', dst: '72-nine-pentacles' },
  { src: 'pe10', dst: '73-ten-pentacles' },
  { src: 'pepa', dst: '74-page-pentacles' },
  { src: 'pekn', dst: '75-knight-pentacles' },
  { src: 'pequ', dst: '76-queen-pentacles' },
  { src: 'peki', dst: '77-king-pentacles' }
];

function downloadWithRetry(url, filepath, retries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      const file = fs.createWriteStream(filepath);
      
      const request = https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        }
      }, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          file.close();
          fs.unlinkSync(filepath);
          attempt(n);
          return;
        }
        
        if (response.statusCode === 429 && n < retries) {
          file.close();
          fs.unlinkSync(filepath);
          console.log(`  Rate limited, waiting 5s... (${n}/${retries})`);
          setTimeout(() => attempt(n + 1), 5000);
          return;
        }
        
        if (response.statusCode !== 200) {
          file.close();
          if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
          reject(new Error(`Status ${response.statusCode}`));
          return;
        }
        
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      });
      
      request.on('error', (err) => {
        file.close();
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        if (n < retries) {
          console.log(`  Error, retrying... (${n}/${retries})`);
          setTimeout(() => attempt(n + 1), 2000);
        } else {
          reject(err);
        }
      });
      
      request.setTimeout(15000, () => {
        request.destroy();
        file.close();
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        if (n < retries) {
          console.log(`  Timeout, retrying... (${n}/${retries})`);
          setTimeout(() => attempt(n + 1), 2000);
        } else {
          reject(new Error('Timeout'));
        }
      });
    };
    
    attempt(1);
  });
}

async function downloadAll() {
  const cardsDir = path.join(__dirname, '..', 'public', 'cards');
  
  if (!fs.existsSync(cardsDir)) {
    fs.mkdirSync(cardsDir, { recursive: true });
  }
  
  console.log('Downloading 78 Rider-Waite tarot card images...\n');
  let success = 0;
  let failed = 0;
  
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const filename = `${card.dst}.jpg`;
    const filepath = path.join(cardsDir, filename);
    
    if (fs.existsSync(filepath) && fs.statSync(filepath).size > 5000) {
      console.log(`[${i + 1}/78] ✓ ${filename} exists`);
      success++;
      continue;
    }
    
    const url = `https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/RWS_Tarot_${card.src}.jpg/300px-RWS_Tarot_${card.src}.jpg`;
    
    try {
      await downloadWithRetry(url, filepath);
      console.log(`[${i + 1}/78] ✓ Downloaded ${filename}`);
      success++;
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.log(`[${i + 1}/78] ✗ Failed ${filename}: ${err.message}`);
      failed++;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  
  console.log(`\nComplete! Success: ${success}, Failed: ${failed}`);
}

downloadAll().catch(console.error);
