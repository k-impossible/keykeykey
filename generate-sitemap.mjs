import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// 현재 모듈의 디렉토리 경로를 얻기 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 페이지 경로 정의
const links = [
	{ url: "/", changefreq: "daily", priority: 1.0 },
	{ url: "/login", changefreq: "monthly", priority: 0.5 },
	{ url: "/sign-up", changefreq: "monthly", priority: 0.5 },
	{ url: "/products/", changefreq: "monthly", priority: 0.8 },
	{ url: "/product/", changefreq: "monthly", priority: 0.8 },

	// 추가 경로를 여기에 작성
];

// SitemapStream 생성
const sitemapPath = join(__dirname, "public", "sitemap.xml");
const sitemapStream = new SitemapStream({
	hostname: "https://www.keykeykey.store",
});

// URL들을 Sitemap에 추가
for (const link of links) {
	sitemapStream.write(link);
}

// 스트림 종료 및 파일 생성
sitemapStream.end();
const sitemapData = await streamToPromise(sitemapStream);
createWriteStream(sitemapPath).write(sitemapData);
