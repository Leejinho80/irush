const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// HTML 엔티티 디코딩
function decodeHTMLEntities(text) {
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&#x27;': "'",
    '&#x2F;': '/',
    '&nbsp;': ' ',
    '&hellip;': '...',
    '&mdash;': '-',
    '&ndash;': '-',
    '&lsquo;': "'",
    '&rsquo;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"',
  };

  let decoded = text;
  for (const [entity, char] of Object.entries(entities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }
  // 숫자 엔티티 처리
  decoded = decoded.replace(/&#(\d+);/g, function(_, num) { return String.fromCharCode(num); });
  decoded = decoded.replace(/&#x([a-fA-F0-9]+);/g, function(_, hex) { return String.fromCharCode(parseInt(hex, 16)); });
  return decoded;
}

// HTML 태그 제거
function stripHTML(html) {
  return html.replace(/<[^>]*>/g, '').trim();
}

// HTTP/HTTPS 요청 함수
function fetchURL(url) {
  return new Promise(function(resolve, reject) {
    const client = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    };

    client.get(url, options, function(res) {
      // 리다이렉트 처리
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          const urlObj = new URL(url);
          redirectUrl = urlObj.protocol + '//' + urlObj.host + redirectUrl;
        }
        fetchURL(redirectUrl).then(resolve).catch(reject);
        return;
      }

      let data = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) { data += chunk; });
      res.on('end', function() { resolve(data); });
      res.on('error', reject);
    }).on('error', reject);
  });
}

// ITWorld Korea RSS 크롤링
async function crawlITWorld() {
  console.log('ITWorld Korea crawling...');
  const news = [];

  try {
    const rssUrl = 'https://www.itworld.co.kr/feed/';
    const xml = await fetchURL(rssUrl);

    // RSS item 파싱 (RSS 0.92 형식)
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex = /<title>([\s\S]*?)<\/title>/;
    const linkRegex = /<link>([\s\S]*?)<\/link>/;
    const descRegex = /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/;

    let match;
    let count = 0;

    while ((match = itemRegex.exec(xml)) !== null && count < 5) {
      const item = match[1];

      const titleMatch = item.match(titleRegex);
      const linkMatch = item.match(linkRegex);
      const descMatch = item.match(descRegex);

      if (titleMatch && linkMatch) {
        const title = decodeHTMLEntities(stripHTML(titleMatch[1] || ''));
        const link = (linkMatch[1] || '').trim();
        let desc = '';

        if (descMatch) {
          desc = decodeHTMLEntities(stripHTML(descMatch[1] || descMatch[2] || ''));
        }

        // 설명 길이 제한
        if (desc.length > 150) {
          desc = desc.substring(0, 147) + '...';
        }

        if (title && link && !title.includes('ITWorld')) {
          news.push({
            title: title,
            desc: desc,
            link: link,
            source: 'ITWorld'
          });
          count++;
        }
      }
    }

    console.log('ITWorld: ' + news.length + ' articles collected');
  } catch (error) {
    console.error('ITWorld error:', error.message);
  }

  return news;
}

// AI Times RSS 크롤링
async function crawlAITimes() {
  console.log('AI Times crawling...');
  const news = [];

  try {
    const rssUrl = 'https://www.aitimes.kr/rss/allArticle.xml';
    const xml = await fetchURL(rssUrl);

    // RSS item 파싱
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex = /<title>([\s\S]*?)<\/title>/;
    const linkRegex = /<link>([\s\S]*?)<\/link>/;
    const descRegex = /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/;

    let match;
    let count = 0;

    while ((match = itemRegex.exec(xml)) !== null && count < 5) {
      const item = match[1];

      const titleMatch = item.match(titleRegex);
      const linkMatch = item.match(linkRegex);
      const descMatch = item.match(descRegex);

      if (titleMatch && linkMatch) {
        const title = decodeHTMLEntities(stripHTML(titleMatch[1] || ''));
        const link = (linkMatch[1] || '').trim();
        let desc = '';

        if (descMatch) {
          desc = decodeHTMLEntities(stripHTML(descMatch[1] || descMatch[2] || ''));
        }

        // 설명 길이 제한
        if (desc.length > 150) {
          desc = desc.substring(0, 147) + '...';
        }

        if (title && link) {
          news.push({
            title: title,
            desc: desc,
            link: link,
            source: 'AI Times'
          });
          count++;
        }
      }
    }

    console.log('AI Times: ' + news.length + ' articles collected');
  } catch (error) {
    console.error('AI Times error:', error.message);
  }

  return news;
}

// 메인 실행
async function main() {
  console.log('IT News Crawling Started...');
  console.log('Time:', new Date().toISOString());

  // 두 사이트에서 병렬로 크롤링
  const results = await Promise.all([
    crawlITWorld(),
    crawlAITimes()
  ]);

  const itworldNews = results[0];
  const aitimesNews = results[1];

  // 뉴스 합치기 및 번호 부여
  const allNews = [];
  let number = 1;

  // ITWorld 뉴스 추가
  for (let i = 0; i < itworldNews.length; i++) {
    const item = itworldNews[i];
    allNews.push({
      number: String(number).padStart(2, '0'),
      title: item.title,
      desc: item.desc,
      link: item.link,
      source: item.source
    });
    number++;
  }

  // AI Times 뉴스 추가
  for (let i = 0; i < aitimesNews.length; i++) {
    const item = aitimesNews[i];
    allNews.push({
      number: String(number).padStart(2, '0'),
      title: item.title,
      desc: item.desc,
      link: item.link,
      source: item.source
    });
    number++;
  }

  // 결과 데이터
  const result = {
    lastUpdated: new Date().toISOString(),
    totalCount: allNews.length,
    news: allNews
  };

  // public/data 디렉토리 생성
  const dataDir = path.join(__dirname, '..', 'public', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // JSON 파일로 저장
  const outputPath = path.join(dataDir, 'news.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');

  console.log('\nCrawling completed! Total ' + allNews.length + ' articles');
  console.log('Saved to: ' + outputPath);

  // 결과 미리보기
  console.log('\n--- Collected News ---');
  for (let i = 0; i < allNews.length; i++) {
    const item = allNews[i];
    console.log(item.number + '. [' + item.source + '] ' + item.title);
  }
}

main().catch(console.error);
